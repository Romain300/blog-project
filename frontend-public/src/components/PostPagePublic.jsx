import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/DashboardPublic.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthPublic } from "./UseAuthPublic";
import { TextareaPublic } from "./InputPublic";

function PostPagePublic() {
    const { token } = useAuthPublic();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [errors, setErrors] = useState([]);
    const [post, setPost] = useState(null);
    const dialogRef = useRef(null);
    const formRef = useRef(null);
    const [form, setForm] = useState({
        content: ""
    });

    const formatDate = (date) => {
        date = new Date(date)
        return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
        }) + ", " + date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });
    };

    const closeDialog = () => {
        formRef.current.reset();
        dialogRef.current.close();
    };  

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/comments/${postId}`, {
                mode: "cors", 
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const result = await response.json();
                const errors = result.errors || [{ msg: result.errorMessage }]
                setErrors(errors) ;
                return
            }

            alert("Your reply has been posted");


        } catch(err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }

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
                    navigate('/404NotFound')
                    return;
                }

                setPost({
                    title: result.title,
                    content: result.content,
                    uploadAt: result.uploadAt,
                    comments: result.comments
                });

                return;
            } catch (err) {
                console.error("Network error", err);
                setErrors([{ msg: "Network error, please try again later." }]);
            }
        };

        getPost();
    }, [postId, navigate]);

    return (
         <div className={styles.messagesDiv}>
            <dialog ref={dialogRef}>
                <h2>Reply</h2>
                { errors.length > 0  && (
                    <ul>
                        {errors.map((error, index) => 
                            <li key={index}>{error.msg}</li>
                        )}
                    </ul>
                )}
                <form onSubmit={handleSubmit} ref={formRef}>
                    <TextareaPublic onChange={handleChange} rows='5' id='content' name='content' value={form.content}/>
                    <div className={styles.divButton}>
                        <button className={styles.modifyButton} type="submit">Submit</button>
                        <button onClick={closeDialog} type="button" className={styles.delete}>Cancel</button>
                    </div>
                </form>
            </dialog>
            <div className={styles.messageDiv}>
                <div className={styles.messageTitle}>{post?.title}</div>
                <div className={styles.messageMeta}>
                    <p>{formatDate(post?.uploadAt)}</p>
                </div>
                <div className={styles.messageContent}>{post?.content}</div>
                <button onClick={() => dialogRef.current.showModal()}>Reply</button>
            </div>
         </div>
    )
};

export default PostPagePublic;

//Display comment + close dialog + clean form when sending comment