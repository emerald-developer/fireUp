import { initializeApp, type FirebaseApp } from 'firebase/app';
import fs from 'fs/promises';
import path from 'path';

export async function readConfig(configPath: string, fileName:string): Promise<any> {
  try {
    const filePath = path.resolve(configPath, fileName);
    const rawData = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

export async function updateConfigProperty(configPath: string, fileName:string, propertyPath: string[], newValue: any): Promise<void> {
  try {
    const filePath = path.resolve(configPath, fileName);
    const rawData = await fs.readFile(filePath, 'utf8');
    let jsonData = JSON.parse(rawData);

    // Navigate through the object using the propertyPath array
    let currentObject = jsonData;
    for (let i = 0; i < propertyPath.length; i++) {
      const key = propertyPath[i];
      if (i === propertyPath.length - 1) {
        // Last iteration, update the value
        currentObject[key] = newValue;
      } else {
        // Not the last iteration, navigate deeper
        currentObject = currentObject[key];
      }
    }

    // Stringify the updated object
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated JSON string back to the file
    await fs.writeFile(filePath, updatedData);
  } catch (error) {
    console.error('Error updating JSON file:', error);
  }
}

export async function initFirebaseFromConfig(): Promise<FirebaseApp>{
  const firebaseConfig = await readConfig('./config', 'firebase.json');
  const app = initializeApp(firebaseConfig.firebaseConfig);
  return app;
}