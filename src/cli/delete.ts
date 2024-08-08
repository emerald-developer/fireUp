import { program } from "commander";
import { initFirebaseFromConfig } from "../handler/config";
import { listFilesInFirebaseDirectory } from "../firebase/list";
import { deleteFileFromFirebase } from "../firebase/delete";

export function deleteCli() {
  program
    .command("delete")
    .description("Deletes a file or folder from Firebase.")
    .requiredOption("-fip, --firebasePath <firebasePath>", "The folder or file path in firebase.")
    .requiredOption("-p, --password <password>", "The password to use for encryption.")
    .action(async (options) => {
      const { firebasePath, localPath, password } = options;
      const app = await initFirebaseFromConfig()
      const files = listFilesInFirebaseDirectory(app, password)
      if (!firebasePath.endsWith('/')){
        deleteFileFromFirebase(app, firebasePath, password);
      }else if (firebasePath == '/')
        (await files).forEach(async (file) => {
          deleteFileFromFirebase(app, `${file}`, password);
        });
      else{
        console.log((await files).filter((file) => file.startsWith((firebasePath))));
        (await files).filter((file) => file.startsWith((firebasePath))).forEach(async (file) => {
          deleteFileFromFirebase(app, `${file}`, password);
        });
      }
    });
}