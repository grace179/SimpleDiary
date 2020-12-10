import React, { useState } from 'react';
import { dbService } from '../fBase';

const Home = () => {

    const [diary, setDiary] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("diarys").add({
            text: diary,
            createdAt : Date.now(),

        });
        setDiary("");
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setDiary(value);

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={diary} onChange={onChange} 
                type="text" placeholder="write" maxLength={200}/>
                <input type="submit" value="Upload"/>
            </form>
        </div>
    );
}

export default Home;
