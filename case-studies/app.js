/* ==========================================================================
   APEX DIGITAL — DYNAMIC LIGHT & DARK THEME ENGINE
   ========================================================================== */
function initThemeState() {
    const savedTheme = localStorage.getItem('apex_theme') || 'dark';
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('apex_theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const navLogo = document.getElementById('nav-logo-img');
    const footerLogo = document.getElementById('footer-logo-img');
    const favicon = document.getElementById('favicon');
    const themeIcon = document.getElementById('theme-icon');

    if (theme === 'light') {
        if (navLogo) navLogo.src = '../assets/images/logo-light-no-text.webp';
        if (footerLogo) footerLogo.src = '../assets/images/logo-light-no-text.webp';
        if (favicon) favicon.href = '../assets/images/logo-icon-black.webp';
        if (themeIcon) {
            themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
        }
    } else {
        if (navLogo) navLogo.src = '../assets/images/logo-dark-no-text.webp';
        if (footerLogo) footerLogo.src = '../assets/images/logo-dark-no-text.webp';
        if (favicon) favicon.href = '../assets/images/logo-icon-gold.webp';
        if (themeIcon) {
            themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
        }
    }
}

// Global exposure for onclick handlers
window.toggleTheme = toggleTheme;
window.setTheme = setTheme;
window.initThemeState = initThemeState;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme state on DOM load
    initThemeState();

    // ─── Mobile Nav Toggle ──────────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const mainNav   = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
        });

        // Close nav when a link is clicked (smooth scroll UX)
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mainNav.classList.remove('open');
            });
        });
    }


    // ─── ROI Calculator — Element refs ─────────────────────────────────
    const trafficSlider = document.getElementById('monthly-traffic');
    const convSlider    = document.getElementById('conv-rate');
    const dealSlider    = document.getElementById('deal-value');

    const trafficVal = document.getElementById('traffic-val');
    const convVal    = document.getElementById('conv-val');
    const dealVal    = document.getElementById('deal-val');

    const currentRevDisplay   = document.getElementById('current-rev-display');
    const projectedRevDisplay = document.getElementById('projected-rev-display');
    const netIncreaseDisplay  = document.getElementById('net-increase-display');
    const annualLiftDisplay   = document.getElementById('annual-lift-display');

    const calcCtaDemo         = document.getElementById('calc-cta-demo');
    const calcCtaWa           = document.getElementById('calc-cta-whatsapp');
    const calcCtaIndLabel     = document.getElementById('calc-cta-industry-label');
    const mobileDockWa        = document.getElementById('mobile-dock-wa');

    const industryBtns     = document.querySelectorAll('.industry-btn');
    const clearIndustryBtn = document.getElementById('clear-industry');
    const industrySource   = document.getElementById('industry-source');
    const industrySourceText = document.getElementById('industry-source-text');
    const noIndustryPrompt = document.getElementById('no-industry-prompt');
    const outputsInner     = document.getElementById('outputs-inner');

    // null = no industry selected; number = lift multiplier fraction
    let currentLift = null;
    let currentIndustryName = '';

    // ─── Utilities ──────────────────────────────────────────────────────
    const formatCurrency = v => 'R ' + Math.round(v).toLocaleString('en-ZA');

    /** Update a range slider's filled-track CSS custom property */
    const updateSliderFill = slider => {
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const val = parseFloat(slider.value);
        const pct = ((val - min) / (max - min)) * 100;
        slider.style.setProperty('--fill', `${pct.toFixed(1)}%`);
    };

    // ─── Main calculation ───────────────────────────────────────────────
    const updateCalculator = () => {
        const traffic   = parseFloat(trafficSlider.value);
        const convRate  = parseFloat(convSlider.value) / 100;
        const dealValue = parseFloat(dealSlider.value);

        // Update slider value labels
        trafficVal.textContent = traffic.toLocaleString('en-ZA');
        const convPct = convRate * 100;
        convVal.textContent    = (convPct % 1 === 0 ? convPct.toFixed(1) : parseFloat(convPct.toFixed(2)).toString()) + '%';
        dealVal.textContent    = 'R ' + dealValue.toLocaleString('en-ZA');

        // Update slider fills
        updateSliderFill(trafficSlider);
        updateSliderFill(convSlider);
        updateSliderFill(dealSlider);

        // If no industry is selected, show prompt and clear outputs
        if (currentLift === null) {
            noIndustryPrompt.classList.remove('hidden');
            outputsInner.classList.add('hidden');
            currentRevDisplay.textContent   = '—';
            projectedRevDisplay.textContent = '—';
            netIncreaseDisplay.textContent  = '—';
            annualLiftDisplay.textContent   = '—';
            return;
        }

        // Industry is selected — show calculated outputs
        noIndustryPrompt.classList.add('hidden');
        outputsInner.classList.remove('hidden');

        const currentLeads    = traffic * convRate;
        const currentRevenue  = currentLeads * dealValue;

        // Multiplier: data-lift="0.98" means +98%, so × 1.98
        const multiplier      = 1 + currentLift;
        const projectedRevenue = currentRevenue * multiplier;
        const netIncrease     = projectedRevenue - currentRevenue;
        const annualLift      = netIncrease * 12;

        currentRevDisplay.textContent   = formatCurrency(currentRevenue);
        projectedRevDisplay.textContent = formatCurrency(projectedRevenue);
        netIncreaseDisplay.textContent  = '+' + formatCurrency(netIncrease);
        annualLiftDisplay.textContent   = formatCurrency(annualLift);

        // Update dynamic CTA actions
        if (calcCtaIndLabel) {
            calcCtaIndLabel.textContent = currentIndustryName ? currentIndustryName : 'Demo';
        }
        if (calcCtaDemo) {
            calcCtaDemo.href = `/#strategy?industry=${encodeURIComponent(currentIndustryName)}&projected=${encodeURIComponent(formatCurrency(netIncrease))}`;
        }

        const waMsg = `Hi Apex Digital, I used your Case Studies ROI calculator for my ${currentIndustryName || 'business'} (${traffic.toLocaleString('en-ZA')} visits/mo). Based on our numbers, we modeled a projected net increase of ${formatCurrency(netIncrease)}/mo (${formatCurrency(annualLift)}/yr). I would like to claim a free demo website for my company.`;
        const waUrl = `https://wa.me/27695224226?text=${encodeURIComponent(waMsg)}`;

        if (calcCtaWa) {
            calcCtaWa.href = waUrl;
        }
        if (mobileDockWa) {
            mobileDockWa.href = waUrl;
        }
    };

    // ─── Industry tile selection ────────────────────────────────────────
    const setIndustry = (btn) => {
        industryBtns.forEach(b => b.classList.remove('active'));
        if (btn) {
            btn.classList.add('active');
            currentLift = parseFloat(btn.dataset.lift);
            currentIndustryName = btn.dataset.industry || btn.querySelector('.ind-name')?.textContent?.trim() || '';
            // Show + update source note
            industrySource.classList.remove('hidden');
            industrySourceText.textContent = btn.dataset.source || '';
            // Show clear button
            clearIndustryBtn.classList.remove('hidden');
        } else {
            currentLift = null;
            currentIndustryName = '';
            industrySource.classList.add('hidden');
            clearIndustryBtn.classList.add('hidden');
        }
        updateCalculator();
    };

    industryBtns.forEach(btn => {
        btn.addEventListener('click', () => setIndustry(btn));
    });

    clearIndustryBtn.addEventListener('click', () => setIndustry(null));

    // ─── Slider events ──────────────────────────────────────────────────
    [trafficSlider, convSlider, dealSlider].forEach(s => {
        s.addEventListener('input', updateCalculator);
    });

    // ─── Editable slider values (click pencil → inline number input) ────
    document.querySelectorAll('.editable-val-wrap').forEach(wrap => {
        const type      = wrap.dataset.type;
        const sliderId  = wrap.dataset.for;
        const slider    = document.getElementById(sliderId);
        const valSpan   = wrap.querySelector('.slider-val');
        const editBtn   = wrap.querySelector('.edit-btn');
        const inlineInput = wrap.querySelector('.inline-input');

        let isEditing = false;

        const enterEditMode = () => {
            if (isEditing) return;
            isEditing = true;
            wrap.classList.add('editing');
            inlineInput.value = slider.value;
            valSpan.classList.add('hidden');
            inlineInput.classList.remove('hidden');
            inlineInput.focus();
            inlineInput.select();
        };

        const commitEdit = () => {
            if (!isEditing) return;
            isEditing = false;
            wrap.classList.remove('editing');

            let raw = parseFloat(inlineInput.value);
            if (!isNaN(raw)) {
                let defaultMax = 100000;
                let maxAllowed = 500000;
                if (type === 'traffic') {
                    defaultMax = 50000;
                    maxAllowed = 1000000;
                } else if (type === 'conv') {
                    defaultMax = 10;
                    maxAllowed = 50;
                } else if (type === 'deal') {
                    defaultMax = 100000;
                    maxAllowed = 500000;
                }

                raw = Math.max(0, Math.min(maxAllowed, raw));

                const newMax = Math.max(defaultMax, raw);
                slider.max = newMax;

                const inputGroup = slider.closest('.input-group');
                if (inputGroup) {
                    const limitSpans = inputGroup.querySelectorAll('.slider-limits span');
                    if (limitSpans.length >= 2) {
                        if (type === 'traffic') {
                            limitSpans[1].textContent = (newMax >= 1000 ? (newMax / 1000) + 'k' : newMax) + ' visits';
                        } else if (type === 'conv') {
                            limitSpans[1].textContent = newMax.toFixed(1) + '%';
                        } else if (type === 'deal') {
                            limitSpans[1].textContent = 'R ' + (newMax >= 1000 ? (newMax / 1000) + 'k' : newMax) + '+';
                        }
                    }
                }

                slider.value = raw;
            }

            inlineInput.classList.add('hidden');
            valSpan.classList.remove('hidden');
            updateCalculator();
        };

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            enterEditMode();
        });

        valSpan.addEventListener('click', enterEditMode);

        inlineInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); commitEdit(); }
            if (e.key === 'Escape') {
                isEditing = false;
                wrap.classList.remove('editing');
                inlineInput.classList.add('hidden');
                valSpan.classList.remove('hidden');
            }
        });

        inlineInput.addEventListener('blur', commitEdit);
    });

    // ─── Sector Filter Logic ────────────────────────────────────────────
    const filterTabs = document.querySelectorAll('.filter-tab');
    const caseCards  = document.querySelectorAll('.case-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const filter = tab.dataset.filter;

            caseCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });

    // ─── Case Study Before/After Toggles ────────────────────────────────
    caseCards.forEach(card => {
        const toggleButtons = card.querySelectorAll('.toggle-btn');
        const contents      = card.querySelectorAll('.toggle-content');
        const challengeEls  = card.querySelectorAll('.challenge-line, .challenge-endpoint, .challenge-label');
        const solutionEls   = card.querySelectorAll('.solution-line, .solution-endpoint, .solution-label');

        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.toggle;

                toggleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                contents.forEach(c => {
                    c.classList.toggle('active', c.dataset.content === target);
                });

                if (target === 'before') {
                    challengeEls.forEach(el => el.classList.add('active'));
                    solutionEls.forEach(el => el.classList.remove('active'));
                } else {
                    challengeEls.forEach(el => el.classList.remove('active'));
                    solutionEls.forEach(el => el.classList.add('active'));
                    // Replay draw animation
                    const solLine = card.querySelector('.solution-line');
                    if (solLine) {
                        solLine.style.animation = 'none';
                        solLine.offsetHeight; // reflow
                        solLine.style.animation = '';
                    }
                }
            });
        });
    });

    // ─── SVG Chart Intersection Observer ────────────────────────────────
    const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const path = entry.target;
                if (path.classList.contains('active')) {
                    path.style.animation = 'none';
                    path.offsetHeight;
                    path.style.animation = '';
                }
                observer.unobserve(path);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.solution-line').forEach(p => chartObserver.observe(p));

    // ─── Mobile Floating Dock Visibility ────────────────────────────────
    const mobileDock = document.getElementById('mobile-dock');
    const heroEl     = document.querySelector('.hero');

    if (mobileDock && heroEl) {
        const dockObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    mobileDock.classList.add('visible');
                } else {
                    mobileDock.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        dockObserver.observe(heroEl);
    }

    // ─── Run initial state (no industry selected) ───────────────────────
    updateCalculator();
    [trafficSlider, convSlider, dealSlider].forEach(updateSliderFill);
});
