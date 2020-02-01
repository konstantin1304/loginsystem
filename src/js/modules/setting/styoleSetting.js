import styled from 'styled-components';

export const ModalHeader = styled.div`
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

export const BtnClose = styled.button`
    border: none;
    background: transparent;
`;

export const IconClose = styled.i`
    font-size: 24px;
`;

export const FormGroup = styled.div`
    padding: 15px;
    text-align: center;
`;

export const FlexContainer= styled.div`
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-top: 10px;
`;

export const BtnContainer = styled.div`
    text-align: center;
    margin-top: 30px;
`;

export const FlexItem = styled.input`
    width: 50%;
    margin-right: 15px;
`;