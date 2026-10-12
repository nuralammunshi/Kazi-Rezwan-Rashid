from .models import ProfileSettings, Project

def portfolio_context(request):
    """Global context available to all templates."""
    profile = ProfileSettings.objects.first()
    if not profile:
        profile = ProfileSettings()
        
    return {
        'profile': profile,
        'recent_projects': Project.objects.all()[:5],
    }
