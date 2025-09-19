import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import Input from "./Input";
import { Textarea } from "./Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function PostPage() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [errors, setErrors] = useState([]);

    const [form, setForm] = useState({
        title: "",
        content: ""
    });

    const handleChange = (event) => {
        const { value, id } = event.target;
        setForm((prev) => ({...prev, [id]: value}));
    };

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                    mode: "cors",
                    headers: { "Content-type": "application/json" }
                });

                const result = await response.json();

                if (!response.ok) {
                    setErrors([{ msg: result.errorMessage }]);
                    return;
                }

                setForm({
                    title: result.title,
                    content: result.content
                });

                return;
            } catch (err) {
                console.error("Network error", err);
                setErrors([{ msg: "Network error, please try again later." }]);
            }
        };

        getPost();
    }, [postId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.status === 401) {
                setErrors([{ msg: "Unauthorized, try to log in again" }]);
                return;
            }

            if (!response.ok) {
                const result = await response.json();
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
            <h2>Update Post</h2>
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
                <button type="submit">Update</button>
            </form>
        </div>
    )
};

export default PostPage;
