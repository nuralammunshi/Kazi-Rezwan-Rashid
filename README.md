# Kazi Rezwan Rashid — AI/ML Engineer & Researcher Portfolio

[![Django](https://img.shields.io/badge/Django-5.0+-092e20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A state-of-the-art, dynamic portfolio and research showcase platform for **Kazi Rezwan Rashid**, Machine Learning Engineer and Researcher specializing in Deep Learning, Computer Vision, Healthcare AI, and Generative Systems.

---

## 🌟 Key Features & Innovations

### 1. 🧭 Sticky Top Utility Bar
Located at the very top of all pages (`base.html`), this utility bar features:
- **🟢 Live Real-Time Clock:** Dynamic ticking date & time formatted in both English and Bengali with a live pulsing status indicator.
- **🌐 Bilingual Language Switcher (EN ⇄ বাং):** Pure client-side zero-flicker translation engine converting all navigation, headings, project titles, stats, bio, and forms between English and Bangla.
- **🌓 Complete Dark & White Theme Switcher:** Instant theme engine with `localStorage` persistence that transforms the full website (header, hero, cards, architecture diagram, footer) into an elegant White Theme or an ultra-modern Cyberpunk Dark Theme.
- **🔐 Direct Admin Login:** Secure quick-access button into the administrative dashboard.

### 2. 🖼️ Dual Photo Gallery Architecture
- **Home Page Gallery (`/#gallery`):** Responsive grid featuring high-resolution milestone and conference photos with card hover zoom, overlay captions, and fullscreen Lightbox viewer.
- **Dedicated Standalone Gallery Page (`/gallery/`):** Full-screen dedicated gallery showcase with filter metrics and direct navigation back to Home.
- **Dashboard CRUD Management:** Complete control to upload new photos, update titles/captions/order, and delete photos directly from `/dashboard/gallery/`.

### 3. 💼 Production Systems & Case Studies
- In-depth case study presentations for flagship projects in Nuclear Radiation Leak Detection, Lung Cancer Diagnosis, Sunflower Disease Recognition, and Neural NLP Ensembles.
- Interactive system architecture diagram showcasing live streaming NLP / Kafka / RAG agentic workflows.

### 4. 🎛️ Complete Admin Dashboard
- **Route:** `/dashboard/`
- Full CRUD operations for:
  - Hero Section, Bio & Status
  - Key Statistics & Metrics
  - Core Focus Areas
  - Skills & Tooling Categories
  - Projects & Case Studies
  - Career Timeline & Experiences
  - Companion Photo Gallery
  - Visitor Contact Messages

---

## 📁 Repository Directory Structure

```text
RezwanRashidPortfolio/
├── .gitignore                      # Git ignore rules for bytecode & caches
├── Cv_Machine_Learning_Engineer.pdf# Curriculum Vitae PDF document
├── README.md                       # Repository documentation & guide
└── project/                        # Django Web Application Root
    ├── manage.py                   # Django CLI management script
    ├── requirements.txt            # Python dependencies
    ├── db.sqlite3                  # Pre-configured SQLite database
    ├── test_suite.py               # Comprehensive verification test suite
    ├── test_dashboard_suite.py     # Dashboard & CRUD verification test suite
    ├── config/                     # Core Django configuration (settings, urls, wsgi)
    ├── portfolio/                  # Main portfolio app (models, views, admin, forms)
    ├── media/                      # Uploaded media assets
    │   ├── gallery/                # Photo gallery milestone images
    │   ├── profile/                # Profile portraits & headshots
    │   └── resumes/                # Resume PDF files & previews
    ├── static/                     # Static frontend assets
    │   ├── css/                    # chrome.css, site.css, linearicons, etc.
    │   ├── js/                     # navbar_controls.js, site.js, etc.
    │   └── img/                    # Logos, thumbnails, and badges
    └── templates/                  # HTML5 Templates
        └── portfolio/
            ├── base.html           # Master layout (Top Utility Bar + Main Nav + Footer)
            ├── home.html           # Homepage (Hero, Work, Skills, Gallery, Contact)
            ├── gallery.html        # Dedicated Photo Gallery page
            ├── about.html          # About & Career timeline page
            ├── projects.html       # Projects showcase & filter page
            ├── project_detail.html # Case study detail page
            ├── resume_view.html    # Interactive CV viewer
            └── admin/              # Comprehensive Admin Dashboard templates
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nuralammunshi/RezwanRashidPortfolio.git
cd RezwanRashidPortfolio/project
```

### 2. Create Virtual Environment & Install Dependencies
```bash
python -m venv env
# On Windows:
.\env\Scripts\activate
# On Linux/macOS:
source env/bin/activate

pip install -r requirements.txt
```

### 3. Run Database Migrations
```bash
python manage.py migrate
```

### 4. Start Local Development Server
```bash
python manage.py runserver
```
Visit `http://127.0.0.1:8000/` in your browser.

---

## 🔑 Administrative Access

- **Login URL:** `http://127.0.0.1:8000/login/`
- **Dashboard URL:** `http://127.0.0.1:8000/dashboard/`
- **Username:** `rezwan`
- **Password:** `Rezwan**258%%`

---

## 🧪 Verification & Automated Testing

Run the test suites to verify 100% functionality:
```bash
python test_suite.py
python test_dashboard_suite.py
```

---

## 📄 License
This project is licensed under the MIT License.
