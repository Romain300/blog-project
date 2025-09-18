import { useState } from "react";
import styles from "../styles/Form.module.css";
import Input from "./Input";
import { Textarea, Checkbox } from "./Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function NewPostForm() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [form, setForm] = useState({
        title: "",
        content: "",
        published: true,
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setForm({ 
            ...form, 
            [id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/posts", {
                mode: "cors",
                method: "POST",
                headers: { 
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
                body: JSON.stringify(form)
            })

            const result = await response.json();

            if (!response.ok) {
                setErrors(result.errors);
                return;
            }

            navigate("/");

        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }

    }

    return (

        <div className={styles.formcard}>
            <h2>New Post</h2>
            { errors.length > 0  && (
                <ul>
                    {errors.map((error, index) => 
                        <li key={index}>{error.msg}</li>
                    )}
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                <Input id='title' label='Title:'  type='text' value={form.title} onChange={handleChange}/>
                <Textarea rows="5" id='content' label='Content:' value={form.content} onChange={handleChange}/>
                <Checkbox id='published' label='Publish:' checked={form.published} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default NewPostForm;

