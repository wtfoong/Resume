import { useProfile } from '../hooks/useProfile';
import styles from '../styles/Hero.module.css';
import { useFadeIn } from '../hooks/useFadeIn';

const Hero = () => {
  const { data, isLoading } = useProfile();
  const ref = useFadeIn();

  const nameParts = data?.full_name?.split(' ') ?? [];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div ref={ref} className={`${styles.hero} fade-in`}>
      <div>
        <p className={styles.label}>
          {data?.occupation} · {data?.location}
        </p>
        <h1 className={styles.heading}>
          {firstName}<br />
          <em>{lastName}</em>
        </h1>
        <div className={styles.contacts}>
          {data?.contacts?.map((contact) => (
			contact.url ? (
				<a key={contact.id} href={contact.url} className={styles.contactPill}>
				{contact.label}: {contact.value}
				</a>
			) : (
				<span key={contact.id} className={styles.contactPill}>
				{contact.label}: {contact.value}
				</span>
			)
		))}
        </div>
      </div>
      <div className={styles.badge}>
        <div className={styles.badgeRing}>
          <div className={styles.badgeDot} />
          {data?.based_in}<br />Based
        </div>
      </div>
    </div>
  );
};

export default Hero;