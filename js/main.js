// ACTIVE JAVASCRIPT (ES5 — Google Apps Script friendly): Star generation, mobile menu & Command Engine
(function () {

  // --- STARRY SKY RENDERING ENGINE (SHARED BY EVERY "full space background" SECTION) ---
  // Any canvas with class="space-starfield" is auto-discovered and paired with its
  // nearest enclosing <section>/<footer>, so adding a new dark space section anywhere
  // on any page (hero, footer, e-waste flow, the Launchpoint wheel, etc.) just means
  // dropping in the canvas markup — no JS changes needed here.
  var starFields = [];
  var starfieldCanvases = document.querySelectorAll('canvas.space-starfield');
  for (var f0 = 0; f0 < starfieldCanvases.length; f0++) {
    var canvasEl = starfieldCanvases[f0];
    var containerEl = canvasEl.closest('section, footer') || canvasEl.parentElement;
    if (canvasEl && containerEl) starFields.push({ canvas: canvasEl, container: containerEl, stars: [] });
  }
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
      '<span class="text-gold font-bold">$</span> ls /home/asteroid-B-612',
      '<span class="text-green-400">volcanoes/</span>  <span class="text-ink-100/70">(3: two active, one dormant — good for a quick breakfast toast)</span>',
      '<span class="text-blue-300">rose.txt</span>  <span class="text-ink-100/70">(1 vain, singular, irreplaceable)</span>',
      '<span class="text-red-400">baobab_seeds/</span>  <span class="text-ink-100/70">(dangerous — must be weeded out every single day)</span>'
    ],
    whoami: [
      '<span class="text-gold font-bold">$</span> whoami',
      'grown_up_who_forgot_how_to_see.sh',
      '<span class="text-ink-100/80 italic text-xs">"My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant."</span>'
    ],
    rose: [
      '<span class="text-green-400">rookie@blur</span><span class="text-ink-100/60">:</span><span class="text-blue-400">~</span><span class="text-ink-100/60">$</span> <span class="text-teal-300">crontab</span> <span class="text-purple-300">-e</span>',
      '<span class="block pl-4 text-ink-100/40"># m h  dom mon dow   command</span>',
      '<span class="block pl-4"><span class="text-amber-300">0 8 * * *</span> <span class="text-teal-300">./water_rose.sh</span> <span class="text-purple-300">--flower</span><span class="text-ink-100/60">=</span><span class="text-emerald-300">rose</span>  <span class="text-ink-100/40"># Set clock so that every day at 8am it triggers the rose-watering routine.</span></span>',
      '<span class="block pl-4">' + buildGrowingRose() + '</span>',
      '<span class="block pl-4 text-ink-100/80 italic text-xs">"It is the time you have wasted for your rose that makes your rose so important."</span>'
    ],
    fox: null // filled in below, since it needs the lolcat builder
  };
  commandsResponse.fox = [
    '<span class="text-green-400">rookie@blur</span><span class="text-ink-100/60">:</span><span class="text-blue-400">~</span><span class="text-ink-100/60">$</span> <span class="text-red-400 font-bold">sudo</span> <span class="text-teal-300">chown</span> <span class="text-amber-300">rookie:rookie</span> <span class="text-emerald-300">fox</span>',
    '<span class="block pl-4 text-ink-100/50">changed ownership of \'fox\' to <span class="text-amber-300">rookie:rookie</span></span>',
    '<span class="block pl-4">' + buildLolcatFox() + '</span>',
    '<span class="block pl-4 text-ink-100/80 italic text-xs">"You become responsible, forever, for what you have tamed."</span>'
  ];

  function runCommand(cmdKey) {
    var lines = commandsResponse[cmdKey];
    if (!lines) { return; }

    // Flash animation on execute
    terminalScreen.innerHTML = '<div class="text-gold opacity-80 animate-pulse">Running process...</div>';

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
    confirmNotice.className = 'fixed bottom-5 right-5 z-50 p-4 rounded-xl bg-squid-700 text-ink-50 shadow-lg text-xs font-mono max-w-xs transition-opacity duration-300';
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
    if (!faqLoadingEl || !faqContainerEl) return; // page doesn't have a FAQ section
    if (!faqList || faqList.length === 0) {
      faqLoadingEl.innerText = 'No FAQs available at this moment.';
      return;
    }

    var html = '';
    for (var i = 0; i < faqList.length; i++) {
      var question = escapeHtml(faqList[i].question);
      var answer = escapeHtml(faqList[i].answer).replace(/\n/g, '<br>');

      html += '<div class="faq-item">';
      html += '  <h3 class="m-0">';
      html += '    <button type="button" id="faq-question-' + i + '" aria-expanded="false" aria-controls="faq-answer-' + i + '" class="faq-toggle">';
      html += '      <span>' + question + '</span>';
      html += '      <i class="fa-solid fa-chevron-down faq-chevron" aria-hidden="true"></i>';
      html += '    </button>';
      html += '  </h3>';
      html += '  <div id="faq-answer-' + i + '" role="region" aria-labelledby="faq-question-' + i + '" class="faq-answer hidden">' + answer + '</div>';
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
    var heroTagline = document.getElementById('hero-tagline');
    var heroTitleWhite = document.getElementById('hero-title-white');
    var heroTitleGold = document.getElementById('hero-title-gold');
    var heroQuote = document.getElementById('hero-quote');
    var heroQuoteAuthor = document.getElementById('hero-quote-author');
    var heroDescription = document.getElementById('hero-description');
    if (copy.hero_tagline && heroTagline) heroTagline.innerText = copy.hero_tagline;
    if (copy.hero_title_white && heroTitleWhite) heroTitleWhite.innerText = copy.hero_title_white;
    if (copy.hero_title_gold && heroTitleGold) heroTitleGold.innerText = copy.hero_title_gold;
    if (copy.hero_quote && heroQuote) heroQuote.innerText = copy.hero_quote;
    if (copy.hero_quote_author && heroQuoteAuthor) heroQuoteAuthor.innerText = copy.hero_quote_author;
    if (copy.hero_description && heroDescription) heroDescription.innerHTML = escapeHtml(copy.hero_description).replace(/\n/g, '<br>');

    // 2. RENDER THE VALUES SECTIONS DYNAMICALLY
    var valuesGridContainer = document.getElementById('values-grid-container');
    if (valuesGridContainer && bundle.valuesCards) {
      var valuesHtml = '';
      for (var i = 0; i < bundle.valuesCards.length; i++) {
        var v = bundle.valuesCards[i];
        // Shared card anatomy (ResponseCard without label or quote); colourway tints the icon + heading.
        valuesHtml += '<article class="card c-' + escapeHtml(v.colorway) + '">';
        valuesHtml += '  <div class="card-icon"><i class="fa-solid ' + escapeHtml(v.icon) + '" aria-hidden="true"></i></div>';
        valuesHtml += '  <h3 class="card-heading card-heading-accent">' + escapeHtml(v.title) + '</h3>';
        valuesHtml += '  <p class="card-body">' + escapeHtml(v.desc) + '</p>';
        valuesHtml += '</article>';
      }
      valuesGridContainer.innerHTML = valuesHtml;
    }

    // 3. RENDER THE PARTNERSHIPS RESOURCE CARDS (legacy section — not used on any current page,
    // kept guarded here in case a future page reintroduces a #partnerships-container element)
    var partnershipsContainer = document.getElementById('partnerships-container');
    if (partnershipsContainer && bundle.partnerships) {
      var partnerHtml = '';
      for (var j = 0; j < bundle.partnerships.length; j++) {
        var p = bundle.partnerships[j];
        partnerHtml += '<div class="p-6 md:p-8 rounded-2xl bg-squid-100 border border-squid-700/20 flex flex-col sm:flex-row gap-6 items-start hover:scale-[1.01] transition-transform duration-200 shadow-sm">';
        partnerHtml += '  <div class="p-4 rounded-xl bg-squid-700/10 text-squid-700 text-2xl shrink-0"><i class="fa-solid ' + escapeHtml(p.icon) + '"></i></div>';
        partnerHtml += '  <div class="space-y-3">';
        partnerHtml += '    <div class="flex items-center gap-2 flex-wrap">';
        partnerHtml += '      <h3 class="text-xl font-bold font-mono text-squid-700">' + escapeHtml(p.title) + '</h3>';
        partnerHtml += '      <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ' + escapeHtml(p.badgeStyle) + '">' + escapeHtml(p.badgeText) + '</span>';
        partnerHtml += '    </div>';
        partnerHtml += '    <p class="text-sm leading-relaxed opacity-90">' + escapeHtml(p.desc) + '</p>';
        if (p.extraMeta) {
          partnerHtml += '    <p class="font-mono text-xs text-squid-700 font-semibold leading-relaxed opacity-70">' + escapeHtml(p.extraMeta) + '</p>';
        }
        partnerHtml += '    <a href="#contact" onclick="openContactForm(\'' + escapeHtml(p.formSubject) + '\')" class="inline-flex items-center text-xs font-bold font-mono uppercase tracking-wider text-squid-700 hover:underline">Connect <i class="fa-solid fa-arrow-right-long ml-2"></i></a>';
        partnerHtml += '  </div></div>';
      }
      partnershipsContainer.innerHTML = partnerHtml;
    }

    // 4. RENDER THE SIDEQUESTS
    async function renderSideQuests() {
      const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8x3lryjTLmF_1o9Ob6oS5XCyjXxV0GrMZWDZWIN6dxEiOGFadX4rO7Zz7sJvoiy4sjW480pQm03GH/pub?gid=0&single=true&output=tsv';
      const container = document.getElementById('side-quests-container');
      if (!container) return; // Guard clause in case the element isn't in the DOM

      try {
        const response = await fetch(CSV_URL);
        const data = await response.text();
        const rows = data.split('\n')
          .map(function (row) { return row.split('\t').map(function (cell) { return cell.trim(); }); })
          .filter(function (cols) { return cols.some(function (cell) { return cell.length > 0; }); });

        if (rows.length < 2) {
          container.innerHTML = '<p class="text-sm opacity-60 font-mono">No side quests logged yet — check back soon.</p>';
          return;
        }

        const header = rows[0];
        const body = rows.slice(1, 16); // cap at first 15 entries

        // Mobile: one card per quest (no horizontal scrolling/squeezed columns)
        let cardsHtml = '<div class="md:hidden space-y-4">';
        body.forEach(function (cols) {
          cardsHtml += '<div class="p-6 rounded-2xl bg-surface-card border border-hairline space-y-3">';
          cols.forEach(function (cell, idx) {
            if (!cell) return;
            if (idx === 0) {
              cardsHtml += '<h4 class="font-bold font-mono text-ink-700">' + escapeHtml(cell) + '</h4>';
            } else if (idx === 1) {
              cardsHtml += '<p class="text-xs font-mono font-bold text-squid-700 leading-relaxed">' + escapeHtml(cell) + '</p>';
            } else {
              cardsHtml += '<p class="text-xs font-mono opacity-60"><span class="uppercase tracking-wider opacity-75">' + escapeHtml(header[idx] || '') + ':</span> ' + escapeHtml(cell) + '</p>';
            }
          });
          cardsHtml += '</div>';
        });
        cardsHtml += '</div>';

        // Desktop/tablet: table
        let tableHtml = '<div class="hidden md:block overflow-x-auto"><table class="w-full text-sm table-fixed">';
        tableHtml += '<thead><tr class="bg-squid-700 text-ink-50 font-mono text-xs uppercase tracking-wider">';
        header.forEach(function (col, idx) {
          const isLastCol = idx === header.length - 1;
          const widthClass = idx === 0 ? 'w-72' : (isLastCol ? 'w-28' : 'w-auto');
          tableHtml += '<th class="py-2 px-4 text-left first:rounded-l-lg last:rounded-r-lg ' + widthClass + '">' + escapeHtml(col) + '</th>';
        });
        tableHtml += '</tr></thead><tbody>';
        body.forEach(function (cols) {
          tableHtml += '<tr class="border-b border-squid-700/10 last:border-0 hover:bg-squid-700/5 transition-colors">';
          cols.forEach(function (cell, idx) {
            const isLast = idx === cols.length - 1;
            if (idx === 1 && cell) {
              tableHtml += '<td class="py-3 px-4 text-ink-700 align-middle"><span class="text-xs font-mono font-bold text-squid-700 leading-relaxed">' + escapeHtml(cell) + '</span></td>';
            } else {
              tableHtml += '<td class="py-3 px-4 text-ink-700 align-middle' + (idx === 0 ? ' font-bold' : ' opacity-75 font-mono text-xs') + (isLast ? ' whitespace-nowrap' : '') + '">' + escapeHtml(cell) + '</td>';
            }
          });
          tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table></div>';

        container.innerHTML = cardsHtml + tableHtml;
      } catch (err) {
        console.error('Failed to load side quests:', err);
        container.innerHTML = '<p class="text-sm opacity-60 font-mono">Couldn\'t load side quests right now — try refreshing.</p>';
      }
    }

    // Call this when the page loads
    renderSideQuests();

    // 5. RENDER THE "A FEW THINGS TO KNOW" JOIN INFO LIST
    var joinInfoContainer = document.getElementById('join-info-container');
    if (joinInfoContainer && bundle.joinInfo) {
      var joinInfoHtml = '';
      for (var k = 0; k < bundle.joinInfo.length; k++) {
        var info = bundle.joinInfo[k];
        joinInfoHtml += '<li class="info-item">';
        joinInfoHtml += '  <span class="info-mark" aria-hidden="true">✦</span>';
        joinInfoHtml += '  <p><strong>' + escapeHtml(info.label) + '.</strong> ' + escapeHtml(info.desc) + '</p>';
        joinInfoHtml += '</li>';
      }
      joinInfoContainer.innerHTML = joinInfoHtml;
    }

    // 6. RENDER THE EXISTING FAQ SYSTEM (Reuses the structural accordion handlers)
    renderFaqs(bundle.faqs);

    // 7. RENDER WHY-LINUX CLAIM/REALITY PANEL (Home)
    renderClaimPanel('why-linux-panel', bundle.whyLinux);

    // 8. RENDER THE 4x LAUNCHPOINT WHEEL (Home)
    renderLaunchpointWheel(bundle.launchpointWheel);

    // 9. RENDER PLAYGROUND CARDS (Home)
    renderPlaygroundCards(bundle.playgroundCards);

    // 10. ABOUT PAGE SECTIONS
    renderAboutHero(bundle.aboutHero);
    renderClaimPanel('origin-panel', bundle.origin, bundle.origin);
    renderSocietalContext(bundle.societalContext);
    renderLinuxResponse(bundle.linuxResponse);
    renderLifeLearning(bundle.lifeLearning);
    renderEwasteFlow(bundle.ewasteFlow);
    renderProjectGallery(bundle.projectGallery);
    renderTestimonialCarousel(bundle.testimonials);

    // 11. PARTNER PAGE SECTIONS
    renderPartnerHero(bundle.partnerHero);
    renderPartnerTeam(bundle.partnerTeam);
    renderImmediateNeeds(bundle.immediateNeeds);
    renderOfferTimeline(bundle.offerTimeline);
    renderAtAGlance(bundle.atAGlance);
    renderPartnerInquiryLink(bundle.partnerInquiryFormUrl);
  }

  // ============================================================
  // ICON LIBRARY — hand-built SVGs matching FontAwesome's visual
  // weight, used where a stock FA glyph didn't fit (e.g. a
  // shooting star / upward meteor for the Linux Response section).
  // ============================================================
  var ICONS = {
    'layer-group': '<svg viewBox="0 0 576 512"><path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"/></svg>',
    // FontAwesome 6 Solid "meteor" glyph, rotated 180deg so the head points up with the trail sweeping down.
    'meteor-up': '<svg viewBox="0 0 512 512"><g transform="translate(512,512) rotate(180)"><path d="M493.7 .9L299.4 75.6l2.3-29.3c1-12.8-12.8-21.5-24-15.1L101.3 133.4C38.6 169.7 0 236.6 0 309C0 421.1 90.9 512 203 512c72.4 0 139.4-38.6 175.7-101.3L480.8 234.3c6.5-11.1-2.2-25-15.1-24l-29.3 2.3L511.1 18.3c.6-1.5 .9-3.2 .9-4.8C512 6 506 0 498.5 0c-1.7 0-3.3 .3-4.8 .9zM192 192a128 128 0 1 1 0 256 128 128 0 1 1 0-256zm0 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm16 96a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></g></svg>',
    'seedling': '<svg viewBox="0 0 512 512"><path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 51.6 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32 96c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/></svg>'
  };

  // ============================================================
  // CLAIM / REALITY SPLIT PANEL (reused by Why-Linux on Home and
  // The Origin on About — same visual pattern, different copy).
  // ============================================================
  function renderClaimPanel(containerId, data) {
    var el = document.getElementById(containerId);
    if (!el || !data) return;

    var claimText = escapeHtml(data.claim).replace(/\n/g, '<br>');
    var html = '<div class="claim-panel">';
    html += '  <div class="cp-side cp-claim"><p class="card-label">' + escapeHtml(data.claimTag) + '</p><p class="claim-text">' + claimText + '</p></div>';
    html += '  <div class="cp-joint" aria-hidden="true"><span class="cp-line"></span><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="8"/><ellipse cx="20" cy="20" rx="17" ry="5" transform="rotate(-15 20 20)"/></svg><span class="cp-line"></span></div>';
    html += '  <div class="cp-side cp-reality"><p class="card-label">' + escapeHtml(data.realityTag) + '</p><p class="reality-text">' + data.reality + '</p></div>'; // reality allows inline <b>/<u> markup
    html += '</div>';

    // Origin panel carries extra "chips", shown as a centered pyramid stack —
    // each line a size step larger than the one above it.
    if (data.chips) {
      html += '<div class="chip-pyramid">';
      for (var c = 0; c < data.chips.length; c++) {
        html += '<p class="cp-line cp-step' + c + '">' + escapeHtml(data.chips[c]) + '</p>';
      }
      html += '</div>';
    }

    el.innerHTML = html;
  }

  // ============================================================
  // 4x LAUNCHPOINT WHEEL (Home) — clickable stage nodes, auto-cycles
  // every N ms until a stage is clicked, then stays manual forever.
  // ============================================================
  function renderLaunchpointWheel(wheelData) {
    var mount = document.getElementById('launchpoint-wheel');
    if (!mount || !wheelData) return;

    var stages = wheelData.stages;
    var order = [];
    for (var i = 0; i < stages.length; i++) order.push(stages[i].key);
    var stageByKey = {};
    for (var j = 0; j < stages.length; j++) stageByKey[stages[j].key] = stages[j];

    // Build the SVG wheel with one node per stage, evenly spaced around a circle.
    // viewBox is wider than tall (440x320) with the circle centered at x=220, giving
    // long labels ("SIDEQUESTS", "GIVING BACK") a safe margin (~18-25px) to clear the
    // SVG's edge without clipping — left/right labels grow outward (anchor start/end)
    // instead of being center-anchored on top of the circle's edge. (A previous, narrower
    // 400-wide viewBox still clipped the "G" in "GIVING BACK" by a couple pixels.)
    var svgNodes = '';
    var positions = [
      { x: 220, y: 52, labelDx: 0, labelDy: -16, anchor: 'middle' },
      { x: 328, y: 160, labelDx: 14, labelDy: 5, anchor: 'start' },
      { x: 220, y: 268, labelDx: 0, labelDy: 28, anchor: 'middle' },
      { x: 112, y: 160, labelDx: -14, labelDy: 5, anchor: 'end' }
    ];
    for (var s = 0; s < stages.length; s++) {
      var pos = positions[s] || positions[0];
      svgNodes += '<g class="wnode" data-stage="' + stages[s].key + '" transform="translate(' + pos.x + ',' + pos.y + ')">';
      svgNodes += '<circle class="wdot" r="7"></circle>';
      svgNodes += '<text x="' + pos.labelDx + '" y="' + pos.labelDy + '" text-anchor="' + pos.anchor + '">' + escapeHtml(stages[s].nodeLabel.toUpperCase()) + '</text>';
      svgNodes += '</g>';
    }

    mount.innerHTML =
      '<div class="wheel-shell">' +
      '  <div class="wheel-grid">' +
      '    <div class="wheel-svg-box">' +
      '      <svg viewBox="0 0 440 320" width="320" height="233" aria-hidden="true">' +
      '        <circle cx="220" cy="160" r="98" fill="none" stroke="rgba(251,191,36,0.35)" stroke-width="3"></circle>' +
      svgNodes +
      '      </svg>' +
      '    </div>' +
      '    <div class="wheel-detail-panel" id="wheel-detail-panel" role="region" aria-live="polite"></div>' +
      '  </div>' +
      '  <div class="wheel-progress-dots" id="wheel-progress-dots"></div>' +
      '  <p class="wheel-autocycle-note" id="wheel-autocycle-note">↻ auto-advancing — click any stage to take over</p>' +
      '</div>';

    var currentIdx = 0;
    var autoTimer = null;
    var progTimer = null;
    var cycleMs = wheelData.autoCycleMs || 5000;
    var progStepMs = 50;

    function renderStage(key) {
      var stage = stageByKey[key];
      if (!stage) return;
      var html = '<span class="wdp-tag">' + escapeHtml(stage.tag) + '</span>';
      html += '<h4>' + escapeHtml(stage.title) + '</h4>';
      html += '<p>' + escapeHtml(stage.body) + '</p>';

      if (stage.progression) {
        html += '<div class="wheel-progression">';
        for (var p = 0; p < stage.progression.length; p++) {
          html += '<div class="wprog-pill"><div class="wprog-ic"><i class="fa-solid ' + escapeHtml(stage.progression[p].icon) + '"></i></div>' + escapeHtml(stage.progression[p].label) + '</div>';
        }
        html += '</div>';
        if (stage.extra) html += '<p>' + escapeHtml(stage.extra) + '</p>';
      }

      if (stage.tags) {
        html += '<div class="wheel-tagcloud">';
        for (var t = 0; t < stage.tags.length; t++) {
          html += '<span>' + escapeHtml(stage.tags[t]) + '</span>';
        }
        html += '</div>';
      }

      if (stage.images && stage.images.length) {
        html += '<div class="wheel-static-photos">';
        for (var im = 0; im < stage.images.length; im++) {
          html += '<img src="' + escapeHtml(stage.images[im]) + '" alt="' + escapeHtml(stage.title) + ' photo ' + (im + 1) + '" loading="lazy">';
        }
        html += '</div>';
        if (stage.key === 'sidequests') {
          html += '<a href="#side-quests-container" class="wheel-sq-link">See what everyone\'s working on <i class="fa-solid fa-arrow-right ml-1"></i></a>';
        }
      }

      document.getElementById('wheel-detail-panel').innerHTML = html;

      var nodes = mount.querySelectorAll('.wnode');
      for (var n = 0; n < nodes.length; n++) {
        nodes[n].classList.toggle('active', nodes[n].getAttribute('data-stage') === key);
      }
      updateDots();
    }

    function buildDots() {
      var wrap = document.getElementById('wheel-progress-dots');
      var html = '';
      for (var d = 0; d < order.length; d++) html += '<div class="wpd"><div class="wpd-fill"></div></div>';
      wrap.innerHTML = html;
    }

    function updateDots() {
      var dots = document.querySelectorAll('#wheel-progress-dots .wpd .wpd-fill');
      for (var d = 0; d < dots.length; d++) {
        dots[d].style.width = d < currentIdx ? '100%' : '0%';
      }
    }

    function stopAuto() {
      clearInterval(autoTimer);
      clearInterval(progTimer);
      var note = document.getElementById('wheel-autocycle-note');
      if (note) note.textContent = '✦ paused — you\'re in control';
    }

    function startAuto() {
      var elapsed = 0;
      progTimer = setInterval(function () {
        elapsed += progStepMs;
        var dots = document.querySelectorAll('#wheel-progress-dots .wpd .wpd-fill');
        var activeDot = dots[currentIdx];
        if (activeDot) activeDot.style.width = Math.min(100, (elapsed / cycleMs) * 100) + '%';
      }, progStepMs);
      autoTimer = setInterval(function () {
        elapsed = 0;
        currentIdx = (currentIdx + 1) % order.length;
        renderStage(order[currentIdx]);
      }, cycleMs);
    }

    var allNodes = mount.querySelectorAll('.wnode');
    for (var an = 0; an < allNodes.length; an++) {
      allNodes[an].addEventListener('click', function (evt) {
        stopAuto();
        var key = evt.currentTarget.getAttribute('data-stage');
        currentIdx = order.indexOf(key);
        renderStage(key);
      });
    }

    buildDots();
    renderStage(order[0]);

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      startAuto();
    } else {
      var noteEl = document.getElementById('wheel-autocycle-note');
      if (noteEl) noteEl.textContent = '✦ reduced motion detected — auto-advance disabled';
    }
  }

  // ============================================================
  // PLAYGROUND CARDS (Home, below the wheel)
  // ============================================================
  function renderPlaygroundCards(cards) {
    var mount = document.getElementById('playground-cards');
    if (!mount || !cards) return;
    var html = '';
    for (var i = 0; i < cards.length; i++) {
      html += '<div class="playground-card">';
      html += '  <img src="' + escapeHtml(cards[i].photo) + '" alt="' + escapeHtml(cards[i].title) + '" loading="lazy">';
      html += '  <div class="pg-label">' + escapeHtml(cards[i].title) + '</div>';
      html += '</div>';
    }
    mount.innerHTML = html;
  }

  // ============================================================
  // ABOUT PAGE RENDERERS
  // ============================================================
  function renderAboutHero(data) {
    if (!data) return;
    var h = document.getElementById('about-hero-headline');
    var s = document.getElementById('about-hero-subhead');
    if (h) h.textContent = data.headline;
    if (s) s.textContent = data.subhead;
  }

  function renderSocietalContext(items) {
    var mount = document.getElementById('societal-context');
    if (!mount || !items) return;
    // Each cause/effect pair is its own block: the cause line, then the effect indented
    // on the line below. This keeps a long cause or effect from wrapping into the other
    // (or wrapping mid-phrase inside one long shared line) — each stays legible on its
    // own. Effect text supplies its own punctuation now, so no period is appended here.
    var html = '<ul class="observe-panel" role="list">';
    for (var i = 0; i < items.length; i++) {
      html += '<li class="observe-row">';
      html += '  <p class="observe-cause">' + escapeHtml(items[i].cause) + '</p>';
      html += '  <span class="observe-arrow" aria-hidden="true">→</span>';
      html += '  <p class="observe-effect"><span class="sr-only">leads to: </span>' + escapeHtml(items[i].effect) + '</p>';
      html += '</li>';
    }
    html += '</ul>';
    mount.innerHTML = html;
  }

  function renderLinuxResponse(items) {
    var mount = document.getElementById('linux-response');
    if (!mount || !items) return;
    var html = '';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += '<article class="card c-' + escapeHtml(it.colorway) + '">';
      html += '  <div class="card-icon" aria-hidden="true">' + (ICONS[it.icon] || '') + '</div>';
      html += '  <p class="card-quote">' + escapeHtml(it.claim) + '</p>';
      html += '  <h3 class="card-heading card-heading-accent">' + escapeHtml(it.response) + '</h3>';
      html += '  <p class="card-body">' + escapeHtml(it.detail) + '</p>';
      html += '</article>';
    }
    mount.innerHTML = html;
  }

  function renderLifeLearning(cards) {
    var mount = document.getElementById('life-learning');
    if (!mount || !cards) return;
    var html = '<div class="life-card-grid">';
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      html += '<div class="card">';
      html += '  <h3 class="card-heading">' + escapeHtml(c.title) + '</h3>';
      if (c.bullets) {
        html += '  <ul class="card-body list-disc pl-5 space-y-1.5">';
        for (var b = 0; b < c.bullets.length; b++) {
          html += '<li>' + c.bullets[b] + '</li>'; // bullets contain trusted inline <b> markup from content.js
        }
        html += '  </ul>';
      } else if (c.body) {
        html += '  <p class="card-body">' + c.body + '</p>'; // body contains trusted inline <b> markup from content.js
      }
      html += '</div>';
    }
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderEwasteFlow(steps) {
    // Dark "space" shell (matches the Launchpoint wheel's aesthetic) with a wavy
    // golden line drawn behind the steps connecting them, alternating up/down
    // for a flowier feel instead of a straight row of boxes with arrows.
    var mount = document.getElementById('ewaste-flow');
    if (!mount || !steps) return;
    var n = steps.length;
    // Wavy connector path: a gentle sine-like curve sampled across n points, y alternates.
    var pathD = '';
    var midYUp = 30, midYDown = 90, w = 1000, segW = w / (n - 1 || 1);
    for (var k = 0; k < n; k++) {
      var x = k * segW;
      var y = (k % 2 === 0) ? midYUp : midYDown;
      if (k === 0) pathD += 'M ' + x + ' ' + y;
      else {
        var prevX = (k - 1) * segW;
        var cx = (prevX + x) / 2;
        pathD += ' C ' + cx + ' ' + ((k % 2 === 0) ? midYDown : midYUp) + ', ' + cx + ' ' + ((k % 2 === 0) ? midYDown : midYUp) + ', ' + x + ' ' + y;
      }
    }
    var html = '<div class="ewaste-flow">';
    html += '  <svg class="ewaste-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="' + pathD + '" fill="none" style="stroke: var(--gold)" stroke-width="2" stroke-dasharray="6 6" opacity="0.55"/></svg>';
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      html += '<div class="ewaste-step' + (i % 2 === 1 ? ' es-down' : '') + '">';
      html += '  <span class="es-stepno">' + ('0' + (i + 1)) + '</span>';
      html += '  <img src="' + escapeHtml(s.photo) + '" alt="' + escapeHtml(s.step) + '" loading="lazy">';
      html += '  <h4>' + escapeHtml(s.step) + '</h4>';
      html += '  <p>' + escapeHtml(s.desc) + '</p>';
      html += '</div>';
    }
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderProjectGallery(projects) {
    var mount = document.getElementById('project-gallery');
    if (!mount || !projects) return;
    var html = '<div class="gallery-fan-row">';
    for (var i = 0; i < projects.length; i++) {
      var proj = projects[i];
      // Wrapper holds the photo trigger and (optionally) an external link as siblings,
      // so the link is never nested inside the role="button" element.
      html += '<div class="gallery-fan-project">';
      html += '<div class="gallery-fan-trigger" data-project-idx="' + i + '" role="button" tabindex="0" aria-label="View ' + escapeHtml(proj.title) + ' photos">';
      html += '  <div class="gallery-fan-stack">';
      for (var p = 0; p < proj.photos.length && p < 3; p++) {
        html += '<img class="gf-s' + (p + 1) + '" src="' + escapeHtml(proj.photos[p]) + '" alt="' + escapeHtml(proj.title) + ' photo ' + (p + 1) + '" loading="lazy">';
      }
      html += '  </div>';
      html += '  <div class="gallery-fan-label">' + escapeHtml(proj.title) + '</div>';
      html += '  <div class="gallery-fan-count"><i class="fa-solid fa-expand"></i> ' + proj.photos.length + (proj.photos.length === 1 ? ' photo' : ' photos') + '</div>';
      html += '</div>';
      if (proj.url) {
        html += '<a class="gallery-fan-link" href="' + escapeHtml(proj.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + escapeHtml(proj.title) + ' website (opens in a new tab)">Visit site <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>';
      }
      html += '</div>';
    }
    html += '</div>';
    mount.innerHTML = html;

    var openProject = function (idx) {
      openLightbox(projects[idx].photos, 0, projects[idx].title, projects[idx].url);
    };
    var cards = mount.querySelectorAll('.gallery-fan-trigger');
    for (var c = 0; c < cards.length; c++) {
      cards[c].addEventListener('click', function (evt) {
        openProject(parseInt(evt.currentTarget.getAttribute('data-project-idx'), 10));
      });
      cards[c].addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter' || evt.key === ' ') {
          evt.preventDefault();
          openProject(parseInt(evt.currentTarget.getAttribute('data-project-idx'), 10));
        }
      });
    }
  }

  function renderTestimonialCarousel(quotes) {
    var mount = document.getElementById('testimonial-carousel');
    if (!mount || !quotes || quotes.length === 0) return;

    mount.innerHTML =
      '<div class="carousel-shell">' +
      '  <button type="button" class="carousel-nav cn-prev" id="carousel-prev" aria-label="Previous testimonial">‹</button>' +
      '  <button type="button" class="carousel-nav cn-next" id="carousel-next" aria-label="Next testimonial">›</button>' +
      '  <div class="carousel-quote" id="carousel-quote-text" aria-live="polite"></div>' +
      '  <div class="carousel-who" id="carousel-quote-who"></div>' +
      '  <div class="carousel-dots" id="carousel-dots"></div>' +
      '</div>';

    var qIdx = 0;
    var qTimer = null;

    function renderQuote() {
      document.getElementById('carousel-quote-text').textContent = '"' + quotes[qIdx].text + '"';
      document.getElementById('carousel-quote-who').textContent = '— ' + quotes[qIdx].who;
      var dots = mount.querySelectorAll('.cd');
      for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('active', d === qIdx);
    }

    function buildDots() {
      var html = '';
      for (var i = 0; i < quotes.length; i++) html += '<button type="button" class="cd" data-i="' + i + '" aria-label="Show testimonial ' + (i + 1) + '"></button>';
      document.getElementById('carousel-dots').innerHTML = html;
      var dots = mount.querySelectorAll('.cd');
      for (var d = 0; d < dots.length; d++) {
        dots[d].addEventListener('click', function (evt) {
          stopAuto();
          qIdx = parseInt(evt.currentTarget.getAttribute('data-i'), 10);
          renderQuote();
        });
      }
    }

    function stopAuto() { clearInterval(qTimer); }
    function startAuto() { qTimer = setInterval(function () { qIdx = (qIdx + 1) % quotes.length; renderQuote(); }, 6000); }

    document.getElementById('carousel-prev').addEventListener('click', function () {
      stopAuto();
      qIdx = (qIdx - 1 + quotes.length) % quotes.length;
      renderQuote();
    });
    document.getElementById('carousel-next').addEventListener('click', function () {
      stopAuto();
      qIdx = (qIdx + 1) % quotes.length;
      renderQuote();
    });

    buildDots();
    renderQuote();

    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) startAuto();
  }

  // ============================================================
  // PARTNER PAGE RENDERERS
  // ============================================================
  function renderPartnerHero(data) {
    if (!data) return;
    var h = document.getElementById('partner-hero-headline');
    var s = document.getElementById('partner-hero-subhead');
    if (h) h.textContent = data.headline;
    if (s) s.textContent = data.subhead;
  }

  function renderPartnerTeam(data) {
    var mount = document.getElementById('partner-team');
    if (!mount || !data) return;
    var html = '<div class="team-split">';
    html += '  <div class="team-split-text">';
    html += '    <p class="text-lg font-semibold leading-relaxed text-ink-700 mb-2">' + escapeHtml(data.leadStatement) + '</p>';
    html += '    <p class="text-sm leading-relaxed text-ink-700">' + escapeHtml(data.subStatement) + '</p>';
    html += '  </div>';
    html += '  <div class="team-split-chips">';
    html += '    <div class="flex flex-wrap gap-2">';
    for (var i = 0; i < data.roleChips.length; i++) {
      html += '<span class="team-role-chip">' + escapeHtml(data.roleChips[i]) + '</span>';
    }
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderImmediateNeeds(needs) {
    var mount = document.getElementById('immediate-needs');
    if (!mount || !needs) return;
    var html = '<div class="needs-row">';
    for (var i = 0; i < needs.length; i++) {
      var n = needs[i];
      html += '<article class="card c-' + escapeHtml(n.badgeStyle) + '">';
      html += '  <p class="card-label card-status">' + escapeHtml(n.badge) + '</p>';
      html += '  <h3 class="card-heading">' + escapeHtml(n.title) + '</h3>';
      html += '  <p class="card-body">' + escapeHtml(n.desc) + '</p>';
      html += '</article>';
    }
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderOfferTimeline(items) {
    var mount = document.getElementById('offer-timeline');
    if (!mount || !items) return;
    var html = '<div class="offer-timeline">';
    for (var i = 0; i < items.length; i++) {
      html += '<div class="ot-item"><h4>' + escapeHtml(items[i].title) + '</h4><p>' + escapeHtml(items[i].desc) + '</p></div>';
    }
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderAtAGlance(tiles) {
    var mount = document.getElementById('at-a-glance');
    if (!mount || !tiles) return;
    var html = '<div class="glance-row">';
    for (var i = 0; i < tiles.length; i++) {
      var t = tiles[i];
      html += '<article class="card c-squid"><p class="card-label">' + escapeHtml(t.label) + '</p><p class="card-stat">' + escapeHtml(t.num) + '</p><p class="card-body">' + escapeHtml(t.expl) + '</p></article>';
    }
    html += '</div>';
    mount.innerHTML = html;
  }

  function renderPartnerInquiryLink(url) {
    var links = document.querySelectorAll('.partner-inquiry-link');
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute('href', url);
    }
  }

  // ============================================================
  // SHARED PHOTO LIGHTBOX — used by the About Project Gallery and
  // the Home Launchpoint wheel's Sidequests photo galleries.
  // Builds one lightbox overlay lazily on first use, then any code
  // can call window.openLightbox(photosArray, startIndex, captionText).
  // ============================================================
  var lightboxEl = null;
  var lightboxPhotos = [];
  var lightboxIdx = 0;
  var lightboxCaption = '';
  var lightboxUrl = '';

  function buildLightbox() {
    if (lightboxEl) return lightboxEl;
    var el = document.createElement('div');
    el.className = 'lightbox-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Photo viewer');
    el.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close photo viewer">&times;</button>' +
      '<button type="button" class="lightbox-nav lb-prev" aria-label="Previous photo">&lsaquo;</button>' +
      '<button type="button" class="lightbox-nav lb-next" aria-label="Next photo">&rsaquo;</button>' +
      '<figure class="lightbox-figure">' +
      '  <img class="lightbox-img" src="" alt="">' +
      '  <figcaption class="lightbox-caption"></figcaption>' +
      '  <a class="lightbox-link" href="#" target="_blank" rel="noopener noreferrer" hidden></a>' +
      '</figure>' +
      '<div class="lightbox-counter"></div>';
    document.body.appendChild(el);

    el.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    el.querySelector('.lb-prev').addEventListener('click', function () { stepLightbox(-1); });
    el.querySelector('.lb-next').addEventListener('click', function () { stepLightbox(1); });
    el.addEventListener('click', function (evt) { if (evt.target === el) closeLightbox(); });
    document.addEventListener('keydown', function (evt) {
      if (!lightboxEl || !lightboxEl.classList.contains('open')) return;
      if (evt.key === 'Escape') closeLightbox();
      if (evt.key === 'ArrowLeft') stepLightbox(-1);
      if (evt.key === 'ArrowRight') stepLightbox(1);
    });

    lightboxEl = el;
    return el;
  }

  function renderLightboxFrame() {
    if (!lightboxEl) return;
    var img = lightboxEl.querySelector('.lightbox-img');
    var cap = lightboxEl.querySelector('.lightbox-caption');
    var counter = lightboxEl.querySelector('.lightbox-counter');
    img.src = lightboxPhotos[lightboxIdx];
    img.alt = lightboxCaption ? (lightboxCaption + ' photo ' + (lightboxIdx + 1)) : ('Photo ' + (lightboxIdx + 1));
    cap.textContent = lightboxCaption || '';
    var link = lightboxEl.querySelector('.lightbox-link');
    if (lightboxUrl) {
      link.href = lightboxUrl;
      link.innerHTML = 'Visit ' + escapeHtml(lightboxCaption || 'site') + ' <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>';
      link.setAttribute('aria-label', 'Visit ' + (lightboxCaption || 'site') + ' website (opens in a new tab)');
      link.hidden = false;
    } else {
      link.hidden = true;
    }
    counter.textContent = (lightboxIdx + 1) + ' / ' + lightboxPhotos.length;
    var multi = lightboxPhotos.length > 1;
    lightboxEl.querySelector('.lb-prev').style.display = multi ? '' : 'none';
    lightboxEl.querySelector('.lb-next').style.display = multi ? '' : 'none';
  }

  function stepLightbox(delta) {
    if (!lightboxPhotos.length) return;
    lightboxIdx = (lightboxIdx + delta + lightboxPhotos.length) % lightboxPhotos.length;
    renderLightboxFrame();
  }

  function openLightbox(photos, startIndex, captionText, linkUrl) {
    if (!photos || !photos.length) return;
    buildLightbox();
    lightboxPhotos = photos;
    lightboxIdx = startIndex || 0;
    lightboxCaption = captionText || '';
    lightboxUrl = linkUrl || '';
    renderLightboxFrame();
    lightboxEl.classList.add('open');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('open');
    document.body.classList.remove('lightbox-locked');
  }

  window.openLightbox = openLightbox; // exposed so gallery renderers can trigger it on click

  // --- INITIALIZE WINDOW ONLOAD ---
  window.onload = function () {
    resizeCanvas();
    drawStars();
    window.addEventListener('resize', resizeCanvas);
    loadSiteContent();
  };

})();
