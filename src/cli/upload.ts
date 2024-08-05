import { program } from "commander";
import { readDir } from "../handler/ignore";
import { uploadEncryptFile } from "../firebase/upload";
import { initFirebaseFromConfig } from "../handler/config";

export function upload() {
  program
    .command("upload")
    .description("Uploads contents of a directory with encryption.")
    .requiredOption("-f, --folderPath <folderPath>", "The folder path.")
    .requiredOption("-p, --password <password>", "The password to use for encryption.")
    .action(async (options) => {
      const { folderPath, password } = options;
      const app = await initFirebaseFromConfig()
      const ignoreFilePath = `${folderPath}ignore.json`;
      const files = await readDir(folderPath, ignoreFilePath);
      files.map(async (file) => uploadEncryptFile(app, file , password).catch((error) => {console.log("error uploading file:", error)}));
    });
}
