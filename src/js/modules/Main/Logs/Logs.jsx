import React from 'react';
import PureComponent from '../../../base/PureComponent.jsx';
import { connect } from 'react-redux';
import VersionSetter from '../../VersionSetter/VersionSetter.jsx';
import PropTypes from 'prop-types';
import { setPrevData } from '../../actions/userActions';
import './Logs.css';

import { TableForm } from './styoleLogsCard';

class Logs extends PureComponent {
    static propTypes = {
        userCurrentData: PropTypes.arrayOf(PropTypes.shape()),
        initData: PropTypes.arrayOf(PropTypes.shape()),
        version: PropTypes.string.isRequired,
        setPrevData: PropTypes.func.isRequired,
    };

    static defaultProps = {
        userCurrentData: [],
        initData: [],
    };

    compareUserData = (prevArr, currArr, ver) => {
        let currentObject = {};
        const compareObjects = (previousObject, object, id, name) => {
            const prevObj = JSON.parse(previousObject);
            const obj = JSON.parse(object);
            const changedValObj = { _id: id, _name: name };

            for (let field in prevObj) {
                if (prevObj.hasOwnProperty(field)) {
                    if (prevObj[field] !== obj[field]) {
                        changedValObj[`${field}`] = obj[field];
                    }
                }
            }
            currentObject = changedValObj;
        };

        const oldArr = [];
        for (let i = 0; i < prevArr.length; i++) {
            if (prevArr[i].id === currArr[i].id) {
                if (prevArr[i][`${ver}`] !== currArr[i][`${ver}`]) {
                    compareObjects(prevArr[i][`${ver}`], currArr[i][`${ver}`], prevArr[i].id, prevArr[i].name);
                    const prevObj = JSON.parse(prevArr[i][`${ver}`]);
                    //const changeObj = { ...prevArr[i][`${ver}`] };
                    prevObj.prevValues = currentObject;
                    oldArr.push(prevObj);
                }
            }
        }
        this.props.setPrevData(oldArr);

        //console.log(oldArr);
    };

    render() {
        if (this.props.initData.length && this.props.userCurrentData.length) {
            this.compareUserData(this.props.initData, this.props.userCurrentData, this.props.version);
        }

        return (
            <React.Fragment>
                <VersionSetter />
                <TableForm>
                    <table className='table table-bordered'>
                        <thead>
                        <td>id</td>
                        <td>name</td>
                        <td>data</td>
                        <td>val</td>
                        <td>change value</td>
                        <td>value</td>
                        </thead>
                        <tbody>
                        {this.props.prevArrData.map(dataItem =>
                            <React.Fragment>
                                <tr>
                                    <td rowSpan='4'>{dataItem.prevValues._id}</td>
                                    <td rowSpan='4'>{dataItem.name}</td>
                                    <td rowSpan='4'>DATE</td>
                                    <td rowSpan='4'>{dataItem.prevValues._name}</td>
                                    <td>ver</td>
                                    <td>{dataItem.ver}</td>
                                </tr>
                                <tr>
                                    <td>name</td>
                                    <td>{dataItem.name}</td>
                                </tr>
                                <tr>
                                    <td>last name</td>
                                    <td>{dataItem.lastName}</td>
                                </tr>
                                <tr>
                                    <td>age</td>
                                    <td>{dataItem.age}</td>
                                </tr>
                            </React.Fragment>
                        )}

                        </tbody>
                    </table>
                </TableForm>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        version: state.user.version,
        userCurrentData: state.user.usersData,
        initData: state.user.initData,
        prevArrData: state.user.prevData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPrevData: (data) => dispatch(setPrevData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logs);