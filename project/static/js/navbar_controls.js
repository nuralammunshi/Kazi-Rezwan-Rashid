/**
 * navbar_controls.js
 * Controls Live Date/Time, Full Website Bangla <-> English Translation,
 * Dark Mode <-> White Mode Switcher, and Navbar State.
 */

(function () {
  'use strict';

  // 1. Initial State
  var currentTheme = localStorage.getItem('site_theme') || 'dark';
  var currentLang = localStorage.getItem('site_lang') || 'en';

  // Apply theme immediately to documentElement to avoid flicker
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.remove('theme-light');
  } else {
    document.documentElement.classList.add('theme-light');
    document.documentElement.classList.remove('theme-dark');
  }

  // 2. Comprehensive Translation Dictionary (English -> Bangla)
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

    // Profile & Hero
    "ML Engineer & Data Science Manager": "মেশিন লার্নিং ইঞ্জিনিয়ার ও ডেটা সায়েন্স ম্যানেজার",
    "ML Engineering · GenAI": "এমএল ইঞ্জিনিয়ারিং · জেনএআই",
    "Harrison Jansma": "কাজী রেজওয়ান রশীদ",
    "Kazi Rezwan Rashid": "কাজী রেজওয়ান রশীদ",
    "I build generative-AI systems that reach production — real-time LLM tools, RAG, and NLP at scale — and lead the teams that ship them.":
      "আমি প্রোডাকশন-গ্রেড জেনারেটিভ এআই সিস্টেম তৈরি করি — রিয়েল-টাইম এলএলএম টুলস, আরএজি এবং এনএলপি স্কেলিং — এবং এগুলো বাস্তবায়নকারী টিমকে নেতৃত্ব দিই।",

    // Key Stats
    "Years in applied AI/ML": "বছর ফলিত এআই/এমএল অভিজ্ঞতা",
    "IEEE Research Papers": "আইইইই গবেষণা পত্র",
    "Production AI Systems": "প্রোডাকশন এআই সিস্টেম",
    "Computer Science & Eng.": "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং",
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
    "delivered mid-conversation": "কথোপকথনের মাঝে সরবরাহকৃত",
    "Servicing agent desktop": "সার্ভিসিং এজেন্ট ডেস্কটপ",
    "The shape of three production systems below — one live audio stream, three models, sub-second delivery.":
      "তিনটি প্রোডাকশন সিস্টেমের রূপরেখা — একটি লাইভ অডিও স্ট্রিম, তিনটি মডেল এবং সাব-সেকেন্ড ডেলিভারি।",

    // Section 01: What I work on
    "01 — What I work on": "০১ — মূল কর্মক্ষেত্র",
    "From research to real-time production": "গবেষণা থেকে বাস্তব উৎপাদন ব্যবস্থা",
    "The problems I love solving.": "যেসব জটিল সমস্যার সমাধান করতে আমি ভালোবাসি।",
    "Generative-AI systems": "জেনারেটিভ এআই সিস্টেম",
    "Retrieval-Augmented Generation (RAG)": "রিট্রিভাল-অগমেন্টেড জেনারেশন (RAG)",
    "Real-time streaming NLP": "রিয়েল-টাইম স্ট্রিমিং এনএলপি",
    "Credit-risk ML at scale": "লার্জ-স্কেল ক্রেডিট রিস্ক এমএল",
    "Team leadership & engineering": "টিম লিডারশিপ ও সফটওয়্যার ইঞ্জিনিয়ারিং",
    "Applied research & benchmarking": "ফলিত গবেষণা ও বেঞ্চমার্কিং",

    // Section 02: Skills & Tooling
    "02 — Skills & tooling": "০২ — প্রযুক্তি ও দক্ষতা",
    "The stack I reach for": "আমার ব্যবহৃত প্রযুক্তি ও টুলস",
    "Taking models to production — tap a skill to read the case study.":
      "মডেল সফলভাবে উৎপাদনে রূপান্তর — কেস স্টাডি দেখতে স্কিলে ট্যাপ করুন।",

    // Section 03: Selected Work
    "03 — Selected Work": "০৩ — বাছাইকৃত প্রকল্পসমূহ",
    "systems, prototype to production": "সিস্টেম, প্রোটোটাইপ থেকে পূর্ণাঙ্গ উৎপাদন",
    "Generative AI and real-time NLP augmenting thousands of contact-center agents, credit models decisioning loans at large scale, and the earlier research and big-data work that got me there.":
      "হাজার হাজার এজেন্টকে সাহায্যকারী জেনারেটিভ এআই ও রিয়েল-টাইম এনএলপি, লার্জ স্কেলে লোন অনুমোদনকারী ক্রেডিট মডেল এবং পূর্ববর্তী বিগ-ডেটা গবেষণার কাজ।",
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

    // Section 06: Photo Gallery
    "Moments & Highlights": "স্মরণীয় মুহূর্ত ও অর্জন",
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

    // Contact Modal
    "Get in Touch": "যোগাযোগ করুন",
    "Have a question, collaboration idea, or project to discuss? Send a message directly.":
      "কোনো প্রশ্ন, যৌথ কাজের প্রস্তাব বা প্রজেক্ট নিয়ে আলোচনা করতে সরাসরি বার্তা পাঠান।",
    "Your Name": "আপনার নাম",
    "Your Email": "আপনার ইমেইল",
    "Subject": "বিষয়",
    "Message": "আপনার বার্তা",
    "Send Message": "বার্তা পাঠান",
    "Cancel": "বাতিল",

    // Footer
    "Pages": "পেজসমূহ",
    "Elsewhere": "সামাজিক যোগাযোগ",
    "Open to conversations about generative AI and applied ML.":
      "জেনারেটিভ এআই এবং ফলিত মেশিন লার্নিং নিয়ে যেকোনো গঠনমূলক আলোচনায় আগ্রহী।",
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
      hours = hours ? hours : 12; // 0 should be 12

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

  // 6. Language Switcher (Full Website Bangla <-> English)
  var translatedElements = [];

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      var trimmed = node.nodeValue.trim();
      if (!trimmed) return;

      if (I18N_DICTIONARY[trimmed]) {
        if (!node._origText) node._origText = node.nodeValue;
        node.nodeValue = node.nodeValue.replace(trimmed, I18N_DICTIONARY[trimmed]);
        translatedElements.push(node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script, style, code, pre tags
      var tag = node.tagName.toLowerCase();
      if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'pre') return;

      // Handle data-trans attributes directly
      if (node.hasAttribute('data-trans')) {
        var transKey = node.getAttribute('data-trans');
        if (I18N_DICTIONARY[transKey]) {
          if (!node._origText) node._origText = node.textContent;
          node.textContent = I18N_DICTIONARY[transKey];
          translatedElements.push(node);
        }
      }

      // Check placeholder
      if (node.placeholder && I18N_DICTIONARY[node.placeholder]) {
        if (!node._origPlaceholder) node._origPlaceholder = node.placeholder;
        node.placeholder = I18N_DICTIONARY[node.placeholder];
        translatedElements.push(node);
      }

      // Traverse children
      var children = node.childNodes;
      for (var i = 0; i < children.length; i++) {
        translateNode(children[i]);
      }
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
      // Translate to Bangla
      translateNode(document.body);
    } else {
      // Revert back to English
      for (var i = 0; i < translatedElements.length; i++) {
        var item = translatedElements[i];
        if (item.nodeType === Node.TEXT_NODE && item._origText !== undefined) {
          item.nodeValue = item._origText;
        } else if (item.nodeType === Node.ELEMENT_NODE) {
          if (item._origText !== undefined) item.textContent = item._origText;
          if (item._origPlaceholder !== undefined) item.placeholder = item._origPlaceholder;
        }
      }
      translatedElements = [];
    }

    // Refresh Live Clock display
    updateLiveClock();
  }

  // 7. Initialize Everything when DOM is Ready
  function initNavbarControls() {
    // Set initial theme buttons state
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

    // Apply saved language if Bangla was chosen previously
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
