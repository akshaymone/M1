import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc, onSnapshot, collection, query, serverTimestamp } from 'firebase/firestore';

export async function saveUserToFirestore(user) {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLoginAt: new Date().toISOString(),
  };

  if (!userSnap.exists()) {
    // New user: add createdAt
    userData.createdAt = new Date().toISOString();
  }

  try {
    // Merge true ensures we don't overwrite createdAt if it exists (though we already checked above)
    await setDoc(userRef, userData, { merge: true });
    console.log('[UserService] User saved to Firestore:', user.email);
  } catch (error) {
    console.error('[UserService] Error saving user to Firestore:', error);
    throw error;
  }
}

export function getUsers(callback) {
  const q = query(collection(db, 'users'));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const users = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    callback(users);
  }, (error) => {
    console.error('[UserService] Error fetching users from Firestore:', error);
  });
  
  return unsubscribe;
}
