import styles from "../styles/NavBarPublic.module.css";
import { Link } from 'react-router-dom';

function NavBarPublic() {

    return (
        <>
            <nav className={styles.navbar}>
                <Link to='/'><div className={styles.title}>MyBlog</div></Link>
                <ul className={styles.navigation}>
                    <Link to='/'><button type="button" className={styles.navButton}>Log In</button></Link>
                    <>
                        <Link to='signIn'><button type="button" className={styles.navButton}>Sign In</button></Link>
                        {/* <button type="button" className={styles.navButton}>Log Out</button> */}
                    </>
                
                    
                </ul>
            </nav>
        </>
    )
};

export default NavBarPublic;