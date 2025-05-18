import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import styles from "./navbar.module.css"

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles["navbar"]}>
      <Link to={"/home"}>Home</Link>
      <Link to={"/recipes"}>Recipes</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      {user && (
        <>
          <span>Здравей, {user.name}</span>
          <div className={styles["nav-button"]} onClick={handleLogout}>Изход</div>
        </>
      )}
    </nav>
  );
}
