import { Component } from 'react';

import { deepEqual } from './../utils/deepEqual';

export default class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let isEqual = deepEqual(nextProps, this.props);
        isEqual = isEqual && deepEqual(nextState, this.state);
        isEqual = isEqual && deepEqual(nextContext, this.context);
        return !isEqual;
    }
}
