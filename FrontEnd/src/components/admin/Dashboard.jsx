import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../../styles/admin/Dashboard.module.css';
import ProfileSection from './sections/ProfileSection';
import ContactSection from './sections/ContactSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillSection from './sections/SkillSection';
import ProjectSection from './sections/ProjectSection';

const SECTIONS = [
  { key: 'profile',    label: 'Profile' },
  { key: 'contacts',   label: 'Contacts' },
  { key: 'experience', label: 'Experience' },
  { key: 'education',  label: 'Education' },
  { key: 'skills',     label: 'Skills' },
  { key: 'projects',   label: 'Projects' },
];

const Dashboard = () => {
  const [active, setActive] = useState('profile');
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  
  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

 

	const renderSection = () => {
	switch (active) {
		case 'profile':    return <ProfileSection />;
		case 'contacts':   return <ContactSection />;
		case 'experience': return <ExperienceSection />;
		case 'education':  return <EducationSection />;
		case 'skills':     return <SkillSection />;
		case 'projects':   return <ProjectSection />;
		default:           return null;
	}
	};

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <span className={styles.sidebarTitle}>Admin Panel</span>
        </div>
        <nav className={styles.nav}>
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`${styles.navItem} ${active === s.key ? styles.navItemActive : ''}`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
		<a 
			href="/" 
			target="_blank" 
			rel="noreferrer"
			className={styles.viewSite}
			>
			View Site ↗
		</a>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <main className={styles.main}>
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard; 
