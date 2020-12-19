import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({userObj}) => {
    return (
        <nav>
            <ListContainer>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">{userObj.displayName}의 Profile</Link></li>
            </ListContainer>
        </nav>
    );
}

const ListContainer = styled.ul`
    display:flex;
    justify-content: space-around;
    width: 100%;
    padding: 1em 0 ;
    margin: 0;
    margin-bottom: 2em;
    list-style: none;
    font-size: 1em;
    font-weight: 600;
    border-bottom: 1px solid #FADCF3;
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
