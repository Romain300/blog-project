import InputPublic from './InputPublic';
import styles from '../styles/FormPublic.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignFormPublic() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    });

    const [errors, setErrors] = useState([]);
 
    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/signIn", {
                mode: "cors",
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form),
            })

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors);
                return;
            }

            console.log("User created", result.user);
            alert(result.message);

            navigate("/");
        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }])
        }

    };
    
    return (
        <div className={styles.formcard}>
            <h2>Sign In</h2>
            { errors.length > 0  && (
                <ul>
                    {errors.map((error, index) => 
                        <li key={index}>{error.msg}</li>
                    )}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <InputPublic id='name' label='Name:' type='text' value={form.name} onChange={handleChange}/>
                <InputPublic id='email' label='Email:'  type='email' value={form.email} onChange={handleChange}/>
                <InputPublic id='password' label='Password:'  type='password' value={form.password} onChange={handleChange}/>
                <InputPublic id='cpassword' label='Confirm Password:'  type='password' value={form.cpassword} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )
};

export default SignFormPublic;