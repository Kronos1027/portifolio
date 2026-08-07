/* ==========================================================================
   NATSKY — Portfólio · main.js
   Vanilla JS · sem dependências (GSAP/AOS carregados via CDN no HTML)
   ========================================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     1. PRELOADER
     ---------------------------------------------------------------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    if (!pre) return;
    setTimeout(() => {
      pre.classList.add('is-hidden');
      setTimeout(() => pre.remove(), 700);
    }, 1100);
  });

  /* ----------------------------------------------------------------
     2. AOS init
     ---------------------------------------------------------------- */
  if (window.AOS) {
    window.AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: prefersReduced,
    });
  }

  /* ----------------------------------------------------------------
     3. CUSTOM CURSOR
     ---------------------------------------------------------------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && !prefersReduced && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Spring follow for the ring
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state on interactive elements
    const hoverables = document.querySelectorAll('a, button, .project, .price-card, .process__step, input, textarea, select');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  } else if (cursorDot && cursorRing) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  /* ----------------------------------------------------------------
     4. PARTICLES BACKGROUND (canvas)
     ---------------------------------------------------------------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      // Density based on viewport
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.4 + 0.6,
        hue: Math.random() > 0.85 ? 'amber' : 'teal',
      }));
    }
    resize();
    window.addEventListener('resize', () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        // Mouse repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Draw particle
        const baseColor = p.hue === 'amber' ? '251, 191, 36' : '34, 211, 238';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, 0.55)`;
        ctx.fill();

        // Draw connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.hypot(ddx, ddy);
          if (d < 110) {
            const opacity = (1 - d / 110) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ----------------------------------------------------------------
     5. NAV — scroll state, mobile toggle, active link
     ---------------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function onScroll() {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');

    // Progress bar
    const progress = document.getElementById('scroll-progress');
    if (progress) {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      progress.style.width = (scrolled * 100) + '%';
    }

    // Back to top
    const toTop = document.getElementById('to-top');
    if (toTop) {
      if (window.scrollY > 600) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Close mobile nav on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle && navToggle.classList.remove('is-open');
        navToggle && navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back to top click
  const toTopBtn = document.getElementById('to-top');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     6. TYPING EFFECT
     ---------------------------------------------------------------- */
  const typedEl = document.getElementById('typed-role');
  if (typedEl) {
    const roles = [
      'Desenvolvedor',
      'Engenheiro de IA',
      'Criador de Sites Autônomos',
      'Streamer · VTuber',
      'Pesquisador independente',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIdx];
      if (deleting) {
        charIdx--;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 40);
      } else {
        charIdx++;
        typedEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 75);
      }
    }
    setTimeout(tick, 500);
  }

  /* ----------------------------------------------------------------
     7. LOCAL TIME in hero status
     ---------------------------------------------------------------- */
  const timeEl = document.getElementById('local-time');
  if (timeEl) {
    function updateTime() {
      try {
        const now = new Date();
        const opts = { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
        timeEl.textContent = now.toLocaleTimeString('pt-BR', opts) + ' BRT';
      } catch (e) {
        timeEl.textContent = '';
      }
    }
    updateTime();
    setInterval(updateTime, 30000);
  }

  /* ----------------------------------------------------------------
     8. SKILL BARS — animate when visible
     ---------------------------------------------------------------- */
  const skills = document.querySelectorAll('.skill');
  if (skills.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    skills.forEach((s) => obs.observe(s));
  }

  /* ----------------------------------------------------------------
     9. COUNTERS — animate 0 → value when visible
     ---------------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target).toString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toString();
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -10% 0px' });
    counters.forEach((c) => cObs.observe(c));
  } else {
    // Fallback: se por algum motivo o IntersectionObserver não encontrar, anima direto
    counters.forEach((c) => animateCounter(c));
  }

  /* ----------------------------------------------------------------
     10. TILT 3D on .project cards
     ---------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('.tilt');
  if (tiltCards.length && !prefersReduced && window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach((card) => {
      const glow = card.querySelector('.project__glow');
      const maxTilt = 8; // degrees
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -maxTilt;
        const ry = ((x - cx) / cx) * maxTilt;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        if (glow) {
          glow.style.left = (x - 100) + 'px';
          glow.style.top = (y - 100) + 'px';
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------------
     11. CONTACT FORM — Web3Forms (com fallback mailto)
     ----------------------------------------------------------------
     COMO CONFIGURAR O ENVIO REAL POR E-MAIL:

     1. Acesse https://web3forms.com
     2. Cadastre o e-mail darlan1027pc@gmail.com
     3. Voce recebera uma access_key (hash de 40 caracteres)
     4. Troque o valor de WEB3FORMS_ACCESS_KEY abaixo por essa chave
     5. Pronto - o formulario envia direto para darlan1027pc@gmail.com

     Enquanto a chave nao for preenchida, o formulario usa o fallback
     mailto: que abre o cliente de e-mail do usuario como alternativa.
     ---------------------------------------------------------------- */
  const WEB3FORMS_ACCESS_KEY = '38b8ac6a-a9da-40df-b35b-52ab82783a2e'; // <-- TROCAR AQUI
  const CONTACT_EMAIL = 'darlan1027pc@gmail.com';

  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      note.hidden = false;

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subjectType = form.subject.options[form.subject.selectedIndex].text;

      // Validation
      if (!name || !email || !message) {
        note.textContent = 'Preencha nome, e-mail e mensagem.';
        note.classList.remove('is-success');
        note.classList.add('is-error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'E-mail invalido - confira o formato.';
        note.classList.remove('is-success');
        note.classList.add('is-error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando...</span>';

      // Fallback mailto (usado se access_key nao configurada)
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[Site] ' + subjectType + ' - ' + name)}&body=${encodeURIComponent('Nome: ' + name + '\nE-mail: ' + email + '\nTipo: ' + subjectType + '\n\n' + message)}`;

      // Se access_key nao foi configurada, usa mailto
      if (WEB3FORMS_ACCESS_KEY === 'SEU_ACCESS_KEY_AQUI' || !WEB3FORMS_ACCESS_KEY) {
        note.classList.remove('is-error');
        note.classList.add('is-success');
        note.textContent = 'Tudo certo! Abrindo seu cliente de e-mail...';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
        setTimeout(() => { window.location.href = mailtoLink; }, 600);
        return;
      }

      // Envio real via Web3Forms
      try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', '[Site] ' + subjectType + ' - ' + name);
        formData.append('message', message);
        formData.append('from_name', 'Portfolio NATSKY');
        formData.append('replyto', email);

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          note.classList.remove('is-error');
          note.classList.add('is-success');
          note.textContent = 'Mensagem enviada! Respondo em ate 24h.';
          form.reset();
        } else {
          throw new Error(data.message || 'Falha no envio');
        }
      } catch (err) {
        // Em caso de erro na API, cai pro mailto
        note.classList.remove('is-success');
        note.classList.add('is-error');
        note.textContent = 'Servico indisponivel. Abrindo e-mail...';
        setTimeout(() => { window.location.href = mailtoLink; }, 800);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
    });
  }

  /* ----------------------------------------------------------------
     12. FOOTER year
     ---------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------------
     13. GSAP — subtle hero entrance (if available)
     ---------------------------------------------------------------- */
  if (window.gsap && !prefersReduced) {
    gsap.from('.hero__name', {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
    });
    gsap.from('.hero__handle', {
      y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.5,
    });
  }

  /* ----------------------------------------------------------------
     14. Smooth anchor scroll with offset for fixed nav
     ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

})();
