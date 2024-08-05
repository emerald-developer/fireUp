import { program } from "commander";
import { initFirebaseFromConfig } from "../handler/config";
import { listFilesInFirebaseDirectory } from "../firebase/list";
import { encryptFilePath } from "../handler/encrypt";

export function list() {
  program
    .command("list")
    .description("Lists decrypted file paths of all files in firebase.")
    .option(
      "-f, --folderPath <folderPath>",
      "The folder path in firebase storage."
    )
    .requiredOption(
      "-p, --password <password>",
      "The password to use for encryption."
    )
    .action(async (options) => {
      const { folderPath, password } = options;
      const app = await initFirebaseFromConfig();
      console.log(
        await listFilesInFirebaseDirectory(app, password, encryptFilePath(folderPath, password))
      );
    });
}
