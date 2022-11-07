import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import moment from 'moment/moment';

const server = 'http://localhost:8000';
const socket = io(server);

function Chat({ username }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            socket.emit('user-connected', username);
        } else {
            return navigate('/');
        }

        socket.on('send-message', (data) => {
            setMessages([...messages, data]);
        });

        return () => {
            socket.off('send-message');
        };
    }, [username, navigate, messages, setMessages]);

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
                    username: username,
                    message: currentMessage,
                    date: currentDate,
                    isYourMessage: true,
                },
            ]);
            messageRef.current.value = '';
        }
    }

    return (
        <div>
            <div className="messages-container">
                {messages.map((m, index) => (
                    <div
                        key={index}
                        className={
                            m.isYourMessage
                                ? 'message-container your-message'
                                : 'message-container'
                        }
                    >
                        <div className="message-content">{m.message}</div>
                        <div>
                            {m.username} . {m.date}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="send-message">
                <input
                    type="text"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    id="current-message"
                    ref={messageRef}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
