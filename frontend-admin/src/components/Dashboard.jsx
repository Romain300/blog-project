import { useState, useEffect, useRef } from "react";
import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

function Dashboard() {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const dialogRef = useRef(null);

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

    const handleDeleteButton = (event) => {
        const idPost = event.target.getAttribute('data-id');
        setSelectedPost(idPost);
        dialogRef.current.showModal();
    };

    const handlePublishButton = async (event) => {
        const idPost = event.target.getAttribute('data-id');
        const currentState = event.target.getAttribute('data-published') === "true";
        const newState = !currentState;
        const payload = { published: newState };
       
        try {
            const response = await fetch(`http://localhost:3000/posts/${idPost}/updateStatus`, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 401) {
                alert("Unauthorized, try to log in again");
                return;
            }

            if (!response.ok) {
                const result = await response.json();
                const newErrors = [{ msg: result.errorMessage }];
                setErrors(newErrors);
                console.log(errors);
                alert(newErrors.map((error) => error.msg));
                return;
            }

            setPosts((prev) => prev.map((post) => post.id === parseInt(idPost) ? {...post, published: newState, uploadAt: new Date() } : post ));

        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }
    };

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${selectedPost}`, {
                mode: "cors",
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const result = response.json();
                let currentError = result.errorMessage;
                if (!currentError) currentError = "Unauthorized, try to log in again";
                const newErrors = [{ msg: currentError }];
                setErrors(newErrors);
                console.log(errors);
                alert(newErrors.map((error) => error.msg));
                return;
            }

            dialogRef.current.close();
            setPosts((prev) => prev.filter((post) => post.id !== parseInt(selectedPost)));
            alert("Your post has been deleted.")

        }catch (err) {
            console.error("Network error", err);
            setErrors([{ msg: "Network error, please try again later." }]);
        }
    };

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await fetch("http://localhost:3000/posts", {
                    mode: "cors",
                    headers: { "Content-type": "application/json"}
                });

                const result = await response.json();

                if (!response.ok) {
                    setErrors([{ msg: result.errorMessage }]);
                    return;
                }

                setPosts(result.posts);
                return;
            }catch (err) {
                console.error("Network error", err);
                setErrors([{ msg: "Network error, please try again later." }]);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className={styles.messagesDiv}>
             <dialog ref={dialogRef}>
             <div className={styles.dialogDiv}>
                <p>Deleting this post is irreversible. Do you wish to proceed?</p>
                <div className={styles.dialogActions}>
                    <button type="button" onClick={() => dialogRef.current.close()}>
                    Cancel
                    </button>
                    <button type="button" onClick={deletePost} className={styles.delete}>
                    Delete
                    </button>
                </div>
             </div>
            </dialog>
            { posts.map((post) => (
              
                <div key={post.id} className={styles.messageDiv}>
                    <div className={styles.messageTitle}>{post.title}</div>
                    <div className={styles.messageMeta}>
                        { post.published && (
                            <p>{formatDate(post.uploadAt)}</p>
                        )}
                    </div>
                    <div className={styles.messageContent}>{post.content}</div>
                    <button data-id={post.id} type="button" onClick={handleDeleteButton} className={styles.delete}>Delete</button>
                    <Link to={`/post/${post.id}`}><button type="button" className={styles.modify}>Modify</button></Link>
                    { post.published && (
                        <button data-id={post.id} data-published={post.published} type="button" onClick={handlePublishButton} className={styles.publish}>Unpublish</button>
                    )}
                    { !post.published && (
                        <button data-id={post.id} data-published={post.published} type="button" onClick={handlePublishButton} className={styles.publish}>Publish</button>
                    )}
                    
                </div>

            ))}
        </div>
    )
};

export default Dashboard;

