const admin = require("firebase-admin");
const serviceAccount = require("./chat-room007-900f5-firebase-adminsdk-dwmr0-5c6375682a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId:"chat-room007-900f5"
});

const db = admin.firestore();
module.exports = {
    db
}