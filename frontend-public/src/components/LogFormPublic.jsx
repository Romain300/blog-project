import InputPublic from './InputPublic';
import styles from '../styles/FormPublic.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthPublic } from "./UseAuthPublic";


function LogFormPublic() {
    const auth = useAuthPublic();
    const [form, setForm] = useState({
        email:'',
        password:'',
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/logIn", {
                mode: "cors",
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form)
            })

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors);
                return;
            }

            auth.login(result.token, result.user);

        } catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }

    }
    
    return (
        <div className={styles.formcard}>
            <h2>Log In</h2>
            { errors.length > 0  && (
                <ul>
                    {errors.map((error, index) => 
                        <li key={index}>{error.msg}</li>
                    )}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <InputPublic id='email' label='Email:'  type='email' value={form.email} onChange={handleChange}/>
                <InputPublic id='password' label='Password:'  type='password' value={form.password} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            <div className={styles.infoForm}>
                <p className="secondary-text">Don't have an account?</p>
                <Link to='signIn'>Create one</Link>
            </div>
        </div>
        
    )
};

export default LogFormPublic;