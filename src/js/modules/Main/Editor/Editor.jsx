import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PureComponent from '../../../base/PureComponent.jsx';
import EditorCard from './EditorCard/EditorCard.jsx';
import Change from '../Change/Change.jsx';
import { removeCurrentUserData } from '../../actions/userActions';
import './Editor.css';

class Editor extends PureComponent {
    static propTypes = {
        usersData: PropTypes.arrayOf(PropTypes.shape()),
        currentUserData: PropTypes.shape(),
        getAllUsers: PropTypes.func.isRequired,
        removeCurrentUserData: PropTypes.func.isRequired,
    };

    static defaultProps = {
        usersData: [],
        currentUserData: {},
    };

    handleChangeOnClose = () => {
        this.props.removeCurrentUserData();
    };

    render() {
        const { usersData, currentUserData } = this.props;
        const isEmptyUserData = Object.entries(currentUserData).length === 0 && currentUserData.constructor === Object;

        return (
            <React.Fragment>
                {isEmptyUserData ? usersData.map(userData =>
                    <EditorCard key={userData.id}
                                user={userData}
                    />) : <Change handleChangeOnClose={this.handleChangeOnClose} user={currentUserData}/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.user.usersData,
        currentUserData: state.user.currentUserData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCurrentUserData: () => dispatch(removeCurrentUserData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);