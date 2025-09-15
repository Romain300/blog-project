import { useState, useEffect, useRef } from "react";
import styles from "../styles/Dashboard.module.css";


function Dashboard() {
    const [posts, SetPosts] = useState([]);
    const [errors, SetErrors] = useState(null);
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

    const fetchPosts = async() => {

        try {
            const response = await fetch("http://localhost:3000/posts", {
                mode: "cors",
                headers: { "Content-type": "application/json"}
            });

            const result = await response.json();

            if (!response.ok) {
                SetErrors(result.errorMessage);
                return;
            }

            SetPosts(result.posts);
            return;
        }catch (err) {
            console.error("Network error", err);
            SetErrors([{ msg: "Network error, please try again later." }]);
        }
    };

    const handleDeleteButton = (event) => {
        const idPost = event.target.getAttribute('data-id');
        setSelectedPost(idPost);
        dialogRef.current.showModal();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className={styles.messagesDiv}>
             <dialog ref={dialogRef}>
                <p>Deleting this post is irreversible. Do you wish to proceed?</p>
                <div className={styles.dialogActions}>
                    <button type="button" onClick={() => dialogRef.current.close()}>
                    Cancel
                    </button>
                    <button type="button" className={styles.delete}>
                    Delete
                    </button>
                </div>
            </dialog>
            { posts.map((post) => (
              
                <div key={post.id} className={styles.messageDiv}>
                    <div className={styles.messageTitle}>{post.title}</div>
                    <div className={styles.messageMeta}>
                        <p>{formatDate(post.uploadAt)}</p>
                    </div>
                    <div className={styles.messageContent}>{post.content}</div>
                    <button type="button" onClick={handleDeleteButton} className={styles.delete}>Delete</button>
                    <button data-id={post.id} type="button" className={styles.modify}>Modify</button>
                </div>

            ))}

        </div>
    )
};

//handle cancel and modify


export default Dashboard;