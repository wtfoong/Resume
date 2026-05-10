import { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { useAdminProject } from '../../../hooks/admin/useAdminProject';
import { useAdminProjectTag } from '../../../hooks/admin/useAdminProjectTag';
import styles from '../../../styles/admin/Section.module.css';

const emptyProject = { title: '', description: '', github_url: '', live_url: '', is_published: true, sort_order: 0 };
const emptyTag = { tag: '', sort_order: 0 };

const ProjectSection = () => {
  const { data, isLoading } = useProjects();
  const { createProject, updateProject, deleteProject } = useAdminProject();
  const { createProjectTag, deleteProjectTag } = useAdminProjectTag();

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [addingTagFor, setAddingTagFor] = useState(null);
  const [tagForm, setTagForm] = useState(emptyTag);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    try {
      if (adding) {
        await createProject.mutateAsync(form);
        setAdding(false);
      } else {
        await updateProject.mutateAsync({ id: editingId, data: form });
        setEditingId(null);
      }
      setForm(emptyProject);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project and all its tags?')) return;
    try { await deleteProject.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  const handleAddTag = async (projectId) => {
    setError('');
    try {
      await createProjectTag.mutateAsync({ ...tagForm, project_id: projectId });
      setAddingTagFor(null);
      setTagForm(emptyTag);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Something went wrong');
    }
  };

  const handleDeleteTag = async (id) => {
    if (!confirm('Delete this tag?')) return;
    try { await deleteProjectTag.mutateAsync(id); }
    catch (err) { setError(err.response?.data?.error ?? 'Something went wrong'); }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Projects</h2>
      <p className={styles.sectionSubtitle}>Your portfolio projects.</p>

      <button className={styles.btnPrimary} onClick={() => { setAdding(true); setForm(emptyProject); setError(''); }}>
        + Add Project
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {adding && (
        <div className={styles.card}>
          <ProjectForm form={form} setForm={setForm}
            onSave={handleSave} onCancel={() => setAdding(false)} />
        </div>
      )}

      {data?.map((project) => (
        <div key={project.id} className={styles.card}>
          {editingId === project.id ? (
            <ProjectForm form={form} setForm={setForm}
              onSave={handleSave} onCancel={() => setEditingId(null)} />
          ) : (
            <>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>{project.title}</div>
                  <div className={styles.cardMeta}>
                    {project.is_published ? 'Published' : 'Hidden'} · {project.github_url}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => {
                    setEditingId(project.id);
                    setForm({
                      title: project.title, description: project.description ?? '',
                      github_url: project.github_url ?? '', live_url: project.live_url ?? '',
                      is_published: project.is_published, sort_order: project.sort_order,
                    });
                  }}>Edit</button>
                  <button className={styles.btnDelete} onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </div>

              <p style={{ fontSize: '0.83rem', color: 'var(--ink-2)', margin: '0.5rem 0' }}>
                {project.description}
              </p>

              <div className={styles.divider} />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                {project.tags?.map((tag) => (
					<span key={tag.id} className={styles.tag}
						onClick={() => handleDeleteTag(tag.id)}>
						{tag.tag} ×
					</span>
				))}
                {addingTagFor === project.id ? (
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <input className={styles.input} style={{ width: '120px', padding: '0.2rem 0.5rem' }}
                      value={tagForm.tag} placeholder="Tag name"
                      onChange={(e) => setTagForm({ ...tagForm, tag: e.target.value })} />
                    <button className={styles.btnSave} style={{ padding: '0.2rem 0.6rem' }}
                      onClick={() => handleAddTag(project.id)}>Add</button>
                    <button className={styles.btnCancel} style={{ padding: '0.2rem 0.6rem' }}
                      onClick={() => setAddingTagFor(null)}>Cancel</button>
                  </div>
                ) : (
                  <button className={styles.btnEdit}
                    onClick={() => { setAddingTagFor(project.id); setTagForm(emptyTag); }}>
                    + Tag
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const ProjectForm = ({ form, setForm, onSave, onCancel }) => (
  <div className={styles.form}>
    <div className={styles.field}>
      <label className={styles.label}>Title</label>
      <input className={styles.input} value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Description</label>
      <textarea className={styles.textarea} value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>GitHub URL</label>
      <input className={styles.input} value={form.github_url}
        onChange={(e) => setForm({ ...form, github_url: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Live URL</label>
      <input className={styles.input} value={form.live_url}
        onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
    </div>
    <div className={styles.field}>
      <label className={styles.label}>Sort Order</label>
      <input className={styles.input} type="number" value={form.sort_order}
        onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
    </div>
    <label className={styles.checkbox}>
      <input type="checkbox" checked={form.is_published}
        onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
      Published
    </label>
    <div className={styles.formActions}>
      <button className={styles.btnSave} onClick={onSave}>Save</button>
      <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
    </div>
  </div>
);

export default ProjectSection;
