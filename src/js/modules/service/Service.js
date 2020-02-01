export default class Service {

    _apiBase = 'http://localhost:1010/';

    async getResource(url) {
        console.info(`${this._apiBase}${url}`);

        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllUsers() {
        const res = await this.getResource(`users`);
        return res.data;
    }

    async getUser(arg) {
        const res = await this.getResource(`users`);
        return res.data[arg];
    }

    async saveUser(data = {}, url, query = '') {
        console.log(`${this._apiBase}${url}?${query}`);

        try {
            fetch(`${this._apiBase}${url}?${query}`, {
                    method: 'POST',
                    body: JSON.stringify(data)
                }
            )
            console.log('Успех:', JSON.stringify(data));
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

    async settingUi(data = {}) {
        console.log(`${this._apiBase}setting`);

        try {
            fetch(`${this._apiBase}setting`, {
                    method: 'POST',
                    mode:'no-cors',
                    body: JSON.stringify(data)
                }
            )
            console.log('Успех:', JSON.stringify(data));
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

}
