import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({userObj}) => {
    return (
        <nav>
            <ListContainer>
                <li><Link to="/">Home</Link></li>
    <li><Link to="/profile">{userObj.displayName} Profile</Link></li>
            </ListContainer>
        </nav>
    );
}

const ListContainer = styled.ul`
    display:flex;
    justify-content:center;
    padding: 1em 0 ;
    margin: 0;
    margin-bottom: 2em;
    list-style: none;
    font-size: 1em;
    background:#FADCF3;
    cursor: pointer;

    li {
        margin-right: 2em;
        a {
            color: #000;
            text-decoration-line: none;
        }

    }
    li:last-child {
        margin-right: 0;
    }

`;
export default Navigation;
