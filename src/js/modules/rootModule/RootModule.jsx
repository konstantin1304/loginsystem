import React from 'react';
import PureComponent from '../../base/PureComponent.jsx';
import './RootModule.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from '../Registration/Registration.jsx';
import OutputContainer from '../OutputContainer/OutputContainer.jsx';
import { MainWindow } from './styleRoot';

//@ErrorBoundary
 class RootModule extends PureComponent {
    state = {
        auth: {
            isAuth: false,
            userName: undefined,
            password: undefined,
            error: undefined,
        },
    };

    componentDidMount() {
        const isAuth = localStorage.isAuth;
        if (isAuth === 'true') {
            this.setState({
                auth: {
                    isAuth: true,
                },
            });
        }
    }

    authentication = async (e) => {
        e.preventDefault();
        const { userName, password } = e.target.elements;
        const api_url = await fetch(`http://localhost:1010/auth?userName=${userName.value}&password=${password.value} `);
        const res = await api_url.json();

        if (res.data.length) {
            this.setState({
                auth: {
                    isAuth: true,
                    userName: userName,
                    password: password,
                },
            });
            localStorage.isAuth = this.state.auth.isAuth;
        } else {
            this.setState({
                auth: {
                    error: 'Пользователь не найден',
                },
            });
        }
    }

    logoutHandler = () => {
        this.setState({
            auth: {
                isAuth: false,
                userName: undefined,
                password: undefined,
                error: undefined,
            },
        });
        localStorage.removeItem('isAuth');
    };

    render() {
        const { auth } = this.state;
        return (
            <Router>
                <MainWindow>
                    {auth.isAuth &&
                        <OutputContainer
                            logout={this.logoutHandler}
                        />
                    }
                    {!auth.isAuth &&
                        <Registration
                            authenticationUser={this.authentication}
                            errorAuth={auth.error}
                        />
                    }
                </MainWindow>
            </Router>
        );
    }
}

export default RootModule;
