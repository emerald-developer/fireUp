import { getStorage, ref, listAll } from 'firebase/storage';
import { initFirebaseFromConfig } from "../handler/config";
import { decryptFilePath } from '../handler/encrypt';
import type { FirebaseApp } from 'firebase/app';

// Assuming you have initialized Firebase elsewhere in your application
// Initialize Firebase Storage
const app = await initFirebaseFromConfig();

// Function to list all items in the specified directory and return their paths as an array
export async function listFilesInFirebaseDirectory(firebaseApp: FirebaseApp, password: string, path?: string): Promise<string[]> {
  const storage = getStorage();
  const storageRef = (path) ? ref(storage, path) : ref(storage);
  let files: string[] = [];

  try {
    const result = await listAll(storageRef);
    for (let item of result.items) {
      files.push(decryptFilePath(item.fullPath, password));
    }
    for (let folder of result.prefixes) {
      files.push(...(await listFilesInFirebaseDirectory(firebaseApp, password, folder.fullPath)));
    }
  } catch (error) {
    console.error("Error listing files:", error);
  }

  return files;
}
