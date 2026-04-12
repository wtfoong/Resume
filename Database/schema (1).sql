-- ============================================================
-- Resume Website — PostgreSQL Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── ADMIN USERS ──────────────────────────────────────────────
CREATE TABLE admin_users (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  last_login    TIMESTAMP,
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ── PROFILE ──────────────────────────────────────────────────
CREATE TABLE profile (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  VARCHAR(100) NOT NULL,
  tagline    VARCHAR(255),
  location   VARCHAR(100),
  updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ── CONTACTS ─────────────────────────────────────────────────
-- Holds all communication/social links (email, phone, GitHub, etc.)
CREATE TABLE contacts (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID         NOT NULL REFERENCES profile(id) ON DELETE CASCADE,
  label      VARCHAR(100) NOT NULL,   -- e.g. "Email", "GitHub", "Phone SG"
  value      VARCHAR(255) NOT NULL,   -- e.g. "wtfoong81@gmail.com"
  url        VARCHAR(255),            -- e.g. "mailto:wtfoong81@gmail.com"
  sort_order INT          NOT NULL DEFAULT 0
);

-- ── EXPERIENCE ───────────────────────────────────────────────
CREATE TABLE experience (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  company         VARCHAR(150) NOT NULL,
  role            VARCHAR(150) NOT NULL,
  location        VARCHAR(100),
  employment_type VARCHAR(50),         -- e.g. "Full-time", "Internship"
  start_date      DATE         NOT NULL,
  end_date        DATE,                -- NULL if is_current = true
  is_current      BOOLEAN      NOT NULL DEFAULT FALSE,
  sort_order      INT          NOT NULL DEFAULT 0
);

-- ── EXPERIENCE DETAILS ───────────────────────────────────────
CREATE TABLE experience_details (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID  NOT NULL REFERENCES experience(id) ON DELETE CASCADE,
  detail        TEXT  NOT NULL,
  sort_order    INT   NOT NULL DEFAULT 0
);

-- ── EDUCATION ────────────────────────────────────────────────
CREATE TABLE education (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  institution VARCHAR(150) NOT NULL,
  degree      VARCHAR(150) NOT NULL,
  field       VARCHAR(150),
  start_date  DATE         NOT NULL,
  end_date    DATE,
  gpa         NUMERIC(3,2),
  sort_order  INT          NOT NULL DEFAULT 0
);

-- ── EDUCATION DETAILS ────────────────────────────────────────
CREATE TABLE education_details (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  education_id UUID  NOT NULL REFERENCES education(id) ON DELETE CASCADE,
  detail       TEXT  NOT NULL,
  sort_order   INT   NOT NULL DEFAULT 0
);

-- ── SKILLS ───────────────────────────────────────────────────
CREATE TABLE skills (
  id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  category   VARCHAR(100) NOT NULL,
  name       VARCHAR(100) NOT NULL,
  sort_order INT          NOT NULL DEFAULT 0
);

-- ── PROJECTS ─────────────────────────────────────────────────
CREATE TABLE projects (
  id           UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  title        VARCHAR(150) NOT NULL,
  description  TEXT,
  github_url   VARCHAR(255),
  live_url     VARCHAR(255),
  is_published BOOLEAN   NOT NULL DEFAULT TRUE,
  sort_order   INT       NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── PROJECT TAGS ─────────────────────────────────────────────
CREATE TABLE project_tags (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag        VARCHAR(50) NOT NULL,
  sort_order INT         NOT NULL DEFAULT 0
);
