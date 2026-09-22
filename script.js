// ── Winners data ──────────────────────────────────────────────
const WINNERS = {
    'fdp': {
        winners: [],
        organizers: []
    },
    'modelathon': {
        winners: [],
        organizers: [],
        message: 'Congratulations to Top 12 Teams and other praticipants who tried their Level Best in Modelathon',
        tagline: 'Participation is the First Step of Success'
    },
    'ideathon-2k26': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Team Fresher', year: '' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Team Zerqon',  year: '' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Zenith',       year: '' }
        ],
        organizers: []
    },
    'logo-design': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Dharshini V',       year: 'II Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Jessikabarathi B',  year: 'II Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Deepak Balajee R',  year: 'II Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Vignesh P',         year: 'IV Year' }
        ],
        organizers: ['M. Adithya', 'K. Ganeshwar']
    },
    'technical-seminar': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Navaneetham S',        year: 'II Year' },
            { place: 1, medal: '🥇', label: '1st Place', name: 'Jayasree R',            year: 'II Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Manigandan A G',        year: 'II Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Sujay Chidambaram C S', year: 'II Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Janashree R',           year: 'II Year' }
        ],
        organizers: []
    },
    'technical-quiz': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Pavithra N',       year: 'II Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Cathanishagnel R',  year: 'II Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Adhithiya V',       year: 'II Year' },
            { place: 1, medal: '🥇', label: '1st Place', name: 'Mohanraj K',        year: 'III Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Mothishwaran',      year: 'III Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Saravanakumar',     year: 'III Year' }
        ],
        organizers: []
    },
    'mind-meets-machine': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Aathi E',            year: 'III Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Adithya M',          year: 'II Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Pola Kowshik Saran', year: 'III Year' }
        ],
        organizers: []
    },
    'code-relay': {
        winners: [
            { place: 1, medal: '🥇', label: '1st Place', name: 'Koushikraj J & Team', year: 'I Year' },
            { place: 2, medal: '🥈', label: '2nd Place', name: 'Akash V & Team',      year: 'II Year' },
            { place: 3, medal: '🥉', label: '3rd Place', name: 'Peetham P & Team',    year: 'III Year' }
        ],
        organizers: []
    }
};

// ── Event config ──────────────────────────────────────────────
const EVENTS = {
    'fdp': {
        name: 'FACULTY DEVELOPMENT PROGRAMME',
        date: 'Faculty Development',
        inputType: 'mobile',
        folder: 'certificates/Faaculty Developement Programme'
    },
    'modelathon': {
        name: 'MODELATHON (INTERNAL MODE)',
        date: '18 September 2026',
        inputType: 'register',
        folder: 'certificates/Modelathon'
    },
    'ideathon-2k26': {
        name: 'IDEATHON-2K26',
        date: '19 August 2026',
        inputType: 'register',
        folder: 'certificates/ideathon-2k26'
    },
    'logo-design': {
        name: 'Logo Design Competition',
        date: '23 December 2025',
        inputType: 'register',
        folder: 'certificates/logo-design'
    },
    'technical-seminar': {
        name: 'Technical Seminar',
        date: '30 December 2025',
        inputType: 'register',
        folder: 'certificates/technical-seminar'
    },
    'technical-quiz': {
        name: 'Technical Quiz',
        date: '7 January 2026',
        inputType: 'register',
        folder: 'certificates/technical-quiz'
    },
    'mind-meets-machine': {
        name: 'Mind Meets Machine',
        date: 'Coming Soon',
        inputType: 'register',
        folder: 'certificates/mind-meets-machine'
    },
    'code-relay': {
        name: 'Code Relay 2k26',
        date: 'Coming Soon',
        inputType: 'register',
        folder: 'certificates/code-relay'
    }
};

// ── Detect if running via backend server or as local file ──────
const IS_SERVED = window.location.protocol !== 'file:';

// ── Confetti Function ──────────────────────────────────────────
function fireConfetti() {
    if (typeof confetti !== 'undefined') {
        var duration = 3 * 1000;
        var end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors: ['#ff0000', '#00ff00', '#0000ff', '#f093fb', '#f5576c'] });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff0000', '#00ff00', '#0000ff', '#f093fb', '#f5576c'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
}

window.addEventListener('load', () => { fireConfetti(); });

// ── Main page: filter events tab & navigate to certificate page ────────
function filterEvents(category, btnElement) {
    const tabs = document.querySelectorAll('.top-nav-tabs .tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const cards = document.querySelectorAll('.events-grid .event-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all') {
            card.style.display = 'flex';
        } else if (category === 'fdp') {
            card.style.display = cardCat === 'fdp' ? 'flex' : 'none';
        } else if (category === 'student') {
            card.style.display = cardCat === 'student' ? 'flex' : 'none';
        }
    });
}

function selectEvent(eventId, event) {
    window.location.href = `certificate.html?event=${eventId}`;
}

// ── Certificate page: initialise from URL param ────────────────
function initCertificatePage() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');
    const event = EVENTS[eventId];

    if (!event) { window.location.href = 'index.html'; return; }

    window._currentEvent = eventId;

    if (eventId === 'fdp') {
        document.getElementById('eventTitle').innerHTML = 'FACULTY DEVELOPMENT PROGRAMME<div style="font-size: 15px; font-weight: 600; color: #a855f7; margin-top: 8px;">ON "AI-Powered Teaching and Learning: Tools, Techniques and Applications"</div>';
    } else if (eventId === 'ideathon-2k26') {
        document.getElementById('eventTitle').innerHTML = '<img src="fornt/ideathon fornt.jpg" alt="IDEATHON-2K26" class="ideathon-cert-title-img">';
    } else if (eventId === 'modelathon') {
        document.getElementById('eventTitle').innerHTML = '<img src="video/model.png" alt="MODELATHON (INTERNAL MODE)" class="ideathon-cert-title-img" style="max-width: 100%; height: auto;">';
    } else {
        document.getElementById('eventTitle').textContent = event.name;
    }

    const winners = WINNERS[eventId];
    if (winners && winners.winners && winners.winners.length > 0) {
        const list = document.getElementById('winnersList');
        list.innerHTML = winners.winners.map(w =>
            `<div class="winner-row place-${w.place}">
                <span class="winner-medal">${w.medal}</span>
                <span class="winner-label">${w.label}</span>
                <span class="winner-name">${w.name}</span>
                <span class="winner-year">${w.year}</span>
            </div>`
        ).join('');
        document.getElementById('winnersSection').style.display = 'block';
    } else if (winners && winners.message) {
        const list = document.getElementById('winnersList');
        const taglineHtml = winners.tagline
            ? `<div style="text-align:center; margin-top: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.5px; background: linear-gradient(135deg, #f093fb, #f5576c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${winners.tagline}</div>`
            : '';
        list.innerHTML = `<div style="text-align:center; padding: 15px 10px 5px; font-size: 16px; font-weight: 700; color: #a855f7;">${winners.message}</div>${taglineHtml}`;
        document.getElementById('winnersSection').style.display = 'block';
    } else {
        const winnersSec = document.getElementById('winnersSection');
        if (winnersSec) winnersSec.style.display = 'none';
    }

    const input = document.getElementById('certInput');
    if (eventId === 'fdp') {
        input.placeholder = 'Enter mobile number';
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('maxlength', '11');
        input.removeAttribute('pattern');
        document.getElementById('eventSubtitle').textContent =
            'Enter the mobile number submitted in Google forms to retrieve certificate.';
    } else if (eventId === 'ideathon-2k26') {
        input.placeholder = 'Enter your register number(s)';
        input.removeAttribute('inputmode');
        input.removeAttribute('maxlength');
        input.removeAttribute('pattern');
        document.getElementById('eventSubtitle').textContent =
            'Enter your register number(s) to retrieve your certificate.';
    } else {
        input.placeholder = 'Enter your register number';
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('maxlength', '18');
        input.setAttribute('pattern', '[0-9]{10,18}');
        document.getElementById('eventSubtitle').textContent =
            'Enter your college register number to retrieve your certificate.';
    }

    // ── Real-time debounced search (only when served via backend) ──
    if (IS_SERVED) {
        let debounceTimer = null;
        input.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            const val = input.value.trim();
            if (val.length >= 8) {
                debounceTimer = setTimeout(() => showCertificate(true), 350);
            }
        });
    }
}

// ── Lookup certificate (Backend API or fallback file-guess) ────
let _currentAbortController = null;

async function showCertificate(isSilent = false) {
    const eventId = window._currentEvent;
    const event = EVENTS[eventId];
    const value = document.getElementById('certInput').value.trim();
    const cleanValue = value.replace(/[\s\-\(\)]/g, '');
    const digitsOnly = value.replace(/\D/g, '');
    const result = document.getElementById('result');
    const previewBox = document.getElementById('previewBox');
    const img = document.getElementById('certificateImage');
    const loadingOverlay = document.getElementById('aiLoadingOverlay');

    if (!value) {
        if (!isSilent) {
            if (eventId === 'fdp') {
                result.textContent = 'Please enter the mobile number submitted in Google forms. 🧐';
            } else {
                result.textContent = 'Please enter your register number. 🧐';
            }
            previewBox.style.display = 'none';
        }
        return;
    }

    if (!isSilent) {
        if (eventId === 'fdp') {
            if (digitsOnly.length < 8 && cleanValue.length < 8) {
                result.textContent = 'Whoops! Please enter a valid mobile number submitted in Google forms. 📱';
                previewBox.style.display = 'none';
                return;
            }
        } else if (eventId !== 'ideathon-2k26' && !/^\d{10,18}$/.test(value)) {
            result.textContent = 'Whoops! Please enter a valid college register number.';
            previewBox.style.display = 'none';
            return;
        }
    }

    // Cancel any in-flight request
    if (_currentAbortController) _currentAbortController.abort();
    _currentAbortController = new AbortController();

    if (loadingOverlay) loadingOverlay.classList.add('active');
    if (!isSilent) result.textContent = 'Searching for your certificate… 🔍';

    // ── BACKEND API PATH ───────────────────────────────────────
    if (IS_SERVED) {
        try {
            const apiUrl = `/api/certificate?event=${encodeURIComponent(eventId)}&key=${encodeURIComponent(value)}`;
            const response = await fetch(apiUrl, { signal: _currentAbortController.signal });
            const data = await response.json();

            if (loadingOverlay) loadingOverlay.classList.remove('active');

            if (data.found) {
                // Preload image then show
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.src = data.url;
                    img.dataset.fileName = value;
                    previewBox.style.display = 'block';
                    previewBox.classList.add('cert-reveal');
                    setTimeout(() => previewBox.classList.remove('cert-reveal'), 700);
                    result.textContent = '';
                    fireConfetti();
                    previewBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
                };
                tempImg.onerror = () => {
                    previewBox.style.display = 'none';
                    result.textContent = 'Certificate not found. Please double-check your details! 🤔';
                };
                tempImg.src = data.url;
            } else {
                if (!isSilent) {
                    previewBox.style.display = 'none';
                    result.textContent = 'Certificate not found. Please double-check your details! 🤔';
                }
            }
        } catch (err) {
            if (err.name === 'AbortError') return; // cancelled – no-op
            if (loadingOverlay) loadingOverlay.classList.remove('active');
            // Network error → fall through to local fallback
            console.warn('API unreachable, using local fallback:', err);
            _localFallback(eventId, event, value, digitsOnly, cleanValue, result, previewBox, img);
        }
        return;
    }

    // ── LOCAL FILE FALLBACK (when opened as file://) ───────────
    _localFallback(eventId, event, value, digitsOnly, cleanValue, result, previewBox, img);
}

// ── Local file fallback (original path-guessing approach) ──────
function _localFallback(eventId, event, value, digitsOnly, cleanValue, result, previewBox, img) {
    const loadingOverlay = document.getElementById('aiLoadingOverlay');
    if (loadingOverlay) loadingOverlay.classList.add('active');
    result.textContent = 'Wrapping up your certificate… 🎁';

    let paths = [`${event.folder}/${value}.png`];
    if (eventId === 'fdp') {
        let tenDigits = digitsOnly;
        let elevenDigits = digitsOnly;
        if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
            tenDigits = digitsOnly.slice(1);
        } else if (digitsOnly.length === 10) {
            elevenDigits = '0' + digitsOnly;
        }
        paths = [
            `certificates/Faaculty Developement Programme/${digitsOnly}.png`,
            `certificates/Faaculty Developement Programme/${value}.png`,
            `certificates/Faaculty Developement Programme/${cleanValue}.png`,
            `certificates/Faaculty Developement Programme/${tenDigits}.png`,
            `certificates/Faaculty Developement Programme/${elevenDigits}.png`,
            `certificates/Faaculty Developement Programme/${digitsOnly}.jpg`,
            `certificates/Faaculty Developement Programme/${value}.jpg`,
            `certificates/Faculty Development Programme/${digitsOnly}.png`,
            `certificates/fdp/${digitsOnly}.png`,
            `certificates/fdp/${value}.png`
        ];
        paths = [...new Set(paths)].filter(Boolean);
    } else if (eventId === 'ideathon-2k26') {
        paths = [`certificates/ideathon-2k26/${value}.png`,
                 `certificates/Ideathon-2k26/${value}.png`,
                 `certificates/IDEATHON-2K26/${value}.png`];
    } else if (eventId === 'modelathon') {
        paths = [`certificates/Modelathon/${value}.png`,
                 `certificates/modelathon/${value}.png`,
                 `certificates/MODELATHON/${value}.png`];
    }

    let pathIndex = 0;

    img.onload = function () {
        img.dataset.fileName = value;
        if (loadingOverlay) loadingOverlay.classList.remove('active');
        previewBox.style.display = 'block';
        previewBox.classList.add('cert-reveal');
        setTimeout(() => previewBox.classList.remove('cert-reveal'), 700);
        result.textContent = '';
        fireConfetti();
        previewBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    img.onerror = function () {
        pathIndex++;
        if (pathIndex < paths.length) {
            img.src = paths[pathIndex];
        } else {
            if (loadingOverlay) loadingOverlay.classList.remove('active');
            previewBox.style.display = 'none';
            result.textContent = 'Certificate not found. Please double-check your details! 🤔';
        }
    };

    img.src = paths[0];
}

// ── Download as PNG (Instant 0-delay download) ─────────────────
function downloadAsPNG() {
    const img = document.getElementById('certificateImage');
    const fileName = img.dataset.fileName || 'certificate';
    const downloadName = `Certificate_${fileName}.png`;

    const link = document.createElement('a');
    link.href = img.src;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ── Enter key support ──────────────────────────────────────────
function handleKeyPress(event) {
    if (event.key === 'Enter') showCertificate();
}

// ── Auto-init on certificate page ─────────────────────────────
if (document.getElementById('certInput')) {
    initCertificatePage();
}
