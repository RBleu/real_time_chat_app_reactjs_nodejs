import { useNavigate } from 'react-router-dom';

function JoinForm({ username, setUsername }) {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (username) {
            return navigate('/chat');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Join</button>
        </form>
    );
}

export default JoinForm;
