import * as admin from 'firebase-admin';
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://app-teste-alest.firebaseio.com',
    
});

const db = admin.firestore();
const productCollection = 'products';



export const productRepository = db.collection(productCollection);