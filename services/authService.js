import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const logout = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};
