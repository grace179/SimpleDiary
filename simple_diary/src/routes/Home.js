import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fBase';
import styled from 'styled-components';
import Diary from '../components/Diary';
import { v4 as uuidv4} from 'uuid';
import Spinner from '../components/Spinner';

const Home = ({userObj}) => {

    const [diary, setDiary] = useState("");
    const [diarys, setDiarys] = useState([]);
    const [photo, setPhoto] = useState("");
    const [init, setInit] = useState(false);

    useEffect(() => {
        dbService.collection("diarys")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const diarysArray = snapshot.docs.map(doc => ({
                    id : doc.id,
                    ...doc.data(),
                }));
                setDiarys(diarysArray);
            });
        setInit(true);
    }, []);
    // console.log(diarys);    
    const onSubmit = async (event) => {
        event.preventDefault();
        let photoUrl="";
        if(photo !== ""){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(photo, "data_url");
            // console.log(await response.ref.getDownloadURL());
            photoUrl = await response.ref.getDownloadURL();
        }
        
        const newDiary = {
            text: diary,
            createdAt : Date.now(),
            creatorId: userObj.uid,
            photoUrl
        }
        await dbService.collection("diarys").add(newDiary);
        setDiary("");
        setPhoto("")
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setDiary(value);
    };

    const onFileChange = (event) => {
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {currentTarget: {result}} = finishedEvent;
            setPhoto(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearPhoto = () => {
        setPhoto(null);
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <TextInput value={diary} onChange={onChange} 
                type="text" placeholder="How was the day today?" 
                maxLength={200}/>
                <input type="file" accept="image/*" 
                onChange={onFileChange}/>
                
                {photo && 
                    <><br/>
                        <Img src={photo} alt="upload"/>
                        <ClearBtn onClick={onClearPhoto}>Photo Clear</ClearBtn>
                    </>
                }

                <Upload type="submit" value="Upload"
                />
                
            </Form>
                {
                    init ? 

                    (<DiaryContainer>
                    {diarys.map(d => 
                        <Diary 
                        diaryObj={d} 
                        key={d.id}
                        isOwner={d.creatorId === userObj.uid}/>
                    )}
                    </DiaryContainer>):
                    <Spinner/>
                }
        </div>
    );
}

const Form = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`;

const TextInput = styled.input`
    width: 70%;
    padding: 1em;
    margin-bottom: 0.5em;
    border: 2px solid #FADCF3;
    border-radius: 8px;
    font-size: 1em;
    &:focus{
        border: 2px solid #FADC;
        outline: 0 none;
    }
        
    `;

const Img = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 0.5em;
    margin-right:0.5em;
`;

const ClearBtn = styled.button`
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

const Upload = styled.input`
    width: 25%;
    border-radius: 30px;
    padding: 0.7em;
    margin-top: 1em;
    background: #FADCF3;
    border: 2px solid #FADCF3;
    cursor: pointer;
    opacity: 1;
    
    &:hover{
        opacity: 0.7;
    }

    &:focus{
        outline:0 none;}

`;

const DiaryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-height: 700px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 1em auto;
    padding: 4%;
    `;


export default Home;
