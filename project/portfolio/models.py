from django.db import models
from django.utils.text import slugify


class ProfileSettings(models.Model):
    """Singleton site profile configuration."""
    name = models.CharField(max_length=120, default="Harrison Jansma", blank=True, help_text="Site owner name (e.g. Kazi Rezwan Rashid or Harrison Jansma)")
    brand_kicker = models.CharField(max_length=150, default="ML Engineering · GenAI", blank=True, help_text="Short subtitle under brand name")
    status_chip = models.CharField(max_length=150, default="ML Engineer & Data Science Manager", blank=True, help_text="Live status chip text in hero")
    hero_title = models.CharField(max_length=200, default="Harrison\nJansma", blank=True, help_text="Large hero headline (use newline for line break)")
    hero_lead = models.TextField(
        default="I build generative-AI systems that reach production — real-time LLM tools, RAG, and NLP at scale — and lead the teams that ship them.",
        blank=True
    )
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True, help_text="Profile picture for hero")
    resume_file = models.FileField(upload_to="resumes/", blank=True, null=True, help_text="Resume PDF file")
    
    # Contact info & social links
    email = models.EmailField(default="contact@harrisonjansma.com", blank=True)
    linkedin_url = models.URLField(blank=True, default="https://www.linkedin.com/in/kazi-rezwan-rashid-043686183/")
    github_url = models.URLField(blank=True, default="https://github.com/harrisonjansma")
    medium_url = models.URLField(blank=True, default="")
    external_link_title = models.CharField(max_length=60, default="", blank=True)
    external_link_url = models.URLField(blank=True, default="")
    
    # Architecture Diagram on Hero
    diagram_head_label = models.CharField(max_length=120, default="contact-center genai · architecture", blank=True)
    diagram_stream_label = models.CharField(max_length=80, default="streaming", blank=True)
    diagram_source = models.CharField(max_length=120, default="Live customer call", blank=True)
    diagram_transport = models.CharField(max_length=120, default="Streaming transcript → Kafka", blank=True)
    diagram_node_1_title = models.CharField(max_length=80, default="Agentic summarization", blank=True)
    diagram_node_1_sub = models.CharField(max_length=80, default="GPT · judge", blank=True)
    diagram_node_2_title = models.CharField(max_length=80, default="Procedure RAG", blank=True)
    diagram_node_2_sub = models.CharField(max_length=80, default="pgvector", blank=True)
    diagram_node_3_title = models.CharField(max_length=80, default="Frustration detection", blank=True)
    diagram_node_3_sub = models.CharField(max_length=80, default="LLM", blank=True)
    diagram_final_eyebrow = models.CharField(max_length=100, default="delivered mid-conversation", blank=True)
    diagram_final_title = models.CharField(max_length=120, default="Servicing agent desktop", blank=True)
    diagram_caption = models.TextField(
        default="The shape of three production systems below — one live audio stream, three models, sub-second delivery.",
        blank=True
    )
    
    # About Section Preview on Home Page
    about_pull_quote = models.TextField(
        default="I'm a Machine Learning Engineer and Data Science Manager at Capital One, where I lead Generative AI for the contact centers — LLM-powered, agentic tools that augment thousands of servicing agents live, mid-conversation.",
        blank=True
    )
    about_p1 = models.TextField(
        default="Over six years I've taken applied AI from prototype to production: real-time NLP, RAG, low-latency streaming inference, and the credit-risk ML that decisions loans at large scale.",
        blank=True
    )
    about_p2 = models.TextField(
        default="What drives me is making a product measurably better for the people using it. Outside work: science fiction (Dune above all), strategy games, and time with my wife Amy and our dog Huck.",
        blank=True
    )
    about_photo = models.ImageField(upload_to="profile/", blank=True, null=True)

    # Full About Page Content
    about_hero_lead = models.CharField(
        max_length=255, 
        default="Machine Learning Engineer & Data Science Manager. I lead Generative AI for Capital One's contact centers.",
        blank=True
    )
    about_full_p1 = models.TextField(
        default="At the start of 2018 I'd just finished a math and business degree at Baylor and had no idea where my career was headed. After some honest reflection, I committed to learning everything I could about machine learning and the tech industry — teaching myself, writing about it, and taking on freelance and research work while I earned a master's in Computer Science from UT Dallas.",
        blank=True
    )
    about_full_p2 = models.TextField(
        default="Six years later, I'm a Data Science Manager at Capital One, leading Generative AI for our contact centers. My teams build real-time, LLM-powered tools that help thousands of servicing agents mid-conversation — agentic summarization, retrieval-augmented generation over live transcripts, and streaming sentiment and complaint detection. Along the way I've also built the auto-loan underwriting models that decision loans at large scale. I care most about taking hard, ambiguous problems from prototype to production, and about the measurable difference that makes for the people on the other end.",
        blank=True
    )

    # Featured Live Demo (Hero card on Home & Projects)
    demo_badge = models.CharField(max_length=100, default="Live demo · you can try this one", blank=True)
    demo_title = models.CharField(max_length=150, default="Live Call Copilot", blank=True)
    demo_description = models.TextField(
        default="A public rebuild of the shape of the three systems below, running live in your browser. Talk into your mic — or play a sample call — and watch a two-voice transcript, self-drafting notes, RAG-retrieved procedure docs, and a sub-second frustration alert, all from a single WebSocket. Deepgram + OpenAI composed into a real-time product; no proprietary anything.",
        blank=True
    )
    demo_tags = models.CharField(max_length=255, default="Next.js, Deepgram, OpenAI, pgvector, Railway", blank=True, help_text="Comma-separated tags")
    demo_url = models.URLField(default="https://agentassistdemo.harrisonjansma.com/", blank=True)
    demo_domain_label = models.CharField(max_length=100, default="agentassistdemo.harrisonjansma.com", blank=True)
    demo_image = models.ImageField(upload_to="demos/", blank=True, null=True)
    demo_case_study_slug = models.CharField(max_length=100, default="call-copilot", blank=True, help_text="Slug of the project write-up")

    # Huck companion section
    huck_title = models.CharField(max_length=100, default="Huckleberry", blank=True)
    huck_subtitle = models.CharField(max_length=150, default="The greatest dog in the world.", blank=True)
    huck_hero_image = models.ImageField(upload_to="gallery/", blank=True, null=True)

    # Section Titles & Home Display Toggles
    show_about_on_home = models.BooleanField(default=True, help_text="Option to display About Me section on Home Page")
    what_i_work_on_title = models.CharField(max_length=150, default="From research to real-time production", blank=True)
    what_i_work_on_sub = models.CharField(max_length=200, default="The problems I love solving.", blank=True)
    skills_title = models.CharField(max_length=150, default="The stack I reach for", blank=True)
    skills_sub = models.CharField(max_length=200, default="Taking models to production — tap a skill to read the case study.", blank=True)
    projects_page_title = models.CharField(max_length=150, default="systems, prototype to production", blank=True)
    projects_page_lead = models.TextField(default="Generative AI and real-time NLP augmenting thousands of contact-center agents, credit models decisioning loans at large scale, and the earlier research and big-data work that got me there.", blank=True)

    class Meta:
        verbose_name = "Profile & Site Settings"
        verbose_name_plural = "Profile & Site Settings"

    def __str__(self):
        return f"{self.name} - Site Profile"


class KeyStat(models.Model):
    """Metric cards shown on the hero section."""
    number = models.CharField(max_length=50, help_text="e.g. 6+, Real-time, LLM · RAG")
    label = models.CharField(max_length=100, help_text="e.g. Years in applied AI/ML")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Key Statistic"
        verbose_name_plural = "Key Statistics"

    def __str__(self):
        return f"{self.number} - {self.label}"


class FocusArea(models.Model):
    """The 6 grid tiles: What I work on / From research to real-time production."""
    icon_class = models.CharField(max_length=80, default="lnr lnr-magic-wand", help_text="Linearicons or FontAwesome class")
    title = models.CharField(max_length=120)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Focus Area"
        verbose_name_plural = "Focus Areas (What I Work On)"

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    """Skills & tooling cards (e.g. GenAI & LLMs, ML & NLP, Systems & Leadership)."""
    title = models.CharField(max_length=100)
    icon_class = models.CharField(max_length=80, default="lnr lnr-magic-wand")
    tools_list = models.CharField(max_length=300, help_text="Comma-separated tools (e.g. Claude Code, OpenAI, RAG, pgvector)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.title

    @property
    def tools(self):
        return [t.strip() for t in self.tools_list.split(',') if t.strip()]


class SkillCaseLink(models.Model):
    """Link to case study inside a skill category card."""
    category = models.ForeignKey(SkillCategory, related_name="case_links", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    project_slug = models.CharField(max_length=100, help_text="Slug to link to (e.g. summarization, rag, sentiment)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.category.title} -> {self.title}"

    @property
    def target_url(self):
        if not self.project_slug:
            return "/projects/"
        slug = self.project_slug.strip()
        if slug.startswith('http://') or slug.startswith('https://') or slug.startswith('/'):
            return slug
        from portfolio.models import Project
        if Project.objects.filter(slug=slug).exists():
            from django.urls import reverse
            try:
                return reverse('project_detail', kwargs={'slug': slug})
            except Exception:
                return f"/projects/{slug}/"
        return "/projects/"

    @property
    def is_valid_project(self):
        if not self.project_slug:
            return False
        slug = self.project_slug.strip()
        if slug.startswith('http://') or slug.startswith('https://'):
            return True
        from portfolio.models import Project
        return Project.objects.filter(slug=slug).exists()


class ProjectCategory(models.Model):
    """Category / Filter tab for Projects."""
    name = models.CharField(max_length=100, help_text="Category name, e.g. Generative AI, Real-Time NLP")
    slug = models.SlugField(max_length=100, unique=True, help_text="Filter slug, e.g. genai, nlp, credit, earlier")
    description = models.TextField(blank=True, help_text="Group subtitle/description shown on /projects/ page")
    order = models.PositiveIntegerField(default=0, help_text="Display order in filter tabs and page sections")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Project Category"
        verbose_name_plural = "Project Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Case study / Project model."""
    CATEGORY_CHOICES = [
        ('genai', 'Generative AI'),
        ('nlp', 'Real-Time NLP'),
        ('credit', 'Credit ML'),
        ('earlier', 'Earlier Work'),
    ]

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=160, unique=True)
    category_ref = models.ForeignKey(
        ProjectCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='projects',
        help_text="Project category for dynamic filtering and grouping"
    )
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='genai')
    category_label = models.CharField(max_length=80, default="Generative AI", help_text="Display label e.g. Generative AI, Retrieval · RAG")
    index_number = models.CharField(max_length=10, blank=True, help_text="e.g. 01, 02, etc.")
    short_description = models.TextField(help_text="Card summary displayed in portfolio list")
    
    # Metrics pills (JSON or format: "Key: Value\nKey: Value")
    metrics_text = models.TextField(blank=True, help_text="Format: 'Real-time: Mid-call notes' (one per line)")
    
    # Tech stack pills
    tech_stack = models.CharField(max_length=255, blank=True, help_text="Comma-separated: GPT-4, Kafka, Python, AWS Lambda")
    
    # Detail page write-up
    kicker = models.CharField(max_length=150, blank=True, help_text="e.g. Generative-AI product · Real-time NLP")
    lede = models.TextField(blank=True, help_text="Opening summary paragraph with lede styling")
    hero_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    hero_caption = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True, help_text="Rich HTML content of the full case study")
    
    # Architecture / code snippet
    architecture_snippet = models.TextField(blank=True, help_text="ASCII diagram or code block")
    
    # Links
    live_demo_url = models.URLField(blank=True, help_text="Live demo external link if applicable")
    github_url = models.URLField(blank=True, help_text="GitHub repository URL")
    
    # Flags & Ordering
    is_featured = models.BooleanField(default=False, help_text="Show in Home page Selected Work section")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Project / Case Study"
        verbose_name_plural = "Projects & Case Studies"

    def __str__(self):
        return f"{self.index_number or ''} {self.title} ({self.get_category_display()})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if self.category_ref:
            self.category = self.category_ref.slug
            if not self.category_label:
                self.category_label = self.category_ref.name
        super().save(*args, **kwargs)

    @property
    def tags(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    @property
    def metrics_list(self):
        result = []
        if not self.metrics_text:
            return result
        for line in self.metrics_text.strip().splitlines():
            line = line.strip()
            if not line:
                continue
            if ':' in line:
                parts = line.split(':', 1)
                result.append({'title': parts[0].strip(), 'sub': parts[1].strip()})
            else:
                result.append({'title': line, 'sub': ''})
        return result


class Experience(models.Model):
    """Career timeline item on the About page."""
    year_range = models.CharField(max_length=50, help_text="e.g. 2024–now, 2022–24, 2018–19")
    title = models.CharField(max_length=150, help_text="Job title or degree")
    organization = models.CharField(max_length=150, help_text="Company or university")
    organization_url = models.URLField(blank=True, default="", help_text="Optional link to organization or department website")
    highlight_note = models.CharField(max_length=200, blank=True, help_text="Short subtitle/highlight note")
    
    # Expandable details
    has_details = models.BooleanField(default=True, help_text="Allow expanding to see description")
    is_open_by_default = models.BooleanField(default=False, help_text="Open panel by default (like current role)")
    is_current = models.BooleanField(default=False, help_text="Mark as current role badge")
    show_on_home = models.BooleanField(default=False, help_text="Option to showcase on Home Page")
    description = models.TextField(blank=True, help_text="Full description (supports paragraphs)")
    tech_stack = models.CharField(max_length=200, blank=True, help_text="e.g. LLMs · PyTorch · Kafka")
    
    # Related case studies pills
    related_links = models.TextField(blank=True, help_text="Format: 'Label | slug' (one per line)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Experience / Timeline"
        verbose_name_plural = "Experience Timeline"

    def __str__(self):
        return f"{self.year_range}: {self.title} at {self.organization}"

    @property
    def links_list(self):
        res = []
        if not self.related_links:
            return res
        for line in self.related_links.strip().splitlines():
            line = line.strip()
            if not line:
                continue
            if '|' in line:
                parts = line.split('|', 1)
                label = parts[0].strip()
                target = parts[1].strip()
                if target.startswith('http://') or target.startswith('https://'):
                    res.append({'label': label or target, 'url': target, 'slug': ''})
                elif target:
                    res.append({'label': label or target, 'url': '', 'slug': target})
                else:
                    res.append({'label': label, 'url': '', 'slug': ''})
            else:
                if line.startswith('http://') or line.startswith('https://'):
                    res.append({'label': line, 'url': line, 'slug': ''})
                else:
                    res.append({'label': line, 'url': '', 'slug': ''})
        return res


class GalleryItem(models.Model):
    """Photo gallery item (Huck / companion photos)."""
    title = models.CharField(max_length=120, default="Huckleberry")
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=120, default="Huckleberry")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Gallery Photo"
        verbose_name_plural = "Gallery Photos"

    def __str__(self):
        return f"Photo #{self.order}: {self.title}"


class ContactMessage(models.Model):
    """Inquiries submitted by website visitors."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"From {self.name} ({self.email}) at {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class Reference(models.Model):
    """Academic or Professional Reference."""
    name = models.CharField(max_length=150, help_text="Full Name and honorifics (e.g. Md. Golam Moazzam, PhD)")
    qualifications = models.CharField(max_length=200, blank=True, help_text="e.g. BSc (JU), MSc (The University of Edinburgh, UK)")
    designation = models.CharField(max_length=150, help_text="e.g. Professor, Associate Professor")
    department = models.CharField(max_length=150, default="Department of Computer Science and Engineering")
    institution = models.CharField(max_length=150, default="Jahangirnagar University")
    address = models.CharField(max_length=200, default="Savar, Dhaka-1342, Bangladesh", blank=True)
    institution_url = models.URLField(blank=True, default="https://juniv.edu/department/cse", help_text="University or Department website")
    email = models.CharField(max_length=250, help_text="Email address (or comma-separated if multiple)")
    phone = models.CharField(max_length=80, blank=True, help_text="Cell phone or office extension")
    relationship = models.CharField(max_length=150, blank=True, default="Academic Mentor & Research Supervisor", help_text="e.g. Thesis Supervisor, Academic Mentor")
    order = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Academic Reference"
        verbose_name_plural = "Academic References"

    def __str__(self):
        return f"{self.name} ({self.designation})"

    @property
    def email_list(self):
        if not self.email:
            return []
        return [e.strip() for e in self.email.split(',') if e.strip()]

    @property
    def initials(self):
        words = [w for w in self.name.replace(',', '').replace('.', '').split() if w.lower() not in ['md', 'phd', 'dr', 'prof', 'bsc', 'msc']]
        if len(words) >= 2:
            return (words[0][0] + words[1][0]).upper()
        elif len(words) == 1:
            return words[0][:2].upper()
        return "JU"


