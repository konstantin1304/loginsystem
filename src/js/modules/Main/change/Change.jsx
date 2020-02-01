import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadData, saveData, setVersion, setVersionData} from '../../actions/userActions';
import PureComponent from '../../../base/PureComponent.jsx';
import ChangeField from './ChangeField.jsx';
import VersionSetter from '../../VersionSetter/VersionSetter.jsx';
import './Change.css';

import { ChangeItem, ButtonForm } from './styoleChange';

class Change extends PureComponent {
    static propTypes = {
        user: PropTypes.shape(),
        handleChangeOnClose: PropTypes.func.isRequired,
        saveUserData: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        setVersion: PropTypes.func.isRequired,
        setVersionData: PropTypes.func.isRequired,
        version: PropTypes.string.isRequired,
        userData: PropTypes.shape().isRequired,
    };

    static defaultProps = {
        user: {},
    };

    componentDidMount() {
        const {user} = this.props;
        localStorage.setItem('prevData', JSON.stringify(user));
        this.setCurrentVersion();
    }

    componentDidUpdate(prevProps) {
        const {version} = this.props;
        if (prevProps.version !== version) {
            this.setCurrentVersion();
        }
    }

    setCurrentVersion = () => {
        const { user, version } = this.props;
        const versionData = JSON.parse(user[version]);
        this.props.setVersionData(versionData);
    };

    handleOnSave = () => {
        const {handleChangeOnClose, getAllUsers, saveUserData} = this.props;
        const prevObj = JSON.parse(localStorage["prevData"]);
        const userData = {...this.props.userData};
        userData.version = this.props.version;
        userData.type = 'save';
        userData.id = prevObj.id;
        saveUserData(userData);
        handleChangeOnClose();
        getAllUsers();
    };

    handleOnSaveAndMerge = () => {
        const {handleChangeOnClose, saveUserData} = this.props;
        const prevObj = JSON.parse(localStorage['prevData']);
        const userData = {...this.props.userData};
        userData.id = prevObj.id;
        userData.type = 'merge';
        saveUserData(userData, 'save');
        handleChangeOnClose();
    };

    getCurrentValues = (fieldName, value) => {
        const changedUserData = {...this.props.userData};
        changedUserData[fieldName] = value;
        this.props.setVersionData(changedUserData);
    };

    render() {
        const {handleChangeOnClose, userData} = this.props;
        const isEmptyUserData = Object.entries(userData).length === 0 && userData.constructor === Object;
        return (
            <React.Fragment>
                <VersionSetter />
                <div className='change'>
                    {!isEmptyUserData && <ChangeField userData={userData} getCurrentValues={this.getCurrentValues}/>}
                </div>
                <ChangeItem>
                    <ButtonForm onClick={this.handleOnSave}>Save</ButtonForm>
                    <ButtonForm onClick={this.handleOnSaveAndMerge}>Save & Merge</ButtonForm>
                    <ButtonForm onClick={handleChangeOnClose}>Cancel</ButtonForm>
                </ChangeItem>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        version: state.user.version,
        userData: state.user.versionData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(loadData()),
        saveUserData: (data) => dispatch(saveData(data)),
        setVersion: (data) => dispatch(setVersion(data)),
        setVersionData: (data) => dispatch(setVersionData(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Change);