import React from 'react';
import PureComponent from "../../../../base/PureComponent.jsx";
import './LogsCard.css';

export default class Editor extends PureComponent {

    render() {

        // const getLocal = localStorage.getItem('prevData', JSON.parse(user));
        // console.log(getLocal)
        //
        // Service.getAllUsers().then((p) => {
        //     p.forEach((us) => {
        //         console.info('Мой вывод: ', us.version1);
        //         const unParse = JSON.parse(us.version1);
        //         console.info('Распарсил: ', unParse);
        //         const {name, lastName, age} = unParse;
        //         console.info(`Каждый чел: ${name} ${lastName} ${age}`)
        //     });
        //
        // });


        return (
            <div>
                <table className='table table-bordered'>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>data</td>
                        <td>val</td>
                        <td>change value</td>
                        <td>value</td>
                    </tr>
                    <tr>
                        <td rowSpan="4">айди</td>
                        <td rowSpan="4">нейм</td>
                        <td rowSpan="4">дата</td>
                        <td rowSpan="4">вал</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}