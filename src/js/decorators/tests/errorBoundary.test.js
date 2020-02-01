import React from 'react';
import ErrorBoundary, { getDisplayName } from '../ErrorBoundary.jsx';

describe('ErrorBoundary decorator', () => {
    const ReactComposedComponent = {
        displayName: 'ComposedComponent',
        name: 'Component',
    };
    const className = 'test-class-name';
    const ComposedComponent = () => (<div className={`${className}`}>test</div>);
    const Component = ErrorBoundary(ComposedComponent);

    it('snapshot should render correctly', () => {
        const errorBoundary = shallow(
            <Component />
        );
        expect(errorBoundary).matchSnapshot();
    });

    it('componentDidCatch should call function setState()', () => {
        const errorBoundary = shallow(
            <Component />
        );
        const setState = sinon.spy(errorBoundary.instance(), 'setState');
        errorBoundary.instance().componentDidCatch(true);
        assert.equal(setState.called, true);
    });

    it('componentDidCatch render with error state', () => {
        const errorBoundary = shallow(
            <Component />
        );

        const error = 'type of error';
        errorBoundary.instance().setState({
            hasError: true,
            error,
        });
        const res = errorBoundary.instance().getBody();
        assert.equal(res.props.className, 'error-boundary');
        assert.equal(res.props.children, `ErrorBoundary(ComposedComponent): ${error}`);
    });

    it('componentDidCatch render with ComposedComponent', () => {
        const errorBoundary = shallow(
            <Component />
        );
        errorBoundary.instance().setState({
            hasError: false
        });
        const res = errorBoundary.instance().getBody();
        assert.equal(res.type, ComposedComponent);
    });

    it('getDisplayName should return displayName of ComposedComponent', () => {
        assert.strictEqual(getDisplayName(ReactComposedComponent), 'ComposedComponent');
    });

    it('getDisplayName should return displayName of ComposedComponent', () => {
        delete ReactComposedComponent.displayName;
        assert.strictEqual(getDisplayName(ReactComposedComponent), 'Component');
    });

    it('getDisplayName should return displayName of ComposedComponent', () => {
        delete ReactComposedComponent.name;
        assert.strictEqual(getDisplayName(ReactComposedComponent), 'NameLessComponent');
    });
});
