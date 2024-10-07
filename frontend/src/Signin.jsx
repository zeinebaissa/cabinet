import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from "./assets/login.jpg";

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const valid = async (e) => {
        e.preventDefault();

        try {
            console.log('Attempting to fetch user data from backend...');
            const response = await fetch('http://localhost:1500/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Data from backend:', data);

            const user = data.find(user => user.username === username && user.password === password);
            console.log('User found:', user);

            if (user) {
                if (user.role === "medecin") {
                    navigate('/medecin/dashboard');
                } else if (user.role === "secretaire") {
                    navigate('/secretaire/dashboard');
                } else {
                    setError('Invalid role for the user');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(`Error occurred: ${error.message}`);
        }
    };

    const styles = {
        signinContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative',
            backgroundImage: `url(${back})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        signinFormContainer: {

            padding: '20px',
            borderRadius: '10px',

        },
        signinHeading: {
            marginBottom: '20px',
            color: '#333',
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
        },
        signinForm: {
            display: 'flex',
            flexDirection: 'column',
        },
        inputContainer: {
            marginBottom: '20px',
        },
        label: {
            color: '#000',
            marginBottom: '5px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        input: {
            width: '350px',
            padding: '10px',
            border: '2px solid #000',
            borderRadius: '5px',
        },
        errorMessage: {
            color: 'red',
            marginTop: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.signinContainer}>
            <div style={styles.signinFormContainer}>
                <h2 style={styles.signinHeading}>Se connecter</h2>
                <form style={styles.signinForm} onSubmit={valid}>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="username">Nom d'utilisateur:</label><br />
                        <input style={styles.input} type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div style={styles.inputContainer}>
                        <label style={styles.label} htmlFor="password">Mot de passe:</label><br />
                        <input style={styles.input} type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" type="submit">Se connecter</button>
                </form>
                {error && <div style={styles.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};

export default Signin;
