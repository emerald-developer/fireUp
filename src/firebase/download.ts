import { type FirebaseApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { decrypt, encryptFilePath } from '../handler/encrypt';
import fs from 'fs/promises';
import path from 'path';


export async function downloadDecryptFile(firebaseApp: FirebaseApp, filePath: string, localPath: string, password: string): Promise<void> {
  try {
    console.log(`Attempting to download file from Firebase: ${filePath} to ${localPath}`);
    
    const storage = getStorage(firebaseApp);
    const encryptedFilePath = encryptFilePath(filePath, password);
    const storageRef = ref(storage, encryptedFilePath);
    
    // Extract the original file name from the localPath
    const originalFileName = path.basename(localPath);
    
    // Ensure the directory exists
    const dirName = path.dirname(localPath);
    await fs.mkdir(dirName, { recursive: true });
    
    // Construct the full local path for the file using the original file name
    const finalLocalPath = `${dirName}/${originalFileName}`;
    
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Download URL: ${downloadURL}`);

    const response = await fetch(downloadURL);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const fileContentAsString = new TextDecoder().decode(arrayBuffer);
    const decryptedContent = decrypt(fileContentAsString, password);

    await fs.writeFile(finalLocalPath, decryptedContent);
    console.log(`File successfully downloaded and saved to ${finalLocalPath}`);
  } catch (error) {
    console.error("Failed to download or decrypt file:", error);
  }
}
