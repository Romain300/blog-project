import { useState, useEffect } from "react";
import styles from "../styles/DashboardPublic.module.css";
import { Link } from "react-router-dom";
import { useAuthPublic } from "./UseAuthPublic";

function DashboardPublic() {
    const { token } = useAuthPublic();
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState([]);

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
            { posts.filter((post) => post.published).map((post) => (
              
                <div key={post.id} className={styles.messageDiv}>
                    <div className={styles.messageTitle}>{post.title}</div>
                    <div className={styles.messageMeta}>
                        { post.published && (
                            <p>{formatDate(post.uploadAt)}</p>
                        )}
                    </div>
                    <div className={styles.messageContent}>{post.content}</div>
                    <Link className={styles.modify} to={`/post/${post.id}`}>View</Link>
                </div>

            ))}
        </div>
    )
}

export default DashboardPublic;


