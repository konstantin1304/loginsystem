import React from 'react';
import PureComponent from '../../base/PureComponent.jsx';
import { setVersion } from '../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

 class VersionSetter extends PureComponent {
     static propTypes = {
         setVersion: PropTypes.func.isRequired,
     };
     componentDidMount() {
         this.props.setVersion('version1');
     }

     changeVersion = event => {
        const version = event.target.value;
        this.props.setVersion(version);
    };

    render() {
        return (
            <select onChange={this.changeVersion}>
                <option defaultValue value='version1'>Version 1</option>
                <option value='version2'>Version 2</option>
                <option value='version3'>Version 3</option>
                <option value='version4'>Version 4</option>
            </select>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVersion: (data) => dispatch(setVersion(data)),

    };
};

export default connect(null, mapDispatchToProps)(VersionSetter);