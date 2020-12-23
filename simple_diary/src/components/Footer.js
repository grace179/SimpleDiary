import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <Contain>
            <h4>&copy; {new Date().getFullYear()}SimpleDiary</h4>
        </Contain>
    );
}

const Contain = styled.div`
    margin-top: 2em;
    text-align: center;
`;

export default Footer;
