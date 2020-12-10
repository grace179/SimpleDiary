import React, { useState, useEffect } from 'react';
import { dbService } from '../fBase';
import styled from 'styled-components';
import Diary from '../components/Diary';

const Home = ({userObj}) => {

    const [diary, setDiary] = useState("");
    const [diarys, setDiarys] = useState([]);
    
    useEffect(() => {
        dbService.collection("diarys").onSnapshot((snapshot) => {
            const diarysArray = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data(),
            }));
            setDiarys(diarysArray);
        });

    }, []);
    // console.log(diarys);    
    const onSubmit = async (event) => {
        event.preventDefault();

        await dbService.collection("diarys").add({
            text: diary,
            createdAt : Date.now(),
            creatorId: userObj.uid,

        });
        setDiary("");
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setDiary(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <TextInput value={diary} onChange={onChange} 
                type="text" placeholder="How was the day today?" 
                maxLength={200}/>
                <Upload type="submit" value="Upload"/>
            </form>

            <DiaryContainer>
                {diarys.map(d => 
                    <Diary 
                    diaryObj={d} 
                    key={d.id}
                    isOwner={d.creatorId === userObj.uid}/>
                )}
            </DiaryContainer>
        </div>
    );
}

const TextInput = styled.input`
    width: 70%;
    padding: 1em;
    border: 2px solid #FADCF3;
    border-radius: 4px;
    &:focus{
        border: 2px solid #FADC;
        outline: 0 none;
    }
        
    `;

const Upload = styled.input`
    width: 25%;
    border-radius: 30px;
    padding: 0.7em;
    margin-top: 1em;
    background: #FADCF3;
    border: 2px solid #FADCF3;
    cursor: pointer;

    &:hover{
        background: #fff;
        border: 2px solid #FADCF3;
    }
    &:focus{
        outline:0 none;}

`;

const DiaryContainer = styled.div`
    max-height: 400px;
    overflow-y: auto;
    margin-top: 1em;
`;


export default Home;
