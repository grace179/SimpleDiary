import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
    return (
        <Contain>
            <FontAwesomeIcon icon={faSpinner} pulse size="5x"/> 
        </Contain>
    );
}

const Contain = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ddd;
`;
export default Spinner;
