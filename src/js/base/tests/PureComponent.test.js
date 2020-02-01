import PureComponent from '../PureComponent.jsx';

const mockObjectFirst = {
    string: 'AUD',
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

describe('PureComponent tests', () => {
    const Component = new PureComponent(mockObjectFirst);

    it('two similar obj', () => {
        const data = { ...mockObjectFirst };
        assert.equal(Component.shouldComponentUpdate(data), false);
    });

/*    it('links on object', () => {
        assert.equal(Component.shouldComponentUpdate(mockObjectFirst), false);
    });

    it('two different obj', () => {
        assert.equal(Component.shouldComponentUpdate(mockObjectSecond), true);
    });

    it('no prev props arg', () => {
        Component.props = null;
        assert.equal(Component.shouldComponentUpdate(mockObjectSecond), true);
    });

    it('no prev and next props', () => {
        Component.props = null;
        assert.equal(Component.shouldComponentUpdate(), true);
    });

    it('no next props arg', () => {
        Component.props = mockObjectFirst;
        assert.equal(Component.shouldComponentUpdate(null), true);
    });*/
});
