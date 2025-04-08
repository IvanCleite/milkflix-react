import { Link } from "react-router-dom";
import styles from './NotFoundPage.module.css'

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/" className={styles.backButton}>Voltar para Login ou Início</Link>
    </div>
  );
};

export default NotFound;
