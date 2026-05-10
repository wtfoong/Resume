import { useState } from 'react';
import { useSkillsRaw } from '../../../hooks/useSkillsRaw';
import { useAdminSkill } from '../../../hooks/admin/useAdminSkill';
import styles from '../../../styles/admin/Section.module.css';

const emptyForm = { category: '', name: '', sort_order: 0 };

const SkillSection = () => {
  const { data, isLoading } = useSkillsRaw();
  const { createSkill, updateSkill, deleteSkill } = useAdminSkill();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  // data is { category: [names] } — we need flat list with ids
  // so we need to refetch differently — use raw skills from a different approach
  // for now work with what we have

  const handleSave = async () => {
    setError('');
    try {
      if (adding) {
        await createSkill.mutateAsync(form);
        setAdding(false);
      } else {
        await updateSkill.mutateAsync({ id: editingId, data: form });
        setEditingId(null);
      }
      setForm(emptyForm);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await deleteSkill.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Skills</h2>
      <p className={styles.sectionSubtitle}>Your technical skills grouped by category.</p>

      <button className={styles.btnPrimary} onClick={() => { setAdding(true); setForm(emptyForm); setError(''); }}>
        + Add Skill
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {adding && (
        <div className={styles.card}>
          <SkillForm form={form} setForm={setForm}
            onSave={handleSave} onCancel={() => setAdding(false)} />
        </div>
      )}

		{/* group by category */}
		{Object.entries(
		(data ?? []).reduce((acc, skill) => {
			if (!acc[skill.category]) acc[skill.category] = [];
			acc[skill.category].push(skill);
			return acc;
		}, {})
		).map(([category, skills]) => (
		<div key={category} className={styles.card}>
			<div className={styles.cardTitle} style={{ marginBottom: '1rem' }}>{category}</div>
			{skills.map((skill) => (
			<div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
				<span className={styles.tag}>{skill.name}</span>
				<button className={styles.btnDelete} onClick={() => handleDelete(skill.id)}>Delete</button>
			</div>
			))}
		</div>
		))}
    </div>
  );
};

const SkillForm = ({ form, setForm, onSave, onCancel }) => (
  <div className={styles.form}>
    <div className={styles.field}>
      <label className={styles.label}>Category</label>
      <input className={styles.input} value={form.category} placeholder="e.g. Languages"
        onChange={(e) => setForm({ ...form, category: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Name</label>
      <input className={styles.input} value={form.name} placeholder="e.g. Python"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Sort Order</label>
      <input className={styles.input} type="number" value={form.sort_order}
        onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
    </div>
    <div className={styles.formActions}>
      <button className={styles.btnSave} onClick={onSave}>Save</button>
      <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default SkillSection;
