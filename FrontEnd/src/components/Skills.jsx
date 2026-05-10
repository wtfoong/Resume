import { useFadeIn } from '../hooks/useFadeIn';
import { useSkills } from '../hooks/useSkills';
import styles from '../styles/Skills.module.css';

const Skills = () => {
  const { data, isLoading } = useSkills();
  const ref = useFadeIn();

  return (
    <section id="skills" className={`${styles.section} fade-in`} ref={ref}>
      <div className={styles.header}>
        <span className={styles.tag}>Skills</span>
        <div className={styles.line} />
      </div>
      <div className={styles.grid}>
        {isLoading
      	  ? <p style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>Loading...</p>
		  :Object.entries(data ?? {}).map(([category, skills]) => (
          <div key={category}>
            <h4 className={styles.groupTitle}>{category}</h4>
            <div className={styles.pills}>
              {skills.map((skill) => (
                <span key={skill} className={styles.pill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;