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

print("--- Testing Public Routes ---")
routes = [
    ('/', 'Home Page'),
    ('/about/', 'About Page'),
    ('/projects/', 'Projects Page'),
    ('/gallery/', 'Gallery Public Route'),
    ('/huck/', 'Legacy Huck Route'),
]

for p in Project.objects.all()[:4]:
    routes.append((f'/projects/{p.slug}/', f'Case Study: {p.title}'))

for url, name in routes:
    res = client.get(url, follow=True)
    assert res.status_code == 200, f"Failed {name} at {url}: {res.status_code}"
    print(f"[OK] {name} ({url}) -> Status {res.status_code}")

print("\n--- Testing Gallery Section on Home Page ---")
home_res = client.get('/')
assert home_res.status_code == 200
home_html = home_res.content.decode('utf-8')
assert 'id="gallery"' in home_html, "Gallery section missing id='gallery'"
print("[OK] Section 06: Photo Gallery section found on Home Page!")

print("\n--- Testing Section 03: Skills & Tooling on Home Page ---")
assert 'id="skills"' in home_html, "Section 03 missing id='skills'"
for cat in SkillCategory.objects.all():
    assert cat.title in home_html or cat.title.replace('&', '&amp;') in home_html, f"SkillCategory '{cat.title}' not rendered on home page"
    for link in cat.case_links.all():
        assert link.title in home_html or link.title.replace('&', '&amp;') in home_html, f"SkillCaseLink '{link.title}' not rendered on home page"
        link_res = client.get(link.target_url, follow=True)
        assert link_res.status_code == 200, f"Case link '{link.title}' at '{link.target_url}' failed: {link_res.status_code}"
print("[OK] Section 03 Skills & Tooling cards and all case links verified with 200 OK!")

print("\n--- Testing Contact Form Submission ---")
contact_res = client.post('/contact/', {
    'name': 'Test Visitor',
    'email': 'visitor@example.com',
    'subject': 'Collaboration Inquiry',
    'message': 'Hello, I loved your generative AI portfolio!'
}, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
assert contact_res.status_code == 200, f"Contact submission failed: {contact_res.status_code}"
assert ContactMessage.objects.filter(email='visitor@example.com').exists(), "Message not saved in DB"
print(f"[OK] Contact Form submission & DB persistence verified! Total messages: {ContactMessage.objects.count()}")

print("\n--- Testing Admin Authentication & CRUD ---")
login_success = client.login(username='rezwan', password='Rezwan**258%%')
assert login_success, "Admin login with 'rezwan' failed!"
print("[OK] Admin login successful!")

admin_urls = [
    ('/admin/', 'Admin Index'),
    ('/admin/portfolio/profilesettings/', 'Profile Settings List'),
    ('/admin/portfolio/project/', 'Projects List'),
    ('/admin/portfolio/project/add/', 'Add Project Form'),
    ('/admin/portfolio/experience/', 'Experience List'),
    ('/admin/portfolio/galleryitem/', 'Gallery Items List'),
    ('/admin/portfolio/contactmessage/', 'Contact Messages List'),
]

for url, name in admin_urls:
    res = client.get(url)
    assert res.status_code == 200, f"Admin page failed: {name} at {url} ({res.status_code})"
    print(f"[OK] {name} ({url}) -> Status {res.status_code}")

print("\n--- Database Content Summary ---")
print(f"Profile: {ProfileSettings.objects.first().name}")
print(f"Key Stats: {KeyStat.objects.count()} items")
print(f"Focus Areas: {FocusArea.objects.count()} items")
print(f"Skill Categories: {SkillCategory.objects.count()} items")
print(f"Projects: {Project.objects.count()} items")
print(f"Experiences: {Experience.objects.count()} items")
print(f"Gallery Photos: {GalleryItem.objects.count()} items")

print("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! 100% OPERATIONAL.")

