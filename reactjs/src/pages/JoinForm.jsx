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
            <p>Choose Your Username :</p>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="false"
                placeholder="Username"
            />
            <button type="submit">Join</button>
        </form>
    );
}

export default JoinForm;
