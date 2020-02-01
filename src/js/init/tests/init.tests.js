import { setFavIcon } from '../init';

describe('init setFavIcon', () => {
    it('setFavIcon should set correct icon', () => {
        setFavIcon('test.png');
        const node = document.head.querySelector('link');
        const href = node.href;
        const rel = node.rel;

        const expectHref = 'test.png';
        const expectRel = 'icon';
        assert.strictEqual(href, expectHref);
        assert.strictEqual(rel, expectRel);
    });

    it('setFavIcon should return false on invalid source', () => {
        const actual = setFavIcon(null);
        assert.isFalse(actual);
    });
});