import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import moment from 'moment/moment';

const server = 'http://localhost:8000';
const socket = io(server);

function Chat({ username }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            socket.emit('user-connected', username);
        } else {
            return navigate('/');
        }
    }, [username, navigate]);

    function handleSubmit(e) {
        e.preventDefault();

        if (currentMessage) {
            const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
            socket.emit('send-message', {
                message: currentMessage,
                date: currentDate,
            });
            setMessages([
                ...messages,
                {
                    id: socket.id,
                    username: username,
                    message: currentMessage,
                    date: currentDate,
                },
            ]);
        }
    }

    return (
        <div>
            <div className="messages-container">
                {messages.map((m, index) => (
                    <div key={index} className="message-container">
                        <div>{m.message}</div>
                        <div>
                            {m.username} . {m.date}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
