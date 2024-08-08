import { program } from "commander";
import { readDir } from "../handler/ignore";
import { uploadEncryptFile } from "../firebase/upload";
import { initFirebaseFromConfig } from "../handler/config";
import { listFilesInFirebaseDirectory } from "../firebase/list";
import { deleteObject } from "firebase/storage";
import { downloadDecryptFile } from "../firebase/download";

export function download() {
  program
    .command("download")
    .description("Downloads contents of a directory")
    .requiredOption("-fip, --firebasePath <firebasePath>", "The folder or file path in firebase.")
    .requiredOption("-lp, --localPath <localPath>", "The local path to which the file or folder should be downloaded.")
    .requiredOption("-p, --password <password>", "The password to use for encryption.")
    .action(async (options) => {
      const { firebasePath, localPath, password } = options;
      const app = await initFirebaseFromConfig()
      const files = listFilesInFirebaseDirectory(app, password)
      if (!firebasePath.endsWith('/')){
        downloadDecryptFile(app, firebasePath, localPath, password);
      }else{
        console.log((await files).filter((file) => file.startsWith((firebasePath))));
        (await files).filter((file) => file.startsWith((firebasePath))).forEach(async (file) => {
          downloadDecryptFile(app, `${file}`, `${localPath.endsWith('/')?localPath:localPath+'/'}${file}`, password);
        });
      }
    });
}