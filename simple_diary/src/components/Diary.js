import React, { useState } from 'react';
import styled from 'styled-components';
import { dbService, storageService } from '../fBase';

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
    }
    return (
            <Contain>
                {edit ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <TextInput type="text" value={newDiary}
                            onChange={onChange} required/>
                            <br/>
                            <Update type="submit" value="Update"/>
                        </form>
                        <Button onClick={toggleEdit}>Cancel</Button>
                    </>
                ):(
                    <DiaryContain>
                        <Main>

                        <h4>{diaryObj.text}</h4>
                        {isOwner && 
                            <BtnGroup>
                                <Button onClick={onDelete}>Delete</Button>
                                <Button onClick={toggleEdit}>Edit</Button>
                            </BtnGroup>
                        }
                        </Main>
                        {diaryObj.photoUrl && <Photo src={diaryObj.photoUrl}/>}

                    </DiaryContain>
                )}
                
                
            </Contain>
    );
}
const Contain = styled.div`
    height: 80px;
    border: 1px solid #eee;
    margin-bottom: 1em;
    padding: 0.5em;
    position: relative;

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
    justify-content: space-between;

`;

const Main = styled.div`
`;

const BtnGroup = styled.div`
    position: absolute;
    left:0;
    bottom:0;

`;

const Photo = styled.img`
    width: 40%;
    margin-left: 0.5em;
    transition: transform 300ms ease-in;

    &:hover {
        transform: scale(2);
    }
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
        opacity: 0.7;
    }
    &:focus{
        outline:0 none;}
    }

`;

export default Diary;
