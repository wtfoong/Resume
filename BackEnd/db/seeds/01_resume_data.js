exports.seed = async function (knex) {
  // Clear all tables in reverse dependency order
  await knex('project_tags').del();
  await knex('projects').del();
  await knex('skills').del();
  await knex('education_details').del();
  await knex('education').del();
  await knex('experience_details').del();
  await knex('experience').del();
  await knex('contacts').del();
  await knex('profile').del();

  // ── PROFILE ────────────────────────────────────────────────
  const [profile] = await knex('profile').insert({
    full_name: 'Foong Wai Tuck',
    tagline:   'Building production systems that automate real workflows — from warehouse logistics to web platforms.',
    location:  'Singapore',
  }).returning('id');
  const profileId = profile.id;

  // ── CONTACTS ───────────────────────────────────────────────
  await knex('contacts').insert([
    { profile_id: profileId, label: 'Email',    value: 'wtfoong81@gmail.com',    url: 'mailto:wtfoong81@gmail.com',   sort_order: 1 },
    { profile_id: profileId, label: 'GitHub',   value: 'github.com/wtfoong',     url: 'https://github.com/wtfoong',  sort_order: 2 },
    { profile_id: profileId, label: 'Phone SG', value: '+65 9030 0657',           url: 'tel:+6590300657',             sort_order: 3 },
    { profile_id: profileId, label: 'Phone MY', value: '+60 19 651 3690',         url: 'tel:+60196513690',            sort_order: 4 },
  ]);

  // ── EXPERIENCE ─────────────────────────────────────────────
  const [shimano] = await knex('experience').insert({
    company: 'Shimano (Singapore) Pte Ltd', role: 'Software Developer',
    location: 'Singapore', employment_type: 'Full-time',
    start_date: '2023-05-01', is_current: true, sort_order: 1,
  }).returning('id');

  const [g2g] = await knex('experience').insert({
    company: 'Gamer2gamer Sdn. Bhd', role: 'IT Intern',
    location: 'Kuala Lumpur, Malaysia', employment_type: 'Internship',
    start_date: '2022-01-01', end_date: '2022-04-30', is_current: false, sort_order: 2,
  }).returning('id');

  const [gogokids] = await knex('experience').insert({
    company: 'GogoKids Technologies Sdn. Bhd', role: 'Fullstack Developer Intern',
    location: 'Kuala Lumpur, Malaysia', employment_type: 'Internship',
    start_date: '2020-11-01', end_date: '2021-01-31', is_current: false, sort_order: 3,
  }).returning('id');

  // ── EXPERIENCE DETAILS ─────────────────────────────────────
  await knex('experience_details').insert([
    { experience_id: shimano.id, sort_order: 1, detail: 'Maintained and improved QC system — added new features and boosted system performance.' },
    { experience_id: shimano.id, sort_order: 2, detail: 'Enhanced shipping system UI and functionality to improve user efficiency.' },
    { experience_id: shimano.id, sort_order: 3, detail: 'Developed finished goods warehouse system integrated with AMR and ASRS, automating 50% of warehouse workflow and increasing stuffing capacity to ~15 containers per day.' },
  ]);

  await knex('experience_details').insert([
    { experience_id: g2g.id, sort_order: 1, detail: 'Automated testing processes using Python.' },
    { experience_id: g2g.id, sort_order: 2, detail: 'Built a Canada data extraction model for ID cards and driving licences.' },
    { experience_id: g2g.id, sort_order: 3, detail: 'Developed automation script for image categorisation.' },
  ]);

  await knex('experience_details').insert([
    { experience_id: gogokids.id, sort_order: 1, detail: 'Built backend functions and REST APIs for GogoKids website and admin dashboard using Laravel.' },
    { experience_id: gogokids.id, sort_order: 2, detail: 'Developed frontend UI for admin dashboard and main site using Angular.' },
    { experience_id: gogokids.id, sort_order: 3, detail: 'Performed SEO updates for the GogoKids website.' },
  ]);

  // ── EDUCATION ──────────────────────────────────────────────
  const [degree] = await knex('education').insert({
    institution: 'Asia Pacific University', degree: 'Bachelor of Science (Hons)',
    field: 'Software Engineering', start_date: '2021-05-01', end_date: '2023-03-31',
    gpa: 3.89, sort_order: 1,
  }).returning('id');

  const [diploma] = await knex('education').insert({
    institution: 'Asia Pacific University', degree: 'Diploma in ICT',
    field: 'Software Engineering', start_date: '2018-09-01', end_date: '2021-01-31',
    gpa: 3.99, sort_order: 2,
  }).returning('id');

  // ── EDUCATION DETAILS ──────────────────────────────────────
  await knex('education_details').insert([
    { education_id: degree.id,  sort_order: 1, detail: 'Technical Assistance — Organiser of The Ultimate Typing Competition (2021).' },
    { education_id: diploma.id, sort_order: 1, detail: 'Technical Assistance — Organiser of Dota Charity Tournament (2019).' },
  ]);

  // ── SKILLS ─────────────────────────────────────────────────
  await knex('skills').insert([
    { category: 'Languages',          name: 'Java',       sort_order: 1 },
    { category: 'Languages',          name: 'Python',     sort_order: 2 },
    { category: 'Languages',          name: 'PHP',        sort_order: 3 },
    { category: 'Languages',          name: 'JavaScript', sort_order: 4 },
    { category: 'Languages',          name: 'C#',         sort_order: 5 },
    { category: 'Languages',          name: 'C++',        sort_order: 6 },
    { category: 'Languages',          name: 'Kotlin',     sort_order: 7 },
    { category: 'Languages',          name: 'VB.net',     sort_order: 8 },
    { category: 'Languages',          name: 'R',          sort_order: 9 },
    { category: 'Frameworks & Tools', name: 'Laravel',    sort_order: 1 },
    { category: 'Frameworks & Tools', name: 'Angular',    sort_order: 2 },
    { category: 'Frameworks & Tools', name: 'AWS',        sort_order: 3 },
    { category: 'Frameworks & Tools', name: 'SQL',        sort_order: 4 },
    { category: 'Frameworks & Tools', name: 'Git',        sort_order: 5 },
    { category: 'Frameworks & Tools', name: 'Postman',    sort_order: 6 },
  ]);

  // ── PROJECTS ───────────────────────────────────────────────
  const [ocr] = await knex('projects').insert({
    title: 'Image Categorisation via OCR',
    description: 'A system that categorises images based on user-defined categories, with multiprocessing for async performance and a threaded PyQT UI.',
    github_url: 'https://github.com/wtfoong',
    is_published: true, sort_order: 1,
  }).returning('id');

  const [pastry] = await knex('projects').insert({
    title: 'Online Pastry Shop',
    description: 'Led a team to build an e-commerce website for a pastry shop, with AWS S3 for image storage and RDS for the database layer.',
    github_url: 'https://github.com/wtfoong',
    is_published: true, sort_order: 2,
  }).returning('id');

  const [sports] = await knex('projects').insert({
    title: 'Sport Academy System',
    description: 'Led a team to design a Java-based system for managing students, schedules, and classes — using flat-file storage as the database layer.',
    github_url: 'https://github.com/wtfoong',
    is_published: true, sort_order: 3,
  }).returning('id');

  // ── PROJECT TAGS ───────────────────────────────────────────
  await knex('project_tags').insert([
    { project_id: ocr.id,    tag: 'Python',         sort_order: 1 },
    { project_id: ocr.id,    tag: 'PyQT',           sort_order: 2 },
    { project_id: ocr.id,    tag: 'OCR',            sort_order: 3 },
    { project_id: ocr.id,    tag: 'Multiprocessing', sort_order: 4 },
    { project_id: pastry.id, tag: 'PHP',            sort_order: 1 },
    { project_id: pastry.id, tag: 'JavaScript',     sort_order: 2 },
    { project_id: pastry.id, tag: 'AWS S3',         sort_order: 3 },
    { project_id: pastry.id, tag: 'RDS',            sort_order: 4 },
    { project_id: sports.id, tag: 'Java',           sort_order: 1 },
    { project_id: sports.id, tag: 'File I/O',       sort_order: 2 },
  ]);
};
