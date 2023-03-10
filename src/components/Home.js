import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    


    const setId = (event) => {
        event.preventDefault();
        localStorage.setItem('userId', userId);
        navigate("/chat");
    }
    
    return(
        <div>
            <form onSubmit={(event) => setId(event)}>
                <input 
                    placeholder="Enter user ID to start chatting with your connected peers"
                    onChange={(event) => setUserId(event.target.value)}
                />
            </form>
        </div>
    )
}


export default Home;