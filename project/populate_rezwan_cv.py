import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import django

sys.path.insert(0, r'c:\My Web Sites\p\project')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from portfolio.models import (
    ProfileSettings, KeyStat, FocusArea, ProjectCategory,
    Project, SkillCategory, SkillCaseLink, Experience, Reference
)

def populate():
    print("=== Populating Website with Kazi Rezwan Rashid's CV Data ===")

    # 1. Profile & Site Settings
    profile = ProfileSettings.objects.first() or ProfileSettings()
    profile.name = "Kazi Rezwan Rashid"
    profile.brand_kicker = "Machine Learning Engineer · Computer Vision & Medical AI"
    profile.status_chip = "Lecturer in CSE & Machine Learning Researcher"
    profile.hero_title = "Kazi Rezwan\nRashid"
    profile.hero_lead = (
        "Lecturer in Computer Science & Engineering and Machine Learning Researcher specializing in "
        "Deep Learning, Computer Vision, and Medical Imaging — taking applied AI systems from research to production."
    )
    profile.email = "krezwan1699@gmail.com"
    profile.linkedin_url = "https://www.linkedin.com/in/kazi-rezwan-rashid-043686183/"
    profile.github_url = "https://github.com/rezwan-rashid"
    profile.medium_url = ""
    profile.external_link_title = ""
    profile.external_link_url = ""
    profile.resume_file = "resumes/Kazi_Rezwan_Rashid_CV.pdf"

    # Architecture Diagram (Deep Learning / Vision Pipeline)
    profile.diagram_head_label = "deep learning & computer vision · architecture"
    profile.diagram_stream_label = "live inference"
    profile.diagram_source = "Medical & Industrial Image Stream"
    profile.diagram_transport = "Streaming Preprocessing Pipeline"
    profile.diagram_node_1_title = "YOLO & CNN Feature Extractor"
    profile.diagram_node_1_sub = "PyTorch · Object Detection"
    profile.diagram_node_2_title = "U-Net & Mask R-CNN"
    profile.diagram_node_2_sub = "Spatial Segmentation"
    profile.diagram_node_3_title = "Explainable AI (LIME & SHAP)"
    profile.diagram_node_3_sub = "Model Interpretability"
    profile.diagram_final_eyebrow = "real-time anomaly localization"
    profile.diagram_final_title = "Clinical & Industrial Safety Desktop"
    profile.diagram_caption = (
        "End-to-end computer vision and deep learning workflow: multi-scale feature extraction, "
        "spatial defect localization, and interpretability heatmaps for mission-critical decisions."
    )

    # About Preview
    profile.about_pull_quote = (
        "I am a Machine Learning Engineer and Lecturer in Computer Science & Engineering at Siddheswari University College, "
        "Dhaka. My research focuses on developing robust Deep Learning, Computer Vision, and Medical Imaging models "
        "that solve high-impact real-world challenges."
    )
    profile.about_p1 = (
        "Holding both an MSc and BSc in Computer Science & Engineering from Jahangirnagar University, "
        "I have authored multiple IEEE research papers in QPAIN covering agro-automation, low-resource NLP ensembles, "
        "and explainable sentiment analysis with LIME and SHAP."
    )
    profile.about_p2 = (
        "My practical projects span nuclear power plant radiation leak detection using YOLO and U-Net, "
        "lung cancer diagnosis in partnership with SSMCH, and AI-driven zero-trust biometric authentication. "
        "When I'm not training models or teaching, I enjoy competitive math problem solving (secured 5th at the National Math Olympiad) and robotics."
    )

    # Full About Page
    profile.about_hero_lead = "Machine Learning Engineer & Lecturer in CSE. Specializing in Deep Learning, Computer Vision, and Healthcare AI."
    profile.about_full_p1 = (
        "My journey in computer science began at Sylhet Cadet College and deepened through my undergraduate and graduate "
        "studies at Jahangirnagar University, where I earned both my BSc and MSc in Computer Science and Engineering. "
        "During my academic years, I immersed myself in data mining, neural network architectures, and competitive problem solving, "
        "securing 5th position at the Bangladesh National Math Olympiad."
    )
    profile.about_full_p2 = (
        "Currently, I serve as a Lecturer in the Department of CSE at Siddheswari University College, teaching Algorithms, "
        "Database Systems, and Image Processing. Simultaneously, I lead research projects in Computer Vision and Medical Imaging, "
        "including ongoing work on radiation leak detection in nuclear power plants and deep learning assisted cancer diagnosis. "
        "I am passionate about creating explainable, dependable AI systems that make a tangible difference in industry and healthcare."
    )

    # Featured Live Demo (Radiation Leak Detection)
    profile.demo_badge = "Featured System · Computer Vision & Deep Learning"
    profile.demo_title = "Radiation Leak Detection & Localization"
    profile.demo_description = (
        "A deep learning-enhanced computer vision framework for automated identification and spatial localization of "
        "micro-fractures and radiation leaks in nuclear facilities using CNNs, YOLO, and U-Net segmentation."
    )
    profile.demo_tags = "Python, PyTorch, YOLO, U-Net, Mask R-CNN, OpenCV"
    profile.demo_url = "https://github.com/rezwan-rashid"
    profile.demo_domain_label = "radiation-detection.ai"
    profile.demo_case_study_slug = "radiation-leak-detection"

    # Section titles
    profile.what_i_work_on_title = "Deep Learning, Vision & Applied AI Research"
    profile.what_i_work_on_sub = "From theoretical neural architectures to deployed clinical and industrial systems."
    profile.skills_title = "Core Competencies & Tooling"
    profile.skills_sub = "Taking models from research and experimentation to production — tap a skill to read the case study."
    profile.projects_page_title = "Research, Projects & IEEE Publications"
    profile.projects_page_lead = "Deep Learning, Computer Vision, Medical Imaging, and peer-reviewed IEEE research papers."
    profile.show_about_on_home = True
    profile.save()
    print("[OK] ProfileSettings updated for Kazi Rezwan Rashid")

    # 2. Key Statistics
    KeyStat.objects.all().delete()
    stats_data = [
        {"number": "MSc & BSc", "label": "Computer Science & Engineering (Jahangirnagar Univ)", "order": 1},
        {"number": "3+", "label": "IEEE Research Papers Published & Accepted (QPAIN)", "order": 2},
        {"number": "4+", "label": "Deep Learning & Computer Vision Production Systems", "order": 3},
        {"number": "7.0", "label": "IELTS Band Score (Listening: 8.0, Reading: 6.5)", "order": 4},
    ]
    for s in stats_data:
        KeyStat.objects.create(**s)
    print("[OK] Key Statistics created")

    # 3. Focus Areas (6 tiles)
    FocusArea.objects.all().delete()
    focus_data = [
        {
            "icon_class": "lnr lnr-magic-wand",
            "title": "Deep Learning & Neural Networks",
            "description": "Convolutional Neural Networks (CNNs), VGG Fine-Tuning, Capsule Networks, and Spatial Transformers for complex pattern recognition.",
            "order": 1,
        },
        {
            "icon_class": "lnr lnr-eye",
            "title": "Computer Vision & Localization",
            "description": "Object detection, boundary delineation, and semantic segmentation using YOLO, U-Net, Mask R-CNN, and OpenCV.",
            "order": 2,
        },
        {
            "icon_class": "lnr lnr-heart-pulse",
            "title": "Medical Imaging & Healthcare AI",
            "description": "Deep learning assisted lung cancer diagnosis and clinical image classification in collaboration with SSMCH Hospital and Kaggle datasets.",
            "order": 3,
        },
        {
            "icon_class": "lnr lnr-shield",
            "title": "Industrial AI & Safety Systems",
            "description": "Automated leak identification and localization for nuclear power plants and zero-trust biometric access security.",
            "order": 4,
        },
        {
            "icon_class": "lnr lnr-bubble",
            "title": "NLP & Explainable AI (XAI)",
            "description": "Multi-stage neural ensembles, BERT, and DistilBERT with model interpretability powered by LIME and SHAP heatmaps.",
            "order": 5,
        },
        {
            "icon_class": "lnr lnr-graduation-hat",
            "title": "Academic Instruction & Mentorship",
            "description": "Lecturing in Algorithms, Database Systems, Peripherals & Interfacing, and Image Processing lab at Siddheswari University College.",
            "order": 6,
        },
    ]
    for f in focus_data:
        FocusArea.objects.create(**f)
    print("[OK] Focus Areas created")

    # 4. Project Categories
    ProjectCategory.objects.all().delete()
    cat_vision = ProjectCategory.objects.create(
        name="Computer Vision & Deep Learning",
        slug="vision",
        description="Deep learning architectures for real-time localization, segmentation, and automated anomaly detection.",
        order=1,
    )
    cat_medical = ProjectCategory.objects.create(
        name="Medical AI & Healthcare",
        slug="medical-ai",
        description="Clinical decision-support systems and medical imaging diagnostics developed with hospital datasets.",
        order=2,
    )
    cat_research = ProjectCategory.objects.create(
        name="Published IEEE Research",
        slug="research",
        description="Peer-reviewed research papers accepted and published in IEEE QPAIN international conferences.",
        order=3,
    )
    cat_systems = ProjectCategory.objects.create(
        name="Full-Stack & Intelligent Systems",
        slug="systems",
        description="End-to-end intelligent applications combining deep learning models with modern web and security architectures.",
        order=4,
    )
    print("[OK] Project Categories created")

    # 5. Projects & Publications
    Project.objects.all().delete()
    projects_data = [
        {
            "title": "Radiation Leak Detection in Nuclear Power Plants",
            "slug": "radiation-leak-detection",
            "category_ref": cat_vision,
            "category_label": "Computer Vision · Safety AI",
            "index_number": "01",
            "short_description": "Deep learning enhanced computer vision system for automated leak identification and localization in nuclear power plant components.",
            "metrics_text": "Localization: Sub-millimeter\nModels: YOLO + U-Net + Mask R-CNN\nStatus: Ongoing Research",
            "tech_stack": "PyTorch, YOLO, U-Net, Mask R-CNN, OpenCV, Python",
            "kicker": "Industrial AI · Nuclear Safety",
            "lede": "An ongoing investigation into real-time visual inspection systems for nuclear power plants, combining YOLO object detection with U-Net pixel-level segmentation to identify and localize micro-fissures and radiation leaks.",
            "content": """
            <h3>Project Overview</h3>
            <p>Nuclear facility safety demands automated, non-destructive inspection systems capable of continuous monitoring in high-radiation zones. This project develops an end-to-end deep learning framework designed to detect surface anomalies, structural degradation, and active leaks from visual sensor streams.</p>
            <h3>Methodology & Technical Architecture</h3>
            <ul>
                <li><b>Image Preprocessing:</b> Denoising and contrast enhancement using OpenCV to handle low-light industrial inspection environments.</li>
                <li><b>Detection:</b> Custom-trained YOLO model for immediate bounding-box localization of suspected anomaly regions.</li>
                <li><b>Segmentation:</b> U-Net and Mask R-CNN backbones for pixel-level boundary segmentation of surface fractures and leaks.</li>
                <li><b>Classification:</b> CNN-based ensemble verifying defect severity and alert levels.</li>
            </ul>
            """,
            "architecture_snippet": """[Visual Stream] ---> [Denoising & Preprocessing] ---> [YOLO Anomaly Detection]
                                                          |
                                                    [U-Net Segmentation]
                                                          |
                                             [Severity Classifier & Alert Engine]""",
            "is_featured": True,
            "order": 1,
        },
        {
            "title": "Deep Learning Assisted Lung Cancer Diagnosis System",
            "slug": "lung-cancer-diagnosis",
            "category_ref": cat_medical,
            "category_label": "Medical AI · Healthcare Diagnostics",
            "index_number": "02",
            "short_description": "Multi-architecture deep learning system for lung nodule classification and malignancy diagnosis using hospital and Kaggle datasets.",
            "metrics_text": "Data: SSMCH Hospital + Kaggle\nArchitectures: CNN, VGG, Capsule Net\nEnhancement: Spatial Transformer",
            "tech_stack": "PyTorch, TensorFlow, VGG-16, Capsule Networks, Spatial Transformers, OpenCV",
            "kicker": "Clinical Decision Support · Oncology",
            "lede": "A high-precision diagnostic pipeline developed using clinical imaging data from Sir Salimullah Medical College Hospital (SSMCH, Dhaka) and benchmark Kaggle CT scan datasets.",
            "content": """
            <h3>Clinical Motivation</h3>
            <p>Early diagnosis of pulmonary malignancies significantly increases patient survival rates. This system integrates multiple deep learning paradigms to assist radiologists in detecting ambiguous pulmonary nodules on thoracic CT scans.</p>
            <h3>Multi-Model Architecture</h3>
            <ul>
                <li><b>Fine-Tuned VGG Backbone:</b> Leverages transfer learning to extract robust spatial representations from high-resolution CT slices.</li>
                <li><b>Capsule Networks:</b> Employs vector output capsules to maintain spatial hierarchical relationships and pose invariants that standard CNN pooling often discards.</li>
                <li><b>Spatial Transformer Networks:</b> Dynamically crops and aligns regions of interest to focus diagnostic attention on nodule boundaries.</li>
            </ul>
            """,
            "architecture_snippet": """[Thoracic CT Scans] ---> [Spatial Transformer (ROI)] ---> [Fine-Tuned VGG-16]
                                                                     |
                                                           [Capsule Network]
                                                                     |
                                                        [Malignancy Classification]""",
            "is_featured": True,
            "order": 2,
        },
        {
            "title": "Endurable Sunflower Disease Recognition System",
            "slug": "sunflower-disease-recognition",
            "category_ref": cat_research,
            "category_label": "IEEE QPAIN 2025 · Agro-Automation",
            "index_number": "03",
            "short_description": "An agro-automation system for sunflower disease recognition leveraging CNN-based transfer learning. Published by IEEE (doi: 10.1109/QPAIN66474.2025.11172149).",
            "metrics_text": "Publisher: IEEE (QPAIN 2025)\nDOI: 10.1109/QPAIN66474.2025.11172149\nMethod: CNN Transfer Learning",
            "tech_stack": "Python, TensorFlow, CNNs, Transfer Learning, Image Processing",
            "kicker": "Published Research · Agricultural AI",
            "lede": "Accepted and published at the International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN 2025), published by IEEE.",
            "content": """
            <h3>Publication Abstract</h3>
            <p>Automated plant pathology detection is critical for ensuring food security and crop yield resilience. This paper presents an endurable agro-automation system designed for the accurate classification of fungal and viral foliar diseases in sunflower crops using deep transfer learning.</p>
            <h3>Citation & DOI</h3>
            <p><b>Title:</b> An Agro Automation System for Endurable Sunflower Disease Recognition: A CNN-Based Transfer Learning Approach<br>
            <b>Conference:</b> International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN 2025)<br>
            <b>Publisher:</b> IEEE<br>
            <b>DOI:</b> <a href="https://doi.org/10.1109/QPAIN66474.2025.11172149" target="_blank">10.1109/QPAIN66474.2025.11172149</a></p>
            """,
            "architecture_snippet": """[Crop Foliage Images] ---> [Data Augmentation] ---> [Pre-trained CNN Backbone]
                                                             |
                                                 [Dense Classification Head]
                                                             |
                                                 [Disease Category & Remedy]""",
            "is_featured": True,
            "order": 3,
        },
        {
            "title": "Neural Ensemble for Low-Resource Language Understanding",
            "slug": "neural-ensemble-nlp",
            "category_ref": cat_research,
            "category_label": "IEEE QPAIN 2026 · NLP Ensembles",
            "index_number": "04",
            "short_description": "Multi-stage neural ensemble framework integrating traditional, deep, and transformer-based approaches in low-resource settings. Published by IEEE (doi: 10.1109/QPAIN69676.2026.11546437).",
            "metrics_text": "Publisher: IEEE (QPAIN 2026)\nDOI: 10.1109/QPAIN69676.2026.11546437\nScope: Low-Resource NLP",
            "tech_stack": "PyTorch, Transformers, BERT, LSTM, TF-IDF, Scikit-Learn",
            "kicker": "Published Research · Computational Linguistics",
            "lede": "Published by IEEE at QPAIN 2026, exploring novel multi-stage ensemble architectures for semantic understanding where annotated corpora are scarce.",
            "content": """
            <h3>Publication Abstract</h3>
            <p>Low-resource languages present unique challenges for modern deep learning due to data scarcity and high morphological complexity. This paper introduces a multi-stage neural ensemble combining statistical feature extraction, recurrent neural networks, and fine-tuned Transformer representations to achieve superior language comprehension benchmarks.</p>
            <h3>Citation & DOI</h3>
            <p><b>Title:</b> Multi-Stage Neural Ensemble Framework for Complex Language Understanding in Low-Resource Settings<br>
            <b>Conference:</b> IEEE QPAIN 2026<br>
            <b>Publisher:</b> IEEE<br>
            <b>DOI:</b> <a href="https://doi.org/10.1109/QPAIN69676.2026.11546437" target="_blank">10.1109/QPAIN69676.2026.11546437</a></p>
            """,
            "architecture_snippet": """[Raw Low-Resource Text] ---> [Traditional TF-IDF Features]
                                  ---> [BiLSTM Sequence Representations]
                                  ---> [Pre-trained Transformer Embeddings]
                                                 |
                                     [Neural Gating Ensemble] ---> [Final Semantic Prediction]""",
            "is_featured": False,
            "order": 4,
        },
        {
            "title": "Explainable Sentiment Analysis with BERT, LIME & SHAP",
            "slug": "explainable-sentiment-analysis",
            "category_ref": cat_research,
            "category_label": "IEEE QPAIN 2026 · Explainable AI",
            "index_number": "05",
            "short_description": "Comparative study of BERT, DistilBERT, and TF-IDF on the IMDB dataset with interpretable visual explanations via LIME and SHAP. Published by IEEE (doi: 10.1109/QPAIN69676.2026.11546130).",
            "metrics_text": "Publisher: IEEE (QPAIN 2026)\nDOI: 10.1109/QPAIN69676.2026.11546130\nXAI: LIME + SHAP",
            "tech_stack": "Python, Hugging Face, BERT, DistilBERT, LIME, SHAP, PyTorch",
            "kicker": "Published Research · Model Interpretability",
            "lede": "Published by IEEE at QPAIN 2026, evaluating model confidence and feature importance across classical machine learning and transformer architectures.",
            "content": """
            <h3>Publication Abstract</h3>
            <p>Understanding the internal decision boundaries of black-box NLP models is essential for trust and alignment. This paper evaluates the performance and interpretability trade-offs of TF-IDF, DistilBERT, and BERT on sentiment benchmarks using Local Interpretable Model-agnostic Explanations (LIME) and SHapley Additive exPlanations (SHAP).</p>
            <h3>Citation & DOI</h3>
            <p><b>Title:</b> Explainable Sentiment Analysis: A Comparative Study of BERT, DistilBERT, and TF-IDF on the IMDB Dataset Using LIME and SHAP<br>
            <b>Conference:</b> IEEE QPAIN 2026<br>
            <b>Publisher:</b> IEEE<br>
            <b>DOI:</b> <a href="https://doi.org/10.1109/QPAIN69676.2026.11546130" target="_blank">10.1109/QPAIN69676.2026.11546130</a></p>
            """,
            "architecture_snippet": """[Review Text Corpus] ---> [BERT / DistilBERT / TF-IDF]
                                            |
                                [Prediction Logits]
                                            |
                         [LIME Token Scoring] + [SHAP Kernel Explainer]
                                            |
                         [Feature Importance Visual Heatmaps]""",
            "is_featured": False,
            "order": 5,
        },
        {
            "title": "AI-AUTHENTICATE: AI-Driven Zero-Trust Access Control",
            "slug": "ai-authenticate",
            "category_ref": cat_systems,
            "category_label": "Deep Learning · Cyber Security",
            "index_number": "06",
            "short_description": "AI-driven authentication and access control system integrating CNNs, YOLO, AES-256 encryption, and zero-trust homomorphic architecture.",
            "metrics_text": "Encryption: AES-256 + Homomorphic\nArchitecture: Zero-Trust\nVision: CNN + YOLO",
            "tech_stack": "Python, PyTorch, YOLO, OpenCV, Cryptography, Zero Trust",
            "kicker": "Applied AI · Biometric Cyber Security",
            "lede": "A multi-factor biometric authentication system utilizing deep learning visual verification coupled with cryptographic homomorphic zero-trust access policies.",
            "content": """
            <h3>System Architecture</h3>
            <p>Traditional password-based authentication is vulnerable to credential theft and replay attacks. AI-AUTHENTICATE merges computer vision with zero-trust cryptographic protocols to provide continuous, non-intrusive identity verification.</p>
            <ul>
                <li><b>Visual Authentication:</b> High-speed facial and biometric localization using YOLO and deep CNN embedding vectors.</li>
                <li><b>Privacy-Preserving Security:</b> Biometric templates are stored and compared using homomorphic encryption and AES-256 cipher suites, preventing raw image leakage.</li>
                <li><b>Zero-Trust Decision Engine:</b> Re-authenticates access sessions dynamically based on spatial anomaly cues.</li>
            </ul>
            """,
            "architecture_snippet": """[Biometric Video Feed] ---> [YOLO Face Localization] ---> [CNN Embedding]
                                                                     |
                                                        [Homomorphic Encryption]
                                                                     |
                                                         [Zero-Trust Policy Check]""",
            "is_featured": False,
            "order": 6,
        },
        {
            "title": "E-Commerce Website with Virtual Trial 3D System",
            "slug": "virtual-trial-ecommerce",
            "category_ref": cat_systems,
            "category_label": "Computer Vision · MERN Stack",
            "index_number": "07",
            "short_description": "Full-stack e-commerce web platform integrating augmented reality virtual fitting with DeepAR, OpenCV, TensorFlow.js, 3D body models, and U-Net.",
            "metrics_text": "Stack: MERN (React + Node + Express + Mongo)\nVision: DeepAR + OpenCV + TensorFlow.js\nFitting: 3D Body + U-Net",
            "tech_stack": "React, Node.js, Express.js, MongoDB, DeepAR, OpenCV, TensorFlow.js, U-Net",
            "kicker": "Full-Stack Development · AR Vision",
            "lede": "An augmented reality virtual trial platform enabling online shoppers to preview clothing and accessories in real-time through their webcams.",
            "content": """
            <h3>Platform Overview</h3>
            <p>High return rates in online fashion are predominantly driven by sizing and styling uncertainties. This project integrates cutting-edge web-based computer vision into a full MERN stack e-commerce experience.</p>
            <ul>
                <li><b>Real-Time Body Landmark Estimation:</b> TensorFlow.js and OpenCV detect pose landmarks in real time directly within client browsers.</li>
                <li><b>Virtual Drape & Fit:</b> U-Net performs cloth segmentation while DeepAR renders realistic 3D mesh overlays onto the user's live video stream.</li>
                <li><b>Scalable E-Commerce Backend:</b> Built with Node.js, Express, and MongoDB for seamless catalog and cart operations.</li>
            </ul>
            """,
            "architecture_snippet": """[Client Camera Feed] ---> [TensorFlow.js Landmarks] ---> [DeepAR 3D Rendering]
                                                                         |
                                                            [MERN E-Commerce Backend]""",
            "is_featured": False,
            "order": 7,
        },
        {
            "title": "Social Network Analysis & TwitterRank Data Mining",
            "slug": "twitterrank-data-mining",
            "category_ref": cat_systems,
            "category_label": "Data Mining · Graph Algorithms",
            "index_number": "08",
            "short_description": "Graph mining and topic-sensitive influencer ranking research conducted at the Jahangirnagar University Data Mining Club.",
            "metrics_text": "Algorithms: TwitterRank + PageRank\nDomain: Social Network Analysis\nAffiliation: JU Data Mining Club",
            "tech_stack": "Python, NetworkX, Scikit-Learn, Pandas, NumPy, Data Mining",
            "kicker": "Graph Algorithms · Academic Research",
            "lede": "Research conducted at Jahangirnagar University exploring topic-sensitive PageRank algorithms (TwitterRank) to evaluate influence propagation across large directed social graphs.",
            "content": """
            <h3>Research Scope</h3>
            <p>Identifying key influencers across social networks requires modeling both graph topology and topical relevance. At the JU Data Mining Club, this work analyzed large-scale directed follower graphs to quantify dynamic topic-sensitive influence scores.</p>
            """,
            "architecture_snippet": """[Directed Social Graph] ---> [Topic Extraction (LDA)] ---> [Transition Probability Matrix]
                                                                          |
                                                                [TwitterRank Power Iteration]""",
            "is_featured": False,
            "order": 8,
        },
    ]

    for p in projects_data:
        Project.objects.create(**p)
    print(f"[OK] Created {len(projects_data)} projects & publications for Kazi Rezwan Rashid")

    # 6. Skill Categories & Case Links
    SkillCategory.objects.all().delete()
    sc1 = SkillCategory.objects.create(
        title="Deep Learning & Computer Vision",
        icon_class="lnr lnr-magic-wand",
        tools_list="PyTorch, TensorFlow, OpenCV, YOLO, U-Net, Mask R-CNN, VGG, DeepAR",
        order=1,
    )
    SkillCaseLink.objects.create(category=sc1, title="Radiation Leak Detection", project_slug="radiation-leak-detection", order=1)
    SkillCaseLink.objects.create(category=sc1, title="Lung Cancer Diagnosis", project_slug="lung-cancer-diagnosis", order=2)

    sc2 = SkillCategory.objects.create(
        title="NLP & Explainable AI (XAI)",
        icon_class="lnr lnr-bubble",
        tools_list="BERT, DistilBERT, LIME, SHAP, TF-IDF, Transformers, Hugging Face",
        order=2,
    )
    SkillCaseLink.objects.create(category=sc2, title="Explainable Sentiment (IMDB)", project_slug="explainable-sentiment-analysis", order=1)
    SkillCaseLink.objects.create(category=sc2, title="Low-Resource Neural Ensemble", project_slug="neural-ensemble-nlp", order=2)

    sc3 = SkillCategory.objects.create(
        title="Programming & Full-Stack",
        icon_class="lnr lnr-code",
        tools_list="Python, C++, SQL, JavaScript, Django, React, Node.js, Express.js",
        order=3,
    )
    SkillCaseLink.objects.create(category=sc3, title="AI-AUTHENTICATE Zero-Trust", project_slug="ai-authenticate", order=1)
    SkillCaseLink.objects.create(category=sc3, title="Virtual Trial E-Commerce", project_slug="virtual-trial-ecommerce", order=2)

    sc4 = SkillCategory.objects.create(
        title="Data Science & Software Proficiency",
        icon_class="lnr lnr-database",
        tools_list="Apache Spark, MySQL, SQLite, Oracle, PowerBI, Google Colab, Jupyter, MATLAB",
        order=4,
    )
    SkillCaseLink.objects.create(category=sc4, title="Sunflower Disease Recognition", project_slug="sunflower-disease-recognition", order=1)
    SkillCaseLink.objects.create(category=sc4, title="TwitterRank Data Mining", project_slug="twitterrank-data-mining", order=2)
    print("[OK] Skill Categories & Links created")

    # 7. Experience & Education Timeline
    Experience.objects.all().delete()
    exp_data = [
        {
            "year_range": "Feb 2024–Present",
            "title": "Lecturer in the Department of CSE",
            "organization": "Siddheswari University College, Dhaka",
            "organization_url": "https://scd.edu.bd/scd/DepartmentDetails.aspx?did=50",
            "highlight_note": "Academic Faculty & Lab Supervisor",
            "has_details": True,
            "is_current": True,
            "is_open_by_default": True,
            "show_on_home": True,
            "description": "Courses Mentored: Structured Programming, Algorithms, Databases, Peripherals and Interfacing, Image Processing Lab. Supervise laboratory sessions to ensure students gain practical, hands-on experience with modern software engineering tools and algorithms.",
            "tech_stack": "Algorithms · Databases · Image Processing · C++ · Python",
            "related_links": "Radiation Leak Detection | radiation-leak-detection\nLung Cancer Diagnosis | lung-cancer-diagnosis\nSiddheswari University College (CSE Dept) | https://scd.edu.bd/scd/DepartmentDetails.aspx?did=50",
            "order": 1,
        },
        {
            "year_range": "Nov 2023–Feb 2024",
            "title": "ICT Instructor, PYP IB",
            "organization": "Abdul Kadir Molla International School",
            "highlight_note": "Primary Years Programme · IB Curriculum",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": True,
            "description": "Developed ICT lessons that align with the PYP curriculum framework and IB learner profile. Integrated educational technology into transdisciplinary inquiry-based themes.",
            "tech_stack": "Inquiry-Based Learning · Educational Tech · Python",
            "related_links": "",
            "order": 2,
        },
        {
            "year_range": "2021–2023",
            "title": "MSc. in Computer Science and Engineering",
            "organization": "Jahangirnagar University",
            "organization_url": "https://juniv.edu/department/cse",
            "highlight_note": "Graduate Degree · Machine Learning & AI Research",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": True,
            "description": "Advanced graduate research in Deep Learning, Computer Vision, and Transformer-based Natural Language Processing. Produced multiple peer-reviewed research papers presented at IEEE QPAIN.",
            "tech_stack": "Deep Learning · Computer Vision · PyTorch · Transformers",
            "related_links": "IEEE Research | sunflower-disease-recognition\nJU CSE Department | https://juniv.edu/department/cse",
            "order": 3,
        },
        {
            "year_range": "2017–2021",
            "title": "BSc. in Computer Science and Engineering",
            "organization": "Jahangirnagar University",
            "organization_url": "https://juniv.edu/department/cse",
            "highlight_note": "Undergraduate Degree in CSE",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": True,
            "description": "Completed core computer science curriculum covering Data Structures, Algorithms, Computer Architecture, Database Systems, and Artificial Intelligence.",
            "tech_stack": "C++ · Data Structures · Python · Algorithms",
            "related_links": "TwitterRank Mining | twitterrank-data-mining\nJU CSE Department | https://juniv.edu/department/cse",
            "order": 4,
        },
        {
            "year_range": "Sep 2019–Dec 2020",
            "title": "Undergraduate Research Assistant",
            "organization": "JU Data Mining Club (Jahangirnagar University)",
            "organization_url": "https://juniv.edu/department/cse",
            "highlight_note": "Social Network Analysis & Graph Mining",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": False,
            "description": "Conducted research on Social Network Analysis, topic-sensitive PageRank algorithms (TwitterRank), and large-scale data mining.",
            "tech_stack": "Data Mining · NetworkX · Graph Analysis",
            "related_links": "TwitterRank Mining | twitterrank-data-mining\nJU CSE Department | https://juniv.edu/department/cse",
            "order": 5,
        },
        {
            "year_range": "2012–2014",
            "title": "Higher Secondary School Certificate (Science)",
            "organization": "Sylhet Cadet College",
            "organization_url": "https://scc.army.mil.bd/",
            "highlight_note": "Merit Scholarship · College Games Prefect",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": False,
            "description": "Graduated with excellence in Science from Sylhet Cadet College. Awarded Government Merit Scholarship by the Bangladesh Education Board.",
            "tech_stack": "Mathematics · Physics · Leadership",
            "related_links": "Sylhet Cadet College | https://scc.army.mil.bd/",
            "order": 6,
        },
        {
            "year_range": "2016",
            "title": "5th Position — Bangladesh Math Olympiad",
            "organization": "National Round, Bangladesh",
            "highlight_note": "National Finalist & Top Ranker",
            "has_details": True,
            "is_current": False,
            "is_open_by_default": False,
            "show_on_home": False,
            "description": "Secured 5th position nationwide at the Bangladesh National Math Olympiad, demonstrating high-level analytical problem-solving and discrete mathematics expertise.",
            "tech_stack": "Discrete Mathematics · Combinatorics · Number Theory",
            "related_links": "",
            "order": 7,
        },
    ]

    for e in exp_data:
        Experience.objects.create(**e)
    print(f"[OK] Created {len(exp_data)} experience timeline entries")

    # 8. Academic References
    Reference.objects.all().delete()
    ref_data = [
        {
            "name": "Md. Golam Moazzam, PhD",
            "qualifications": "",
            "designation": "Professor",
            "department": "Department of Computer Science and Engineering",
            "institution": "Jahangirnagar University",
            "address": "Savar, Dhaka-1342, Bangladesh",
            "institution_url": "https://juniv.edu/department/cse",
            "phone": "01922-230643",
            "email": "khokan@juniv.edu",
            "order": 1,
            "is_active": True,
        },
        {
            "name": "Sarnali Basak",
            "qualifications": "BSc (JU), MSc (The University of Edinburgh, UK)",
            "designation": "Associate Professor",
            "department": "Department of Computer Science and Engineering",
            "institution": "Jahangirnagar University",
            "address": "Savar, Dhaka-1342, Bangladesh",
            "institution_url": "https://juniv.edu/department/cse",
            "phone": "",
            "email": "sarnali.cse@juniv.edu, sarnali.cse@gmail.com",
            "order": 2,
            "is_active": True,
        },
    ]
    for r in ref_data:
        Reference.objects.create(**r)
    print(f"[OK] Created {len(ref_data)} academic references")

    print("\n=== All CV data successfully migrated to website database! ===")

if __name__ == '__main__':
    populate()
