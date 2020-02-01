import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PureComponent from '../../../../base/PureComponent.jsx';
import { setCurrentUserData } from '../../../actions/userActions';
import './EditorCard.css';

import { EditorCardOne, EditorCardContainer } from './styleEditorCard';

class EditorCard extends PureComponent {
    static propTypes = {
        setCurrentUser: PropTypes.func.isRequired,
        user: PropTypes.shape().isRequired,
    };

    handleChangeUserData = () => {
        const { setCurrentUser } = this.props;
        setCurrentUser();
    };

    render() {
        const { user } = this.props;
        return (
            <EditorCardOne>
                <EditorCardContainer>
                    <div className='EditorCard__name-content'>{user.name}</div>
                    <button className='EditorCard__name-content' onClick={this.handleChangeUserData}>Change</button>
                </EditorCardContainer>
            </EditorCardOne>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentUser: () => dispatch(setCurrentUserData(ownProps.user)),
    };
};

export default connect(null, mapDispatchToProps)(EditorCard);