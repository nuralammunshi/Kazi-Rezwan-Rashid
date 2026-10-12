import os
from django.conf import settings
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, FileResponse, Http404, HttpResponse
from django.views.decorators.clickjacking import xframe_options_exempt
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import (
    ProfileSettings, KeyStat, FocusArea, SkillCategory, 
    SkillCaseLink, Project, ProjectCategory, Experience, GalleryItem, ContactMessage,
    Reference
)
from .forms import (
    ProfileSettingsForm, HeroSectionForm, WhatIWorkOnHeaderForm, SkillsHeaderForm,
    AboutMeForm, ProjectsPageHeaderForm, KeyStatForm, FocusAreaForm, 
    SkillCategoryForm, ProjectForm, ProjectCategoryForm, ExperienceForm, GalleryItemForm,
    ReferenceForm
)


def get_profile():
    return ProfileSettings.objects.first() or ProfileSettings()


# ==========================================
# PUBLIC FRONTEND VIEWS
# ==========================================

def home_view(request):
    profile = get_profile()
    stats = KeyStat.objects.all()
    focus_areas = FocusArea.objects.all()
    skill_categories = SkillCategory.objects.prefetch_related('case_links').all()
    featured_projects = Project.objects.filter(is_featured=True)
    if not featured_projects.exists():
        featured_projects = Project.objects.all()[:3]
    home_experiences = Experience.objects.filter(show_on_home=True)
        
    context = {
        'profile': profile,
        'stats': stats,
        'focus_areas': focus_areas,
        'skill_categories': skill_categories,
        'featured_projects': featured_projects,
        'home_experiences': home_experiences,
    }
    return render(request, 'portfolio/home.html', context)


@xframe_options_exempt
def resume_interactive_view(request):
    """
    Renders the rich multi-page interactive CV viewer with official References addendum.
    """
    profile = get_profile()
    references = Reference.objects.filter(is_active=True)
    download_url = "/resume/pdf/?download=1"
    raw_url = "/resume/pdf/"
    return render(request, 'portfolio/resume_view.html', {
        'profile': profile,
        'references': references,
        'download_url': download_url,
        'raw_url': raw_url,
    })


@xframe_options_exempt
def resume_view(request):
    """
    Directly serve Kazi Rezwan Rashid's CV PDF file or interactive viewer if requested.
    Ensures that clicking Résumé immediately opens or downloads the exact CV PDF.
    """
    if request.GET.get('view') in ['interactive', 'html', 'viewer']:
        return resume_interactive_view(request)
    return resume_download_view(request)


@xframe_options_exempt
def resume_download_view(request):
    """
    Directly serve Kazi Rezwan Rashid's CV PDF.
    Removes X-Frame-Options to eliminate Chromium PDF viewer extension blank-screen bugs.
    Supports inline view, iframe embeds, and ?download=1 forced attachment.
    """
    candidates = [
        os.path.join(settings.BASE_DIR, '..', 'Cv_Machine_Learning_Engineer (1).pdf'),
        os.path.join(settings.BASE_DIR, '..', 'Cv_Machine_Learning_Engineer%20(1).pdf'),
        os.path.join(settings.MEDIA_ROOT, 'resumes', 'Cv_Machine_Learning_Engineer (1).pdf'),
        os.path.join(settings.MEDIA_ROOT, 'resumes', 'Cv_Machine_Learning_Engineer%20(1).pdf'),
        os.path.join(settings.MEDIA_ROOT, 'resumes', 'Kazi_Rezwan_Rashid_CV.pdf'),
    ]
    profile = get_profile()
    if profile.resume_file and hasattr(profile.resume_file, 'path') and os.path.exists(profile.resume_file.path):
        candidates.insert(0, profile.resume_file.path)

    for c in candidates:
        if os.path.exists(c):
            with open(c, 'rb') as f:
                content = f.read()
            response = HttpResponse(content, content_type='application/pdf')
            
            is_download = request.GET.get('download') == '1'
            disposition = 'attachment' if is_download else 'inline'
            
            response['Content-Disposition'] = f'{disposition}; filename="Cv_Machine_Learning_Engineer.pdf"'
            response['Content-Length'] = len(content)
            response['Accept-Ranges'] = 'bytes'
            # Remove X-Frame-Options so Chrome/Edge PDF extensions don't block the embed
            response.headers.pop('X-Frame-Options', None)
            response['Access-Control-Allow-Origin'] = '*'
            response['Content-Security-Policy'] = "frame-ancestors *"
            response['Cache-Control'] = 'public, max-age=3600'
            return response

    raise Http404("Resume file not found.")


@xframe_options_exempt
def serve_resume_media_view(request, filename):
    """
    Safely serve resume files from MEDIA_ROOT/resumes/ without X-Frame-Options: DENY.
    Prevents blank white screens when accessing /media/resumes/... in Chromium browsers.
    """
    import mimetypes
    safe_filename = os.path.basename(filename)
    file_path = os.path.join(settings.MEDIA_ROOT, 'resumes', safe_filename)
    if not os.path.exists(file_path):
        # Try unquoted or candidate
        from urllib.parse import unquote
        unquoted = unquote(safe_filename)
        file_path = os.path.join(settings.MEDIA_ROOT, 'resumes', unquoted)
        if not os.path.exists(file_path):
            file_path = os.path.join(settings.BASE_DIR, '..', 'Cv_Machine_Learning_Engineer (1).pdf')

    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            content = f.read()
        content_type, _ = mimetypes.guess_type(file_path)
        if not content_type:
            content_type = 'application/pdf'
        response = HttpResponse(content, content_type=content_type)
        response['Content-Disposition'] = f'inline; filename="{safe_filename}"'
        response['Content-Length'] = len(content)
        response['Accept-Ranges'] = 'bytes'
        response.headers.pop('X-Frame-Options', None)
        response['Access-Control-Allow-Origin'] = '*'
        response['Content-Security-Policy'] = "frame-ancestors *"
        return response
    raise Http404("Resume file not found.")



def about_view(request):
    profile = get_profile()
    experiences = Experience.objects.all()
    references = Reference.objects.filter(is_active=True)
    context = {
        'profile': profile,
        'experiences': experiences,
        'references': references,
    }
    return render(request, 'portfolio/about.html', context)


def projects_view(request):
    profile = get_profile()
    projects = Project.objects.all()
    categories = ProjectCategory.objects.prefetch_related('projects').all()
    
    context = {
        'profile': profile,
        'projects': projects,
        'categories': categories,
        'count_all': projects.count(),
        'count_genai': projects.filter(category='genai').count(),
        'count_nlp': projects.filter(category='nlp').count(),
        'count_credit': projects.filter(category='credit').count(),
        'count_earlier': projects.filter(category='earlier').count(),
    }
    return render(request, 'portfolio/projects.html', context)


def project_detail_view(request, slug):
    profile = get_profile()
    project = Project.objects.filter(slug=slug).first()
    if not project:
        messages.info(request, f"Project '{slug}' was not found. Displaying all available case studies.")
        return redirect('projects')
    other_projects = Project.objects.exclude(id=project.id)[:4]
    
    context = {
        'profile': profile,
        'project': project,
        'other_projects': other_projects,
    }
    return render(request, 'portfolio/project_detail.html', context)


def huck_view(request):
    profile = get_profile()
    photos = GalleryItem.objects.all()
    context = {
        'profile': profile,
        'photos': photos,
    }
    return render(request, 'portfolio/huck.html', context)


def contact_submit_view(request):
    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', '').strip()
        message = request.POST.get('message', '').strip()

        if name and email and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': True, 'message': 'Thank you! Your message has been received.'})
            messages.success(request, 'Thank you! Your message has been sent successfully.')
        else:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'message': 'Please fill in all required fields.'}, status=400)
            messages.error(request, 'Please complete all required fields.')

    return redirect('home')


# ==========================================
# AUTHENTICATION VIEWS
# ==========================================

def admin_login_view(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('dashboard_home')

    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('dashboard_home')
        else:
            error_message = "Invalid username or password. Please try again."

    return render(request, 'portfolio/admin/login.html', {'error_message': error_message})


def admin_logout_view(request):
    logout(request)
    messages.success(request, "You have been successfully logged out.")
    return redirect('admin_login')


def staff_required(view_func):
    return login_required(view_func, login_url='admin_login')


# ==========================================
# DASHBOARD OVERVIEW
# ==========================================

@staff_required
def dashboard_home_view(request):
    profile = get_profile()
    context = {
        'profile': profile,
        'stats_count': KeyStat.objects.count(),
        'projects_count': Project.objects.count(),
        'experiences_count': Experience.objects.count(),
        'references_count': Reference.objects.count(),
        'gallery_count': GalleryItem.objects.count(),
        'focus_areas_count': FocusArea.objects.count(),
        'skills_count': SkillCategory.objects.count(),
        'messages_unread': ContactMessage.objects.filter(is_read=False).count(),
        'all_projects': Project.objects.all(),
        'all_experiences': Experience.objects.all(),
        'all_skills': SkillCategory.objects.prefetch_related('case_links').all(),
        'all_focus_areas': FocusArea.objects.all(),
        'all_stats': KeyStat.objects.all(),
        'all_references': Reference.objects.all(),
        'all_gallery': GalleryItem.objects.all(),
        'all_categories': ProjectCategory.objects.all(),
        'recent_projects': Project.objects.all()[:5],
        'recent_messages': ContactMessage.objects.all()[:15],
        'active_section': 'dashboard',
    }
    return render(request, 'portfolio/admin/dashboard.html', context)


@staff_required
def dashboard_profile_view(request):
    return redirect('dashboard_home_hero')


# ==========================================
# 1. HOME MENU VIEWS (Hero, What I work on, Skills)
# ==========================================

# 1.1 Hero Section & Stats
@staff_required
def dashboard_home_hero_view(request):
    profile = get_profile()
    stats = KeyStat.objects.all()
    if request.method == 'POST' and 'save_hero' in request.POST:
        form = HeroSectionForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, "Hero Section settings updated successfully!")
            return redirect('dashboard_home_hero')
        else:
            messages.error(request, "Please correct the errors in the Hero form below.")
    else:
        form = HeroSectionForm(instance=profile)

    context = {
        'form': form,
        'profile': profile,
        'stats': stats,
        'active_section': 'home_hero',
    }
    return render(request, 'portfolio/admin/home_hero.html', context)


# 1.2 What I work on (Section title + Focus Area Cards)
@staff_required
def dashboard_home_work_view(request):
    profile = get_profile()
    items = FocusArea.objects.all()
    if request.method == 'POST' and 'save_header' in request.POST:
        header_form = WhatIWorkOnHeaderForm(request.POST, instance=profile)
        if header_form.is_valid():
            header_form.save()
            messages.success(request, "Section headers updated successfully!")
            return redirect('dashboard_home_work')
        else:
            messages.error(request, "Please correct the errors in the header form.")
    else:
        header_form = WhatIWorkOnHeaderForm(instance=profile)

    context = {
        'header_form': header_form,
        'items': items,
        'active_section': 'home_work',
    }
    return render(request, 'portfolio/admin/home_work.html', context)


# 1.3 Skills & tooling (Section title + Skill Categories)
@staff_required
def dashboard_home_skills_view(request):
    profile = get_profile()
    items = SkillCategory.objects.prefetch_related('case_links').all()
    if request.method == 'POST' and 'save_header' in request.POST:
        header_form = SkillsHeaderForm(request.POST, instance=profile)
        if header_form.is_valid():
            header_form.save()
            messages.success(request, "Skills section headers updated successfully!")
            return redirect('dashboard_home_skills')
        else:
            messages.error(request, "Please correct the errors in the skills header form.")
    else:
        header_form = SkillsHeaderForm(instance=profile)

    context = {
        'header_form': header_form,
        'items': items,
        'active_section': 'home_skills',
    }
    return render(request, 'portfolio/admin/home_skills.html', context)


# ==========================================
# 2. ABOUT MENU VIEWS (About me, Experience)
# ==========================================

# 2.1 About me (Bio, Photo, Socials, Home Page Toggle)
@staff_required
def dashboard_about_me_view(request):
    profile = get_profile()
    if request.method == 'POST':
        form = AboutMeForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, "About Me biography & home display settings updated!")
            return redirect('dashboard_about_me')
        else:
            messages.error(request, "Please correct the errors in the About Me form.")
    else:
        form = AboutMeForm(instance=profile)

    context = {
        'form': form,
        'profile': profile,
        'active_section': 'about_me',
    }
    return render(request, 'portfolio/admin/about_me.html', context)


# 2.2 Experience (Career Timeline CRUD)
@staff_required
def dashboard_about_exp_view(request):
    items = Experience.objects.all()
    return render(request, 'portfolio/admin/experience_list.html', {'items': items, 'active_section': 'about_exp'})


# 2.3 Academic & Professional References CRUD
@staff_required
def dashboard_references_view(request):
    items = Reference.objects.all()
    return render(request, 'portfolio/admin/references_list.html', {'items': items, 'active_section': 'about_references'})


@staff_required
def dashboard_reference_edit_view(request, pk=None):
    instance = get_object_or_404(Reference, pk=pk) if pk else None
    if request.method == 'POST':
        form = ReferenceForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Academic reference saved successfully!")
            return redirect('dashboard_references')
    else:
        form = ReferenceForm(instance=instance)
    return render(request, 'portfolio/admin/generic_form.html', {
        'form': form,
        'title': 'Edit Academic Reference' if pk else 'Add New Academic Reference',
        'active_section': 'about_references',
        'back_url': 'dashboard_references',
    })


@staff_required
def dashboard_reference_delete_view(request, pk):
    item = get_object_or_404(Reference, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Reference deleted successfully.")
        return redirect('dashboard_references')
    return render(request, 'portfolio/admin/confirm_delete.html', {
        'item_name': f"Academic Reference: {item.name}",
        'cancel_url': 'dashboard_references'
    })


# ==========================================
# 3. PROJECT MENU VIEWS (Projects Upload & CRUD)
# ==========================================

@staff_required
def dashboard_project_menu_view(request):
    profile = get_profile()
    items = Project.objects.all()
    categories = ProjectCategory.objects.prefetch_related('projects').all()
    if request.method == 'POST' and 'save_header' in request.POST:
        header_form = ProjectsPageHeaderForm(request.POST, instance=profile)
        if header_form.is_valid():
            header_form.save()
            messages.success(request, "Projects page headline & description updated!")
            return redirect('dashboard_project_menu')
    else:
        header_form = ProjectsPageHeaderForm(instance=profile)

    context = {
        'header_form': header_form,
        'items': items,
        'categories': categories,
        'active_section': 'project_menu',
    }
    return render(request, 'portfolio/admin/projects_manage.html', context)


# ==========================================
# REUSABLE CRUD ACTIONS (Stats, Focus Area, Skill, Experience, Project, Gallery, Messages)
# ==========================================

# Key Stats
@staff_required
def dashboard_stats_view(request):
    return redirect('dashboard_home_hero')

@staff_required
def dashboard_stat_edit_view(request, pk=None):
    instance = get_object_or_404(KeyStat, pk=pk) if pk else None
    if request.method == 'POST':
        form = KeyStatForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Key statistic saved successfully!")
            return redirect('dashboard_home_hero')
    else:
        form = KeyStatForm(instance=instance)

    return render(request, 'portfolio/admin/generic_form.html', {
        'form': form, 'instance': instance, 'active_section': 'home_hero',
        'title': 'Edit Statistic' if pk else 'Add New Statistic',
    })

@staff_required
def dashboard_stat_delete_view(request, pk):
    item = get_object_or_404(KeyStat, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Statistic deleted.")
        return redirect('dashboard_home_hero')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_home_hero', 'active_section': 'home_hero'})


# Focus Areas
@staff_required
def dashboard_focus_areas_view(request):
    return redirect('dashboard_home_work')

@staff_required
def dashboard_focus_area_edit_view(request, pk=None):
    instance = get_object_or_404(FocusArea, pk=pk) if pk else None
    if request.method == 'POST':
        form = FocusAreaForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Focus area saved successfully!")
            return redirect('dashboard_home_work')
    else:
        form = FocusAreaForm(instance=instance)

    return render(request, 'portfolio/admin/generic_form.html', {
        'form': form, 'instance': instance, 'active_section': 'home_work',
        'title': 'Edit Focus Area' if pk else 'Add Focus Area',
    })

@staff_required
def dashboard_focus_area_delete_view(request, pk):
    item = get_object_or_404(FocusArea, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Focus area deleted.")
        return redirect('dashboard_home_work')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_home_work', 'active_section': 'home_work'})


# Skills
@staff_required
def dashboard_skills_view(request):
    return redirect('dashboard_home_skills')

@staff_required
def dashboard_skill_edit_view(request, pk=None):
    instance = get_object_or_404(SkillCategory, pk=pk) if pk else None
    if request.method == 'POST':
        form = SkillCategoryForm(request.POST, instance=instance)
        if form.is_valid():
            category = form.save()
            case_titles = request.POST.getlist('link_title[]')
            case_slugs = request.POST.getlist('link_slug[]')
            category.case_links.all().delete()
            for order, (t, s) in enumerate(zip(case_titles, case_slugs), start=1):
                if t.strip() and s.strip():
                    SkillCaseLink.objects.create(category=category, title=t.strip(), project_slug=s.strip(), order=order)

            messages.success(request, "Skill category saved successfully!")
            return redirect('dashboard_home_skills')
    else:
        form = SkillCategoryForm(instance=instance)

    return render(request, 'portfolio/admin/skill_form.html', {
        'form': form,
        'instance': instance,
        'projects': Project.objects.all(),
        'active_section': 'home_skills',
        'title': 'Edit Skill Category' if pk else 'Add Skill Category',
    })

@staff_required
def dashboard_skill_delete_view(request, pk):
    item = get_object_or_404(SkillCategory, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Skill category deleted.")
        return redirect('dashboard_home_skills')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_home_skills', 'active_section': 'home_skills'})


# Projects
@staff_required
def dashboard_projects_view(request):
    return redirect('dashboard_project_menu')

@staff_required
def dashboard_project_edit_view(request, pk=None):
    instance = get_object_or_404(Project, pk=pk) if pk else None
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Project / Case study saved successfully!")
            return redirect('dashboard_project_menu')
    else:
        form = ProjectForm(instance=instance)

    return render(request, 'portfolio/admin/project_form.html', {
        'form': form, 'instance': instance, 'active_section': 'project_menu',
        'title': 'Edit Project' if pk else 'Add New Project',
    })

@staff_required
def dashboard_project_delete_view(request, pk):
    item = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Project deleted.")
        return redirect('dashboard_project_menu')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_project_menu', 'active_section': 'project_menu'})


# Project Categories CRUD
@staff_required
def dashboard_category_edit_view(request, pk=None):
    instance = get_object_or_404(ProjectCategory, pk=pk) if pk else None
    if request.method == 'POST':
        form = ProjectCategoryForm(request.POST, instance=instance)
        if form.is_valid():
            cat = form.save()
            # If category slug changed, sync related projects' category field
            Project.objects.filter(category_ref=cat).update(category=cat.slug)
            messages.success(request, f"Category '{cat.name}' saved successfully!")
            return redirect('dashboard_project_menu')
    else:
        form = ProjectCategoryForm(instance=instance)

    return render(request, 'portfolio/admin/generic_form.html', {
        'form': form,
        'instance': instance,
        'active_section': 'project_menu',
        'back_url': 'dashboard_project_menu',
        'title': f"Edit Category: {instance.name}" if pk else "Add Project Category / Filter Tab",
    })


@staff_required
def dashboard_category_delete_view(request, pk):
    item = get_object_or_404(ProjectCategory, pk=pk)
    if request.method == 'POST':
        cat_name = item.name
        item.delete()
        messages.success(request, f"Category '{cat_name}' deleted.")
        return redirect('dashboard_project_menu')
    return render(request, 'portfolio/admin/confirm_delete.html', {
        'item': item,
        'back_url': 'dashboard_project_menu',
        'active_section': 'project_menu'
    })


# Experience
@staff_required
def dashboard_experience_view(request):
    return redirect('dashboard_about_exp')

@staff_required
def dashboard_experience_edit_view(request, pk=None):
    instance = get_object_or_404(Experience, pk=pk) if pk else None
    if request.method == 'POST':
        form = ExperienceForm(request.POST, instance=instance)
        if form.is_valid():
            form.save()
            messages.success(request, "Experience role saved successfully!")
            return redirect('dashboard_about_exp')
    else:
        form = ExperienceForm(instance=instance)

    return render(request, 'portfolio/admin/generic_form.html', {
        'form': form, 'instance': instance, 'active_section': 'about_exp',
        'title': 'Edit Experience' if pk else 'Add New Experience',
    })

@staff_required
def dashboard_experience_delete_view(request, pk):
    item = get_object_or_404(Experience, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Experience item deleted.")
        return redirect('dashboard_about_exp')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_about_exp', 'active_section': 'about_exp'})


# Gallery
@staff_required
def dashboard_gallery_view(request):
    items = GalleryItem.objects.all()
    return render(request, 'portfolio/admin/gallery_list.html', {'items': items, 'active_section': 'gallery'})

@staff_required
def dashboard_gallery_add_view(request):
    if request.method == 'POST':
        form = GalleryItemForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Photo uploaded to gallery!")
            return redirect('dashboard_gallery')
    else:
        form = GalleryItemForm()

    return render(request, 'portfolio/admin/generic_form.html', {'form': form, 'title': 'Upload Photo', 'active_section': 'gallery'})

@staff_required
def dashboard_gallery_delete_view(request, pk):
    item = get_object_or_404(GalleryItem, pk=pk)
    if request.method == 'POST':
        item.delete()
        messages.success(request, "Photo removed from gallery.")
        return redirect('dashboard_gallery')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': item, 'back_url': 'dashboard_gallery', 'active_section': 'gallery'})


# Messages
@staff_required
def dashboard_messages_view(request):
    items = ContactMessage.objects.all()
    return render(request, 'portfolio/admin/messages_list.html', {'items': items, 'active_section': 'messages'})

@staff_required
def dashboard_message_toggle_read_view(request, pk):
    msg = get_object_or_404(ContactMessage, pk=pk)
    msg.is_read = not msg.is_read
    msg.save()
    return redirect('dashboard_messages')

@staff_required
def dashboard_message_delete_view(request, pk):
    msg = get_object_or_404(ContactMessage, pk=pk)
    if request.method == 'POST':
        msg.delete()
        messages.success(request, "Message deleted.")
        return redirect('dashboard_messages')
    return render(request, 'portfolio/admin/confirm_delete.html', {'item': msg, 'back_url': 'dashboard_messages', 'active_section': 'messages'})
