import { type FirebaseApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import fs from 'fs/promises';
import { encryptFilePath, encrypt } from '../handler/encrypt';

export async function uploadEncryptFile(firebaseApp: FirebaseApp, filePath: string, password: string): Promise<any> {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, encryptFilePath(filePath, password));

    // Read the file into a buffer
    const buffer = await fs.readFile(filePath);

    // Convert the buffer to a string
    const fileContentAsString = buffer.toString();

    // Encrypt the string
    const encryptedContent = encrypt(fileContentAsString, password);

    // Convert the encrypted string back to a buffer
    const encryptedBuffer = Buffer.from(encryptedContent, 'utf-8');

    // Convert the encrypted buffer to a Uint8Array
    const uint8Array = new Uint8Array(encryptedBuffer.buffer);

    const uploadTask = uploadBytesResumable(storageRef, uint8Array);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(true);
          } catch (urlError) {
            reject(urlError);
          }
        }
      );
    });
  } catch (error) {
    return error;
  }
}
