import styles from "../styles/NavBar.module.css";
import { Link } from 'react-router-dom';
import { useAuth } from "./useAuth";

function NavBar() {
    const auth = useAuth();

    return (
        <>
            <nav className={styles.navbar}>
                <Link to='/'><div className={styles.title}>Admin MyBlog</div></Link>
                <ul className={styles.navigation}>
                    { !auth.token && (
                        <Link to='/'><button type="button" className={styles.navButton}>Log In</button></Link>
                    )}
                    { auth.token && (
                        <>
                            <Link to='/newPost'><button type="button" className={styles.navButton}>New Post</button></Link>
                            <Link to='/'><button onClick={auth.logout} type="button" className={styles.navButton}>Log Out</button></Link>
                        </>
                    )}
                    
                </ul>
            </nav>
        </>
    )
};

export default NavBar;
