import { program } from "commander";
import {
  updateConfigProperty,
} from "../handler/config";

export function initCli() {
  program
    .command("init")
    .description("Initializes firebase config.")
    .requiredOption("-key, --apiKey <apiKey>", "The apiKey for firebase.")
    .requiredOption(
      "-auth, --authDomain <authDomain>",
      "The authDomain for firebase."
    )
    .requiredOption(
      "-db, --databaseURL <databaseURL>",
      "The databaseURL for firebase."
    )
    .requiredOption(
      "-project, --projectId <projectId>",
      "The projectId for firebase."
    )
    .requiredOption(
      "-bucket, --storageBucket <storageBucket>",
      "The storageBucket for firebase."
    )
    .requiredOption(
      "-senderId, --messagingSenderId <messagingSenderId>",
      "The messagingSenderId for firebase."
    )
    .requiredOption("-app, --appId <appId>", "The appId for firebase.")

    .action(async (options) => {
      const {
        apiKey,
        authDomain,
        databaseURL,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
      } = options;

      try {
        console.log("Starting Firebase configuration update...");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "apiKey"],
          apiKey
        );
        console.log("Updated apiKey");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "authDomain"],
          authDomain
        );
        console.log("Updated authDomain");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "databaseURL"],
          databaseURL
        );
        console.log("Updated databaseURL");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "projectId"],
          projectId
        );
        console.log("Updated projectId");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "storageBucket"],
          storageBucket
        );
        console.log("Updated storageBucket");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "messagingSenderId"],
          messagingSenderId
        );
        console.log("Updated messagingSenderId");

        await updateConfigProperty(
          "./config",
          "config.json",
          ["firebaseConfig", "appId"],
          appId
        );
        console.log("Updated appId");

        console.log("Firebase configuration update completed successfully.");
      } catch (error) {
        console.error("Error updating Firebase configuration:", error);
      }
    });
}
