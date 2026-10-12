from django.urls import path
from . import views

urlpatterns = [
    # Public Routes
    path('', views.home_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('projects/', views.projects_view, name='projects'),
    path('projects/<slug:slug>/', views.project_detail_view, name='project_detail'),
    path('huck/', views.huck_view, name='huck'),
    path('resume/', views.resume_view, name='resume'),
    path('resume/view/', views.resume_interactive_view, name='resume_interactive'),
    path('resume/Cv_Machine_Learning_Engineer.pdf', views.resume_view, name='resume_pdf_direct'),
    path('Cv_Machine_Learning_Engineer.pdf', views.resume_view, name='cv_root_pdf'),
    path('resume/pdf/', views.resume_download_view, name='resume_pdf'),
    path('cv/', views.resume_view, name='cv'),
    path('cv/view/', views.resume_interactive_view, name='cv_interactive'),
    path('cv/pdf/', views.resume_download_view, name='cv_pdf'),
    path('media/resumes/<path:filename>', views.serve_resume_media_view, name='serve_resume_media'),
    path('contact/', views.contact_submit_view, name='contact_submit'),

    # Admin Authentication
    path('login/', views.admin_login_view, name='admin_login'),
    path('logout/', views.admin_logout_view, name='admin_logout'),

    # Admin Dashboard Overview
    path('dashboard/', views.dashboard_home_view, name='dashboard_home'),
    path('dashboard/profile/', views.dashboard_profile_view, name='dashboard_profile'),
    
    # ==========================================
    # 1. HOME MENU ROUTES (Hero, What I work on, Skills)
    # ==========================================
    path('dashboard/home-menu/hero/', views.dashboard_home_hero_view, name='dashboard_home_hero'),
    path('dashboard/home/hero/', views.dashboard_home_hero_view),
    path('dashboard/home-menu/what-i-work-on/', views.dashboard_home_work_view, name='dashboard_home_work'),
    path('dashboard/home/work/', views.dashboard_home_work_view),
    path('dashboard/home-menu/skills/', views.dashboard_home_skills_view, name='dashboard_home_skills'),
    path('dashboard/home/skills/', views.dashboard_home_skills_view),

    # Stats CRUD
    path('dashboard/stats/', views.dashboard_stats_view, name='dashboard_stats'),
    path('dashboard/stats/add/', views.dashboard_stat_edit_view, name='dashboard_stat_add'),
    path('dashboard/stats/<int:pk>/edit/', views.dashboard_stat_edit_view, name='dashboard_stat_edit'),
    path('dashboard/stats/<int:pk>/delete/', views.dashboard_stat_delete_view, name='dashboard_stat_delete'),

    # Focus Areas CRUD
    path('dashboard/focus-areas/', views.dashboard_focus_areas_view, name='dashboard_focus_areas'),
    path('dashboard/focus-areas/add/', views.dashboard_focus_area_edit_view, name='dashboard_focus_area_add'),
    path('dashboard/focus-areas/<int:pk>/edit/', views.dashboard_focus_area_edit_view, name='dashboard_focus_area_edit'),
    path('dashboard/focus-areas/<int:pk>/delete/', views.dashboard_focus_area_delete_view, name='dashboard_focus_area_delete'),

    # Skills CRUD
    path('dashboard/skills/', views.dashboard_skills_view, name='dashboard_skills'),
    path('dashboard/skills/add/', views.dashboard_skill_edit_view, name='dashboard_skill_add'),
    path('dashboard/skills/<int:pk>/edit/', views.dashboard_skill_edit_view, name='dashboard_skill_edit'),
    path('dashboard/skills/<int:pk>/delete/', views.dashboard_skill_delete_view, name='dashboard_skill_delete'),

    # ==========================================
    # 2. ABOUT MENU ROUTES (About me, Experience, References)
    # ==========================================
    path('dashboard/about-menu/about-me/', views.dashboard_about_me_view, name='dashboard_about_me'),
    path('dashboard/about/me/', views.dashboard_about_me_view),
    path('dashboard/about-menu/experience/', views.dashboard_about_exp_view, name='dashboard_about_exp'),
    path('dashboard/about/experience/', views.dashboard_about_exp_view),
    path('dashboard/about-menu/references/', views.dashboard_references_view, name='dashboard_references'),
    path('dashboard/about/references/', views.dashboard_references_view),
    path('dashboard/references/add/', views.dashboard_reference_edit_view, name='dashboard_reference_add'),
    path('dashboard/references/<int:pk>/edit/', views.dashboard_reference_edit_view, name='dashboard_reference_edit'),
    path('dashboard/references/<int:pk>/delete/', views.dashboard_reference_delete_view, name='dashboard_reference_delete'),

    # Experience CRUD
    path('dashboard/experience/', views.dashboard_experience_view, name='dashboard_experience'),
    path('dashboard/experience/add/', views.dashboard_experience_edit_view, name='dashboard_experience_add'),
    path('dashboard/experience/<int:pk>/edit/', views.dashboard_experience_edit_view, name='dashboard_experience_edit'),
    path('dashboard/experience/<int:pk>/delete/', views.dashboard_experience_delete_view, name='dashboard_experience_delete'),

    # ==========================================
    # 3. PROJECT MENU ROUTES (Projects Upload & CRUD)
    # ==========================================
    path('dashboard/project-menu/', views.dashboard_project_menu_view, name='dashboard_project_menu'),
    path('dashboard/projects-menu/', views.dashboard_project_menu_view),

    # Projects CRUD
    path('dashboard/projects/', views.dashboard_projects_view, name='dashboard_projects'),
    path('dashboard/projects/add/', views.dashboard_project_edit_view, name='dashboard_project_add'),
    path('dashboard/projects/<int:pk>/edit/', views.dashboard_project_edit_view, name='dashboard_project_edit'),
    path('dashboard/projects/<int:pk>/delete/', views.dashboard_project_delete_view, name='dashboard_project_delete'),

    # Project Categories CRUD
    path('dashboard/projects/categories/add/', views.dashboard_category_edit_view, name='dashboard_category_add'),
    path('dashboard/projects/categories/<int:pk>/edit/', views.dashboard_category_edit_view, name='dashboard_category_edit'),
    path('dashboard/projects/categories/<int:pk>/delete/', views.dashboard_category_delete_view, name='dashboard_category_delete'),

    # Gallery CRUD
    path('dashboard/gallery/', views.dashboard_gallery_view, name='dashboard_gallery'),
    path('dashboard/gallery/add/', views.dashboard_gallery_add_view, name='dashboard_gallery_add'),
    path('dashboard/gallery/<int:pk>/delete/', views.dashboard_gallery_delete_view, name='dashboard_gallery_delete'),

    # Messages
    path('dashboard/messages/', views.dashboard_messages_view, name='dashboard_messages'),
    path('dashboard/messages/<int:pk>/toggle-read/', views.dashboard_message_toggle_read_view, name='dashboard_message_toggle_read'),
    path('dashboard/messages/<int:pk>/delete/', views.dashboard_message_delete_view, name='dashboard_message_delete'),
]
