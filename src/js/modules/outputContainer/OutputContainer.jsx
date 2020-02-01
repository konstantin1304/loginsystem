import React from 'react';
import PropTypes from 'prop-types';
import PureComponent from '../../base/PureComponent.jsx';
import Editor from '../main/Editor/Editor.jsx';
import Logs from '../main/Logs/Logs.jsx';
import { loadData, loadInitData } from '../actions/userActions';
import { connect } from 'react-redux';
import Setting from "../setting/setting.jsx";

import './OutputContainer.css';
import {
    OutputContainerOne,
    Navigation,
    NavigationTagLogout,
} from './styleOutputContainer';

class OutputContainer extends PureComponent {
    static propTypes = {
        getAllUsers: PropTypes.func.isRequired,
        getInitData: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    state = {
        isEditor: true,
        isLogs: false,
        adf: false,
        isSetting: false,
    };

    componentDidMount() {
        this.props.getInitData();
        this.props.getAllUsers();
    }

    handlerEditorOnClick = () => {
        this.setState({ isEditor: true, isLogs: false, isSetting: false });
    };
    handlerLogsOnClick = () => {
        this.setState({ isLogs: true, isEditor: false, isSetting: false });
    };
    handlerSettingOnClick = () => {
        this.setState({ isSetting: true });
    };
    onCloseModal = () => {
        this.setState({ isSetting: false });
    };

    render() {
        const {isEditor, isLogs, isSetting} = this.state;
        const {logout} = this.props;
        return (
            <OutputContainerOne>
                <Navigation>
                    <div className={!isEditor ? `Navigation__tag` : 'Navigation__tag active'}
                         onClick={this.handlerEditorOnClick}>EDITOR
                    </div>
                    <div className={!isSetting ? `Navigation__tag` : 'Navigation__tag active'}
                         onClick={this.handlerSettingOnClick}>Settings
                    </div>
                    <div className={!isLogs ? `Navigation__tag` : 'Navigation__tag active'}
                         onClick={this.handlerLogsOnClick}>LOGS
                    </div>
                    <NavigationTagLogout onClick={logout}>
                        LOGOUT
                    </NavigationTagLogout>
                </Navigation>
                {isEditor && <Editor/>}
                {isLogs && <Logs/>}
                {isSetting &&
                <Setting
                    isOpen={isSetting}
                    closeModal={this.onCloseModal}
                />
                }
            </OutputContainerOne>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(loadData()),
        getInitData: (data) => dispatch(loadInitData(data)),
    };
};

export default connect(null, mapDispatchToProps)(OutputContainer);