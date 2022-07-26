import {useState} from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitForm = async (event) => {
        event.preventDefault()
        // requête axios post pour envoyez les données à l'api axios.post("url", {email: email, password: password})

    }

    return (
        <div className="login">
            <h1> Connexion </h1>
            <form onSubmit={submitForm}>
                <label htmlFor="email">Saisissez votre email:</label>
                <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Saisissez votre mot de passe:</label>
                <input 
                    type="password" 
                    id="password" 
                    min="6"
                    max="30"
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Login;