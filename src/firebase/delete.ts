import { type FirebaseApp } from 'firebase/app';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { encryptFilePath } from '../handler/encrypt';

export async function deleteFileFromFirebase(firebaseApp: FirebaseApp, filePath: string, password: string): Promise<void> {
  try {
    console.log(`Attempting to delete file from Firebase: ${filePath}`);

    const storage = getStorage(firebaseApp);
    const encryptedFilePath = encryptFilePath(filePath, password); // Assuming encryptFilePath is available and works similarly as in download.ts
    const storageRef = ref(storage, encryptedFilePath);

    // Delete the file from Firebase Storage
    await deleteObject(storageRef);
    console.log(`File successfully deleted from Firebase: ${filePath}`);
  } catch (error) {
    console.error("Failed to delete file from Firebase:", error);
  }
}