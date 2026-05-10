import styles from '../styles/Footer.module.css';
import { useProfile } from '../hooks/useProfile';

const Footer = () => {
  const { data } = useProfile();

  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} {data?.full_name}</span>
      <span>{data?.location} · {data?.contacts?.find(c => c.label === 'Email')?.value}</span>
    </footer>
  );
};
export default Footer;