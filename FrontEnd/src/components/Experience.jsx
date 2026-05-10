import { useFadeIn } from '../hooks/useFadeIn';
import { useExperience } from '../hooks/useExperience';
import styles from '../styles/Experience.module.css';

const Experience = () => {
  const ref = useFadeIn();
  const { data, isLoading } = useExperience();

  return (
    <section id="experience" ref={ref} className={`${styles.section} fade-in`}>
      <div className={styles.header}>
        <span className={styles.tag}>Experience</span>
        <div className={styles.line} />
      </div>

      {isLoading
      	  ? <p style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>Loading...</p>
		  :data?.map((exp) => (
			<div key={exp.id} className={styles.entry}>
			<div>
				<div className={styles.org}>{exp.company} · {exp.employment_type}</div>
				<div className={styles.role}>{exp.role}</div>
				<div className={styles.location}>{exp.location}</div>
			</div>
			<div className={styles.date}>
				{new Date(exp.start_date).getFullYear()} —{' '}
				{exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
			</div>
			<ul className={styles.bullets}>
				{exp.details?.map((detail) => (
				<li key={detail.id} className={styles.bullet}>{detail.detail}</li>
				))}
			</ul>
			</div>
      ))}
    </section>
  );
};

export default Experience;