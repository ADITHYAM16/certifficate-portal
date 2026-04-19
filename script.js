// ── Winners data ──────────────────────────────────────────────
const WINNERS = {
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

// ── Main page: navigate to certificate page ────────────────────
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
    document.getElementById('eventTitle').textContent = event.name;

    const winners = WINNERS[eventId];
    if (winners) {
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
    }

    const input = document.getElementById('certInput');
    input.placeholder = 'Enter your register number';
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('maxlength', '13');
    input.setAttribute('pattern', '[0-9]{13}');
    document.getElementById('eventSubtitle').textContent =
        'Enter your 13-digit college register number to retrieve your certificate.';
}

// ── Lookup certificate ─────────────────────────────────────────
function showCertificate() {
    const eventId = window._currentEvent;
    const event = EVENTS[eventId];
    const value = document.getElementById('certInput').value.trim();
    const result = document.getElementById('result');
    const previewBox = document.getElementById('previewBox');
    const img = document.getElementById('certificateImage');

    if (!value) {
        result.textContent = 'Please enter your register number. 🧐';
        previewBox.style.display = 'none';
        return;
    }

    if (!/^\d{13}$/.test(value)) {
        result.textContent = 'Whoops! Please enter a valid 13-digit register number.';
        previewBox.style.display = 'none';
        return;
    }

    const filePath = `${event.folder}/${value}.png`;
    result.textContent = 'Wrapping up your certificate… 🎁';

    img.onload = function () {
        img.dataset.fileName = value;
        previewBox.style.display = 'block';
        result.textContent = '';
        fireConfetti();
        previewBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    img.onerror = function () {
        previewBox.style.display = 'none';
        result.textContent = 'Certificate not found. Please double-check your details! 🤔';
    };

    img.src = filePath;
}

// ── Download as PNG ────────────────────────────────────────────
function downloadAsPNG() {
    fireConfetti();
    const img = document.getElementById('certificateImage');
    const fileName = img.dataset.fileName || 'certificate';
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const link = document.createElement('a');
    link.download = `Certificate_${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// ── Enter key support ──────────────────────────────────────────
function handleKeyPress(event) {
    if (event.key === 'Enter') showCertificate();
}

// ── Auto-init on certificate page ─────────────────────────────
if (document.getElementById('certInput')) {
    initCertificatePage();
}
