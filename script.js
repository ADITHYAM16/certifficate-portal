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
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#f093fb', '#f5576c']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#f093fb', '#f5576c']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

// Fire confetti on page load excitement
window.addEventListener('load', () => {
    fireConfetti();
});

// ── Main page: navigate to certificate page ────────────────────
function selectEvent(eventId, event) {
    window.location.href = `certificate.html?event=${eventId}`;
}

// ── Certificate page: initialise from URL param ────────────────
function initCertificatePage() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');
    const event = EVENTS[eventId];

    if (!event) {
        window.location.href = 'index.html';
        return;
    }

    // Store current event id for use in showCertificate
    window._currentEvent = eventId;

    document.getElementById('eventTitle').textContent = event.name;

    const input = document.getElementById('certInput');

    if (event.inputType === 'register') {
        input.placeholder = 'Enter your 13-digit number';
        input.setAttribute('inputmode', 'numeric');
        input.setAttribute('maxlength', '13');
        input.setAttribute('pattern', '[0-9]{13}');
        document.getElementById('eventSubtitle').textContent =
            'Enter your 13-digit college register number to retrieve your certificate.';
        document.getElementById('guideTitle').textContent = 'Register Number Format';
        document.getElementById('guideText').textContent =
            'Enter your 13-digit register number (e.g., 6113242431005).';
    } else {
        input.placeholder = 'Enter your name with initials';
        input.setAttribute('autocomplete', 'name');
        document.getElementById('eventSubtitle').textContent =
            'Enter your name exactly as registered (with initials).';
        document.getElementById('guideTitle').textContent = 'Name Format Guide';
        document.getElementById('guideText').textContent =
            'Enter your name with initials exactly as submitted (e.g., S.KUMAR or A.B.PRIYA).';
    }
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
        result.textContent = event.inputType === 'register'
            ? 'Please enter your register number. 🧐'
            : 'Please enter your name with initials. 🧐';
        previewBox.style.display = 'none';
        return;
    }

    if (event.inputType === 'register' && !/^\d{13}$/.test(value)) {
        result.textContent = 'Whoops! Please enter a valid 13-digit register number.';
        previewBox.style.display = 'none';
        return;
    }

    const fileName = event.inputType === 'register'
        ? value
        : value.toUpperCase().replace(/\s+/g, '_');

    const filePath = `${event.folder}/${fileName}.png`;
    result.textContent = 'Wrapping up your certificate… 🎁';

    img.onload = function () {
        img.dataset.fileName = fileName;
        previewBox.style.display = 'block';
        result.textContent = '';
        fireConfetti(); // Fire confetti on showing certificate!
    };

    img.onerror = function () {
        previewBox.style.display = 'none';
        result.textContent = 'Certificate not found. Please double-check your details! 🤔';
    };

    img.src = filePath;
}

// ── Download as PNG ────────────────────────────────────────────
function downloadAsPNG() {
    // 🎉 Fire confetti when downloaded
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
