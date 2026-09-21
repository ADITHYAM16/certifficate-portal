/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    MAHENDRA ENGINEERING COLLEGE – AI&DS CERTIFICATE PORTAL   ║
 * ║    Backend Server – Real-Time Certificate Retrieval          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Start: npm start  →  http://localhost:3000
 */

const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Event → Folder mapping ────────────────────────────────────────────────
// Maps each eventId to the actual folder(s) on disk (multiple fallbacks).
const EVENT_FOLDERS = {
    'fdp':               ['certificates/Faaculty Developement Programme',
                          'certificates/Faculty Development Programme',
                          'certificates/fdp'],
    'modelathon':        ['certificates/Modelathon',
                          'certificates/modelathon',
                          'certificates/MODELATHON'],
    'ideathon-2k26':     ['certificates/ideathon-2k26',
                          'certificates/Ideathon-2k26',
                          'certificates/IDEATHON-2K26'],
    'logo-design':       ['certificates/logo-design',
                          'certificates/Logo-Design',
                          'certificates/LOGO-DESIGN'],
    'technical-seminar': ['certificates/technical-seminar',
                          'certificates/Technical-Seminar'],
    'technical-quiz':    ['certificates/technical-quiz',
                          'certificates/Technical-Quiz'],
    'mind-meets-machine':['certificates/mind-meets-machine',
                          'certificates/Mind-Meets-Machine'],
    'code-relay':        ['certificates/code-relay',
                          'certificates/Code-Relay'],
};

// ─── In-Memory Certificate Index ───────────────────────────────────────────
// Structure:  index[eventId] = Map { normalizedKey → publicUrl }
const index = {};

/**
 * Normalize a filename stem (without extension) so lookups are fuzzy:
 * - Strip leading/trailing whitespace
 * - Lowercase
 * - Remove spaces, hyphens, parentheses
 * For phone numbers also handle leading 0 variants.
 */
function normalizeKey(stem) {
    return stem.replace(/[\s\-\(\)\+]/g, '').toLowerCase();
}

/**
 * Build all normalized key variants for a given stem.
 * Handles 10-digit ↔ 11-digit (leading 0) phone number variants.
 */
function keyVariants(stem) {
    const base = normalizeKey(stem);
    const variants = new Set([base]);

    const digitsOnly = base.replace(/\D/g, '');
    variants.add(digitsOnly);

    // Phone number 10 ↔ 11 digit variants (with/without leading 0)
    if (/^\d{10}$/.test(digitsOnly)) {
        variants.add('0' + digitsOnly);
    } else if (/^\d{11}$/.test(digitsOnly) && digitsOnly.startsWith('0')) {
        variants.add(digitsOnly.slice(1));
    }

    return variants;
}

/**
 * Scan all event folders and build the in-memory index.
 * Called once at server startup.
 */
function buildIndex() {
    const root = __dirname;

    for (const [eventId, folderList] of Object.entries(EVENT_FOLDERS)) {
        index[eventId] = new Map();

        for (const folder of folderList) {
            const absFolder = path.join(root, folder);
            if (!fs.existsSync(absFolder)) continue;

            let files;
            try { files = fs.readdirSync(absFolder); }
            catch (e) { continue; }

            for (const file of files) {
                const ext = path.extname(file).toLowerCase();
                if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

                const stem = path.basename(file, ext);
                const publicUrl = `/${folder}/${file}`.replace(/\\/g, '/');

                // Index all normalized variants → same URL
                for (const variant of keyVariants(stem)) {
                    if (!index[eventId].has(variant)) {
                        index[eventId].set(variant, publicUrl);
                    }
                }
            }
            break; // Use first existing folder
        }

        console.log(`  ✅ ${eventId.padEnd(22)} → ${index[eventId].size} certificates indexed`);
    }
}

// ─── Static File Serving ───────────────────────────────────────────────────
app.use(express.static(__dirname, {
    setHeaders(res, filePath) {
        // Cache images aggressively, but not HTML/JS
        if (/\.(png|jpg|jpeg|webp)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=86400');
        }
    }
}));

// ─── API: Look up a certificate ────────────────────────────────────────────
/**
 * GET /api/certificate?event=<eventId>&key=<regNo|mobile>
 *
 * Response 200: { found: true,  url: "/certificates/...", event: "...", key: "..." }
 * Response 404: { found: false, error: "Certificate not found", event: "...", key: "..." }
 * Response 400: { error: "Missing event or key parameter" }
 */
app.get('/api/certificate', (req, res) => {
    const { event: eventId, key } = req.query;

    if (!eventId || !key) {
        return res.status(400).json({ error: 'Missing event or key parameter' });
    }

    if (!index[eventId]) {
        return res.status(404).json({
            found: false,
            error: 'Event not found',
            event: eventId,
            key
        });
    }

    const eventMap = index[eventId];

    // Try all normalized variants of the user's input
    let url = null;
    for (const variant of keyVariants(key.trim())) {
        if (eventMap.has(variant)) {
            url = eventMap.get(variant);
            break;
        }
    }

    if (url) {
        return res.json({ found: true, url, event: eventId, key: key.trim() });
    } else {
        return res.status(404).json({
            found: false,
            error: 'Certificate not found',
            event: eventId,
            key: key.trim()
        });
    }
});

// ─── API: Event stats ──────────────────────────────────────────────────────
/**
 * GET /api/events
 * Returns each event with its certificate count.
 */
app.get('/api/events', (req, res) => {
    const stats = {};
    for (const [eventId, map] of Object.entries(index)) {
        stats[eventId] = { count: map.size };
    }
    res.json(stats);
});

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// ─── Start ─────────────────────────────────────────────────────────────────
console.log('\n🎓 Mahendra Engineering College – AI&DS Certificate Portal');
console.log('─'.repeat(58));
console.log('📁 Building certificate index...\n');

buildIndex();

console.log('\n─'.repeat(58));
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at  →  http://localhost:${PORT}`);
    console.log('   Press Ctrl+C to stop.\n');
});
