// ACTIVE JAVASCRIPT (ES5 — Google Apps Script friendly): Star generation, mobile menu & Command Engine
(function () {

  // --- STARRY SKY RENDERING ENGINE (SHARED BY HERO & FOOTER) ---
  var starFields = [
    { canvas: document.getElementById('space-canvas'), container: document.getElementById('hero-section'), stars: [] },
    { canvas: document.getElementById('footer-space-canvas'), container: document.getElementById('contact'), stars: [] }
  ];
  for (var f = 0; f < starFields.length; f++) {
    starFields[f].ctx = starFields[f].canvas.getContext('2d');
  }

  function resizeCanvas() {
    for (var i = 0; i < starFields.length; i++) {
      var field = starFields[i];
      field.canvas.width = field.container.offsetWidth;
      field.canvas.height = field.container.offsetHeight;
      initializeStars(field);
    }
  }

  function initializeStars(field) {
    field.stars = [];
    var density = Math.floor((field.canvas.width * field.canvas.height) / 8000);
    for (var i = 0; i < density; i++) {
      field.stars.push({
        x: Math.random() * field.canvas.width,
        y: Math.random() * field.canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.02
      });
    }
  }

  function drawStars() {
    for (var f = 0; f < starFields.length; f++) {
      var field = starFields[f];
      field.ctx.clearRect(0, 0, field.canvas.width, field.canvas.height);
      field.ctx.fillStyle = '#FFFFFF';

      for (var i = 0; i < field.stars.length; i++) {
        var star = field.stars[i];
        field.ctx.globalAlpha = Math.abs(Math.sin(star.alpha));
        field.ctx.beginPath();
        field.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        field.ctx.fill();
        star.alpha += star.speed;
      }
    }

    requestAnimationFrame(drawStars);
  }

  // --- MOBILE BURGER DRAWER ---
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn.addEventListener('click', function () {
    var isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when links are clicked
  var mobileMenuLinks = mobileMenu.querySelectorAll('a');
  for (var m = 0; m < mobileMenuLinks.length; m++) {
    mobileMenuLinks[m].addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  // --- PLAYFUL TERMINAL SHEEP BOX CONTROLLERS ---
  var terminalScreen = document.getElementById('terminal-screen');

  // Builds a small rainbow "lolcat" styled ASCII fox, one <span> per character
  // so each letter can cycle through hues via the .lolcat CSS animation.
  function buildLolcatFox() {
    var art = [
      '   /\\   /\\   ',
      '  ( \\\\_/// ) ',
      '   \\  o o  / ',
      '    \\  ~  /  ',
      '     |   |   '
    ];
    var html = '<pre class="lolcat inline-block text-left text-xs sm:text-sm leading-tight font-mono">';
    for (var line = 0; line < art.length; line++) {
      var text = art[line];
      for (var c = 0; c < text.length; c++) {
        var ch = text.charAt(c);
        var delay = ((line * text.length) + c) * 0.06;
        if (ch === ' ') {
          html += ' ';
        } else {
          html += '<span style="animation-delay:' + delay + 's;">' + ch + '</span>';
        }
      }
      html += '\n';
    }
    html += '</pre>';
    return html;
  }

  // A watering can (gold) drips water (blue) onto a sprout, which grows a
  // green stem and blooms a red flower, frame by frame.
  var ROSE_CAN_TOP = '  <span class="text-yellow-400">__</span>            ';
  var ROSE_CAN_BODY = ' <span class="text-yellow-400">(__)~~~</span>';
  var ROSE_FRAMES = [
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '        \n                \n            <span class="text-blue-400">.</span>   ',
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '  <span class="text-blue-400">o</span>     \n                \n            <span class="text-blue-400">.</span>   ',
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '        \n            <span class="text-blue-400">o</span>   \n            <span class="text-blue-400">.</span>   ',
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '        \n                \n            <span class="text-green-400">,</span>   ',
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '        \n            <span class="text-green-400">|</span>   \n            <span class="text-green-400">|</span>   ',
    ROSE_CAN_TOP + '\n' + ROSE_CAN_BODY + '    <span class="text-red-400">@</span>   \n           <span class="text-green-400">/|\\</span>  \n            <span class="text-green-400">|</span>   '
  ];

  function buildGrowingRose() {
    return '<pre id="rose-art" class="inline-block text-left text-xs sm:text-sm leading-tight font-mono">' + ROSE_FRAMES[0] + '</pre>';
  }

  // Steps the #rose-art element through ROSE_FRAMES, then leaves the bloom swaying forever.
  function startRoseGrowth() {
    var el = document.getElementById('rose-art');
    if (!el) { return; }
    var frame = 0;
    var timer = setInterval(function () {
      frame++;
      if (frame >= ROSE_FRAMES.length) {
        clearInterval(timer);
        el.classList.add('rose-sway');
        return;
      }
      el.innerHTML = ROSE_FRAMES[frame];
    }, 400);
  }

  var commandsResponse = {
    ls: [
      '<span class="text-space-gold font-bold">$</span> ls /home/asteroid-B-612',
      '<span class="text-green-400">volcanoes/</span>  <span class="text-space-starlight/70">(3: two active, one dormant — good for a quick breakfast toast)</span>',
      '<span class="text-blue-300">rose.txt</span>  <span class="text-space-starlight/70">(1 vain, singular, irreplaceable)</span>',
      '<span class="text-red-400">baobab_seeds/</span>  <span class="text-space-starlight/70">(dangerous — must be weeded out every single day)</span>'
    ],
    whoami: [
      '<span class="text-space-gold font-bold">$</span> whoami',
      'grown_up_who_forgot_how_to_see.sh',
      '<span class="text-space-starlight/80 italic text-xs">"My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant."</span>'
    ],
    rose: [
      '<span class="text-green-400">rookie@blur</span><span class="text-space-starlight/60">:</span><span class="text-blue-400">~</span><span class="text-space-starlight/60">$</span> <span class="text-teal-300">crontab</span> <span class="text-purple-300">-e</span>',
      '<span class="block pl-4 text-space-starlight/40"># m h  dom mon dow   command</span>',
      '<span class="block pl-4"><span class="text-amber-300">0 8 * * *</span> <span class="text-teal-300">./water_rose.sh</span> <span class="text-purple-300">--flower</span><span class="text-space-starlight/60">=</span><span class="text-emerald-300">rose</span>  <span class="text-space-starlight/40"># Set clock so that every day at 8am it triggers the rose-watering routine.</span></span>',
      '<span class="block pl-4">' + buildGrowingRose() + '</span>',
      '<span class="block pl-4 text-space-starlight/80 italic text-xs">"It is the time you have wasted for your rose that makes your rose so important."</span>'
    ],
    fox: null // filled in below, since it needs the lolcat builder
  };
  commandsResponse.fox = [
    '<span class="text-green-400">rookie@blur</span><span class="text-space-starlight/60">:</span><span class="text-blue-400">~</span><span class="text-space-starlight/60">$</span> <span class="text-red-400 font-bold">sudo</span> <span class="text-teal-300">chown</span> <span class="text-amber-300">rookie:rookie</span> <span class="text-emerald-300">fox</span>',
    '<span class="block pl-4 text-space-starlight/50">changed ownership of \'fox\' to <span class="text-amber-300">rookie:rookie</span></span>',
    '<span class="block pl-4">' + buildLolcatFox() + '</span>',
    '<span class="block pl-4 text-space-starlight/80 italic text-xs">"You become responsible, forever, for what you have tamed."</span>'
  ];

  function runCommand(cmdKey) {
    var lines = commandsResponse[cmdKey];
    if (!lines) { return; }

    // Flash animation on execute
    terminalScreen.innerHTML = '<div class="text-space-gold opacity-80 animate-pulse">Running process...</div>';

    setTimeout(function () {
      var html = '';
      for (var i = 0; i < lines.length; i++) {
        html += '<div class="mb-1">' + lines[i] + '</div>';
      }
      terminalScreen.innerHTML = html;
      if (cmdKey === 'rose') { startRoseGrowth(); }
    }, 400);
  }
  window.runCommand = runCommand; // exposed for inline onclick handlers in index.html

  // --- PARTNERSHIP CONTACT NOTICE ---
  function openContactForm(subject) {
    console.log('Setting up onboarding for focus area: ' + subject);
    var confirmNotice = document.createElement('div');
    confirmNotice.className = 'fixed bottom-5 right-5 z-50 p-4 rounded-xl bg-squid-deep text-cream shadow-lg text-xs font-mono max-w-xs transition-opacity duration-300';
    confirmNotice.innerHTML = 'Scroll down to email us and mention your interest: <strong>"' + subject + '"</strong>';
    document.body.appendChild(confirmNotice);
    setTimeout(function () {
      confirmNotice.parentNode.removeChild(confirmNotice);
    }, 6000);
  }
  window.openContactForm = openContactForm; // exposed for inline onclick handlers rendered from content data

  // --- FAQ ACCORDION (populated from the hardcoded SITE_BUNDLE.faqs) ---
  var faqLoadingEl = document.getElementById('faq-loading');
  var faqContainerEl = document.getElementById('faq-container');

  function escapeHtml(text) {
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
  }

  function renderFaqs(faqList) {
    if (!faqList || faqList.length === 0) {
      faqLoadingEl.innerText = 'No FAQs available at this moment.';
      return;
    }

    var html = '';
    for (var i = 0; i < faqList.length; i++) {
      var question = escapeHtml(faqList[i].question);
      var answer = escapeHtml(faqList[i].answer).replace(/\n/g, '<br>');

      html += '<div class="rounded-2xl border border-squid-deep/20 bg-cream shadow-sm overflow-hidden">';
      html += '  <h3 class="m-0">';
      html += '    <button type="button" id="faq-question-' + i + '" aria-expanded="false" aria-controls="faq-answer-' + i + '" class="faq-toggle w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-bold font-mono text-squid-deep">';
      html += '      <span>' + question + '</span>';
      html += '      <i class="fa-solid fa-chevron-down text-sm transition-transform duration-200 shrink-0" aria-hidden="true"></i>';
      html += '    </button>';
      html += '  </h3>';
      html += '  <div id="faq-answer-' + i + '" role="region" aria-labelledby="faq-question-' + i + '" class="hidden px-5 pb-4 text-sm text-ink leading-relaxed opacity-90">' + answer + '</div>';
      html += '</div>';
    }

    faqLoadingEl.classList.add('hidden');
    faqContainerEl.innerHTML = html;
    faqContainerEl.classList.remove('hidden');

    var toggles = faqContainerEl.querySelectorAll('.faq-toggle');
    for (var t = 0; t < toggles.length; t++) {
      toggles[t].addEventListener('click', function (event) {
        var button = event.currentTarget;
        var panel = document.getElementById(button.getAttribute('aria-controls'));
        var isOpen = button.getAttribute('aria-expanded') === 'true';

        for (var o = 0; o < toggles.length; o++) {
          var otherPanel = document.getElementById(toggles[o].getAttribute('aria-controls'));
          toggles[o].setAttribute('aria-expanded', 'false');
          toggles[o].querySelector('i').classList.remove('rotate-180');
          otherPanel.classList.add('hidden');
        }

        if (!isOpen) {
          button.setAttribute('aria-expanded', 'true');
          button.querySelector('i').classList.add('rotate-180');
          panel.classList.remove('hidden');
        }
      });
    }
  }

  // --- CENTRAL MASTER INITIALIZER ENGINE (content comes from SITE_BUNDLE, see content.js) ---

  function loadSiteContent() {
    renderEntireSite(SITE_BUNDLE);
  }

  function renderEntireSite(bundle) {
    // 1. INJECT GLOBAL DICTIONARY COPY
    var copy = bundle.globalCopy || {};
    if (copy.hero_tagline) document.getElementById('hero-tagline').innerText = copy.hero_tagline;
    if (copy.hero_title_white) document.getElementById('hero-title-white').innerText = copy.hero_title_white;
    if (copy.hero_title_gold) document.getElementById('hero-title-gold').innerText = copy.hero_title_gold;
    if (copy.hero_quote) document.getElementById('hero-quote').innerText = copy.hero_quote;
    if (copy.hero_quote_author) document.getElementById('hero-quote-author').innerText = copy.hero_quote_author;
    if (copy.hero_description) document.getElementById('hero-description').innerHTML = escapeHtml(copy.hero_description).replace(/\n/g, '<br>');

    // 2. RENDER THE VALUES SECTIONS DYNAMICALLY
    var valuesHtml = '';
    for (var i = 0; i < bundle.valuesCards.length; i++) {
      var v = bundle.valuesCards[i];
      valuesHtml += '<div class="p-8 rounded-2xl bg-cream border border-squid-deep/20 shadow-sm hover:shadow-md transition-shadow">';
      valuesHtml += '  <div class="w-12 h-12 flex items-center justify-center rounded-xl bg-' + escapeHtml(v.color) + '/10 text-' + escapeHtml(v.color) + ' mb-6">';
      valuesHtml += '    <i class="fa-solid ' + escapeHtml(v.icon) + ' text-2xl"></i>';
      valuesHtml += '  </div>';
      valuesHtml += '  <h3 class="text-xl font-bold font-mono mb-3 text-' + escapeHtml(v.color) + '">' + escapeHtml(v.title) + '</h3>';
      valuesHtml += '  <p class="text-pretty opacity-90 leading-relaxed">' + escapeHtml(v.desc) + '</p>';
      valuesHtml += '</div>';
    }
    document.getElementById('values-grid-container').innerHTML = valuesHtml;

    // 3. RENDER THE PARTNERSHIPS RESOURCE CARDS
    var partnerHtml = '';
    for (var j = 0; j < bundle.partnerships.length; j++) {
      var p = bundle.partnerships[j];
      partnerHtml += '<div class="p-6 md:p-8 rounded-2xl bg-lavender border border-squid-deep/20 flex flex-col sm:flex-row gap-6 items-start hover:scale-[1.01] transition-transform duration-200 shadow-sm">';
      partnerHtml += '  <div class="p-4 rounded-xl bg-squid-deep/10 text-squid-deep text-2xl shrink-0"><i class="fa-solid fa-handshake-simple"></i></div>';
      partnerHtml += '  <div class="space-y-3">';
      partnerHtml += '    <div class="flex items-center gap-2 flex-wrap">';
      partnerHtml += '      <h3 class="text-xl font-bold font-mono text-squid-deep">' + escapeHtml(p.title) + '</h3>';
      partnerHtml += '      <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ' + escapeHtml(p.badgeStyle) + '">' + escapeHtml(p.badgeText) + '</span>';
      partnerHtml += '    </div>';
      partnerHtml += '    <p class="text-sm leading-relaxed opacity-90">' + escapeHtml(p.desc) + '</p>';
      if (p.extraMeta) {
        partnerHtml += '    <p class="font-mono text-xs text-squid-deep font-semibold leading-relaxed opacity-70">' + escapeHtml(p.extraMeta) + '</p>';
      }
      partnerHtml += '    <a href="#contact" onclick="openContactForm(\'' + escapeHtml(p.formSubject) + '\')" class="inline-flex items-center text-xs font-bold font-mono uppercase tracking-wider text-squid-deep hover:underline">Connect <i class="fa-solid fa-arrow-right-long ml-2"></i></a>';
      partnerHtml += '  </div></div>';
    }
    document.getElementById('partnerships-container').innerHTML = partnerHtml;

    // 4. RENDER THE "A FEW THINGS TO KNOW" JOIN INFO LIST
    var joinInfoHtml = '';
    for (var k = 0; k < bundle.joinInfo.length; k++) {
      var info = bundle.joinInfo[k];
      joinInfoHtml += '<li class="flex items-start gap-3">';
      joinInfoHtml += '  <span class="text-space-gold font-bold shrink-0">*</span>';
      joinInfoHtml += '  <span><strong>' + escapeHtml(info.label) + ':</strong> ' + escapeHtml(info.desc) + '</span>';
      joinInfoHtml += '</li>';
    }
    document.getElementById('join-info-container').innerHTML = joinInfoHtml;

    // 5. RENDER THE EXISTING FAQ SYSTEM (Reuses the structural accordion handlers)
    renderFaqs(bundle.faqs);
  }

  // --- INITIALIZE WINDOW ONLOAD ---
  window.onload = function () {
    resizeCanvas();
    drawStars();
    window.addEventListener('resize', resizeCanvas);
    loadSiteContent();
  };

})();
