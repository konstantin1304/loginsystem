import Server from '../server';

describe('CookBookServer tests', () => {
    describe('mock', () => {
        it('mock test', () => {
            const instance = new Server();

            assert.isTrue(instance instanceof Server);
        });
    });
});