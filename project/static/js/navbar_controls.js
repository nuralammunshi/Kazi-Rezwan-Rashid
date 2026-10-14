/**
 * navbar_controls.js
 * Comprehensive Controller for:
 * 1. Live Real-Time Date & Time (EN & BN format)
 * 2. Full Website Bilingual Translation Engine (English <-> Bangla) + Google Translate Bridge
 * 3. Complete Website Theme Engine (Dark Mode <-> White/Light Mode)
 * 4. Navbar & Mobile Menu Control
 */

(function () {
  'use strict';

  // 1. Initial State Persistence
  var currentTheme = localStorage.getItem('site_theme') || 'dark';
  var currentLang = localStorage.getItem('site_lang') || 'en';

  // Immediately apply theme to document root to avoid flash of wrong theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
  }

  // 2. Comprehensive Master Translation Dictionary (English -> Bangla)
  var I18N_DICTIONARY = {
    // Navigation & Global Actions
    "Home": "হোম",
    "About": "পরিচিতি",
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
    "Manage Gallery": "গ্যালারি পরিচালনা",
    "Open the live demo": "লাইভ ডেমো দেখুন",
    "Read the write-up": "বিস্তারিত পড়ুন",
    "All work": "সকল প্রকল্প",
    "Back to top": "উপরে যান",
    "Sign In to Dashboard →": "ড্যাশবোর্ডে লগইন করুন →",
    "Return to Public Website": "মূল ওয়েবসাইটে ফিরুন",

    // Profile & Hero
    "Harrison Jansma": "কাজী রেজওয়ান রশীদ",
    "Kazi Rezwan Rashid": "কাজী রেজওয়ান রশীদ",
    "ML Engineer & Data Science Manager": "মেশিন লার্নিং ইঞ্জিনিয়ার ও ডেটা সায়েন্স গবেষক",
    "ML Engineering · GenAI": "এমএল ইঞ্জিনিয়ারিং · জেনএআই",
    "Production AI systems and applied ML.": "প্রোডাকশন-গ্রেড এআই সিস্টেম এবং ফলিত মেশিন লার্নিং।",
    "I build generative-AI systems that reach production — real-time LLM tools, RAG, and NLP at scale — and lead the teams that ship them.":
      "আমি প্রোডাকশন-গ্রেড জেনারেটিভ এআই সিস্টেম তৈরি করি — রিয়েল-টাইম এলএলএম টুলস, আরএজি এবং এনএলপি স্কেলিং — এবং বাস্তবায়নকারী দলের নেতৃত্ব দিই।",
    "I build production AI systems, real-time Computer Vision pipelines, and deep learning healthcare solutions.":
      "আমি প্রোডাকশন-গ্রেড এআই সিস্টেম, রিয়েল-টাইম কম্পিউটার ভিশন পাইপলাইন এবং স্বাস্থ্যসেবায় ডিপ লার্নিং সল্যুশন নির্মাণ করি।",

    // Key Statistics
    "Years in applied AI/ML": "বছর ফলিত এআই/এমএল অভিজ্ঞতা",
    "IEEE Research Papers": "আইইইই গবেষণা পত্র প্রকাশিত",
    "Production AI Systems": "প্রোডাকশন এআই সিস্টেম",
    "Computer Science & Eng.": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
    "Computer Science & Eng (Jahangirnagar Univ)": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (জাহাঙ্গীরনগর বিশ্ববিদ্যালয়)",
    "IEEE Research Papers Published (QPAIN)": "আইইইই গবেষণা পত্র প্রকাশিত (QPAIN)",
    "Deep Learning & Vision Systems": "ডিপ লার্নিং ও কম্পিউটার ভিশন সিস্টেম",
    "IELTS Band Score (L: 8.0, R: 6.5)": "আইইএলটিএস স্কোর (লিসনিং: ৮.০, রিডিং: ৬.৫)",
    "MSc & BSc": "এমএসসি ও বিএসসি",

    // Architecture Diagram on Hero
    "contact-center genai · architecture": "কন্ট্যাক্ট-সেন্টার জেনএআই · আর্কিটেকচার",
    "streaming": "স্ট্রিমিং",
    "source": "উৎস",
    "transport": "পরিবহন",
    "Live customer call": "লাইভ কাস্টমার কল",
    "Streaming transcript → Kafka": "স্ট্রিমিং ট্রান্সক্রিপ্ট → কাফকা",
    "Agentic summarization": "এজেন্টিক সারাংশকরণ",
    "Procedure RAG": "প্রসিডিউর আরএজি (RAG)",
    "Frustration detection": "ফ্রাস্ট্রেশন ডিটেকশন",
    "delivered mid-conversation": "কথোপকথনের মাঝে তাৎক্ষণিক সরবরাহ",
    "Servicing agent desktop": "সার্ভিসিং এজেন্ট ডেস্কটপ",
    "The shape of three production systems below — one live audio stream, three models, sub-second delivery.":
      "নিচে তিনটি প্রোডাকশন সিস্টেমের রূপরেখা — একটি লাইভ অডিও স্ট্রিম, তিনটি মডেল এবং সাব-সেকেন্ড ডেলিভারি।",

    // Section 01: What I work on
    "01 — What I work on": "০১ — মূল কর্মক্ষেত্র",
    "01 — Selected work": "০১ — বাছাইকৃত কাজ",
    "From research to real-time production": "গবেষণা থেকে বাস্তব উৎপাদন ব্যবস্থা",
    "The problems I love solving.": "যেসব জটিল সমস্যার সমাধান করতে আমি ভালোবাসি।",
    "Systems in production": "বাস্তব প্রয়োগে সক্রিয় সিস্টেম",
    "Generative-AI systems": "জেনারেটিভ এআই সিস্টেম",
    "Retrieval-Augmented Generation (RAG)": "রিট্রিভাল-অগমেন্টেড জেনারেশন (RAG)",
    "Real-time streaming NLP": "রিয়েল-টাইম স্ট্রিমিং এনএলপি",
    "Credit-risk ML at scale": "লার্জ-স্কেল ক্রেডিট রিস্ক এমএল",
    "Team leadership & engineering": "টিম লিডারশিপ ও সফটওয়্যার ইঞ্জিনিয়ারিং",
    "Applied research & benchmarking": "ফলিত গবেষণা ও বেঞ্চমার্কিং",
    "Deep Learning & Neural Networks": "ডিপ লার্নিং ও নিউরাল নেটওয়ার্ক",
    "Computer Vision & Localization": "কম্পিউটার ভিশন ও লোকালাইজেশন",
    "Medical Imaging & Healthcare AI": "মেডিকেল ইমেজিং ও হেলথকেয়ার এআই",
    "Industrial AI & Safety Systems": "ইন্ডাস্ট্রিয়াল এআই ও সেফটি সিস্টেম",
    "NLP & Explainable AI (XAI)": "এনএলপি ও ব্যাখ্যাযোগ্য এআই (XAI)",
    "Academic Instruction & Mentorship": "একাডেমিক শিক্ষকতা ও মেন্টরশিপ",

    // Section 02: Skills & Tooling
    "02 — Skills & tooling": "০২ — প্রযুক্তি ও দক্ষতা",
    "The stack I reach for": "আমার ব্যবহৃত প্রযুক্তি ও টুলস",
    "Taking models to production — tap a skill to read the case study.":
      "মডেল সফলভাবে উৎপাদনে রূপান্তর — কেস স্টাডি দেখতে স্কিলে ট্যাপ করুন।",
    "Deep Learning & Computer Vision": "ডিপ লার্নিং ও কম্পিউটার ভিশন",
    "Programming & Full-Stack": "প্রোগ্রামিং ও ফুল-স্ট্যাক ডেভেলপমেন্ট",
    "Data Science & Software Proficiency": "ডেটা সায়েন্স ও সফটওয়্যার দক্ষতা",

    // Section 03: Selected Work & Projects
    "03 — Selected Work": "০৩ — নির্বাচিত প্রজেক্টসমূহ",
    "systems, prototype to production": "সিস্টেম, প্রোটোটাইপ থেকে পূর্ণাঙ্গ উৎপাদন",
    "Radiation Leak Detection in Nuclear Power Plants": "পারমাণবিক বিদ্যুৎ কেন্দ্রে বিকিরণ ফুটো সনাক্তকরণ",
    "Deep Learning Assisted Lung Cancer Diagnosis System": "ডিপ লার্নিং সহায়ক ফুসফুস ক্যান্সার নির্ণয় ব্যবস্থা",
    "Endurable Sunflower Disease Recognition System": "টেকসই সূর্যমুখী রোগ শনাক্তকরণ পদ্ধতি",
    "Neural Ensemble for Low-Resource Language Understanding": "স্বল্প-সম্পদ ভাষা বোঝার জন্য নিউরাল এনসেম্বল",
    "Explainable Sentiment Analysis with BERT, LIME & SHAP": "BERT, LIME এবং SHAP ভিত্তিক ব্যাখ্যাযোগ্য সেন্টিমেন্ট অ্যানালাইসিস",
    "AI-AUTHENTICATE: AI-Driven Zero-Trust Access Control": "AI-AUTHENTICATE: এআই-চালিত জিরো-ট্রাস্ট অ্যাক্সেস কন্ট্রোল",
    "E-Commerce Website with Virtual Trial 3D System": "ভার্চুয়াল ট্রায়াল থ্রিডি সিস্টেমসহ ই-কমার্স ওয়েবসাইট",
    "Social Network Analysis & TwitterRank Data Mining": "সোশ্যাল নেটওয়ার্ক বিশ্লেষণ ও টুইটারর‍্যাঙ্ক ডেটা মাইনিং",
    "Live Call Copilot": "লাইভ কল কোপাইলট",

    // Section 04: About me preview
    "04 — About me": "০৪ — আমার সম্পর্কে",
    "About me": "আমার সম্পর্কে",
    "Hi, I'm Harrison Jansma": "স্বাগতম, আমি কাজী রেজওয়ান রশীদ",
    "Hi, I'm Kazi Rezwan Rashid": "স্বাগতম, আমি কাজী রেজওয়ান রশীদ",

    // Section 05: Experience Timeline
    "Experience": "কর্মজীবন ও অভিজ্ঞতা",
    "Career Highlights": "কর্মজীবনের উল্লেখযোগ্য অর্জন",
    "Highlighted roles and leadership experience.": "উল্লেখযোগ্য দায়িত্ব ও নেতৃত্ব অভিজ্ঞতা।",
    "Career Timeline & Journey": "কর্মজীবনের টাইমলাইন ও অভিজ্ঞতা",
    "Expand a role to see what I built there.": "বিস্তারিত দায়িত্ব দেখতে যেকোনো ভূমিকায় ক্লিক করুন।",
    "Current": "বর্তমান",
    "Lecturer": "প্রভাষক",
    "Teaching Assistant": "টিচিং অ্যাসিস্ট্যান্ট",
    "Graduate Researcher": "গ্র্যাজুয়েট গবেষক",

    // Section 06: Photo Gallery
    "06 — Photo Gallery": "০৬ — ফটো গ্যালারি",
    "Moments & Highlights": "স্মরণীয় মুহূর্ত ও অর্জন",
    "Photo Gallery": "ছবির গ্যালারি",
    "A visual journey behind the research, conferences, university life, milestones, and memorable captures.":
      "গবেষণা, কনফারেন্স, বিশ্ববিদ্যালয় জীবন এবং স্মরণীয় অর্জনের একটি ছবির কোলাজ।",
    "photos · tap to view": "টি ছবি · বড় করে দেখতে চাপুন",
    "Professional Portrait": "প্রফেশনাল পোর্ট্রেট",
    "Kazi Rezwan Rashid — Machine Learning Engineer & Data Science Researcher.":
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

    // Contact Form & Modal
    "Get in Touch": "যোগাযোগ করুন",
    "Have a question, collaboration idea, or project to discuss? Send a message directly.":
      "কোনো প্রশ্ন, যৌথ কাজের প্রস্তাব বা প্রজেক্ট নিয়ে আলোচনা করতে সরাসরি বার্তা পাঠান।",
    "Your Name": "আপনার নাম",
    "Your Email": "আপনার ইমেইল",
    "Subject": "বিষয়",
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
      "জেনারেটিভ এআই এবং ফলিত মেশিন লার্নিং নিয়ে যেকোনো গঠনমূলক আলোচনায় আগ্রহী।",
    "Production AI systems and applied ML": "প্রোডাকশন-গ্রেড এআই সিস্টেম এবং ফলিত মেশিন লার্নিং",
    "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।"
  };

  // 3. Helper: Digits Conversion (English <-> Bangla)
  function toBanglaDigits(str) {
    if (typeof str !== 'string') str = String(str);
    var bnMap = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return str.replace(/[0-9]/g, function (d) {
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

  // 5. Theme Switcher Controller (Full Website Dark <-> White)
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

  // 6. Language Switcher (Full Website Bangla <-> English)
  var translatedNodes = [];

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      var raw = node.nodeValue;
      var trimmed = raw.trim();
      if (!trimmed) return;

      // Check exact match
      if (I18N_DICTIONARY[trimmed]) {
        if (node._origText === undefined) node._origText = raw;
        node.nodeValue = raw.replace(trimmed, I18N_DICTIONARY[trimmed]);
        translatedNodes.push(node);
        return;
      }

      // Check phrase replacements
      var modified = raw;
      var hasChanged = false;
      for (var key in I18N_DICTIONARY) {
        if (key.length > 3 && modified.indexOf(key) !== -1) {
          if (node._origText === undefined) node._origText = raw;
          modified = modified.split(key).join(I18N_DICTIONARY[key]);
          hasChanged = true;
        }
      }
      if (hasChanged) {
        node.nodeValue = modified;
        translatedNodes.push(node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      var tag = node.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') return;

      // Handle data-trans attributes
      if (node.hasAttribute('data-trans')) {
        var key = node.getAttribute('data-trans');
        if (I18N_DICTIONARY[key]) {
          if (node._origText === undefined) node._origText = node.textContent;
          node.textContent = I18N_DICTIONARY[key];
          translatedNodes.push(node);
        }
      }

      // Handle input / textarea placeholder
      if (node.placeholder && I18N_DICTIONARY[node.placeholder]) {
        if (node._origPlaceholder === undefined) node._origPlaceholder = node.placeholder;
        node.placeholder = I18N_DICTIONARY[node.placeholder];
        translatedNodes.push(node);
      }

      // Handle title attribute
      if (node.title && I18N_DICTIONARY[node.title]) {
        if (node._origTitle === undefined) node._origTitle = node.title;
        node.title = I18N_DICTIONARY[node.title];
        translatedNodes.push(node);
      }

      // Recursively traverse child nodes
      var children = node.childNodes;
      for (var i = 0; i < children.length; i++) {
        translateNode(children[i]);
      }
    }
  }

  function triggerGoogleTranslate(targetLang) {
    var host = window.location.hostname;
    if (targetLang === 'bn') {
      document.cookie = "googtrans=/en/bn; path=/";
      if (host) {
        document.cookie = "googtrans=/en/bn; path=/; domain=" + host;
        document.cookie = "googtrans=/en/bn; path=/; domain=." + host;
      }
    } else {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=/en/en; path=/";
      if (host) {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + host;
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + host;
      }
    }

    var combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = targetLang;
      combo.dispatchEvent(new Event('change'));
    }
  }

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
      // 1. Instant client-side DOM translation
      translateNode(document.body);
      // 2. Google Translate Bridge for full remaining content
      triggerGoogleTranslate('bn');
    } else {
      // 1. Revert client-side DOM translation
      for (var i = 0; i < translatedNodes.length; i++) {
        var item = translatedNodes[i];
        if (item.nodeType === Node.TEXT_NODE && item._origText !== undefined) {
          item.nodeValue = item._origText;
        } else if (item.nodeType === Node.ELEMENT_NODE) {
          if (item._origText !== undefined) item.textContent = item._origText;
          if (item._origPlaceholder !== undefined) item.placeholder = item._origPlaceholder;
          if (item._origTitle !== undefined) item.title = item._origTitle;
        }
      }
      translatedNodes = [];
      // 2. Revert Google Translate
      triggerGoogleTranslate('en');
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbarControls);
  } else {
    initNavbarControls();
  }
})();
