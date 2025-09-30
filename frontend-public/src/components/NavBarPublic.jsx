import styles from "../styles/NavBarPublic.module.css";
import { Link } from 'react-router-dom';
import { useAuthPublic } from "./UseAuthPublic";

function NavBarPublic() {
    const { token, user, logout } = useAuthPublic();

    return (
        <>
            <nav className={styles.navbar}>
                <Link to='/'><div className={styles.title}>MyBlog</div></Link>
                <ul className={styles.navigation}>
        
                    { token && user && (
                        <button type="button" onClick={logout} className={styles.navButton}>Log Out</button>
                    )}

                    { !token && !user && (
                        <>
                        <Link to='/'><button type="button" className={styles.navButton}>Log In</button></Link>
                        <Link to='signIn'><button type="button" className={styles.navButton}>Sign In</button></Link>
                        </>
                        
                    )}
                    
                </ul>
            </nav>
        </>
    )
};

export default NavBarPublic;