import { useProfile } from '../hooks/useProfile';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  const { data } = useProfile();

  return (
    <nav className={styles.nav}>
      <span className={styles.name}>{data?.full_name ?? ''}</span>
      <div className={styles.links}>
        {['experience', 'education', 'skills', 'portfolio'].map((section) => (
          <a key={section} href={`#${section}`} className={styles.link}>
            {section}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;