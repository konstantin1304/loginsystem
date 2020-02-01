// import http from 'http';
// import url from 'url';
// import qs from 'querystring';
// import mysql from 'mysql2/promise';

const http = require('http');
const url = require('url');
const qs = require('querystring');
const mysql = require('mysql2/promise')
const nodemailer = require('nodemailer');

//settings for sending mail
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mailercrud@gmail.com',
//         pass: 'a1d2m3i4n'
//     }
// });

class Server {
    httpServer = null;
    errorCodes = {
        sqlError: 'SQL_ERROR',
        noSuchCommand: 'NO_SUCH_COMMAND',
        noSuchServerCommand: 'NO_SUCH_SERVER_COMMAND',
        noSuchItem: 'NO_SUCH_ITEM_IN_OBJECT',
    };
    dbConnection = null;
    contentTypes = {
        json: { 'Content-Type': 'application/json' },
    };
    httpServerPort = 1010;
    postProcessors = {};
    getProcessors = {};

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mailercrud@gmail.com',
            pass: 'a1d2m3i4n'
        }
    });

    initialize = async () => {
        await this.connectToDb();
        this.runHttpServer();
        this.initRequestProcessors();
    };

    connectToDb = async () => {
        try {
            this.dbConnection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'logssystem',
            });
            this.setConnectionErrorHandler(this.dbConnection);
        } catch (err) {
            console.error(`DB connection failed: ${err.code}`);
            this.dbConnection = null;
            return false;
        }
    };

    setConnectionErrorHandler = dbConnection => {
        dbConnection.on('error', async err => await this.dbErrorHandler(err));
    };

    dbErrorHandler = async error => {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            this.dbConnection.destroy();
            this.dbConnection = null;
            await this.connectToDb();
        }
    };

    runHttpServer = () => {
        if (!this.dbConnection) {
            console.error(new Error(`Failed to create server: DB connection is not created.`));
            return false;
        }

        this.httpServer = http.createServer((req, res) => this.processRequest(req, res));
        this.httpServer.listen(this.httpServerPort, this.httpServerListenLog);
    };

    initRequestProcessors = () => {
        if (!this.dbConnection
            || !this.httpServer) {
            console.error(`Failed to init processors: DB connection or HTTP server is not created.`);

            return false;
        }

        this.postProcessors = {
            test: this.testProcessor,
            save: this.saveProcessor,
            setting: this.settingProcessor
        };
        this.getProcessors = {
            test: this.testProcessor,
            users: this.userProcessor,
            auth: this.authProcessor,

        };
    };

    httpServerListenLog = () => {
        console.log(new Date() + '\nServer is listening on port ' + this.httpServerPort);
    };

    processRequest = async (req, res) => {
        const requestQuery = url.parse(req.url, true);
        const requestTarget = requestQuery.pathname.substring(1);
        const requestParams = requestQuery.query;
        console.log(requestParams);


        switch (req.method) {
            case 'POST':
                let body = '';

                req.on('data', data => {
                    body += data;

                    if (body.length > 1e6) {
                        req.connection.destroy();
                    }
                });

                req.on('end', async () => {
                    const postArgs = body;
                    if (this.postProcessors[requestTarget]) {
                        const responseContentPost = await this.postProcessors[requestTarget](postArgs);
                        this.sendResponse(res, this.contentTypes.json, JSON.stringify(responseContentPost));
                    } else {
                        this.sendResponse(res, this.contentTypes.json, JSON.stringify(this.getErrorResponseObject('noSuchCommand', null)));
                    }
                });
                break;

            case 'GET':
                if (this.getProcessors[requestTarget]) {

                    const responseContentGet = await this.getProcessors[requestTarget](requestParams);
                    this.sendResponse(res, this.contentTypes.json, JSON.stringify(responseContentGet));
                } else {
                    this.sendResponse(res, this.contentTypes.json, JSON.stringify(this.getErrorResponseObject('noSuchCommand', null)));
                }
                break;

            default:
                this.sendResponse(res, this.contentTypes.json, JSON.stringify(this.getErrorResponseObject('noSuchServerCommand', null)));
        }
    };

    getErrorResponseObject = (command, errorData) => {
        return {
            isError: true,
            code: this.errorCodes[command],
            data: errorData || null,
        };
    };

    sendResponse = (response, header, data) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Request-Method', '*');
        response.setHeader('Access-Control-Allow-Methods', '*');
        response.setHeader('Access-Control-Allow-Headers', '*');
        response.writeHead(200, header);
        response.write(data);
        response.end();
    };

    settingProcessor = async queryArgs => {
        console.log('settingProcessor:', queryArgs);
        const { type, ...values } = JSON.parse(queryArgs);

        switch (type) {
            case 'insertItem': this.insertItem(values);
                break;
            case 'updateItem': this.updateItem(values);
                break;

        }
    };

    insertItem = async queryArgs => {
        console.log('insertItem:', queryArgs);

        switch (queryArgs.button) {
            case 'addItem': await this.settingAddItem(queryArgs.data);
                break;
            case 'updateItem': await this.settingAddItemAll(queryArgs.data);
                break;

        }
    };

    settingAddItem = async (addKeyName, ver = 'version1') => {

        try {
            const [findObject] = await this.dbConnection.execute(`SELECT ${ver},id FROM versions`);
            const data = findObject;
            for (const props of data) {
                let newObj;
                const { id, ...version } = props;
                for (const key in version) {
                    if (version.hasOwnProperty(key)) {
                        const element = JSON.parse(version[key]);
                        element[addKeyName] = '';
                        newObj = element;
                    }
                }
                const json = JSON.stringify(newObj);
                const query = `UPDATE versions SET ${ver} = '${json}' WHERE versions.id = '${id}'`;
                try {
                    const updateRows = await this.dbConnection.execute(query);
                    console.log(updateRows[0].info);
                } catch (err) {
                    return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
                }
            }

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }
    };

    settingAddItemAll = async addKeyName => {

        try {
            const [findObject] = await this.dbConnection.execute(`SELECT * FROM versions`);
            const data = findObject;
            for (const props of data) {
                const { id, name, ...version } = props;
                for (const key in version) {
                    if (version.hasOwnProperty(key)) {
                        const element = JSON.parse(version[key]);
                        element[addKeyName] = '';
                        const json = JSON.stringify(element);
                        const query = `UPDATE versions SET ${key} = '${json}' WHERE versions.id = '${id}'`;
                        try {
                            const updateRows = await this.dbConnection.execute(query);
                            console.log(updateRows[0].info);
                        } catch (err) {
                            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
                        }
                    }
                }
            }


        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }
    };

    updateItem = (data) => {
        console.log('updateItem:', data);
        // изменить значение кнопок
        switch (data.button) {
            case 'addItem': this.settingUpdateItem(data.data);
                break;
            case 'addEverywhere': this.settingUpdateItemAll(data.data);
                break;

        }
    };

    settingUpdateItem = async (data, ver = 'version1') => {
        console.log('settingUpdateItem', data);
        const { oldItem, newItem } = data;
        console.log('oldItem', oldItem);
        console.log('newItem', newItem);
        try {
            const [findObject] = await this.dbConnection.execute(`SELECT ${ver},id FROM versions`);
            const data = findObject;
            for (const props of data) {
                let newObj;
                const { id, ...version } = props;
                for (const key in version) {
                    if (version.hasOwnProperty(key)) {
                        const element = JSON.parse(version[key]);
                        if (!element[oldItem]) {
                            return console.error('ITEM NOT FOUND');
                        }
                        element[newItem] = element[oldItem];
                        delete element[oldItem]
                        newObj = element
                    }
                }
                const json = JSON.stringify(newObj);
                const query = `UPDATE versions SET ${ver} = '${json}' WHERE versions.id = '${id}'`;
                try {
                    const updateRows = await this.dbConnection.execute(query);
                    console.log(updateRows[0].info);
                } catch (err) {
                    return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
                }

            }

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }

        // try {
        //     const [findObject] = await this.dbConnection.execute(`SELECT ${ver},id FROM versions`);
        //     const data = findObject;
        //     for (const props of data) {
        //         let newObj;
        //         const { id, ...version } = props;
        //         for (const key in version) {
        //             if (version.hasOwnProperty(key)) {
        //                 const element = JSON.parse(version[key]);
        //                 element[addKeyName] = '';
        //                 newObj = element;
        //             }
        //         }
        //         const json = JSON.stringify(newObj);
        //         const query = `UPDATE versions SET ${ver} = '${json}' WHERE versions.id = '${id}'`;
        //         try {
        //             const updateRows = await this.dbConnection.execute(query);
        //             console.log(updateRows[0].info);
        //         } catch (err) {
        //             return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        //         }
        //     }

        // } catch (err) {
        //     return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        // }
    }

    settingUpdateItemAll = async data => {
        console.log('settingAddItemAll', data);
        const { oldItem, newItem } = data;
        try {
            const [findObject] = await this.dbConnection.execute(`SELECT * FROM versions`);
            const data = findObject;
            for (const props of data) {
                const { id, name, ...version } = props;
                for (const key in version) {
                    if (version.hasOwnProperty(key)) {
                        const element = JSON.parse(version[key]);

                        if (!element[oldItem]) {
                            return console.error('ITEM NOT FOUND');
                        }
                        element[newItem] = element[oldItem];
                        delete element[oldItem]

                        const json = JSON.stringify(element);
                        const query = `UPDATE versions SET ${key} = '${json}' WHERE versions.id = '${id}'`;
                        try {
                            const updateRows = await this.dbConnection.execute(query);
                            console.log(updateRows[0].info);
                        } catch (err) {
                            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
                        }
                    }
                }
            }


        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }

    }


    userProcessor = async queryArgs => {
        console.log('userProcessor queryArgs:', queryArgs);
        let testQueryResult = null;
        try {
            const [rows] = await this.dbConnection.execute(`SELECT * FROM versions`);
            testQueryResult = rows;
            //console.log(testQueryResult);

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }

        return {
            isError: false,
            data: [...testQueryResult],
        };
    };

    authProcessor = async queryArgs => {
        console.log('queryArgs:', queryArgs);
        const { userName, password } = queryArgs;
        let testQueryResult = null;
        try {
            const [rows] = await this.dbConnection.execute(`SELECT userName FROM users WHERE userName='${userName}'`);
            testQueryResult = rows;
            //console.log(testQueryResult);

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }

        return {
            isError: false,
            data: [...testQueryResult],
        };
    };

    saveProcessor = async queryArgs => {
        console.log('saveProcessor:', queryArgs);

        const data = JSON.parse((queryArgs));
        const { id, ...savedData } = data;
        const saveData = JSON.stringify(savedData);
        let query;

        if (data.type === 'merge') {
            query = `UPDATE versions SET version1='${saveData}',version2='${saveData}', 
            version3='${saveData}',version4='${saveData}' WHERE versions.id = ${id}`
        } else {
            query = `UPDATE versions SET ${data.version} = '${saveData}' WHERE versions.id = '${id}'`;
        }

        try {
            const rows = await this.dbConnection.execute(query);

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }

        this.sendLogsOnEmail(data)

        return {
            isError: false,
            data: true,
        };
    };

    sendLogsOnEmail = async (logs) => {

        if (!logs) {
            console.error(`Failed to send message`);
            return false
        }
        let userEmails;
        try {
            [userEmails] = await this.dbConnection.execute(`SELECT email FROM person_update_email`);

        } catch (err) {
            return this.getErrorResponseObject('sqlError', `${err.code}: ${err.sqlMessage}`);
        }
        const mailers = userEmails.map((mail) => mail.email)
        console.log(mailers);

        const currentData = new Date();

        const mailOptions = {
            from: 'mailercrud@gmail.com',
            to: mailers,
            subject: 'New changes in database',
            html: `<table border="1">
                            <thead>
                                <th>id</th>
                                <th>Name</th>
                                <th>DataVal</th>
                                <th>Val</th>
                                <th>Change value</th>
                                <th>Value</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>${logs.id}</td>
                                <td>root</td>
                                <td>${currentData}</td>
                                <td>Last name</td>
                                <td style="color:green">${logs.name}</td>
                                <td style="color:red">Ivanova</td>
                             </tr>   
                            </tbody>
                            </table>`,
        };

        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

}

//const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;
console.log(`Production status: ${isProduction}.`);

if (isProduction) {
    (async () => {
        const instance = new Server();
        await instance.initialize();
    })();
}

