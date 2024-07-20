

const admin = require('firebase-admin');
const serviceAccount = require('./servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware or route handler to verify the Firebase ID token
module.exports = async function verifyToken  (token) {
  //const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
    
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
