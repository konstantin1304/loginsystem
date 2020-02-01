import React from 'react';
import PureComponent from '../../base/PureComponent.jsx';
import './registration.css';
import Service from '../service/service';

import { RegistrationForm, LabelForm, ButtonForm, AlertForm} from './styleRegistration';

export default class Registration extends PureComponent {

    service = new Service();

    render() {
        const { authenticationUser, errorAuth } = this.props;

        return (
            <RegistrationForm>
                <form onSubmit={authenticationUser}>
                    <LabelForm>Data Base</LabelForm>
                    <input className='form-control' type='text' name='db'value='logssystem' />

                    <LabelForm>Table</LabelForm>
                    <input className='form-control' type='text' name='table' value='logs'/>

                    <LabelForm>User</LabelForm>
                    <input className='form-control' type='text' name='userName' />

                    <LabelForm>Password</LabelForm>
                    <input className='form-control' type='password' name='password'/>

                    <ButtonForm>Connect</ButtonForm>
                </form>
                { errorAuth &&
                    <div class="alert alert-danger" role="alert">
                    {errorAuth}
                </div>
                }
                
            </RegistrationForm>
        );
    }
}