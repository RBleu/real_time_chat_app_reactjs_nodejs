import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import JoinForm from './JoinForm';
import Chat from './Chat';

function App() {
    const [username, setUsername] = useState('');

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact
                    element={
                        <JoinForm
                            username={username}
                            setUsername={setUsername}
                        />
                    }
                />
                <Route path="/chat" element={<Chat username={username} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
