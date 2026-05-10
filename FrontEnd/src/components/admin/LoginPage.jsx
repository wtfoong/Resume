import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { forgotPassword } from '../../api/authApi';
import styles from '../../styles/admin/LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [view, setView]           = useState('login');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e) => {
	e.preventDefault();
	setError('');
	setLoading(true);
	try {
		await login({ email, password }); // AuthContext handles token storage
		navigate('/admin/dashboard');
	} catch (err) {
		setError(err.response?.data?.error ?? 'Invalid credentials');
	} finally {
		setLoading(false);
	}
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword({ email });
      setForgotSent(true);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {view === 'login' ? 'Admin Login' : 'Forgot Password'}
        </h1>
        <p className={styles.subtitle}>
          {view === 'login'
            ? 'Resume website admin panel'
            : 'Enter your email to receive a reset link'}
        </p>

        {view === 'login' ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="email"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="password"
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              className={styles.link}
              onClick={() => { setView('forgot'); setError(''); }}
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgot} className={styles.form}>
            {forgotSent ? (
              <p className={styles.success}>
                Reset link sent! Check your inbox.
              </p>
            ) : (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="email"
                    required
                  />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.btn} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </>
            )}
            <button
              type="button"
              className={styles.link}
              onClick={() => { setView('login'); setError(''); setForgotSent(false); }}
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;