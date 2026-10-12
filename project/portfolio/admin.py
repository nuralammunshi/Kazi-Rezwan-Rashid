from django.contrib import admin
from django.utils.html import format_html
from .models import (
    ProfileSettings, KeyStat, FocusArea, SkillCategory, 
    SkillCaseLink, Project, ProjectCategory, Experience, GalleryItem, ContactMessage,
    Reference
)

admin.site.site_header = "Portfolio Control Center"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Manage Website Content, Projects & Settings"


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order", "project_count")
    list_editable = ("order",)
    search_fields = ("name", "slug", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("order", "id")

    def project_count(self, obj):
        return obj.projects.count()
    project_count.short_description = "Projects"


@admin.register(ProfileSettings)
class ProfileSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Site Owner & Brand Identity", {
            "fields": ("name", "brand_kicker", "status_chip", "hero_title", "hero_lead", "avatar", "resume_file")
        }),
        ("Contact & Social Links", {
            "fields": ("email", "linkedin_url", "github_url", "medium_url", "external_link_title", "external_link_url")
        }),
        ("Hero Architecture Diagram", {
            "fields": (
                "diagram_head_label", "diagram_stream_label", "diagram_source", "diagram_transport",
                ("diagram_node_1_title", "diagram_node_1_sub"),
                ("diagram_node_2_title", "diagram_node_2_sub"),
                ("diagram_node_3_title", "diagram_node_3_sub"),
                "diagram_final_eyebrow", "diagram_final_title", "diagram_caption"
            ),
            "classes": ("collapse",)
        }),
        ("Home Page About Me Teaser", {
            "fields": ("about_pull_quote", "about_p1", "about_p2", "about_photo")
        }),
        ("About Page Full Biography", {
            "fields": ("about_hero_lead", "about_full_p1", "about_full_p2"),
            "classes": ("collapse",)
        }),
        ("Featured Live Demo Component", {
            "fields": ("demo_badge", "demo_title", "demo_description", "demo_tags", "demo_url", "demo_domain_label", "demo_image", "demo_case_study_slug")
        }),
        ("Companion / Pet (Huck) Section", {
            "fields": ("huck_title", "huck_subtitle", "huck_hero_image")
        }),
    )

    def has_add_permission(self, request):
        return not ProfileSettings.objects.exists()


@admin.register(KeyStat)
class KeyStatAdmin(admin.ModelAdmin):
    list_display = ("label", "number", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(FocusArea)
class FocusAreaAdmin(admin.ModelAdmin):
    list_display = ("title", "icon_class", "order")
    list_editable = ("order",)
    search_fields = ("title", "description")
    ordering = ("order",)


class SkillCaseLinkInline(admin.TabularInline):
    model = SkillCaseLink
    extra = 1


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "icon_class", "tools_list", "order")
    list_editable = ("order",)
    inlines = [SkillCaseLinkInline]
    ordering = ("order",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "index_number", "category_ref", "category", "category_label", "is_featured", "order", "image_preview")
    list_editable = ("is_featured", "order")
    list_filter = ("category_ref", "is_featured")
    search_fields = ("title", "short_description", "tech_stack", "content")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order", "id")
    
    fieldsets = (
        ("Basic Information", {
            "fields": (("title", "slug"), ("category_ref", "category_label"), ("index_number", "order"), "is_featured")
        }),
        ("Card Presentation", {
            "fields": ("short_description", "tech_stack", "metrics_text", "hero_image", "hero_caption")
        }),
        ("Case Study Detail Page", {
            "fields": ("kicker", "lede", "content", "architecture_snippet")
        }),
        ("External Links", {
            "fields": ("live_demo_url", "github_url")
        }),
    )

    def image_preview(self, obj):
        if obj.hero_image:
            return format_html('<img src="{}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" />', obj.hero_image.url)
        return "-"
    image_preview.short_description = "Image"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "year_range", "is_current", "is_open_by_default", "order")
    list_editable = ("is_current", "is_open_by_default", "order")
    list_filter = ("is_current", "has_details")
    search_fields = ("title", "organization", "description", "highlight_note")
    ordering = ("order", "id")

    fieldsets = (
        ("Timeline Header", {
            "fields": (("year_range", "order"), ("title", "organization"), "organization_url", "highlight_note", ("is_current", "is_open_by_default", "has_details"))
        }),
        ("Details & Case Study Links", {
            "fields": ("description", "tech_stack", "related_links")
        }),
    )


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "image_preview", "caption")
    list_editable = ("order",)
    search_fields = ("title", "caption")
    ordering = ("order", "id")

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Preview"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_read")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("name", "email", "subject", "message", "created_at")
    ordering = ("-created_at",)


@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "institution", "email", "phone", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("name", "designation", "department", "institution", "email", "phone")
    ordering = ("order", "id")

