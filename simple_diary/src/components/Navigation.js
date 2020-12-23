import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';


const Navigation = ({userObj}) => {
    return (
        <nav>
            <ListContainer>
                <li><Link to="/">
                    <FontAwesomeIcon icon={faBook} style={{marginRight:"0.5em"}}/>
                    Home
                </Link></li>
                <li><Link to="/profile">
                    <FontAwesomeIcon icon={faUserAlt} style={{marginRight:"0.5em"}}/>
                    {userObj.displayName}의 Profile</Link></li>
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

    li {
        padding: 0.5em;
        margin-right: 2em;
        cursor: pointer;

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
