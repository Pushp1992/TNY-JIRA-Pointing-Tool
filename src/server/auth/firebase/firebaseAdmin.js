// const admin = require('firebase-admin');

import admin from 'firebase-admin';

const serviceAccount = require('..secrets.json/');

export const verifyIdToken = (token) => {
    if (!admin.app.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://tny-jira-pointing-tool-2.firebaseio.com"
        });
    }

    return admin.auth().verifyIdToken(token)
        .catch((error) => {
            throw error;
        });
};