import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { initializeApp, getApp, type FirebaseOptions, type FirebaseApp } from "firebase/app";


export async function authenticateUser(firebaseApp: FirebaseApp, email: string, password: string): Promise<User|null> {
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error:any) {
    if (error.code === 'auth/email-already-in-use') {
      // If the email is already in use, attempt to sign in the user
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (signInError) {
        console.error("Failed to log in:", signInError);
        return null; // Return null if login fails
      }
    } else {
      console.error("Failed to create user:", error);
      return null; // Return null if user creation fails
    }
  }

}