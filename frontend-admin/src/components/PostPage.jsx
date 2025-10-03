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
    const [post, setPost] = useState(null);

    const [form, setForm] = useState({
        title: "",
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

    const handleChange = (event) => {
        const { value, id } = event.target;
        setForm((prev) => ({...prev, [id]: value}));
    };

    const deleteComment = async(event) => {
        const commentId = parseInt(event.target.dataset.commentid);

        if (!post || !post.comments?.some((comment) => comment.id === commentId)) {
            alert("Network issue, retry later");
            return;
        }

        const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
            mode: "cors",
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            alert("You are not authorized, try to log in again.");
            return;
        }

        if (!response.ok) {
            const result = await response.json();
            alert(result.errorMessage);
            return;
        }

        alert("The comment has been deleted");
        setPost((prev) => ({
            ...prev,
            comments: prev.comments.filter((comment) => comment.id !== commentId)
        }));
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

                setForm({
                    title: result.title,
                    content: result.content
                });

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
        <>
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

            <div className={styles.commmentsDiv}>
                {post?.comments.map((comment) => (
                    <div className={styles.comment} key={comment.id}>
                        <div className={styles.metadata}>
                            <div className={styles.commentAuthor}>{comment.author.name}</div>
                            <div className={styles.commentDate}>
                                {formatDate(comment.uploadAt)}
                            </div>
                        </div>

                        <div className={styles.commentContent}>
                            {comment.content}
                        </div>
                        
                        <div>
                            <button onClick={deleteComment} data-commentid={comment.id} className={styles.deleteComment} >🗑 Delete</button>
                        </div>
                    </div>
                ))}
    
            </div>
        </>
        
    )
};

export default PostPage;
