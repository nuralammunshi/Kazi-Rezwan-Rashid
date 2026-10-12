from django import forms
from .models import (
    ProfileSettings, KeyStat, FocusArea, SkillCategory, 
    SkillCaseLink, Project, ProjectCategory, Experience, GalleryItem, Reference
)


class ProfileSettingsForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),
            'brand_kicker': forms.TextInput(attrs={'class': 'form-input'}),
            'status_chip': forms.TextInput(attrs={'class': 'form-input'}),
            'hero_title': forms.Textarea(attrs={'class': 'form-input', 'rows': 2}),
            'hero_lead': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'email': forms.EmailInput(attrs={'class': 'form-input'}),
            'linkedin_url': forms.URLInput(attrs={'class': 'form-input'}),
            'github_url': forms.URLInput(attrs={'class': 'form-input'}),
            'medium_url': forms.URLInput(attrs={'class': 'form-input'}),
            'external_link_title': forms.TextInput(attrs={'class': 'form-input'}),
            'external_link_url': forms.URLInput(attrs={'class': 'form-input'}),
            'about_pull_quote': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_p1': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_p2': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_hero_lead': forms.TextInput(attrs={'class': 'form-input'}),
            'about_full_p1': forms.Textarea(attrs={'class': 'form-input', 'rows': 4}),
            'about_full_p2': forms.Textarea(attrs={'class': 'form-input', 'rows': 4}),
            'demo_badge': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_title': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'demo_tags': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_url': forms.URLInput(attrs={'class': 'form-input'}),
            'demo_domain_label': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_case_study_slug': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_caption': forms.Textarea(attrs={'class': 'form-input', 'rows': 2}),
            'what_i_work_on_title': forms.TextInput(attrs={'class': 'form-input'}),
            'what_i_work_on_sub': forms.TextInput(attrs={'class': 'form-input'}),
            'skills_title': forms.TextInput(attrs={'class': 'form-input'}),
            'skills_sub': forms.TextInput(attrs={'class': 'form-input'}),
            'projects_page_title': forms.TextInput(attrs={'class': 'form-input'}),
            'projects_page_lead': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
        }


class HeroSectionForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = [
            'name', 'brand_kicker', 'status_chip', 'hero_title', 'hero_lead',
            'avatar', 'resume_file',
            'diagram_head_label', 'diagram_stream_label', 'diagram_source', 'diagram_transport',
            'diagram_node_1_title', 'diagram_node_1_sub',
            'diagram_node_2_title', 'diagram_node_2_sub',
            'diagram_node_3_title', 'diagram_node_3_sub',
            'diagram_final_eyebrow', 'diagram_final_title', 'diagram_caption',
            'demo_badge', 'demo_title', 'demo_description', 'demo_tags', 'demo_url', 'demo_domain_label', 'demo_image', 'demo_case_study_slug'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input'}),
            'brand_kicker': forms.TextInput(attrs={'class': 'form-input'}),
            'status_chip': forms.TextInput(attrs={'class': 'form-input'}),
            'hero_title': forms.Textarea(attrs={'class': 'form-input', 'rows': 2}),
            'hero_lead': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'diagram_head_label': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_stream_label': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_source': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_transport': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_1_title': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_1_sub': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_2_title': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_2_sub': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_3_title': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_node_3_sub': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_final_eyebrow': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_final_title': forms.TextInput(attrs={'class': 'form-input'}),
            'diagram_caption': forms.Textarea(attrs={'class': 'form-input', 'rows': 2}),
            'demo_badge': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_title': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'demo_tags': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_url': forms.URLInput(attrs={'class': 'form-input'}),
            'demo_domain_label': forms.TextInput(attrs={'class': 'form-input'}),
            'demo_case_study_slug': forms.TextInput(attrs={'class': 'form-input'}),
        }


class WhatIWorkOnHeaderForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = ['what_i_work_on_title', 'what_i_work_on_sub']
        widgets = {
            'what_i_work_on_title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Section Headline'}),
            'what_i_work_on_sub': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Subtitle / Lead'}),
        }


class SkillsHeaderForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = ['skills_title', 'skills_sub']
        widgets = {
            'skills_title': forms.TextInput(attrs={'class': 'form-input'}),
            'skills_sub': forms.TextInput(attrs={'class': 'form-input'}),
        }


class AboutMeForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = [
            'show_about_on_home', 'about_pull_quote', 'about_p1', 'about_p2', 'about_photo',
            'about_hero_lead', 'about_full_p1', 'about_full_p2',
            'email', 'linkedin_url', 'github_url', 'medium_url',
            'external_link_title', 'external_link_url'
        ]
        widgets = {
            'about_pull_quote': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_p1': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_p2': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'about_hero_lead': forms.TextInput(attrs={'class': 'form-input'}),
            'about_full_p1': forms.Textarea(attrs={'class': 'form-input', 'rows': 4}),
            'about_full_p2': forms.Textarea(attrs={'class': 'form-input', 'rows': 4}),
            'email': forms.EmailInput(attrs={'class': 'form-input'}),
            'linkedin_url': forms.URLInput(attrs={'class': 'form-input'}),
            'github_url': forms.URLInput(attrs={'class': 'form-input'}),
            'medium_url': forms.URLInput(attrs={'class': 'form-input'}),
            'external_link_title': forms.TextInput(attrs={'class': 'form-input'}),
            'external_link_url': forms.URLInput(attrs={'class': 'form-input'}),
        }


class ProjectsPageHeaderForm(forms.ModelForm):
    class Meta:
        model = ProfileSettings
        fields = ['projects_page_title', 'projects_page_lead']
        widgets = {
            'projects_page_title': forms.TextInput(attrs={'class': 'form-input'}),
            'projects_page_lead': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
        }


class KeyStatForm(forms.ModelForm):
    class Meta:
        model = KeyStat
        fields = ['number', 'label', 'order']
        widgets = {
            'number': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. 6+, Real-time, 99%'}),
            'label': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Years in applied AI/ML'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class FocusAreaForm(forms.ModelForm):
    class Meta:
        model = FocusArea
        fields = ['icon_class', 'title', 'description', 'order']
        widgets = {
            'icon_class': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. lnr lnr-magic-wand, lnr lnr-bubble'}),
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Generative AI'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class SkillCategoryForm(forms.ModelForm):
    class Meta:
        model = SkillCategory
        fields = ['title', 'icon_class', 'tools_list', 'order']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. GenAI & LLMs'}),
            'icon_class': forms.TextInput(attrs={'class': 'form-input'}),
            'tools_list': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Comma-separated: Claude Code, OpenAI, RAG'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class ProjectCategoryForm(forms.ModelForm):
    class Meta:
        model = ProjectCategory
        fields = ['name', 'slug', 'description', 'order']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Generative AI, Real-Time NLP'}),
            'slug': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. genai, nlp, credit (leave blank to auto-generate)'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Group subtitle/description shown on /projects/ page'}),
            'order': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': '1'}),
        }


class ProjectForm(forms.ModelForm):
    category_ref = forms.ModelChoiceField(
        queryset=ProjectCategory.objects.all(),
        required=False,
        empty_label="-- Select Category --",
        widget=forms.Select(attrs={'class': 'form-input'})
    )

    class Meta:
        model = Project
        fields = [
            'title', 'slug', 'category_ref', 'category', 'category_label', 'index_number',
            'short_description', 'tech_stack', 'metrics_text',
            'kicker', 'lede', 'hero_image', 'hero_caption',
            'architecture_snippet', 'content',
            'live_demo_url', 'github_url', 'is_featured', 'order'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Project Title'}),
            'slug': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'unique-slug'}),
            'category': forms.HiddenInput(),
            'category_label': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Display category label (e.g. Generative AI, Retrieval · RAG)'}),
            'index_number': forms.TextInput(attrs={'class': 'form-input', 'placeholder': '01'}),
            'short_description': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'tech_stack': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Comma-separated: GPT-4, Kafka, Python'}),
            'metrics_text': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Real-time: Mid-call notes\nAgentic: Draft + review'}),
            'kicker': forms.TextInput(attrs={'class': 'form-input'}),
            'lede': forms.Textarea(attrs={'class': 'form-input', 'rows': 3}),
            'hero_caption': forms.TextInput(attrs={'class': 'form-input'}),
            'architecture_snippet': forms.Textarea(attrs={'class': 'form-input font-mono', 'rows': 5}),
            'content': forms.Textarea(attrs={'class': 'form-input', 'rows': 8}),
            'live_demo_url': forms.URLInput(attrs={'class': 'form-input'}),
            'github_url': forms.URLInput(attrs={'class': 'form-input'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        cat_ref = cleaned_data.get('category_ref')
        cat_str = cleaned_data.get('category') or self.data.get('category')
        if not cat_ref and cat_str:
            matched_cat = ProjectCategory.objects.filter(slug=cat_str).first()
            if matched_cat:
                cleaned_data['category_ref'] = matched_cat
                cleaned_data['category'] = matched_cat.slug
            else:
                cleaned_data['category'] = cat_str
        elif cat_ref:
            cleaned_data['category'] = cat_ref.slug
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        cat_ref = self.cleaned_data.get('category_ref')
        cat_str = self.cleaned_data.get('category') or self.data.get('category')
        if cat_ref:
            instance.category_ref = cat_ref
            instance.category = cat_ref.slug
            if not instance.category_label:
                instance.category_label = cat_ref.name
        elif cat_str:
            cat = ProjectCategory.objects.filter(slug=cat_str).first()
            if cat:
                instance.category_ref = cat
                instance.category = cat.slug
            else:
                instance.category = cat_str
        if commit:
            instance.save()
        return instance


class ExperienceForm(forms.ModelForm):
    class Meta:
        model = Experience
        fields = [
            'year_range', 'title', 'organization', 'organization_url', 'highlight_note',
            'has_details', 'is_current', 'is_open_by_default', 'show_on_home',
            'description', 'tech_stack', 'related_links', 'order'
        ]
        widgets = {
            'year_range': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. 2024–now'}),
            'title': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Role Title / Degree'}),
            'organization': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Company or Institution'}),
            'organization_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://example.com/department'}),
            'highlight_note': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Short highlight badge'}),
            'description': forms.Textarea(attrs={'class': 'form-input', 'rows': 4}),
            'tech_stack': forms.TextInput(attrs={'class': 'form-input'}),
            'related_links': forms.Textarea(attrs={'class': 'form-input', 'rows': 3, 'placeholder': 'Title | slug\nTitle | slug'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class GalleryItemForm(forms.ModelForm):
    class Meta:
        model = GalleryItem
        fields = ['title', 'image', 'caption', 'alt_text', 'order']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-input'}),
            'caption': forms.TextInput(attrs={'class': 'form-input'}),
            'alt_text': forms.TextInput(attrs={'class': 'form-input'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class ReferenceForm(forms.ModelForm):
    class Meta:
        model = Reference
        fields = [
            'name', 'qualifications', 'designation', 'relationship', 'department',
            'institution', 'address', 'institution_url', 'email', 'phone',
            'order', 'is_active'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Md. Golam Moazzam, PhD'}),
            'qualifications': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. BSc (JU), MSc (The University of Edinburgh, UK)'}),
            'designation': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Professor / Associate Professor'}),
            'relationship': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Academic Mentor & Research Supervisor'}),
            'department': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Department of Computer Science and Engineering'}),
            'institution': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Jahangirnagar University'}),
            'address': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. Savar, Dhaka-1342, Bangladesh'}),
            'institution_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://juniv.edu/department/cse'}),
            'email': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. khokan@juniv.edu'}),
            'phone': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'e.g. 01922-230643'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }

