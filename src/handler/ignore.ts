import * as fs from "fs";
import * as path from "path";

async function readJsonAndConvertToArray(filePath: string): Promise<string[]> {
  try {
      const ignoreContent = fs.readFileSync(filePath, 'utf8');
      const ignoreArray = JSON.parse(ignoreContent);
      return ignoreArray;
  } catch (error) {
      console.error("Error reading or parsing the ignore file:", error);
      return [];
  }
}

export async function readDir(dirPath: string, ignoreFilePath?: string): Promise<string[]> {
  const paths = fs.readdirSync(dirPath, { withFileTypes: true });
  let files = [];
  if (paths.length === 0) {
    return [dirPath + "/"];
  }

  const ignorePaths = ignoreFilePath ? await readJsonAndConvertToArray(ignoreFilePath) : [];

  for (const n of paths) {
    const fullPath = path.join(dirPath, n.name);
    // Check if the current path should be ignored
    if (ignorePaths.includes(fullPath) || ignorePaths.includes(fullPath + "/")) {
      continue; // Skip
    }
    if (n.isDirectory()) {
      files.push(...(await readDir(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}