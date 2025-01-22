const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZGTUc3a1pIeklRem80THVSTUlMUWY4TTJ0eXM1VzkyZUlnN1lMUjhuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUhFNFZrT3Z6Z29YZFAweFJTNGpLWWRRQytldnh5S3hLS1hNVWdHdXozdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQlZQejREN1NKM2p6WmZ6dnoxT0FML0R3eUpIOEVzcjk2S0hxU2JLQm0wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwbUxqMjRkWU5CMHByaHpOTEthV0QzZnRWdndZM1RaNytUdkEwTFdOZGdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVNNHJTRWdvSTUzRWZRQ3hTUlhmR3dOMTJ5UVRNOW9MdVlVT1hJTTFYWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IiszYnA2NjhFV1hnbUpuTVBOWVVERlFsV2ZIL2IrVzc4RGZzVm9YVmRyaFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0RuU3ZYZmdlbzcvd24rQ2UwS042aTBQR1hNc0x4dTJWY0pCdGNRd0ZrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1FwdDNDQjlyelgyQUpFdTRucDh2RjhXVDA5aTd0R3dIK3NVQ3k4MXlWWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZrcXJuVXNhZWM4eThzUWIxcmlUQzB3TU9FWlNHNGVHQ0dVTG9PcnphWW4xdFZQTDVxV0dFR2lPVHhtZi9URUxEdSt5RTVDUUpNRmFVQVN4WjAwbkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJicDAvbjlaT2UyempLR21ZZm5uL0hEelFGOU9iQmttZHVzVjQyejZzQWNjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXSFVhdmlOMFI3NmlRczdHOE4zYlBBIiwicGhvbmVJZCI6IjU5M2UyMWQ2LWUyNTQtNDA3My1iMzFmLWUyNDg5YTcyNjJjMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSHk5cWpYYm5vNU9ZMkVNT3d5blRCem1SaGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHR4OXFEOVljMU9EQTMwSlIzNnlDU1BWbWMwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlRRDlRWThKIiwibWUiOnsiaWQiOiIyNTQ3ODQ5MzcxMTI6N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1NkZ3ZNR0VLK3d3N3dHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidTJxMnlIZVZ1MzhTd3lOaEl0bmQ0ZGJ6WFI5MFFjNTBML2RkM0xwOTNDcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMkNsZFBlOE5RUXpjeHJUVG9RRW16SXhueHZIUmlJUTlzbGFMSzdjcDdLSjFqS21KWnhIb2lwTkFhYXpncjkrU2hRRmlwVStGeVpJa2hvVHJPc2YvQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjVNSTE5Z1l0NGZNMHVVbDBUaWxkVWJnTEFWZEZOa3l1UnRZZmF4NGRTRmk1MllYeklzWjJ2S0pKNHhHd2JVNXBBbE1icitZTC90ZGFqNWhySnB3N0J3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzg0OTM3MTEyOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYnRxdHNoM2xidC9Fc01qWVNMWjNlSFc4MTBmZEVIT2RDLzNYZHk2ZmR3ciJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzU0NTc4OH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
