import styles from "../styles/NavBar.module.css";
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.title}>Admin MyBlog</div>
                <ul className={styles.navigation}>
                    <Link to='/'>LogIn</Link>
                </ul>
            </nav>
        </>
    )
};

export default NavBar;
