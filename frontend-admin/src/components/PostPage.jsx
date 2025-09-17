import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";
import Input from "./Input";
import { Textarea } from "./Input";

function PostPage() {
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

    const handleSubmit = async () => {
        try {
            const response = fetch(`http://localhost:3000/posts/${postId}`, {

            })

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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default PostPage;

//finish the update