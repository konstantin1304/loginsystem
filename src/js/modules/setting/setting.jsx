import React from 'react';
import {connect} from 'react-redux';
import PureComponent from '../../base/PureComponent.jsx';
import Modal from 'react-modal';
import './setting.css';

import {ModalHeader, BtnClose, IconClose, FormGroup, FlexContainer, BtnContainer, FlexItem} from './styoleSetting';
import {addNewField, updateField} from '../actions/fieldsActions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
    },
};

Modal.setAppElement('#modal');
class Setting extends PureComponent {
    addingFieldInput = React.createRef();
    oldFieldInput = React.createRef();
    newFieldInput = React.createRef();
    handlerSetFieldOnVersion = (e) => {
        e.preventDefault();
        const { setNewField } = this.props;
        const request = {
            type: 'insertItem',
            button: 'addItem',
            data: this.addingFieldInput.current.value
        };
        setNewField(request);
    };

    handlerSetAllFields = (e) => {
        e.preventDefault();
        const { setNewField } = this.props;
        const request = {
            type: 'insertItem',
            button: 'addEverywhere',
            data: this.addingFieldInput.current.value
        };
        setNewField(request);
    };

    handlerUpdateField = (e) => {
        const { changeFieldName } = this.props;
        e.preventDefault();
        const request = {
            type: 'updateItem',
            button: 'addItem',
            data: {
                oldItem: this.oldFieldInput.current.value,
                newItem: this.newFieldInput.current.value,
            }
        };
        changeFieldName(request);
    };

    handlerUpdateAllFields = (e) => {
        e.preventDefault();
        const { setNewField } = this.props;
        const request = {
            type: 'updateItem',
            button: 'addEverywhere',
            data: {
                oldItem: this.oldFieldInput.current.value,
                newItem: this.newFieldInput.current.value,
            }
        };
        debugger;
        setNewField(request);
    };

    render() {
        const {onLabelChangeSettingAdd, clickUpdateItem, addItem, isOpen, closeModal, changeOldItem, changeNewItem} = this.props;
        return (
            <Modal
                isOpen={isOpen}
                onAfterOpen={() => console.log('Open modal Window')}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel='Modal Window'
            >
                <ModalHeader>
                    Settings
                    <BtnClose onClick={closeModal}><IconClose>&times;</IconClose></BtnClose>
                </ModalHeader>

                <FormGroup>
                    <form>
                        <label>Add Field</label>
                        <input ref={this.addingFieldInput} className='form-control' type='text'/>
                        <FlexContainer>
                            <button className='btn btn-primary modal__button' onClick={this.handlerSetFieldOnVersion}>add to current env</button>
                            <button className='btn btn-primary modal__button'  onClick={this.handlerSetAllFields}>add everywhere</button>
                        </FlexContainer>
                    </form>

                    <form>
                        <label>Edit field</label>
                        <FlexContainer>
                            <input ref={this.oldFieldInput} className='form-control flex-item' type='text' name='oldItem'
                                   />
                            <input ref={this.newFieldInput} className='form-control flex-item' type='text' name='newItem'
                                  />
                        </FlexContainer>
                        <FlexContainer>
                            <button className='btn btn-primary modal__button'  onClick={this.handlerUpdateField} >add to current env
                            </button>
                            <button className='btn btn-primary modal__button'  onClick={this.handlerUpdateAllFields} >add everywhere
                            </button>
                        </FlexContainer>
                    </form>

                    <form className=''>
                        <label>Delete field</label>
                        <input className='form-control' type='text' name='deleteKey'/>
                        <FlexContainer>
                            <button className='btn btn-primary modal__button'>add to current env</button>
                            <button className='btn btn-primary modal__button'>add everywhere</button>
                        </FlexContainer>
                    </form>

                    <BtnContainer>
                        <button className='btn btn-close--big' onClick={closeModal}>Close</button>
                    </BtnContainer>
                </FormGroup>
            </Modal>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNewField: (data) => dispatch(addNewField(data)),
        changeFieldName: (data) => dispatch(updateField(data)),
    };
};

export default connect(null, mapDispatchToProps)(Setting)