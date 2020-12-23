import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPen} from '@fortawesome/free-solid-svg-icons';


const Diary = ({diaryObj,isOwner}) => {
    const [edit, setEdit] = useState(false);
    const [newDiary, setNewDiary] = useState(diaryObj.text);

    const onDelete = async () => {
        const ok = window.confirm("Are you sure want to delete?");
        if(ok){
            // delete diary
            await dbService.doc(`diarys/${diaryObj.id}`).delete();
            await storageService.refFromURL(diaryObj.photoUrl).delete();
        }
    };

    const toggleEdit = () => setEdit((prev) => !prev);    

    const onSubmit = async (event)=>{
        event.preventDefault();
        // console.log(diaryObj,newDiary);
        await dbService.doc(`diarys/${diaryObj.id}`).update({
            text: newDiary,
        });
        setEdit(false);
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDiary(value);
    };

    const time = new Date(diaryObj.createdAt);
    const createTime = time.toDateString();

    return (
            <Contain>
                <Time>{createTime}</Time>
                {edit ? (
                    <EditContain>
                        <form onSubmit={onSubmit}>
                            <TextInput type="text" value={newDiary}
                            onChange={onChange} required/>
                            <br/>
                            <Update type="submit" value="Update"/>
                        </form>
                        <Button onClick={toggleEdit}>Cancel</Button>
                    </EditContain>
                ):(
                    <DiaryContain>
                        {diaryObj.photoUrl && <Photo src={diaryObj.photoUrl}/>}

                        <Main>

                        <h5>{diaryObj.text}</h5>
                        {isOwner && 
                            <BtnGroup>
                                <Button onClick={onDelete}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                                <Button onClick={toggleEdit}>
                                    <FontAwesomeIcon icon={faPen}/>
                                </Button>
                            </BtnGroup>
                        }
                        </Main>

                    </DiaryContain>
                )}
            </Contain>
    );
}
const Contain = styled.div`
    width: 30%;
    border: 1px solid #ddd;
    box-sizing: border-box;
    margin: 0.5em;
    padding: 0.4em;
    padding-top: 0;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

const EditContain = styled.div`
    margin-top: 20%;
`;

const TextInput = styled.input`
    width: 70%;
    padding: 0.5em;
    margin-bottom: 0.5em;
    border: 2px solid #FADCF3;
    border-radius: 4px;
    &:focus{
        border: 2px solid #FADC;
        outline: 0 none;
    }
        
    `;
const DiaryContain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Main = styled.div`
`;

const BtnGroup = styled.div`
    position: absolute;
    left:0;
    bottom:0;

`;

const Photo = styled.img`
    width: 90%;
`;
const Update = styled.input`
    display: inline-block;
    font-weight: 500;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 1;

    &:hover{
        opacity: 0.7;
    }
    &:focus{
        outline:0 none;}

`;

const Button = styled.button`
    font-weight: 500;
    background: transparent;
    border: none;
    cursor: pointer;
    opacity: 1;

    &:hover{
        opacity: 0.6;
    }
    &:focus{
        outline:0 none;}
    }

`;

const Time = styled.h4`
    padding-bottom: 0.5em;
    border-bottom: 1px solid #dedede;
`;
export default Diary;
