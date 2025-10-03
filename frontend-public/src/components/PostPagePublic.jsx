import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/DashboardPublic.module.css";
import { useNavigate } from "react-router-dom";
import { useAuthPublic } from "./UseAuthPublic";
import { TextareaPublic } from "./InputPublic";

function PostPagePublic() {
    const { token, user } = useAuthPublic();
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
        dialogRef.current.close();
        setForm({
            content: ""
        });
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

        alert("Your comment has been deleted");
        setPost((prev) => ({
            ...prev,
            comments: prev.comments.filter((comment) => comment.id !== commentId)
        }));
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setForm({ ...form, [id]: value })
    };

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

            const result = await response.json();

            if (!response.ok) {
                const errors = result.errors || [{ msg: result.errorMessage }]
                setErrors(errors) ;
                return
            }

            closeDialog();
            alert("Your reply has been posted");

            setPost((prev) => ({
                ...prev,
                comments: [...prev.comments, result.comment] 
            }));
 
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

            <div className={styles.commmentsDiv}>
                {post?.comments.map((comment) => (
                    <div className={styles.comment} key={comment.id}>
                        <div className={styles.metadata}>
                            {user.name === comment.author.name ? (
                                <div className={styles.commentAuthor}>
                                    {comment.author.name} (You)
                                </div>
                            ) : (
                                <div className={styles.commentAuthor}>{comment.author.name}</div>
                            )}

                            <div className={styles.commentDate}>
                                {formatDate(comment.uploadAt)}
                            </div>
                        </div>

                        <div className={styles.commentContent}>
                            {comment.content}
                        </div>
                        
                        <div>
                            {user.name === comment.author.name && (
                                <button onClick={deleteComment} data-commentid={comment.id} className={styles.deleteComment} >🗑 Delete</button>
                            )}
                        </div>
                    </div>
                ))}
    
            </div>
         </div>
    )
};

export default PostPagePublic;

