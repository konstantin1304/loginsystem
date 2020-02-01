import { deepEqual } from '../deepEqual';

const mockObjectFirst = {
    string: 'AAA',
    fun: () => {},
    obj: {
        string: 'test',
        obj: {},
        array: [ 1, 2, { a: 1, b: {} }]
    },
};

const mockObjectSecond = {
    string: 'BBB',
    fun: () => {},
    obj: {
        string: 'test2',
        obj: {},
    },
};

describe('deepEqual()', () => {
    it('two similar obj', () => {
        const act = deepEqual(mockObjectFirst, { ...mockObjectFirst });
        
        const exp = true;
        assert.equal(act, exp);
    });
    it('links on object', () => {
        const linkObj = mockObjectFirst;
        
        const act = deepEqual(mockObjectFirst, linkObj);
        
        const exp = true;
        assert.equal(act, exp);
    });
    it('two different obj', () => {
        const act = deepEqual(mockObjectFirst, mockObjectSecond);
        
        const exp = false;
        assert.equal(act, exp);
    });
    it('no first arg', () => {
        const act = deepEqual(undefined, mockObjectSecond);
        
        const exp = false;
        assert.equal(act, exp);
    });
    it('no second arg', () => {
        const act = deepEqual(mockObjectFirst);
        
        const exp = false;
        assert.equal(act, exp);
    });
    it('no args', () => {
        const act = deepEqual();
        
        const exp = true;
        assert.equal(act, exp);
    });
    it('two similar primitive vars', () => {
        const act = deepEqual('test', 'test');
        
        const exp = true;
        assert.equal(act, exp);
    });
    it('two links primitive vars', () => {
        const str = 'test';
        const linkStr = 'test';
        
        const act = deepEqual(str, linkStr);
        
        const exp = true;
        assert.equal(act, exp);
    });
    it('two different primitive vars', () => {
        const act = deepEqual('test', 1);
        
        const exp = false;
        assert.equal(act, exp);
    });
});
