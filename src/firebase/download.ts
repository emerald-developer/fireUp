import { type FirebaseApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { decrypt, encryptFilePath } from '../handler/encrypt';
import fs from 'fs/promises';
import { initFirebaseFromConfig } from '../handler/config';


export async function downloadDecryptFile(firebaseApp: FirebaseApp, filePath: string, password: string): Promise<void> {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, encryptFilePath(filePath, password));

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    // Download the file as a Blob
    const response = await fetch(downloadURL);
    const blob = await response.blob();

    // Convert Blob to ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();

    // Decode the ArrayBuffer to a string
    const fileContentAsString = new TextDecoder().decode(arrayBuffer);

    // Decrypt the file content
    const decryptedContent = decrypt(fileContentAsString, password);
    console.log(decryptedContent);

    // Write the decrypted content to a file
    await fs.writeFile('./test.ts', decryptedContent);
  } catch (error) {
    console.error("Failed to download or decrypt file:", error);
  }
}

// Example usage
const app = await initFirebaseFromConfig(); // Initialize Firebase
await downloadDecryptFile(app, 'src/firebase/upload.ts', 'password');
