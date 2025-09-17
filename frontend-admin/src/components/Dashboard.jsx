import { useState, useEffect, useRef } from "react";
import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";

function Dashboard() {
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

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${selectedPost}`, {
                mode: "cors",
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                const result = response.json();
                const newErrors = [{ msg: result.errorMessage }];
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
                        <p>{formatDate(post.uploadAt)}</p>
                    </div>
                    <div className={styles.messageContent}>{post.content}</div>
                    <button data-id={post.id} type="button" onClick={handleDeleteButton} className={styles.delete}>Delete</button>
                    <Link to={`/post/${post.id}`}><button type="button" className={styles.modify}>Modify</button></Link>
                </div>

            ))}
        </div>
    )
};

export default Dashboard;

// add chehck token on this backend route