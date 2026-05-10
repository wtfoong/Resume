import { useFadeIn } from '../hooks/useFadeIn';
import { useProjects } from '../hooks/useProjects';
import styles from '../styles/Portfolio.module.css';

const Portfolio = () => {
  const { data, isLoading } = useProjects();
  const ref = useFadeIn();

  return (
    <div id="portfolio" className={styles.wrapper}>
      <div className={`${styles.inner} fade-in`} ref={ref}>
        <div className={styles.pattern} />
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.tag}>Portfolio</span>
            <div className={styles.line} />
          </div>

          <h2 className={styles.title}>
            Projects &amp; <em>Work</em>
          </h2>
          <p className={styles.subtitle}>
            Academic projects, internship builds, and personal experiments. More coming soon.
          </p>

          <div className={styles.grid}>
            {isLoading
				? <p style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>Loading...</p>
				:data?.map((project) => (
					<div key={project.id} className={styles.card}>
						<div className={styles.cardTop}>
						<span className={styles.cardType}>{project.tags?.map(t => t.tag).join(' · ')}</span>
						{project.github_url && (
							<a href={project.github_url} target="_blank" rel="noreferrer" className={styles.cardLink}>
							GitHub ↗
							</a>
						)}
						</div>
						<h3 className={styles.cardTitle}>{project.title}</h3>
						<p className={styles.cardDesc}>{project.description}</p>
					</div>
            ))}

            <div className={styles.placeholder}>
              <div className={styles.placeholderLabel}>COMING SOON</div>
              <div className={styles.placeholderRing} />
              {/* <p className={styles.placeholderText}>Your next project<br />goes here</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;