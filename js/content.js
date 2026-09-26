// Site content data. Edit this file to update copy without touching markup or logic.
// To swap a photo anywhere on the site: overwrite the file at the path shown (same filename),
// or change the path string here to point at a differently-named file. No other edits needed.
var SITE_BUNDLE = {
  globalCopy: {
    hero_tagline: 'BLUR SOTONG LINUX',
    hero_title_white: 'Blending Linux Users',
    hero_title_gold: '& Rookies.',
    hero_quote: '"It is only with the heart that one can see rightly; \nwhat is essential is invisible to the eye."',
    hero_quote_author: '— Antoine de Saint-Exupéry',
    hero_description: 'Linux powers most of the world\'s servers and everyday electronics, yet it goes largely unnoticed. \n\nBLUR is a free, volunteer-led weekly programme based in Singapore that introduces youths and adults from non-tech backgrounds to the world of Linux and its open-source playground.'
  },

  // colorway = accent for the shared card anatomy (c-wheat / c-fox / c-rose): colour shows only on
  // the icon and label; the card stays white. Title "NN. Name" renders as label "Value NN" + heading "Name".
  valuesCards: [
    { title: '01. Slow', desc: 'In a world of AI paradoxes where knowledge becomes more democratised yet facile, we navigate to safer waters - our learning is slow. While the world chases trends, we look under the hood and look for keystones.', icon: 'fa-hourglass-half', color: 'wheat-900', colorway: 'wheat' },
    { title: '02. Peer-Based', desc: 'Designed with the aim to empower learners to discover and open doors, teach others and contribute back to open-source. Here, members are supported by a community of peers and facilitators, encouraged to share their learning journeys and continue growing together.', icon: 'fa-people-carry-box', color: 'fox-900', colorway: 'fox' },
    { title: '03. Passion-Led', desc: 'Linux is home to citizen science, art, hardware-hacking, digital rights activism, PCB design, creative coding, and many other niche interest areas. From the launchpoint of 4 starter sessions, members are then encouraged to pursue their own "sidequests" - self-directed projects guided by what genuinely interests them.', icon: 'fa-compass', color: 'rose-800', colorway: 'rose' }
  ],

  // Why Linux? split panel — homepage, right after hero (deck slide 7)
  whyLinux: {
    claimTag: 'Like Windows or macOS',
    claim: 'Linux is an operating system.',
    realityTag: 'Unlike Windows and macOS',
    reality: 'Linux is <b><u>free and open-source</u></b> (community-built), \n giving you total control over every operational detail of your device.'
  },

  // 4x Launchpoint wheel — homepage (deck slides 15-18)
  launchpointWheel: {
    stages: [
      {
        key: 'intro',
        nodeLabel: '4x Intro',
        tag: 'Stage 1 of 4',
        title: '4x Introduction',
        body: 'A structured 4-week introductory track covering Linux navigation, terminal commands, desktop environments, and digital privacy.',
        progression: [
          { icon: 'fa-child-reaching', label: 'Crawl' },
          { icon: 'fa-person-walking', label: 'Walk' },
          { icon: 'fa-person-running', label: 'Run' },
          { icon: 'fa-hands-holding-circle', label: 'Share' }
        ],
        extra: 'Each session puts a brick over previous learnings, so you gain confidence on a repeatable, core skillset — then share something cool at the end.'
      },
      {
        key: 'sidequests',
        nodeLabel: 'Sidequests',
        tag: 'Stage 2 of 4',
        title: 'Personal Sidequests',
        body: 'Self-directed projects guided by what genuinely excites each learner, backed by mentors and peer collaboration.',
        // Static photo strip — one photo per current sidequest project, so this stays a
        // representative sample as new projects are added. To swap a photo, overwrite the
        // file at that path (same filename), or edit the path string.
        images: [
          'img/sidequests/ascii-photobooth-1.jpg',
          'img/sidequests/cyberdeck-1.jpg',
          'img/sidequests/fish-1.jpeg',
          'img/sidequests/tea-1.jpeg'
        ]
      },
      {
        key: 'sharing',
        nodeLabel: 'Sharing',
        tag: 'Stage 3 of 4',
        title: 'Sharing',
        body: 'Learners grow to teach others — choose a slot and demo, present, or teach what you\'ve found. Built from 4x learnings and beyond:',
        tags: ['SSH', 'cron', 'bash scripting', 'text editors', 'docker/compose', 'PlatformIO', 'microcontrollers', 'voice AI', 'computer vision', 'networking', 'kali linux', 'multiboot', 'hardware hacking', 'AI devops', 'citizen science', 'cyberdecks', 'tech wearables', 'e-textiles/soft circuits']
      },
      {
        key: 'givingback',
        nodeLabel: 'Giving Back',
        tag: 'Stage 4 of 4',
        title: 'Giving Back',
        body: 'Members document their sidequest journeys and contribute back to open-source projects globally. We meet monthly to share and learn from each other, documenting progress so others can spin off their own sidequests.',
        // Static photo strip — real photos from Sharing/community sessions (img/programme/).
        // To swap a photo, overwrite the file at that path (same filename), or edit the path
        // string; to add one, add a new file under img/programme/ and add a line here.
        images: [
          'img/programme/sharing-2.jpeg',
          'img/programme/sharing-3.jpeg'
        ]
      }
    ],
    autoCycleMs: 5000
  },

  // Open-Source Playground cards — homepage, below the wheel (deck slide 18)
  playgroundCards: [
    { title: 'Creative Coding', photo: 'img/playground/creative-coding.jpg' },
    { title: 'Hardware Hacking', photo: 'img/playground/hardware-hacking.jpg' },
    { title: 'Citizen Science', photo: 'img/playground/citizen-science.jpg' }
  ],

  partnerships: [
    { title: 'Laptop Recycling', icon: 'fa-laptop-medical', badgeText: 'ONGOING', badgeStyle: 'bg-wheat-100 text-wheat-800', desc: 'We believe in circular technology. We revive old laptops with lightweight Linux distributions for members to borrow during tutorials. This August tutorial laptops were donated by a few BLUR members. Past tutorials were made possible thanks to our earlier partners SGBONO and VIVITA SG!', extraMeta: 'Example laptops: Chromebook S20-XT', formSubject: 'Laptop Donation' },
    { title: 'Venue Partners', icon: 'fa-people-roof', badgeText: 'MOST NEEDED', badgeStyle: 'bg-fox-100 text-fox-800', desc: 'To run our slow, four-session programme and weekly sharing sessions, we look for safe physical spaces where adults, youths, and parent-child pairs can plug in, set up servers, make mistakes, and spill the occasional coffee. Let us know if you have room on weekends.', extraMeta: '', formSubject: 'Venue Partnership' }
  ],

  joinInfo: [
    { label: 'Free to Attend', desc: 'We operate with recycled laptops, courtesy of a few BLUR members\' donation. (Note that participants should self-fund any additional hardware.)' },
    { label: 'Non-Tech Welcome', desc: 'No prior programming experience is required; however, keyboard proficiency is a minimum and a bit of grit too!' },
    { label: 'Four Tutorial Saturdays', desc: 'We ask joiners for a hard commit to all four tutorial sessions to cover the basics of Linux. If you are unable to attend any of the four sessions, we kindly ask that you join us for our next quarterly round of tutorials.' },
    { label: 'Share and Grow', desc: 'Every Saturday we encourage everyone to share their explorations or projects - it\'s an opportunity to ask for ideas or points and invite others to join!' },
    { label: 'Parent-Child Pairs Welcome', desc: 'One form per person. We ask that the interest comes from the individual themselves.' }
  ],

  faqs: [
    {
      question: 'Do I have to sign up beforehand for the tutorials?',
      answer: 'We ask that you register your interest via the Intake Form ("Join the Next Intake"). Because we do have not enough laptops for everyone, enough time for all the questions that arise, and peer facilitators to help, we have to limit how many people join each round of tutorials.\n\nDon\'t worry though! We run these tutorials every quarter.'
    },
    {
      question: 'How much does the 4-session tutorial cost?',
      answer: 'For those whose intake is confirmed, it is free, only costing your commitment to 4 consecutive tutorial sessions. \n\nWe are grateful for the support of partners who have provided laptops for you to borrow and space for us to gather for these sessions.\nTo keep our sessions going, we look for partners who share our equitable and whimsical view of technology.'
    },
    {
      question: 'Can I use my own laptop for the tutorials?',
      answer: 'For the tutorials, we try to keep everyone on the same laptop specs to reduce unforeseen issues (missing tools, etc), which often stems from difference in hardware and/or software. \n\nAfter the tutorials, you\'re welcome to setup Linux on your own computer; some members have converted or dual-booted their own personal laptops (and even some of their family members\' too!)'
    },
    {
      question: 'What if I miss one of the tutorials?',
      answer: 'If you are unable to attend any of the four sessions, we kindly ask that you join us for our next quarterly round of tutorials. \n\nSince we build progressively on the previous week\'s learning, our limited time together is dedicated to supporting everyone on the current week\'s topic rather than catching up on missed material.'
    },
    {
      question: 'How do I keep learning after completing the tutorial sessions?',
      answer: 'BLUR aims to empower learners to discover and open doors, teach others and contribute back to open-source. From the last tutorial session onwards, everyone is encouraged to pursue their own "sidequests" - self-directed projects guided by what genuinely interests them.\n\nEveryone is also invited teach what they have learned (just chope a "Sharing" slot!) \nPast Sharing sessions have covered networking, Docker, microcontrollers, and more!'
    },
    {
      question: 'If a Sharing session requires hardware beyond a laptop, will the hardware be provided?',
      answer: 'You will need to self-fund any hardware beyond the loaned laptops; however, based on interest, the community will try to source parts for purchasing.'
    },
    {
      question: 'How do non-tutorial sessions look like?',
      answer: 'We start each week with 10 minutes reserved for everyone to share what they\'re exploring/working on, ask for ideas or pointers, and extend an invite for others to join their side quest! \n\nThen, if someone has choped the Sharing slot, they have 15 minutes to 1 hour to demo, present, or teach. After which, the rest of the session will be reserved for everyone to work and collaborate on side quests.'
    }
  ],

  // ==================== ABOUT PAGE ====================

  aboutHero: {
    headline: 'We are BLUR like Sotong.',
    subhead: 'Why Linux is our response.'
  },

  // The Origin — claim/reality split (deck slide 5)
  origin: {
    claimTag: "Society's narrative",
    claim: 'Access to tech is equal because anyone can sign up for classes.',
    realityTag: 'Our experience said otherwise',
    reality: 'We observed that second-gen. tech adopters were far more likely to be signalled to our programme and actively supported by their parents.',
    chips: ['Tech disenfranchisement', 'A widening tech divide', 'Generational disadvantage']
  },

  // Today's Societal Context — quote-stack (deck slide 6)
  societalContext: [
    { cause: 'Proprietary lock-ins and platform dependency', effect: 'Resignation. Learned helplessness.' },
    { cause: 'Certification/\'professionalisation\' of everday skills', effect: 'Learning only happens in IHL. Shallow skill-sets.' },
    { cause: 'Fast-changing relevancy landscape', effect: 'Fun learning falls by the wayside. Social anxiety.' },
    { cause: "'Magical' AI mysteriously 'thinks' for you", effect: 'Outsourced critical thinking.' }
  ],

  // Linux Breaks Those Narratives — cards labelled Myth 01-03 in wheat/fox/rose accents (deck slide 11)
  // icon values map to hand-built SVGs in main.js's ICONS table (layer-group / meteor-up / seedling)
  linuxResponse: [
    {
      colorway: 'wheat',
      icon: 'layer-group',
      claim: '"You need the newest, modern tech."',
      response: 'Modern tech built atop decades-old tech',
      detail: 'The foundation and sandbox that enables AI (and that AI uses day-to-day) is Linux.'
    },
    {
      colorway: 'fox',
      icon: 'meteor-up',
      claim: '"It cannot be done — they don\'t let you."',
      response: 'Freedom in discovering that the only limit is what you can dream',
      detail: 'Linux and software for Linux is open-source. You can DIY, or build from others\' open-source code — you are outside of systems that put barriers in place.'
    },
    {
      colorway: 'rose',
      icon: 'seedling',
      claim: '"You get what you pay for."',
      response: 'Excel through generosity',
      detail: 'Best-in-class tools and infrastructure trusted by governments and MNCs are built from free, open-source code that people across the world have contributed time and effort to support.'
    }
  ],

  // Life-learning experience — two side-by-side cards (deck slide 12)
  lifeLearning: [
    {
      title: 'Experience how things could be (and was)',
      bullets: [
        '<b>Recalibrate</b> to something real',
        'Open eyes to <b>opportunities, potential, and pathways beyond limits</b>',
        '<b>Be inspired by others</b> — ideas on how you can <b>contribute and grow</b>'
      ]
    },
    {
      title: 'Experience the generosity of open source',
      body: 'The founding ethos of Linux — and in turn, <b>learn and practice how to pass this generosity on to others</b>'
    }
  ],

  // From e-waste to project engines — 4-step flow (deck slide 14)
  ewasteFlow: [
    { step: 'Unwanted', photo: 'img/ewaste/01-unwanted.jpg', desc: 'Slow, underperforming. Fish in wrong water?' },
    { step: 'Hack', photo: 'img/ewaste/02-hack.jpg', desc: "The team 'hacks' and wipes each device." },
    { step: 'Brainsss', photo: 'img/ewaste/03-brains.jpg', desc: 'Lightweight Linux distros take over.' },
    { step: 'Second Life', photo: 'img/ewaste/04-secondlife.jpg', desc: 'They rise again as sublime tools of digital literacy and project elves.' }
  ],

  // Project Gallery — fanned photo stacks (deck slide 19 + your own showcase projects)
  // To add a project: copy one block, give it photos (2-3 recommended for the fan effect).
  projectGallery: [
    { title: 'Fashionable/Functional Cyberdeck', photos: ['img/gallery/cyberdeck-1.jpg', 'img/gallery/cyberdeck-2.jpg', 'img/gallery/cyberdeck-3.jpg', 'img/gallery/cyberdeck-4.jpg', 'img/gallery/cyberdeck-5.jpg', 'img/gallery/cyberdeck-6.jpeg'] },
    { title: 'RPi Cam Control', photos: ['img/gallery/fish-1.jpeg', 'img/gallery/fish-2.jpeg'] },
    { title: 'Voice-Controlled Coffee Machine', photos: ['img/gallery/tea-1.jpeg', 'img/gallery/tea-2.jpeg', 'img/gallery/tea-3.jpeg'] }
  ],

  // Testimonials carousel — About page, own section
  testimonials: [
    { text: "It's so much more to learn by doing, and doing with others. Having a community group means we get to follow our interests and curiosity rather than some curriculum. Fun!", who: 'Adult sotong' },
    { text: 'The lessons were actually well designed. Seeking where the ring is, hiding somebody\'s birthday gift…', who: 'Adult sotong' }
  ],

  // ==================== PARTNER PAGE ====================

  partnerHero: {
    headline: 'Help Us Keep Tech Accessible',
    subhead: 'We provide the time and expertise. You provide the space or support.'
  },

  // Team Behind BLUR — flipped lead + badge chips (deck slide 4), lives on Partner page
  partnerTeam: {
    leadStatement: 'Our diverse backgrounds make us exceptionally resourceful — able to turn limited resources into projects and, ultimately, statements and movements.',
    subStatement: 'No need for fancy tools or wealthy funders: we hack old, discarded hardware, sometimes out of necessity, and… fun!',
    roleChips: ['ex-Makerspace','Prototyping Engineers', 'UX Researchers', 'Systems Engineers', 'Educators', 'Managers'],
    rootChips: ['Google', 'PLAB@NDC', 'ideasInc', 'Designathon', 'Repair Kopitiam', '(these)abilities', 'Engineering Good', 'SalvageGarden']
  },

  // Immediate Needs — 3 equal cards (deck slide 22)
  immediateNeeds: [
    { badge: 'Immediate', badgeStyle: 'immediate', title: 'Venue Hosts', desc: 'Non-profit or community spaces in Singapore with weekend availability, power points, and seating for 10–15 people.' },
    { badge: 'Open', badgeStyle: 'open', title: 'Hardware Sponsors', desc: 'Laptops, USB boot drives, microcontrollers, or fabrication access.' },
    { badge: 'Ongoing', badgeStyle: 'ongoing', title: 'Educators / Enthusiasts', desc: 'Looking to start their own BLUR chapters.' }
  ],

  // What We Offer vs. Boundaries — scarcity timeline (deck slide 22)
  offerTimeline: [
    { title: 'Time', desc: 'We are volunteers with our time and knowledge, not financial donors. Weekday engagements cost professional work time.' },
    { title: 'Hardware', desc: 'Each individual volunteer can choose to loan fabrication equipment to other BLUR sotong members.' },
    { title: 'Expertise', desc: "Each individual volunteer's time and knowledge should be recognised and appreciated." }
  ],

  // BLUR at a Glance — big stat tiles (deck slide 21), sits after offerTimeline
  atAGlance: [
    { num: '100%', label: 'Free & Volunteer-Led', expl: 'No tuition, no bootcamp fees — every session runs on volunteer time.' },
    { num: 'Cohort 3', label: 'Quarterly Cohorts', expl: 'Currently running our 3rd introduction round, October 2026, sessions every Saturday.' },
    { num: '0', label: 'Low Barrier to Entry', expl: 'No prior technical or coding experience required to join.' }
  ],

  // Partnership Inquiries — link only, no separate built-in form section
  partnerInquiryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScXYGTVCqEn9mMQx5TI7Bd2s5wY1PTCKSUIYEErqKjF4J0_TA/viewform?usp=dialog'
};
