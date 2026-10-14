import os
import sys
from pathlib import Path

# Setup Django environment
sys.path.insert(0, str(Path(__file__).resolve().parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django
django.setup()

from django.test import Client
from portfolio.models import (
    ProfileSettings, KeyStat, FocusArea, SkillCategory, 
    Project, Experience, GalleryItem, ContactMessage
)

client = Client()

print("--- 1. Testing Unauthenticated Access Redirect ---")
res = client.get('/dashboard/')
assert res.status_code == 302 and '/login/' in res.url, f"Expected redirect to /login/, got {res.status_code}"
print("[OK] Unauthenticated access to /dashboard/ correctly redirects to /login/")

print("\n--- 2. Testing Login Page Rendering ---")
login_page = client.get('/login/')
assert login_page.status_code == 200, f"Login page failed with {login_page.status_code}"
print("[OK] /login/ page rendered successfully (200 OK)")

print("\n--- 3. Testing Authentication Flow ---")
login_res = client.post('/login/', {'username': 'admin', 'password': 'admin12345'})
assert login_res.status_code == 302 and '/dashboard/' in login_res.url, f"Expected redirect to /dashboard/, got {login_res.status_code} ({login_res.url})"
print("[OK] Admin login successful, redirected to /dashboard/")

print("\n--- 4. Testing All Dashboard Sections & Grouped Menus ---")
sections = [
    ('/dashboard/', 'Overview Dashboard'),
    # HOME MENU (3 options)
    ('/dashboard/home/hero/', 'HOME MENU: Hero Section & Stats'),
    ('/dashboard/home/work/', 'HOME MENU: What I work on'),
    ('/dashboard/home/skills/', 'HOME MENU: Skills & tooling'),
    # ABOUT MENU (2 options)
    ('/dashboard/about/me/', 'ABOUT MENU: About me & Bio'),
    ('/dashboard/about/experience/', 'ABOUT MENU: Experience Timeline'),
    # PROJECT MENU
    ('/dashboard/projects-menu/', 'PROJECT MENU: Projects Management'),
    # Other sections
    ('/dashboard/profile/', 'Profile & Settings Form'),
    ('/dashboard/stats/', 'Key Statistics List'),
    ('/dashboard/stats/add/', 'Add Statistic Form'),
    ('/dashboard/focus-areas/', 'Focus Areas List'),
    ('/dashboard/focus-areas/add/', 'Add Focus Area Form'),
    ('/dashboard/skills/', 'Skills & Tooling List'),
    ('/dashboard/skills/add/', 'Add Skill Category Form'),
    ('/dashboard/projects/', 'Projects & Case Studies List'),
    ('/dashboard/projects/add/', 'Add Project Form'),
    ('/dashboard/experience/', 'Career Experience List'),
    ('/dashboard/experience/add/', 'Add Experience Form'),
    ('/dashboard/gallery/', 'Companion Gallery List'),
    ('/dashboard/gallery/add/', 'Upload Gallery Photo Form'),
    ('/dashboard/messages/', 'Visitor Messages List'),
]

for url, name in sections:
    res = client.get(url, follow=True)
    assert res.status_code == 200, f"Failed section {name} at {url} (status: {res.status_code})"
    print(f"[OK] {name} ({url}) -> Status {res.status_code}")

print("\n--- 4b. Testing Grouped Menu Header Updates & Toggles ---")
# Test What I work on header update
res_work = client.post('/dashboard/home/work/', {
    'save_header': '1',
    'what_i_work_on_title': 'Specialized AI Engineering',
    'what_i_work_on_sub': 'Designing robust multi-agent systems and real-time inference.',
})
assert res_work.status_code == 302, f"What I work on header update failed: {res_work.status_code}"
profile = ProfileSettings.objects.first()
assert profile.what_i_work_on_title == 'Specialized AI Engineering', "Title not saved"
print("[OK] HOME MENU 'What I work on' header updated successfully!")

# Test Skills & tooling header update
res_skills = client.post('/dashboard/home/skills/', {
    'save_header': '1',
    'skills_title': 'Core Competencies & Tooling',
    'skills_sub': 'Modern stack for deep learning and agentic workflows.',
})
assert res_skills.status_code == 302, f"Skills header update failed: {res_skills.status_code}"
profile.refresh_from_db()
assert profile.skills_title == 'Core Competencies & Tooling', "Skills title not saved"
print("[OK] HOME MENU 'Skills & tooling' header updated successfully!")

# Test About me Home display toggle
res_about = client.post('/dashboard/about/me/', {
    'show_about_on_home': 'on',
    'about_pull_quote': 'Building intelligent systems with focus and craft.',
    'about_p1': profile.about_p1,
    'about_p2': profile.about_p2,
    'about_hero_lead': profile.about_hero_lead,
    'about_full_p1': profile.about_full_p1,
    'about_full_p2': profile.about_full_p2,
    'email': profile.email,
})
assert res_about.status_code == 302, f"About Me update failed: {res_about.status_code}"
profile.refresh_from_db()
assert profile.show_about_on_home is True, "show_about_on_home should be True"
print("[OK] ABOUT MENU 'About me' updated with show_about_on_home=True successfully!")

# Test Projects header update
res_proj_hdr = client.post('/dashboard/projects-menu/', {
    'save_header': '1',
    'projects_page_title': 'Production Systems & Case Studies',
    'projects_page_lead': 'Comprehensive engineering breakdowns of real-world AI applications.',
})
assert res_proj_hdr.status_code == 302, f"Projects header update failed: {res_proj_hdr.status_code}"
profile.refresh_from_db()
assert profile.projects_page_title == 'Production Systems & Case Studies', "Projects title not saved"
print("[OK] PROJECT MENU page header updated successfully!")

print("\n--- 5. Testing Full Project CRUD in Dashboard ---")
# CREATE
create_res = client.post('/dashboard/projects/add/', {
    'title': 'Automated Test Project',
    'slug': 'automated-test-project',
    'category': 'genai',
    'category_label': 'Generative AI',
    'index_number': '99',
    'short_description': 'A test project created by automated test suite.',
    'tech_stack': 'Django, Python, SQLite',
    'metrics_text': 'Latency: 10ms\nAccuracy: 99.9%',
    'kicker': 'Testing Suite',
    'lede': 'Automated testing lede paragraph.',
    'order': 99,
})
assert create_res.status_code == 302, f"Project creation failed: {create_res.status_code}"
test_proj = Project.objects.filter(slug='automated-test-project').first()
assert test_proj is not None, "Created project not found in database"
print(f"[OK] Project CREATE succeeded: ID {test_proj.id} - '{test_proj.title}'")

# READ / EDIT PAGE
edit_get = client.get(f'/dashboard/projects/{test_proj.id}/edit/')
assert edit_get.status_code == 200, f"Project edit page failed: {edit_get.status_code}"
print(f"[OK] Project READ/EDIT page rendered: Status 200")

# UPDATE
update_res = client.post(f'/dashboard/projects/{test_proj.id}/edit/', {
    'title': 'Automated Test Project (Updated)',
    'slug': 'automated-test-project',
    'category': 'nlp',
    'category_label': 'Real-Time NLP',
    'index_number': '99',
    'short_description': 'Updated short description.',
    'tech_stack': 'Django, Python, Redis',
    'metrics_text': 'Latency: 5ms',
    'kicker': 'Testing Suite Updated',
    'lede': 'Updated lede paragraph.',
    'order': 99,
})
assert update_res.status_code == 302, f"Project update failed: {update_res.status_code}"
test_proj.refresh_from_db()
assert test_proj.title == 'Automated Test Project (Updated)' and test_proj.category == 'nlp', "Project update not persisted"
print(f"[OK] Project UPDATE succeeded: '{test_proj.title}', Category: '{test_proj.category}'")

# DELETE
del_res = client.post(f'/dashboard/projects/{test_proj.id}/delete/')
assert del_res.status_code == 302, f"Project delete failed: {del_res.status_code}"
assert not Project.objects.filter(slug='automated-test-project').exists(), "Project still exists after deletion"
print(f"[OK] Project DELETE succeeded: Project cleanly removed from database")

print("\n--- 5b. Testing Full Gallery Photo CRUD in Dashboard ---")
# CREATE Photo
from django.core.files.uploadedfile import SimpleUploadedFile
gif_bytes = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
test_img = SimpleUploadedFile(name='test_gallery_photo.gif', content=gif_bytes, content_type='image/gif')
gallery_create = client.post('/dashboard/gallery/add/', {
    'title': 'Automated Test Photo',
    'caption': 'Test caption for automated verification',
    'alt_text': 'Alt text for test photo',
    'order': 999,
    'image': test_img,
})
assert gallery_create.status_code == 302, f"Gallery create failed: {gallery_create.status_code}"
test_photo = GalleryItem.objects.filter(title='Automated Test Photo').first()
assert test_photo is not None, "Created gallery photo not found in DB"
print(f"[OK] Gallery CREATE succeeded: ID {test_photo.id} - '{test_photo.title}'")

# READ / EDIT PAGE
photo_edit_get = client.get(f'/dashboard/gallery/{test_photo.id}/edit/')
assert photo_edit_get.status_code == 200, f"Gallery edit page failed: {photo_edit_get.status_code}"
print("[OK] Gallery READ/EDIT page rendered: Status 200")

# UPDATE Photo
photo_update = client.post(f'/dashboard/gallery/{test_photo.id}/edit/', {
    'title': 'Automated Test Photo (Updated)',
    'caption': 'Updated caption for verification',
    'alt_text': 'Updated alt text',
    'order': 888,
})
assert photo_update.status_code == 302, f"Gallery update failed: {photo_update.status_code}"
test_photo.refresh_from_db()
assert test_photo.title == 'Automated Test Photo (Updated)' and test_photo.order == 888, "Gallery photo update not persisted"
print(f"[OK] Gallery UPDATE succeeded: Title '{test_photo.title}', Order #{test_photo.order}")

# DELETE Photo
photo_del = client.post(f'/dashboard/gallery/{test_photo.id}/delete/')
assert photo_del.status_code == 302, f"Gallery delete failed: {photo_del.status_code}"
assert not GalleryItem.objects.filter(id=test_photo.id).exists(), "Gallery photo still exists after delete"
print("[OK] Gallery DELETE succeeded: Photo cleanly removed from database")

print("\n--- 6. Testing Message Toggle Read Status ---")
msg = ContactMessage.objects.first()
if msg:
    initial_read = msg.is_read
    toggle_res = client.get(f'/dashboard/messages/{msg.id}/toggle-read/')
    msg.refresh_from_db()
    assert msg.is_read != initial_read, "Toggle read status failed"
    # toggle back
    client.get(f'/dashboard/messages/{msg.id}/toggle-read/')
    print(f"[OK] Message toggle read status verified!")

print("\n--- 7. Testing Logout Flow ---")
logout_res = client.get('/logout/')
assert logout_res.status_code == 302 and '/login/' in logout_res.url, "Logout redirect failed"
# Verify unauthenticated now
verify_unauth = client.get('/dashboard/')
assert verify_unauth.status_code == 302 and '/login/' in verify_unauth.url, "User still authenticated after logout"
print("[OK] Logout successful and redirects to /login/")

print("\n=======================================================")
print("ALL DASHBOARD & CRUD VERIFICATION TESTS PASSED (100%)!")
print("=======================================================")
