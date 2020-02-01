import styled from 'styled-components';

export const OutputContainerOne = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Navigation = styled.div`
    display: flex;
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
`;

export const NavigationTagLogout = styled.div`
    padding: 6px;
    text-align: center;
    background: orangered;
    color: white;
    width: 20%;
    text-decoration: none;
    border-radius: 0 4px 0 0;
`;

export const NavigationTag = styled.div`
    padding-top: 6px;
    text-align: center;
    background: gainsboro;
    width: 40%;
`;

export const NavigationTagActive = styled.div`
    padding-top: 6px;
    text-align: center;
    background: darkgray;
    width: 40%;
`;