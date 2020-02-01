import React from "react";
import PureComponent from "../../../base/PureComponent.jsx";

import { ChangeItem, ChangeItemLabel, ChangeItemTextarea, TextAreaOne } from './styoleChange';


export default class ChangeField extends PureComponent {

    state = {
        objectFields: []
    };

    handleOnChangeArea = (e, fieldName) => {
       this.props.getCurrentValues(fieldName, e.target.value);
    };

    componentDidUpdate(prevProps){
        const {userData} = this.props;
        if(prevProps.userData !== userData){
            this.setState({ objectFields: Object.keys(userData)});
        }
    }

    render() {
        const {userData} = this.props;
        const currentArr = Object.entries(userData);
        return (
            <React.Fragment>
                {currentArr.map(item =>
                <ChangeItem>
                    <ChangeItemLabel>{item[0]}</ChangeItemLabel>
                    <ChangeItemTextarea value={item[1]}
                              onChange={(e) =>
                                  this.handleOnChangeArea(e, item[0])}/>
                </ChangeItem>)}
            </React.Fragment>
        );
    }
}