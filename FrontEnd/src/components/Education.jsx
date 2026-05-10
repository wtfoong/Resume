import { useFadeIn } from '../hooks/useFadeIn';
import { useEducation } from '../hooks/useEducation';
import styles from '../styles/Education.module.css';

const Education = () => {
  const { data, isLoading } = useEducation();
  const ref = useFadeIn();

//   if (isLoading) return null;

  return (
    <section id="education" className={`${styles.section} fade-in`} ref={ref}>
      <div className={styles.header}>
        <span className={styles.tag}>Education</span>
        <div className={styles.line} />
      </div>
	   {isLoading
      	  ? <p style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>Loading...</p>
		  : data?.map((edu) => (
				<div key={edu.id} className={styles.entry}>
				<div>
					<div className={styles.institution}>{edu.institution}</div>
					<div className={styles.degree}>
					{edu.degree}
					{edu.gpa && <span className={styles.gpa}>GPA {edu.gpa}</span>}
					</div>
					<div className={styles.field}>{edu.field}</div>
				</div>
				<div className={styles.date}>
					{new Date(edu.start_date).getFullYear()} —{' '}
					{edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
				</div>
				<ul className={styles.bullets}>
					{edu.details?.map((detail) => (
					<li key={detail.id} className={styles.bullet}>{detail.detail}</li>
					))}
				</ul>
				</div>
			))
        }
    </section>
  );
};

export default Education;