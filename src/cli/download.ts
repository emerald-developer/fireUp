import { program } from "commander";
import { readDir } from "../handler/ignore";
import { uploadEncryptFile } from "../firebase/upload";
import { initFirebaseFromConfig } from "../handler/config";

export function download() {
  program
    .command("download")
    .description("Downloads contents of a directory")
    .requiredOption("-fip, --firebasePath <folderPath>", "The folder or file path in firebase.")
    
    .requiredOption("-p, --password <password>", "The password to use for encryption.")
    .action(async (options) => {
      const { folderPath, password } = options;
      const app = await initFirebaseFromConfig()
      const ignoreFilePath = `${folderPath}ignore.json`;
      const files = await readDir(folderPath, ignoreFilePath);
      files.map(async (file) => uploadEncryptFile(app, file , password).catch((error) => {console.log("error uploading file:", error)}));
    });
}
