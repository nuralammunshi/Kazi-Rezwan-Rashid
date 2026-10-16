/**
 * navbar_controls.js
 * Comprehensive, High-Fidelity Bilingual Engine & Theme Controller
 * 1. Live Real-Time Date & Time (EN & BN format with Bengali Numerals)
 * 2. Curated, Crystal-Clear Native Bengali Translation Engine (0ms, Zero Broken Conjuncts, Word-Boundary Safe)
 * 3. Complete Website Theme Engine (Dark Mode <-> White/Light Mode)
 * 4. Navbar, Modals, Lightbox & Interactive Controls
 */

(function () {
  'use strict';

  // 1. Initial State Persistence
  var currentTheme = localStorage.getItem('site_theme') || 'dark';
  var currentLang = localStorage.getItem('site_lang') || 'en';

  // Immediately apply theme and lang to document root
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('lang', currentLang);
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
  }

  // 2. Comprehensive, Human-Crafted Master Translation Dictionary
  // Every translation is carefully written in natural, fluent, professional Bengali.
  var I18N_DICTIONARY = {
    // Navigation & Global Actions
    "Home": "হোম",
    "About": "পরিচিতি",
    "About me": "আমার সম্পর্কে",
    "Projects": "প্রকল্পসমূহ",
    "Gallery": "গ্যালারি",
    "Huck": "গ্যালারি",
    "R&eacute;sum&eacute;": "জীবনবৃত্তান্ত",
    "Résumé": "জীবনবৃত্তান্ত",
    "Resume": "জীবনবৃত্তান্ত",
    "Contact": "যোগাযোগ",
    "Dashboard": "ড্যাশবোর্ড",
    "Login": "লগইন",
    "Logout": "লগআউট",
    "Admin Portal": "অ্যাডমিন পোর্টাল",
    "White": "লাইট",
    "Dark": "ডার্ক",
    "View portfolio": "পোর্টফোলিও দেখুন",
    "Selected work": "বাছাইকৃত কাজ",
    "Back to the work": "কাজে ফিরুন",
    "More about me": "আমার সম্পর্কে বিস্তারিত",
    "View complete timeline →": "সম্পূর্ণ টাইমলাইন দেখুন →",
    "View complete timeline &rarr;": "সম্পূর্ণ টাইমলাইন দেখুন →",
    "Explore Gallery ↓": "গ্যালারি দেখুন ↓",
    "View Gallery ↓": "গ্যালারি দেখুন ↓",
    "View Gallery &darr;": "গ্যালারি দেখুন ↓",
    "Manage Gallery": "গ্যালারি পরিচালনা",
    "Open the live demo": "লাইভ ডেমো দেখুন",
    "Read the write-up": "বিস্তারিত পড়ুন",
    "All work": "সকল প্রজেক্ট",
    "Back to top": "উপরে যান",
    "Scroll to top": "উপরে যান",
    "Return to Home": "মূল পাতায় ফিরুন",
    "Return to Public Website": "মূল ওয়েবসাইটে ফিরুন",
    "Sign In to Dashboard →": "ড্যাশবোর্ডে লগইন করুন →",
    "See all projects": "সকল প্রজেক্ট দেখুন",
    "Run it here": "এখানে চালু করুন",
    "opens the real app full-screen": "ফুল-স্ক্রিনে বাস্তব অ্যাপ খুলবে",
    "Open in a new tab ↗": "নতুন ট্যাবে খুলুন ↗",
    "Open in a new tab &#8599;": "নতুন ট্যাবে খুলুন ↗",
    "Close ✕": "বন্ধ করুন ✕",
    "← Back to all projects": "← সকল প্রজেক্টে ফিরুন",
    "&larr; Back to all projects": "← সকল প্রজেক্টে ফিরুন",
    "Launch Live Project →": "লাইভ প্রজেক্ট দেখুন →",
    "Launch Live Project &rarr;": "লাইভ প্রজেক্ট দেখুন →",
    "Live Project Link →": "লাইভ প্রজেক্ট লিংক →",
    "Live Project Link &rarr;": "লাইভ প্রজেক্ট লিংক →",
    "Open Live Link →": "লাইভ লিংক খুলুন →",
    "Open Live Link &rarr;": "লাইভ লিংক খুলুন →",

    // Profile Identity & Subtitles
    "Harrison Jansma": "কাজী রেজওয়ান রশীদ",
    "Kazi Rezwan Rashid": "কাজী রেজওয়ান রশীদ",
    "ML Engineer & Data Science Manager": "মেশিন লার্নিং ইঞ্জিনিয়ার ও ডেটা সায়েন্স গবেষক",
    "Applied AI Researcher & Machine Learning Engineer": "ফলিত এআই গবেষক এবং মেশিন লার্নিং ইঞ্জিনিয়ার",
    "Lecturer in CSE & Machine Learning Researcher": "সিএসই প্রভাষক ও মেশিন লার্নিং গবেষক",
    "Lecturer in CSE &amp; Machine Learning Researcher": "সিএসই প্রভাষক ও মেশিন লার্নিং গবেষক",
    "Machine Learning Engineer · Computer Vision & Medical AI": "মেশিন লার্নিং ইঞ্জিনিয়ার · কম্পিউটার ভিশন ও মেডিকেল এআই",
    "Machine Learning Engineer · Computer Vision &amp; Medical AI": "মেশিন লার্নিং ইঞ্জিনিয়ার · কম্পিউটার ভিশন ও মেডিকেল এআই",
    "ML Engineering · GenAI": "এমএল ইঞ্জিনিয়ারিং · জেনএআই",
    "Production AI systems and applied ML.": "প্রোডাকশন-গ্রেড এআই সিস্টেম এবং ফলিত মেশিন লার্নিং।",
    "I build production AI systems, real-time Computer Vision pipelines, and deep learning healthcare solutions.":
      "আমি প্রোডাকশন-গ্রেড এআই সিস্টেম, রিয়েল-টাইম কম্পিউটার ভিশন পাইপলাইন এবং স্বাস্থ্যসেবায় ডিপ লার্নিং সল্যুশন নির্মাণ করি।",
    "I build generative-AI systems that reach production — real-time LLM tools, RAG, and NLP at scale — and lead the teams that ship them.":
      "আমি প্রোডাকশন-গ্রেড জেনারেটিভ এআই সিস্টেম তৈরি করি — রিয়েল-টাইম এলএলএম টুলস, আরএজি এবং এনএলপি স্কেলিং — এবং বাস্তবায়নকারী দলের নেতৃত্ব দিই।",
    "Hi, I'm Harrison Jansma": "স্বাগতম, আমি কাজী রেজওয়ান রশীদ",
    "Hi, I'm Kazi Rezwan Rashid": "স্বাগতম, আমি কাজী রেজওয়ান রশীদ",
    "Lecturer in Computer Science & Engineering and Machine Learning Researcher specializing in Deep Learning, Computer Vision, and Medical Imaging — taking applied AI systems from research to production.":
      "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ের প্রভাষক এবং মেশিন লার্নিং গবেষক। ডিপ লার্নিং, কম্পিউটার ভিশন ও মেডিকেল ইমেজিং গবেষণায় পারদর্শী — ফলিত এআই সিস্টেমকে গবেষণা থেকে বাস্তব প্রয়োগে রূপান্তরে নিবেদিত।",
    "Lecturer in Computer Science &amp; Engineering and Machine Learning Researcher specializing in Deep Learning, Computer Vision, and Medical Imaging — taking applied AI systems from research to production.":
      "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ের প্রভাষক এবং মেশিন লার্নিং গবেষক। ডিপ লার্নিং, কম্পিউটার ভিশন ও মেডিকেল ইমেজিং গবেষণায় পারদর্শী — ফলিত এআই সিস্টেমকে গবেষণা থেকে বাস্তব প্রয়োগে রূপান্তরে নিবেদিত।",
    "Machine Learning Engineer & Lecturer in CSE. Specializing in Deep Learning, Computer Vision, and Healthcare AI.":
      "মেশিন লার্নিং ইঞ্জিনিয়ার এবং সিএসই প্রভাষক। ডিপ লার্নিং, কম্পিউটার ভিশন এবং স্বাস্থ্যসেবা এআই গবেষণায় বিশেষজ্ঞ।",
    "Machine Learning Engineer &amp; Lecturer in CSE. Specializing in Deep Learning, Computer Vision, and Healthcare AI.":
      "মেশিন লার্নিং ইঞ্জিনিয়ার এবং সিএসই প্রভাষক। ডিপ লার্নিং, কম্পিউটার ভিশন এবং স্বাস্থ্যসেবা এআই গবেষণায় বিশেষজ্ঞ।",
    "Building intelligent systems with focus and craft.": "দক্ষতা ও উদ্ভাবনের সাথে বুদ্ধিমত্তাসম্পন্ন কৃত্রিম বুদ্ধিমত্তা ব্যবস্থা নির্মাণ।",

    // Key Statistics
    "Years in applied AI/ML": "বছর ফলিত এআই/এমএল অভিজ্ঞতা",
    "IEEE Research Papers": "আইইইই গবেষণা পত্র প্রকাশিত",
    "IEEE Research Papers Published (QPAIN)": "আইইইই গবেষণা পত্র প্রকাশিত (QPAIN)",
    "IEEE Research Papers Published & Accepted (QPAIN)": "আইইইই গবেষণা পত্র প্রকাশিত ও গৃহীত (QPAIN)",
    "Production AI Systems": "প্রোডাকশন এআই সিস্টেম",
    "Deep Learning & Vision Systems": "ডিপ লার্নিং ও কম্পিউটার ভিশন সিস্টেম",
    "Deep Learning & Computer Vision Production Systems": "ডিপ লার্নিং ও কম্পিউটার ভিশন প্রোডাকশন সিস্টেম",
    "Deep Learning &amp; Computer Vision Production Systems": "ডিপ লার্নিং ও কম্পিউটার ভিশন প্রোডাকশন সিস্টেম",
    "Computer Science & Eng.": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
    "Computer Science & Eng (Jahangirnagar Univ)": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (জাহাঙ্গীরনগর বিশ্ববিদ্যালয়)",
    "Computer Science &amp; Eng (Jahangirnagar Univ)": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (জাহাঙ্গীরনগর বিশ্ববিদ্যালয়)",
    "Computer Science & Engineering (Jahangirnagar Univ)": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (জাহাঙ্গীরনগর বিশ্ববিদ্যালয়)",
    "IELTS Band Score (L: 8.0, R: 6.5)": "আইইএলটিএস ব্যান্ড স্কোর (লিসনিং: ৮.০, রিডিং: ৬.৫)",
    "IELTS Band Score (Listening: 8.0, Reading: 6.5)": "আইইএলটিএস ব্যান্ড স্কোর (লিসনিং: ৮.০, রিডিং: ৬.৫)",
    "MSc & BSc": "এমএসসি ও বিএসসি",
    "MSc &amp; BSc": "এমএসসি ও বিএসসি",

    // Architecture Diagram on Hero
    "contact-center genai · architecture": "কন্ট্যাক্ট-সেন্টার জেনএআই · আর্কিটেকচার",
    "computer-vision & deep-learning · pipeline": "কম্পিউটার-ভিশন ও ডিপ-লার্নিং · পাইপলাইন",
    "COMPUTER VISION & DEEP LEARNING · ARCHITECTURE": "কম্পিউটার ভিশন ও ডিপ লার্নিং · আর্কিটেকচার",
    "COMPUTER VISION &amp; DEEP LEARNING · ARCHITECTURE": "কম্পিউটার ভিশন ও ডিপ লার্নিং · আর্কিটেকচার",
    "streaming": "স্ট্রিমিং",
    "live inference": "লাইভ ইনফারেন্স",
    "source": "উৎস",
    "transport": "পরিবহন",
    "Thermal & Multispectral Feed": "থার্মাল ও মাল্টিস্পেকট্রাল ফিড",
    "RTSP Stream → OpenCV Pipeline": "RTSP স্ট্রিম → ওপেনসিভি পাইপলাইন",
    "YOLOv8 Detection": "YOLOv8 ডিটেকশন",
    "Anomaly Localization": "অস্বাভাবিকতা শনাক্তকরণ",
    "U-Net Segmentation": "ইউ-নেট সেগমেন্টেশন",
    "Defect Masking": "ত্রুটি মাস্কিং",
    "XAI Heatmap (LIME/SHAP)": "XAI হিটম্যাপ (LIME/SHAP)",
    "Interpretability": "ব্যাখ্যাযোগ্যতা",
    "real-time anomaly localization": "রিয়েল-টাইম ত্রুটি ও লিক শনাক্তকরণ",
    "Clinical & Industrial Safety Desktop": "ক্লিনিক্যাল ও ইন্ডাস্ট্রিয়াল সেফটি ড্যাশবোর্ড",
    "Clinical & industrial safety desktop": "ক্লিনিক্যাল ও ইন্ডাস্ট্রিয়াল সেফটি ড্যাশবোর্ড",
    "DELIVERED IN REAL-TIME": "রিয়েল-টাইমে তাৎক্ষণিক সরবরাহ",
    "End-to-end computer vision and deep learning workflow: multi-scale feature extraction, spatial defect localization, and interpretability heatmaps for mission-critical decisions.":
      "এন্ড-টু-এন্ড কম্পিউটার ভিশন ও ডিপ লার্নিং পাইপলাইন: মাল্টি-স্কেল ফিচার এক্সট্রাকশন, ত্রুটি লোকালাইজেশন এবং গুরুত্বপূর্ণ সিদ্ধান্তের জন্য ব্যাখ্যাযোগ্য হিটম্যাপ।",
    "The shape of three production systems below — one live audio stream, three models, sub-second delivery.":
      "নিচে তিনটি প্রোডাকশন সিস্টেমের রূপরেখা — একটি লাইভ অডিও স্ট্রিম, তিনটি মডেল এবং সাব-সেকেন্ড ডেলিভারি।",
    "The shape of three production systems below — real-time image feed, three neural models, sub-second inference.":
      "নিচে তিনটি প্রোডাকশন সিস্টেমের রূপরেখা — রিয়েল-টাইম ইমেজ ফিড, তিনটি নিউরাল মডেল এবং সাব-সেকেন্ড ইনফারেন্স।",

    // Section 01: Selected Work
    "01 — Selected work": "০১ — বাছাইকৃত কাজ",
    "01 — What I work on": "০১ — মূল কর্মক্ষেত্র",
    "Systems in production": "বাস্তব প্রয়োগে সক্রিয় সিস্টেম",
    "Featured System · Computer Vision & Deep Learning": "নির্বাচিত সিস্টেম · কম্পিউটার ভিশন ও ডিপ লার্নিং",
    "Featured System · Computer Vision &amp; Deep Learning": "নির্বাচিত সিস্টেম · কম্পিউটার ভিশন ও ডিপ লার্নিং",
    "Radiation Leak Detection & Localization": "পারমাণবিক কেন্দ্রে রেডিয়েশন লিক ডিটেকশন ও লোকালাইজেশন",
    "Radiation Leak Detection &amp; Localization": "পারমাণবিক কেন্দ্রে রেডিয়েশন লিক ডিটেকশন ও লোকালাইজেশন",
    "A deep learning-enhanced computer vision framework for automated identification and spatial localization of micro-fractures and radiation leaks in nuclear facilities using CNNs, YOLO, and U-Net segmentation.":
      "পারমাণবিক স্থাপনায় ক্ষুদ্র ফাটল ও রেডিয়েশন লিক স্বয়ংক্রিয়ভাবে শনাক্ত ও স্থান নির্ধারণের জন্য সিএনএন, ইয়োলো এবং ইউ-নেট সেগমেন্টেশন সমন্বিত ডিপ লার্নিং ফ্রেমওয়ার্ক।",
    "Flagship generative-AI systems taken from prototype to production — starting with a public, analogous solution built with Deepgram and OpenAI tools you can try yourself.":
      "প্রোটোটাইপ থেকে উৎপাদনে রূপান্তর করা ফ্ল্যাগশিপ সিস্টেমসমূহ — বাস্তব জীবনের জটিল সমস্যার সমাধানে আধুনিক প্রযুক্তি।",

    // Section 02: Focus Areas
    "02 — What I work on": "০২ — আমার কর্মক্ষেত্র",
    "Deep Learning, Vision & Applied AI Research": "ডিপ লার্নিং, ভিশন ও ফলিত এআই গবেষণা",
    "From theoretical neural architectures to deployed clinical and industrial systems.":
      "তাত্ত্বিক নিউরাল আর্কিটেকচার থেকে বাস্তব ক্লিনিক্যাল ও ইন্ডাস্ট্রিয়াল সিস্টেম বাস্তবায়ন।",
    "Deep Learning & Neural Networks": "ডিপ লার্নিং ও নিউরাল নেটওয়ার্ক",
    "Deep Learning &amp; Neural Networks": "ডিপ লার্নিং ও নিউরাল নেটওয়ার্ক",
    "Convolutional Neural Networks (CNNs), VGG Fine-Tuning, Capsule Networks, and Spatial Transformers for complex pattern recognition.":
      "কনভলিউশনাল নিউরাল নেটওয়ার্ক (CNN), VGG ফাইন-টিউনিং, ক্যাপসুল নেটওয়ার্ক এবং জটিল প্যাটার্ন চেনার স্পেশাল ট্রান্সফরমার।",
    "Computer Vision & Localization": "কম্পিউটার ভিশন ও লোকালাইজেশন",
    "Computer Vision &amp; Localization": "কম্পিউটার ভিশন ও লোকালাইজেশন",
    "Object detection, boundary delineation, and semantic segmentation using YOLO, U-Net, Mask R-CNN, and OpenCV.":
      "YOLO, U-Net, Mask R-CNN এবং OpenCV ব্যবহার করে অবজেক্ট ডিটেকশন, বাউন্ডারি চিহ্নিতকরণ এবং সেমান্টিক সেগমেন্টেশন।",
    "Medical Imaging & Healthcare AI": "মেডিকেল ইমেজিং ও হেলথকেয়ার এআই",
    "Medical Imaging &amp; Healthcare AI": "মেডিকেল ইমেজিং ও হেলথকেয়ার এআই",
    "Deep learning assisted lung cancer diagnosis and clinical image classification in collaboration with SSMCH Hospital and Kaggle datasets.":
      "এসএসএমসিএইচ হাসপাতাল এবং ক্যাগল ডেটাসেটের সাথে যৌথভাবে ডিপ লার্নিং সহায়ক ফুসফুস ক্যান্সার নির্ণয় ও ক্লিনিক্যাল ইমেজ ক্লাসিফিকেশন।",
    "Industrial AI & Safety Systems": "ইন্ডাস্ট্রিয়াল এআই ও সেফটি সিস্টেম",
    "Industrial AI &amp; Safety Systems": "ইন্ডাস্ট্রিয়াল এআই ও সেফটি সিস্টেম",
    "Automated leak identification and localization for nuclear power plants and zero-trust biometric access security.":
      "পারমাণবিক বিদ্যুৎ কেন্দ্রের জন্য স্বয়ংক্রিয় লিক শনাক্তকরণ ও স্থান নির্ধারণ এবং জিরো-ট্রাস্ট বায়োমেট্রিক অ্যাক্সেস নিরাপত্তা।",
    "NLP & Explainable AI (XAI)": "এনএলপি ও ব্যাখ্যাযোগ্য এআই (XAI)",
    "NLP &amp; Explainable AI (XAI)": "এনএলপি ও ব্যাখ্যাযোগ্য এআই (XAI)",
    "Multi-stage neural ensembles, BERT, and DistilBERT with model interpretability powered by LIME and SHAP heatmaps.":
      "LIME এবং SHAP হিটম্যাপ দ্বারা চালিত মডেলের ব্যাখ্যাযোগ্যতাসহ মাল্টি-স্টেজ নিউরাল এনসেম্বল, BERT এবং DistilBERT।",
    "Academic Instruction & Mentorship": "একাডেমিক শিক্ষকতা ও মেন্টরশিপ",
    "Academic Instruction &amp; Mentorship": "একাডেমিক শিক্ষকতা ও মেন্টরশিপ",
    "Lecturing in Algorithms, Database Systems, Peripherals & Interfacing, and Image Processing lab at Siddheswari University College.":
      "সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজে অ্যালগরিদম, ডেটাবেস সিস্টেম, পেরিফেরালস ও ইন্টারফেসিং এবং ইমেজ প্রসেসিং ল্যাবে প্রভাষক হিসেবে দায়িত্ব পালন।",
    "Lecturing in Algorithms, Database Systems, Peripherals &amp; Interfacing, and Image Processing lab at Siddheswari University College.":
      "সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজে অ্যালগরিদম, ডেটাবেস সিস্টেম, পেরিফেরালস ও ইন্টারফেসিং এবং ইমেজ প্রসেসিং ল্যাবে প্রভাষক হিসেবে দায়িত্ব পালন।",

    // Section 03: Skills & Tooling
    "03 — Skills & tooling": "০৩ — প্রযুক্তি ও দক্ষতা",
    "03 — Skills &amp; tooling": "০৩ — প্রযুক্তি ও দক্ষতা",
    "Core Competencies & Tooling": "মূল দক্ষতা ও ব্যবহৃত টুলস",
    "Core Competencies &amp; Tooling": "মূল দক্ষতা ও ব্যবহৃত টুলস",
    "The stack I reach for": "আমার ব্যবহৃত প্রযুক্তি ও টুলস",
    "Taking models from research and experimentation to production — tap a skill to read the case study.":
      "গবেষণা ও পরীক্ষণ থেকে মডেলকে উৎপাদনে রূপান্তর — কেস স্টাডি দেখতে স্কিলে ট্যাপ করুন।",
    "Taking models to production — tap a skill to read the case study.":
      "মডেল সফলভাবে উৎপাদনে রূপান্তর — কেস স্টাডি দেখতে স্কিলে ট্যাপ করুন।",
    "Deep Learning & Computer Vision": "ডিপ লার্নিং ও কম্পিউটার ভিশন",
    "Deep Learning &amp; Computer Vision": "ডিপ লার্নিং ও কম্পিউটার ভিশন",
    "Programming & Full-Stack": "প্রোগ্রামিং ও ফুল-স্ট্যাক ডেভেলপমেন্ট",
    "Programming &amp; Full-Stack": "প্রোগ্রামিং ও ফুল-স্ট্যাক ডেভেলপমেন্ট",
    "Data Science & Software Proficiency": "ডেটা সায়েন্স ও সফটওয়্যার দক্ষতা",
    "Data Science &amp; Software Proficiency": "ডেটা সায়েন্স ও সফটওয়্যার দক্ষতা",
    "Case studies": "কেস স্টাডি",
    "Tools & Stack": "ব্যবহৃত প্রযুক্তি ও টুলস",
    "Tools &amp; Stack": "ব্যবহৃত প্রযুক্তি ও টুলস",
    "Modern stack for deep learning and agentic workflows.": "ডিপ লার্নিং ও এআই ওয়ার্কফ্লোর আধুনিক প্রযুক্তি স্ট্যাক।",

    // Section 04: About me preview & full page
    "04 — About me": "০৪ — আমার সম্পর্কে",
    "I am a Machine Learning Engineer and Lecturer in Computer Science & Engineering at Siddheswari University College, Dhaka. My research focuses on developing robust Deep Learning, Computer Vision, and Medical Imaging models that solve high-impact real-world challenges.":
      "আমি একজন মেশিন লার্নিং ইঞ্জিনিয়ার এবং ঢাকা সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজের কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগের প্রভাষক। আমার গবেষণার মূল লক্ষ্য হলো বাস্তব জীবনের জটিল সমস্যা সমাধানে শক্তিশালী ডিপ লার্নিং, কম্পিউটার ভিশন এবং মেডিকেল ইমেজিং মডেল তৈরি করা।",
    "Holding both an MSc and BSc in Computer Science & Engineering from Jahangirnagar University, I have authored multiple IEEE research papers in QPAIN covering agro-automation, low-resource NLP ensembles, and explainable sentiment analysis with LIME and SHAP.":
      "জাহাঙ্গীরনগর বিশ্ববিদ্যালয় থেকে কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বিএসসি এবং এমএসসি ডিগ্রিধারী হিসেবে, আমি এগ্রো-অটোমেশন, স্বল্প-সম্পদ এনএলপি এনসেম্বল এবং LIME ও SHAP সহ ব্যাখ্যাযোগ্য সেন্টিমেন্ট বিশ্লেষণের উপর QPAIN-এ একাধিক IEEE গবেষণাপত্র প্রকাশ করেছি।",
    "Holding both an MSc and BSc in Computer Science &amp; Engineering from Jahangirnagar University, I have authored multiple IEEE research papers in QPAIN covering agro-automation, low-resource NLP ensembles, and explainable sentiment analysis with LIME and SHAP.":
      "জাহাঙ্গীরনগর বিশ্ববিদ্যালয় থেকে কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বিএসসি এবং এমএসসি ডিগ্রিধারী হিসেবে, আমি এগ্রো-অটোমেশন, স্বল্প-সম্পদ এনএলপি এনসেম্বল এবং LIME ও SHAP সহ ব্যাখ্যাযোগ্য সেন্টিমেন্ট বিশ্লেষণের উপর QPAIN-এ একাধিক IEEE গবেষণাপত্র প্রকাশ করেছি।",
    "My practical projects span nuclear power plant radiation leak detection using YOLO and U-Net, lung cancer diagnosis in partnership with SSMCH Hospital, and AI-driven zero-trust biometric authentication. Outside teaching, I secured 5th position at the Bangladesh National Math Olympiad.":
      "আমার বাস্তব প্রকল্পগুলোর মধ্যে রয়েছে YOLO এবং U-Net ব্যবহার করে পারমাণবিক বিদ্যুৎ কেন্দ্রের রেডিয়েশন লিক শনাক্তকরণ, SSMCH হাসপাতালের সহযোগিতায় ফুসফুসের ক্যান্সার নির্ণয় এবং এআই-চালিত জিরো-ট্রাস্ট বায়োমেট্রিক প্রমাণীকরণ। শিক্ষকতার পাশাপাশি আমি বাংলাদেশ জাতীয় গণিত অলিম্পিয়াডে ৫ম স্থান অর্জন করেছি।",
    "My journey in computer science began at Sylhet Cadet College and deepened through my undergraduate and graduate studies at Jahangirnagar University, where I earned both my BSc and MSc in Computer Science and Engineering. During my academic years, I immersed myself in data mining, neural network architectures, and competitive problem solving, securing 5th position at the Bangladesh National Math Olympiad.":
      "কম্পিউটার সায়েন্সে আমার যাত্রা শুরু হয়েছিল সিলেট ক্যাডেট কলেজে এবং পরবর্তীতে জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ে স্নাতক ও স্নাতকোত্তর অধ্যয়নের মাধ্যমে তা গভীরতা পায়, যেখান থেকে আমি কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বিএসসি এবং এমএসসি উভয় ডিগ্রি অর্জন করি। শিক্ষাজীবনে আমি ডেটা মাইনিং, নিউরাল নেটওয়ার্ক আর্কিটেকচার এবং প্রতিযোগিতামূলক সমস্যা সমাধানে আত্মনিয়োগ করি, যার ধারাবাহিকতায় বাংলাদেশ জাতীয় গণিত অলিম্পিয়াডে ৫ম স্থান অর্জন করি।",
    "Currently, I serve as a Lecturer in the Department of CSE at Siddheswari University College, teaching Algorithms, Database Systems, and Image Processing. Simultaneously, I lead research projects in Computer Vision and Medical Imaging, including ongoing work on radiation leak detection in nuclear power plants and deep learning assisted cancer diagnosis. I am passionate about creating explainable, dependable AI systems that make a tangible difference in industry and healthcare.":
      "বর্তমানে আমি সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজের সিএসই বিভাগে প্রভাষক হিসেবে দায়িত্ব পালন করছি, যেখানে আমি অ্যালগরিদম, ডেটাবেস সিস্টেম এবং ইমেজ প্রসেসিং পড়াই। একই সাথে, আমি কম্পিউটার ভিশন এবং মেডিকেল ইমেজিংয়ে গবেষণা প্রকল্পের নেতৃত্ব দিচ্ছি, যার মধ্যে রয়েছে পারমাণবিক বিদ্যুৎ কেন্দ্রে রেডিয়েশন লিক শনাক্তকরণ এবং ডিপ লার্নিং সহায়ক ক্যান্সার নির্ণয়। আমি এমন ব্যাখ্যাযোগ্য ও নির্ভরযোগ্য এআই সিস্টেম তৈরিতে আগ্রহী যা শিল্প এবং স্বাস্থ্যসেবায় ইতিবাচক পরিবর্তন আনে।",

    // Section 05: Experience Timeline
    "Experience": "কর্মজীবন ও অভিজ্ঞতা",
    "Career Highlights": "কর্মজীবনের উল্লেখযোগ্য অর্জন",
    "Career Timeline & Journey": "কর্মজীবন ও অভিজ্ঞতার টাইমলাইন",
    "Career Timeline &amp; Journey": "কর্মজীবন ও অভিজ্ঞতার টাইমলাইন",
    "Highlighted roles and leadership experience.": "উল্লেখযোগ্য দায়িত্ব ও নেতৃত্ব অভিজ্ঞতা।",
    "Expand a role to see what I built there.": "বিস্তারিত দায়িত্ব দেখতে যেকোনো ভূমিকায় ক্লিক করুন।",
    "Want the full detail, with dates and stack?": "সম্পূর্ণ বিস্তারিত, তারিখ ও প্রযুক্তি স্ট্যাক দেখতে চান?",
    "View my résumé": "আমার জীবনবৃত্তান্ত দেখুন",
    "View my r&eacute;sum&eacute;": "আমার জীবনবৃত্তান্ত দেখুন",
    "Current": "বর্তমান",
    "Lecturer": "প্রভাষক",
    "Lecturer in the Department of CSE": "সিএসই বিভাগের প্রভাষক",
    "Teaching Assistant": "টিচিং অ্যাসিস্ট্যান্ট",
    "Undergraduate Research Assistant": "আন্ডারগ্র্যাজুয়েট রিসার্চ অ্যাসিস্ট্যান্ট",
    "Graduate Researcher": "গ্র্যাজুয়েট গবেষক",
    "Graduate Degree in CSE · Machine Learning & AI Research": "সিএসইতে স্নাতকোত্তর ডিগ্রি · মেশিন লার্নিং ও এআই গবেষণা",
    "Graduate Degree in CSE · Machine Learning &amp; AI Research": "সিএসইতে স্নাতকোত্তর ডিগ্রি · মেশিন লার্নিং ও এআই গবেষণা",
    "Undergraduate Degree in CSE": "সিএসইতে স্নাতক ডিগ্রি",
    "Higher Secondary School Certificate (Science)": "উচ্চ মাধ্যমিক সার্টিফিকেট (বিজ্ঞান)",
    "Secondary School Certificate (Science)": "মাধ্যমিক স্কুল সার্টিফিকেট (বিজ্ঞান)",
    "Secondary School Certificate in Science. Awarded Merit Scholarship by the Bangladesh Education Board.":
      "বিজ্ঞান বিভাগে মাধ্যমিক স্কুল সার্টিফিকেট। বাংলাদেশ শিক্ষা বোর্ড কর্তৃক মেধা বৃত্তিপ্রাপ্ত।",
    "Graduated with excellence in Science from Sylhet Cadet College. Awarded Government Merit Scholarship by the Bangladesh Education Board. College Games Prefect (2014).":
      "সিলেট ক্যাডেট কলেজ থেকে বিজ্ঞান বিভাগে কৃতিত্বের সাথে উত্তীর্ণ। বাংলাদেশ শিক্ষা বোর্ড কর্তৃক সরকারি মেধা বৃত্তিপ্রাপ্ত। কলেজ গেমস প্রিফেক্ট (২০১৪)।",
    "Completed core computer science curriculum covering Data Structures, Algorithms, Computer Architecture, Database Systems, and Artificial Intelligence.":
      "ডেটা স্ট্রাকচার, অ্যালগরিদম, কম্পিউটার আর্কিটেকচার, ডেটাবেস সিস্টেম এবং কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ মূল সিএসই পাঠ্যক্রম সম্পন্ন।",
    "Advanced graduate research in Deep Learning, Computer Vision, and Transformer-based Natural Language Processing. Produced multiple peer-reviewed research papers presented at IEEE QPAIN.":
      "ডিপ লার্নিং, কম্পিউটার ভিশন এবং ট্রান্সফরমার-ভিত্তিক এনএলপিতে উচ্চতর গবেষণা। একাধিক পিয়ার-রিভিউড গবেষণাপত্র প্রণয়ন যা IEEE QPAIN-এ উপস্থাপিত হয়েছে।",
    "Supervise laboratory sessions to ensure students gain practical, hands-on experience with modern software engineering tools and algorithms.":
      "শিক্ষার্থীরা যাতে আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিং টুলস ও অ্যালগরিদমের সাথে ব্যবহারিক অভিজ্ঞতা অর্জন করে তা নিশ্চিত করতে ল্যাব পরিচালনা।",
    "Courses Mentored: Structured Programming, Algorithms, Databases, Peripherals and Interfacing, Image Processing Lab.":
      "পাঠদানকৃত কোর্স: স্ট্রাকচার্ড প্রোগ্রামিং, অ্যালগরিদম, ডেটাবেস, পেরিফেরালস অ্যান্ড ইন্টারফেসিং, ইমেজ প্রসেসিং ল্যাব।",
    "Siddheswari University College": "সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজ",
    "Siddheswari University College, Dhaka": "সিদ্ধেশ্বরী বিশ্ববিদ্যালয় কলেজ, ঢাকা",
    "Jahangirnagar University": "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    "Sylhet Cadet College": "সিলেট ক্যাডেট কলেজ",
    "Abdul Kadir Molla International School": "আব্দুল কাদির মোল্লা ইন্টারন্যাশনাল স্কুল",
    "ICT Instructor, PYP IB": "আইসিটি ইনস্ট্রাক্টর, PYP IB",
    "Developed ICT lessons that align with the PYP curriculum framework and IB learner profile. Integrated educational technology into transdisciplinary inquiry-based themes.":
      "PYP পাঠ্যক্রম ও IB লার্নার প্রোফাইলের সাথে সামঞ্জস্যপূর্ণ আইসিটি পাঠ পরিকল্পনা প্রণয়ন ও বাস্তবায়ন।",

    // Section 06: Photo Gallery
    "06 — Photo Gallery": "০৬ — ফটো গ্যালারি",
    "Moments & Highlights": "স্মরণীয় মুহূর্ত ও অর্জন",
    "Moments &amp; Highlights": "স্মরণীয় মুহূর্ত ও অর্জন",
    "Photo Gallery": "ছবির গ্যালারি",
    "Photo Gallery — Kazi Rezwan Rashid": "ছবির গ্যালারি — কাজী রেজওয়ান রশীদ",
    "A visual journey behind the research, conferences, university life, milestones, and memorable captures.":
      "গবেষণা, কনফারেন্স, বিশ্ববিদ্যালয় জীবন এবং স্মরণীয় অর্জনের একটি ছবির কোলাজ।",
    "photos · tap to view": "টি ছবি · দেখতে ক্লিক করুন",
    "Photos · tap to view": "টি ছবি · দেখতে ক্লিক করুন",
    "5 photos · tap to view": "৫টি ছবি · দেখতে ক্লিক করুন",
    "5 photos &middot; tap to view": "৫টি ছবি · দেখতে ক্লিক করুন",
    "Professional Portrait": "প্রফেশনাল পোর্ট্রেট",
    "Kazi Rezwan Rashid — Machine Learning Engineer & Data Science Researcher.":
      "কাজী রেজওয়ান রশীদ — মেশিন লার্নিং ইঞ্জিনিয়ার ও ডেটা সায়েন্স গবেষক।",
    "Kazi Rezwan Rashid — Machine Learning Engineer &amp; Data Science Researcher.":
      "কাজী রেজওয়ান রশীদ — মেশিন লার্নিং ইঞ্জিনিয়ার ও ডেটা সায়েন্স গবেষক।",
    "6th Convocation 2023": "৬ষ্ঠ সমাবর্তন ২০২৩",
    "Graduation ceremony milestone in academic regalia at Jahangirnagar University.":
      "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের ৬ষ্ঠ সমাবর্তনে গাউন পরিহিত গৌরবময় মুহূর্ত।",
    "Convocation Milestone": "সমাবর্তনের মাইলফলক",
    "Commemorative graduation capture on the historic red-brick campus amphitheater.":
      "ঐতিহাসিক লাল ইটের মুক্তমঞ্চের সিঁড়িতে সমাবর্তনের আনন্দঘন স্মৃতি।",
    "Advanced ICT Certificate Award": "অ্যাডভান্সড আইসিটি সার্টিফিকেট সম্মাননা",
    "Receiving certificate at the Closing Ceremony of the Advanced ICT Program from the Honorable Vice-Chancellor.":
      "মাননীয় উপাচার্যের নিকট থেকে অ্যাডভান্সড আইসিটি সমাপনী সার্টিফিকেট গ্রহণের স্মরণীয় মুহূর্ত।",
    "Engineering Staff College Bangladesh": "ইঞ্জিনিয়ারিং স্টাফ কলেজ বাংলাদেশ",
    "Cohort group photo with distinguished faculty and fellows at the Academic Building of Engineering Staff College, Bangladesh.":
      "ইঞ্জিনিয়ারিং স্টাফ কলেজ বাংলাদেশ (ESCB) একাডেমিক ভবনের সামনে সম্মানিত শিক্ষক ও সহকর্মীদের সাথে গ্রুপ ছবি।",

    // Projects Page & Case Studies
    "Projects — Kazi Rezwan Rashid": "প্রকল্পসমূহ — কাজী রেজওয়ান রশীদ",
    "Research, Projects & IEEE Publications": "গবেষণা, প্রকল্প ও আইইইই প্রকাশনা",
    "Research, Projects &amp; IEEE Publications": "গবেষণা, প্রকল্প ও আইইইই প্রকাশনা",
    "Deep Learning, Computer Vision, Medical Imaging, and peer-reviewed IEEE research papers.":
      "ডিপ লার্নিং, কম্পিউটার ভিশন, মেডিকেল ইমেজিং এবং পিয়ার-রিভিউড আইইইই গবেষণাপত্র।",
    "Comprehensive engineering breakdowns of real-world AI applications.":
      "বাস্তব জীবনের জটিল এআই অ্যাপ্লিকেশনের সমন্বিত প্রযুক্তিগত রূপরেখা।",
    "Direct access to live deployment, working demo, or publication.":
      "সরাসরি লাইভ ডেপ্লয়মেন্ট, ডেমো বা প্রকাশিত পেপার দেখার সুযোগ।",
    "Computer Vision & Deep Learning": "কম্পিউটার ভিশন ও ডিপ লার্নিং",
    "Computer Vision &amp; Deep Learning": "কম্পিউটার ভিশন ও ডিপ লার্নিং",
    "Medical AI & Healthcare": "মেডিকেল এআই ও স্বাস্থ্যসেবা",
    "Medical AI &amp; Healthcare": "মেডিকেল এআই ও স্বাস্থ্যসেবা",
    "Published IEEE Research": "প্রকাশিত আইইইই গবেষণা",
    "Full-Stack & Intelligent Systems": "ফুল-স্ট্যাক ও ইন্টেলিজেন্ট সিস্টেম",
    "Full-Stack &amp; Intelligent Systems": "ফুল-স্ট্যাক ও ইন্টেলিজেন্ট সিস্টেম",
    "Radiation Leak Detection in Nuclear Power Plants": "পারমাণবিক বিদ্যুৎ কেন্দ্রে রেডিয়েশন লিক ডিটেকশন",
    "Radiation Leak Detection in Nuclear Power Plants — Kazi Rezwan Rashid": "পারমাণবিক বিদ্যুৎ কেন্দ্রে রেডিয়েশন লিক ডিটেকশন — কাজী রেজওয়ান রশীদ",
    "Deep Learning enhanced computer vision system for automated leak identification and localization in nuclear power plant components.":
      "পারমাণবিক বিদ্যুৎ কেন্দ্রের যন্ত্রাংশে স্বয়ংক্রিয় লিক চিহ্নিতকরণ এবং স্থান নির্ধারণের জন্য ডিপ লার্নিং সমৃদ্ধ কম্পিউটার ভিশন সিস্টেম।",
    "Nuclear facility safety demands automated, non-destructive inspection systems capable of continuous monitoring in high-radiation zones. This project develops an end-to-end deep learning framework designed to detect surface anomalies, structural degradation, and active leaks from visual sensor streams.":
      "পারমাণবিক স্থাপনার নিরাপত্তায় উচ্চ-তেজস্ক্রিয় অঞ্চলে সার্বক্ষণিক নজরদারির জন্য স্বয়ংক্রিয় ও নিরাপদ পরিদর্শন ব্যবস্থা অত্যন্ত জরুরি। এই প্রকল্পে ভিজ্যুয়াল সেন্সর স্ট্রিম থেকে কাঠামোগত ত্রুটি, ফাটল ও সক্রিয় রেডিয়েশন লিক শনাক্ত করতে একটি পূর্ণাঙ্গ ডিপ লার্নিং ফ্রেমওয়ার্ক তৈরি করা হয়েছে।",
    "An ongoing investigation into real-time visual inspection systems for nuclear power plants, combining YOLO object detection with U-Net pixel-level segmentation to identify and localize micro-fissures and radiation leaks.":
      "পারমাণবিক বিদ্যুৎ কেন্দ্রের জন্য রিয়েল-টাইম ভিজ্যুয়াল পরিদর্শন ব্যবস্থা নিয়ে একটি চলমান গবেষণা, যেখানে অতি-ক্ষুদ্র ফাটল ও রেডিয়েশন লিক সুনির্দিষ্টভাবে শনাক্ত করতে YOLO অবজেক্ট ডিটেকশন এবং U-Net পিক্সেল-লেভেল সেগমেন্টেশন সমন্বয় করা হয়েছে।",
    "Deep Learning Assisted Lung Cancer Diagnosis System": "ডিপ লার্নিং সহায়ক ফুসফুস ক্যান্সার নির্ণয় পদ্ধতি",
    "Clinical decision-support pipeline combining multi-slice CT scan analysis with VGG and ResNet architectures.":
      "মাল্টি-স্লাইস সিটি স্ক্যান বিশ্লেষণের সাথে VGG এবং ResNet আর্কিটেকচার সমন্বিত ক্লিনিক্যাল সিদ্ধান্ত গ্রহণ ব্যবস্থা।",
    "Multi-architecture deep learning system for lung nodule classification and malignancy diagnosis using hospital and Kaggle datasets.":
      "হাসপাতাল এবং ক্যাগল ডেটাসেট ব্যবহার করে ফুসফুসের নোডিউল ক্লাসিফিকেশন এবং ম্যালিগন্যান্সি নির্ণয়ের মাল্টি-আর্কিটেকচার ডিপ লার্নিং সিস্টেম।",
    "Endurable Sunflower Disease Recognition System": "টেকসই সূর্যমুখী রোগ শনাক্তকরণ পদ্ধতি",
    "Novel convolutional architecture and mobile-edge deployment for automated disease identification in sunflower crops.":
      "সূর্যমুখী ফসলের স্বয়ংক্রিয় রোগ শনাক্তকরণের জন্য আধুনিক কনভোলিউশনাল আর্কিটেকচার ও মোবাইল এজ ডেপ্লয়মেন্ট।",
    "An agro-automation system for sunflower disease recognition leveraging CNN-based transfer learning. Published by IEEE (doi: 10.1109/QPAIN66474.2025.11172149).":
      "সিএনএন-ভিত্তিক ট্রান্সফার লার্নিং ব্যবহার করে সূর্যমুখী ফসলের রোগ শনাক্তকরণে একটি আধুনিক এগ্রো-অটোমেশন সিস্টেম (IEEE QPAIN এ প্রকাশিত)।",
    "Neural Ensemble for Low-Resource Language Understanding": "স্বল্প-সম্পদ ভাষার জন্য নিউরাল এনসেম্বল",
    "Multi-stage transformer ensemble for Bengali and low-resource NLP sentiment classification published in IEEE QPAIN.":
      "বাংলা ও স্বল্প-সম্পদ ভাষার জন্য মাল্টি-স্টেজ ট্রান্সফরমার এনসেম্বল ভিত্তিক সেন্টিমেন্ট ক্লাসিফিকেশন (IEEE QPAIN এ প্রকাশিত)।",
    "Multi-stage neural ensemble framework integrating traditional, deep, and transformer-based approaches in low-resource settings. Published by IEEE (doi: 10.1109/QPAIN69676.2026.11546437).":
      "স্বল্প-সম্পদ ভাষায় ট্র্যাডিশনাল, ডিপ লার্নিং এবং ট্রান্সফরমার পদ্ধতির সমন্বয়ে একটি মাল্টি-স্টেজ নিউরাল এনসেম্বল ফ্রেমওয়ার্ক (IEEE QPAIN এ প্রকাশিত)।",
    "Explainable Sentiment Analysis with BERT, LIME & SHAP": "BERT, LIME এবং SHAP ভিত্তিক ব্যাখ্যাযোগ্য সেন্টিমেন্ট অ্যানালাইসিস",
    "Explainable Sentiment Analysis with BERT, LIME &amp; SHAP": "BERT, LIME এবং SHAP ভিত্তিক ব্যাখ্যাযোগ্য সেন্টিমেন্ট অ্যানালাইসিস",
    "Interpretable NLP framework utilizing local surrogates and Shapley values to explain deep transformer decisions.":
      "ডিপ ট্রান্সফরমার মডেলের সিদ্ধান্ত ব্যাখ্যা করার জন্য লোকাল সারোগেট এবং শ্যাপলি ভ্যালু ভিত্তিক ব্যাখ্যাযোগ্য এনএলপি ফ্রেমওয়ার্ক।",
    "Comparative study of BERT, DistilBERT, and TF-IDF on the IMDB dataset with interpretable visual explanations via LIME and SHAP. Published by IEEE (doi: 10.1109/QPAIN69676.2026.11546130).":
      "LIME এবং SHAP এর মাধ্যমে মডেলের সিদ্ধান্ত ব্যাখ্যাকরণসহ IMDB ডেটাসেটে BERT, DistilBERT এবং TF-IDF এর তুলনামূলক গবেষণা (IEEE QPAIN এ প্রকাশিত)।",
    "AI-AUTHENTICATE: AI-Driven Zero-Trust Access Control": "AI-AUTHENTICATE: এআই-চালিত জিরো-ট্রাস্ট অ্যাক্সেস কন্ট্রোল",
    "Biometric multi-factor authentication combining facial landmark recognition and anomaly detection.":
      "ফেসিয়াল ল্যান্ডমার্ক রিকগনিশন এবং অস্বাভাবিকতা সনাক্তকরণ সমন্বিত বায়োমেট্রিক মাল্টি-ফ্যাক্টর প্রমাণীকরণ।",
    "AI-driven authentication and access control system integrating CNNs, YOLO, AES-256 encryption, and zero-trust homomorphic architecture.":
      "সিএনএন, YOLO, AES-256 এনক্রিপশন এবং জিরো-ট্রাস্ট হোমোমর্ফিক আর্কিটেকচার সমন্বিত এআই-চালিত বায়োমেট্রিক নিরাপত্তা ও প্রমাণীকরণ ব্যবস্থা।",
    "E-Commerce Website with Virtual Trial 3D System": "ভার্চুয়াল ট্রায়াল থ্রিডি সিস্টেমসহ ই-কমার্স ওয়েবসাইট",
    "Interactive web platform featuring real-time 3D product previews and augmented reality fitting room.":
      "রিয়েল-টাইম থ্রিডি প্রোডাক্ট প্রিভিউ এবং অগমেন্টেড রিয়েলিটি ট্রায়াল রুম সমৃদ্ধ ইন্টারেক্টিভ ওয়েব প্ল্যাটফর্ম।",
    "Full-stack e-commerce web platform integrating augmented reality virtual fitting with DeepAR, OpenCV, TensorFlow.js, 3D body models, and U-Net.":
      "DeepAR, OpenCV, TensorFlow.js, 3D বডি মডেল এবং U-Net ব্যবহার করে অগমেন্টেড রিয়্যালিটি ভার্চুয়াল ট্রায়াল রুমসহ ফুল-স্ট্যাক ই-কমার্স ওয়েব প্ল্যাটফর্ম।",
    "Social Network Analysis & TwitterRank Data Mining": "সোশ্যাল নেটওয়ার্ক বিশ্লেষণ ও টুইটারর‍্যাঙ্ক ডেটা মাইনিং",
    "Social Network Analysis &amp; TwitterRank Data Mining": "সোশ্যাল নেটওয়ার্ক বিশ্লেষণ ও টুইটারর‍্যাঙ্ক ডেটা মাইনিং",
    "Graph-based influence propagation and community detection over large-scale social datasets.":
      "বৃহৎ আকারের সামাজিক ডেটাসেটের উপর গ্রাফ-ভিত্তিক প্রভাব বিস্তার ও কমিউনিটি ডিটেকশন অ্যালগরিদম।",
    "Conducted research on Social Network Analysis, topic-sensitive PageRank algorithms (TwitterRank), and large-scale data mining.":
      "সোশ্যাল নেটওয়ার্ক বিশ্লেষণ, টপিক-সেনসিটিভ পেজর‍্যাঙ্ক অ্যালগরিদম (TwitterRank) এবং বৃহৎ আকারের ডেটা মাইনিং বিষয়ে গবেষণা পরিচালনা।",

    // Project Details Technical Headers
    "Project Overview": "প্রকল্পের সংক্ষিপ্ত বিবরণ",
    "Methodology & Technical Architecture": "পদ্ধতি ও কারিগরি স্থাপত্য",
    "Methodology &amp; Technical Architecture": "পদ্ধতি ও কারিগরি স্থাপত্য",
    "Results & Impact": "ফলাফল ও অর্জন",
    "Results &amp; Impact": "ফলাফল ও অর্জন",
    "Key Metrics": "প্রধান মেট্রিক্স",
    "Tech Stack & Tooling": "ব্যবহৃত প্রযুক্তি ও টুলস",
    "Tech Stack &amp; Tooling": "ব্যবহৃত প্রযুক্তি ও টুলস",
    "Live Links & Resources": "লাইভ লিংক ও রিসোর্স",
    "Live Links &amp; Resources": "লাইভ লিংক ও রিসোর্স",
    "Project Live Access & Code": "প্রজেক্টের লাইভ অ্যাক্সেস ও কোড",
    "Project Live Access &amp; Code": "প্রজেক্টের লাইভ অ্যাক্সেস ও কোড",
    "System Architecture": "সিস্টেম আর্কিটেকচার",
    "Image Preprocessing:": "ইমেজ প্রি-প্রসেসিং:",
    "Denoising and contrast enhancement using OpenCV to handle low-light industrial inspection environments.":
      "কম আলোযুক্ত শিল্প পরিবেশে পরিদর্শনের জন্য OpenCV ব্যবহার করে ডিনয়েজিং এবং কনট্রাস্ট বৃদ্ধি।",
    "U-Net and Mask R-CNN backbones for pixel-level boundary segmentation of surface fractures and leaks.":
      "পৃষ্ঠের ফাটল এবং লিকের পিক্সেল-লেভেল বাউন্ডারি সেগমেন্টেশনের জন্য U-Net এবং Mask R-CNN ব্যাকবোন।",
    "Custom-trained YOLO model for immediate bounding-box localization of suspected anomaly regions.":
      "সন্দেহভাজন অস্বাভাবিক অঞ্চল দ্রুত বাউন্ডিং-বক্স লোকালাইজেশনের জন্য কাস্টম-প্রশিক্ষিত YOLO মডেল।",
    "CNN-based ensemble verifying defect severity and alert levels.":
      "ত্রুটির তীব্রতা ও সতর্কতা মাত্রা যাচাইকারী সিএনএন-ভিত্তিক এনসেম্বল।",

    // References, Honors & Resume Details
    "Academic & Professional References": "একাডেমিক ও পেশাগত রেফারেন্স",
    "Academic &amp; Professional References": "একাডেমিক ও পেশাগত রেফারেন্স",
    "Senior faculty members at Jahangirnagar University who have supervised and evaluated my research and academic journey.":
      "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ের জ্যেষ্ঠ শিক্ষকবৃন্দ যারা আমার গবেষণা ও শিক্ষাজীবন তত্ত্বাবধান করেছেন।",
    "References": "রেফারেন্স ও শিক্ষকবৃন্দ",
    "Curriculum Vitae": "জীবনবৃত্তান্ত",
    "Curriculum Vitae · ML Engineer": "জীবনবৃত্তান্ত · এমএল ইঞ্জিনিয়ার",
    "Portfolio": "পোর্টফোলিও",
    "Download PDF": "পিডিএফ ডাউনলোড",
    "Download CV": "সিভি ডাউনলোড",
    "View PDF": "পিডিএফ দেখুন",
    "Raw PDF": "মূল ভেক্টর পিডিএফ",
    "Stream raw vector PDF": "মূল ভেক্টর পিডিএফ দেখুন",
    "Print CV": "সিভি প্রিন্ট করুন",
    "Print": "প্রিন্ট",
    "Share": "শেয়ার",
    "Fit": "ফিট",
    "Reset Zoom": "রিসেট",
    "Zoom In": "জুম ইন",
    "Zoom Out": "জুম আউট",
    "Summary": "সংক্ষিপ্ত পরিচিতি",
    "Education": "শিক্ষাগত যোগ্যতা",
    "Professional Experience": "পেশাগত অভিজ্ঞতা",
    "Publications & Research": "প্রকাশনা ও গবেষণা",
    "Skills & Competencies": "দক্ষতা ও প্রযুক্তি",
    "Certifications & Training": "সার্টিফিকেশন ও প্রশিক্ষণ",
    "Awards & Honors": "পুরস্কার ও সম্মাননা",
    "Contact Information": "যোগাযোগের ঠিকানা",
    "Copied!": "কপি সম্পন্ন!",
    "Copy": "কপি",
    "5th Position — Bangladesh Math Olympiad": "৫ম স্থান — বাংলাদেশ গণিত অলিম্পিয়াড",
    "National Round, Bangladesh": "জাতীয় পর্ব, বাংলাদেশ",
    "Secured 5th position nationwide at the Bangladesh National Math Olympiad, demonstrating high-level analytical problem-solving and discrete mathematics expertise.":
      "বাংলাদেশ জাতীয় গণিত অলিম্পিয়াডে দেশব্যাপী ৫ম স্থান অর্জন, যা উচ্চমানের বিশ্লেষণাত্মক সমস্যা সমাধান এবং ডিসক্রিট ম্যাথমেটিক্স দক্ষতার প্রমাণ।",
    "Government Merit Scholarship": "সরকারি মেধা বৃত্তি",
    "Merit Scholarship · College Games Prefect": "মেধা বৃত্তি · কলেজ গেমস প্রিফেক্ট",
    "National Finalist & Top Ranker": "জাতীয় ফাইনালিস্ট ও শীর্ষ স্থানাধিকারী",
    "National Finalist &amp; Top Ranker": "জাতীয় ফাইনালিস্ট ও শীর্ষ স্থানাধিকারী",

    // Contact Form & Modal
    "Get in Touch": "যোগাযোগ করুন",
    "Get In Touch": "যোগাযোগ করুন",
    "Send a Message": "বার্তা পাঠান",
    "Feel free to reach out about Generative AI, production ML, or potential collaborations.":
      "এআই গবেষণা, মেশিন লার্নিং বা যেকোনো যৌথ প্রজেক্ট নিয়ে নির্দ্বিধায় যোগাযোগ করুন।",
    "Have a question, collaboration idea, or project to discuss? Send a message directly.":
      "কোনো প্রশ্ন, যৌথ কাজের প্রস্তাব বা প্রজেক্ট নিয়ে আলোচনা করতে সরাসরি বার্তা পাঠান।",
    "Your Name *": "আপনার নাম *",
    "Your Email *": "আপনার ইমেইল *",
    "Your Name": "আপনার নাম",
    "Your Email": "আপনার ইমেইল",
    "Subject": "বিষয়",
    "Message *": "বার্তা *",
    "Message": "আপনার বার্তা",
    "Send Message": "বার্তা পাঠান",
    "Cancel": "বাতিল",
    "Write your message here...": "আপনার বার্তা এখানে লিখুন...",
    "Project Inquiry / Hello": "প্রকল্প সংক্রান্ত আলোচনা / শুভেচ্ছা",
    "Enter your username": "আপনার ইউজারনেম লিখুন",
    "Username": "ইউজারনেম",
    "Password": "পাসওয়ার্ড",

    // Footer
    "Pages": "পেজসমূহ",
    "Elsewhere": "সামাজিক যোগাযোগ",
    "Open to conversations about generative AI and applied ML.":
      "ফলিত মেশিন লার্নিং ও এআই গবেষণা নিয়ে যেকোনো গঠনমূলক আলোচনায় আগ্রহী।",
    "Production AI systems and applied ML": "প্রোডাকশন-গ্রেড এআই সিস্টেম এবং ফলিত মেশিন লার্নিং",
    "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
    "Built with Python & Django · Dynamic & Fully Customizable": "পাইথন ও জ্যাঙ্গো নির্মিত · সম্পূর্ণ কাস্টমাইজযোগ্য",
    "Built with Python &amp; Django &middot; Dynamic &amp; Fully Customizable": "পাইথন ও জ্যাঙ্গো নির্মিত · সম্পূর্ণ কাস্টমাইজযোগ্য",
    "Loading live time...": "সময় লোড হচ্ছে..."
  };

  // Pre-filter multi-word phrase keys (length > 5 with spaces) for safe sentence-level matching
  var PHRASE_KEYS = Object.keys(I18N_DICTIONARY).filter(function (key) {
    return key.length > 5 && key.indexOf(' ') !== -1;
  }).sort(function (a, b) {
    return b.length - a.length;
  });

  // 3. Helper: Digits Conversion (English <-> Bangla)
  // Protected against corrupting HTML numeric entities like &#8599; or URLs
  function toBanglaDigits(str) {
    if (typeof str !== 'string') str = String(str);
    var bnMap = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    // Avoid replacing digits that immediately follow &# or &#x
    return str.replace(/(?<!&#\d*)(?<!&#x[0-9a-fA-F]*)[0-9]/g, function (d) {
      return bnMap[d];
    });
  }

  // 4. Live Clock Controller
  function updateLiveClock() {
    var clockEl = document.getElementById('liveDateTimeText');
    if (!clockEl) return;

    var now = new Date();
    var lang = document.documentElement.getAttribute('lang') || currentLang;

    if (lang === 'bn') {
      var daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
      var monthsBn = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];

      var dayName = daysBn[now.getDay()];
      var dateNum = toBanglaDigits(now.getDate());
      var monthName = monthsBn[now.getMonth()];
      var yearNum = toBanglaDigits(now.getFullYear());

      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      var ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
      hours = hours % 12;
      hours = hours ? hours : 12;

      var hStr = toBanglaDigits(hours < 10 ? '0' + hours : hours);
      var mStr = toBanglaDigits(minutes < 10 ? '0' + minutes : minutes);
      var sStr = toBanglaDigits(seconds < 10 ? '0' + seconds : seconds);

      clockEl.textContent = dayName + ', ' + dateNum + ' ' + monthName + ' ' + yearNum + ' · ' + hStr + ':' + mStr + ':' + sStr + ' ' + ampm;
    } else {
      var daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      var dayNameEn = daysEn[now.getDay()];
      var dateNumEn = now.getDate();
      var monthNameEn = monthsEn[now.getMonth()];
      var yearNumEn = now.getFullYear();

      var h = now.getHours();
      var m = now.getMinutes();
      var s = now.getSeconds();
      var ampmEn = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;

      var hDisp = h < 10 ? '0' + h : h;
      var mDisp = m < 10 ? '0' + m : m;
      var sDisp = s < 10 ? '0' + s : s;

      clockEl.textContent = dayNameEn + ', ' + dateNumEn + ' ' + monthNameEn + ' ' + yearNumEn + ' · ' + hDisp + ':' + mDisp + ':' + sDisp + ' ' + ampmEn;
    }
  }

  // 5. Theme Switcher Controller
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site_theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
      if (document.body) {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      }
    } else {
      document.documentElement.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
      if (document.body) {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      }
    }

    var btnDark = document.getElementById('themeBtnDark');
    var btnLight = document.getElementById('themeBtnLight');
    if (btnDark && btnLight) {
      if (theme === 'dark') {
        btnDark.classList.add('is-active');
        btnLight.classList.remove('is-active');
      } else {
        btnLight.classList.add('is-active');
        btnDark.classList.remove('is-active');
      }
    }
  }

  // 6. Safe, High-Fidelity Language Switcher Engine
  var translatedNodes = [];

  function normalizeHtmlEntities(str) {
    return str.replace(/&amp;/g, '&')
              .replace(/&middot;/g, '·')
              .replace(/&rarr;/g, '→')
              .replace(/&larr;/g, '←')
              .replace(/&darr;/g, '↓')
              .replace(/&#8599;/g, '↗')
              .replace(/&eacute;/g, 'é');
  }

  function translateNode(node) {
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      var raw = node.nodeValue;
      var trimmed = raw.trim();
      if (!trimmed) return;

      if (node._origText === undefined) {
        node._origText = raw;
      }

      // 1. Direct exact dictionary match
      if (I18N_DICTIONARY[trimmed]) {
        node.nodeValue = raw.replace(trimmed, I18N_DICTIONARY[trimmed]);
        if (node.parentElement) {
          node.parentElement.classList.add('notranslate');
          node.parentElement.setAttribute('translate', 'no');
        }
        translatedNodes.push(node);
        return;
      }

      // 2. Normalized entity exact match
      var norm = normalizeHtmlEntities(trimmed);
      if (I18N_DICTIONARY[norm]) {
        node.nodeValue = raw.replace(trimmed, I18N_DICTIONARY[norm]);
        if (node.parentElement) {
          node.parentElement.classList.add('notranslate');
          node.parentElement.setAttribute('translate', 'no');
        }
        translatedNodes.push(node);
        return;
      }

      // 3. Multi-sentence / composite clause matching (safe, multi-word only)
      if (trimmed.indexOf('. ') !== -1 || trimmed.indexOf(' — ') !== -1 || trimmed.indexOf(' · ') !== -1 || trimmed.indexOf(' & ') !== -1) {
        var text = raw;
        var hasChanged = false;
        for (var i = 0; i < PHRASE_KEYS.length; i++) {
          var pKey = PHRASE_KEYS[i];
          if (text.indexOf(pKey) !== -1) {
            text = text.split(pKey).join(I18N_DICTIONARY[pKey]);
            hasChanged = true;
          }
        }
        if (hasChanged) {
          node.nodeValue = text;
          if (node.parentElement) {
            node.parentElement.classList.add('notranslate');
            node.parentElement.setAttribute('translate', 'no');
          }
          translatedNodes.push(node);
          return;
        }
      }

      // 4. Standalone pure numbers in stat cards & badges (e.g. "01", "3+", "4+", "7.0")
      if (/^\s*\d+[\+\.]?\s*$/.test(trimmed)) {
        node.nodeValue = toBanglaDigits(raw);
        translatedNodes.push(node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      var tag = node.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') return;
      if (node.id === 'google_translate_element') return;

      // Handle data-trans attributes
      if (node.hasAttribute('data-trans')) {
        var key = node.getAttribute('data-trans');
        if (I18N_DICTIONARY[key]) {
          if (node._origText === undefined) node._origText = node.textContent;
          node.textContent = I18N_DICTIONARY[key];
          node.classList.add('notranslate');
          node.setAttribute('translate', 'no');
          translatedNodes.push(node);
        }
      }

      // Handle placeholder
      if (node.placeholder && I18N_DICTIONARY[node.placeholder]) {
        if (node._origPlaceholder === undefined) node._origPlaceholder = node.placeholder;
        node.placeholder = I18N_DICTIONARY[node.placeholder];
        translatedNodes.push(node);
      }

      // Handle title
      if (node.title && I18N_DICTIONARY[node.title]) {
        if (node._origTitle === undefined) node._origTitle = node.title;
        node.title = I18N_DICTIONARY[node.title];
        translatedNodes.push(node);
      }

      // Handle aria-label
      if (node.hasAttribute('aria-label') && I18N_DICTIONARY[node.getAttribute('aria-label')]) {
        var al = node.getAttribute('aria-label');
        if (node._origAriaLabel === undefined) node._origAriaLabel = al;
        node.setAttribute('aria-label', I18N_DICTIONARY[al]);
        translatedNodes.push(node);
      }

      // Recursively traverse child nodes
      var child = node.firstChild;
      while (child) {
        translateNode(child);
        child = child.nextSibling;
      }
    }
  }

  function revertAllTranslations() {
    for (var i = 0; i < translatedNodes.length; i++) {
      var item = translatedNodes[i];
      if (item.nodeType === Node.TEXT_NODE && item._origText !== undefined) {
        item.nodeValue = item._origText;
        if (item.parentElement) {
          item.parentElement.classList.remove('notranslate');
          item.parentElement.removeAttribute('translate');
        }
      } else if (item.nodeType === Node.ELEMENT_NODE) {
        if (item._origText !== undefined) item.textContent = item._origText;
        if (item._origPlaceholder !== undefined) item.placeholder = item._origPlaceholder;
        if (item._origTitle !== undefined) item.title = item._origTitle;
        if (item._origAriaLabel !== undefined) item.setAttribute('aria-label', item._origAriaLabel);
        item.classList.remove('notranslate');
        item.removeAttribute('translate');
      }
    }
    translatedNodes = [];
  }

  // Google Translate Helper for non-dictionary elements
  function setGoogleTranslateCookie(lang) {
    var host = window.location.hostname;
    var cookieVal = '/en/' + lang;
    document.cookie = 'googtrans=' + cookieVal + '; path=/;';
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      document.cookie = 'googtrans=' + cookieVal + '; path=/; domain=' + host;
      document.cookie = 'googtrans=' + cookieVal + '; path=/; domain=.' + host;
    }
  }

  function clearGoogleTranslateCookie() {
    var host = window.location.hostname;
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=/en/en; path=/;';
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + host + '; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.' + host + '; path=/;';
    }
  }

  function triggerGoogleTranslateCombo(lang) {
    var select = document.querySelector('.goog-te-combo');
    if (select) {
      if (select.value !== lang) {
        select.value = lang;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return true;
    }
    return false;
  }

  function syncGoogleTranslate(lang) {
    if (lang === 'bn') {
      setGoogleTranslateCookie('bn');
    } else {
      clearGoogleTranslateCookie();
    }

    if (!triggerGoogleTranslateCombo(lang)) {
      var attempts = 0;
      var timer = setInterval(function () {
        attempts++;
        if (triggerGoogleTranslateCombo(lang) || attempts >= 20) {
          clearInterval(timer);
        }
      }, 200);
    }
  }

  function suppressGoogleTranslateBanner() {
    if (document.body) {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      if (document.body.style.position && document.body.style.position !== 'static') {
        document.body.style.position = 'static';
      }
    }
    var selectors = [
      '.goog-te-banner-frame',
      'iframe.goog-te-banner-frame',
      '.skiptranslate.goog-te-banner-frame',
      '#goog-gt-tt',
      '#goog-gt-vt',
      '.goog-tooltip',
      '.goog-te-balloon-frame'
    ];
    selectors.forEach(function (sel) {
      var elements = document.querySelectorAll(sel);
      elements.forEach(function (el) {
        if (el) {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          el.style.height = '0px';
        }
      });
    });
  }

  if (typeof MutationObserver !== 'undefined') {
    var googleBannerObserver = new MutationObserver(function () {
      suppressGoogleTranslateBanner();
    });
    if (document.documentElement) {
      googleBannerObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }
  setInterval(suppressGoogleTranslateBanner, 300);

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('site_lang', lang);

    var btnEn = document.getElementById('langBtnEn');
    var btnBn = document.getElementById('langBtnBn');
    if (btnEn && btnBn) {
      if (lang === 'bn') {
        btnBn.classList.add('is-active');
        btnEn.classList.remove('is-active');
      } else {
        btnEn.classList.add('is-active');
        btnBn.classList.remove('is-active');
      }
    }

    if (lang === 'bn') {
      // 1. Instant high-fidelity DOM translation across all content, sections, and numbers
      if (document.body) translateNode(document.body);
      // 2. Google Translate Bridge for non-dictionary dynamic text
      syncGoogleTranslate('bn');
    } else {
      // 1. Revert client-side translated nodes
      revertAllTranslations();
      // 2. Revert Google Translate bridge
      syncGoogleTranslate('en');
    }

    // Refresh live clock format immediately
    updateLiveClock();
  }

  // 7. Initialize Everything when DOM is Ready
  function initNavbarControls() {
    // Apply initial theme
    applyTheme(currentTheme);

    // Bind Theme Buttons
    var btnDark = document.getElementById('themeBtnDark');
    var btnLight = document.getElementById('themeBtnLight');
    if (btnDark) {
      btnDark.addEventListener('click', function () {
        applyTheme('dark');
      });
    }
    if (btnLight) {
      btnLight.addEventListener('click', function () {
        applyTheme('light');
      });
    }

    // Bind Language Buttons
    var btnEn = document.getElementById('langBtnEn');
    var btnBn = document.getElementById('langBtnBn');
    if (btnEn) {
      btnEn.addEventListener('click', function () {
        applyLanguage('en');
      });
    }
    if (btnBn) {
      btnBn.addEventListener('click', function () {
        applyLanguage('bn');
      });
    }

    // Start Live Clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // Apply saved language if Bangla was selected
    if (currentLang === 'bn') {
      applyLanguage('bn');
    }

    // Translate dynamic modals when opened
    var contactOpenBtns = document.querySelectorAll('[data-contact-open]');
    contactOpenBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentLang === 'bn') {
          var modal = document.getElementById('contactModal');
          if (modal) translateNode(modal);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarControls);
  } else {
    initNavbarControls();
  }
})();
