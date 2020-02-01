import React, { Component, Fragment } from 'react';

const ErrorBoundary = (ComposedComponent) => {
    class WrapperComponent extends Component {
        args = ComposedComponent;
        state = {
            hasError: false,
            error: '',
        };

        componentDidCatch(error) {
            this.setState({
                hasError: true,
                error: error,
            });

            console.warn(error);
        }

        getBody() {
            const { hasError, error } = this.state;

            return (
                !hasError ?
                    <ComposedComponent { ...this.props } /> :
                    <div className='error-boundary' style={ { color: 'red' } }>
                        {`${getDisplayName(WrapperComponent)}: ${error.toString()}`}
                    </div>
            );
        }

        render() {
            return (
                <Fragment>
                    { this.getBody() }
                </Fragment>
            );
        }
    }

    WrapperComponent.displayName = `ErrorBoundary(${getDisplayName(ComposedComponent)})`;
    return WrapperComponent;
};

export function getDisplayName(ComposedComponent) {
    return ComposedComponent.displayName ? ComposedComponent.displayName : (ComposedComponent.name ? ComposedComponent.name : 'NameLessComponent');
}

export default ErrorBoundary;

