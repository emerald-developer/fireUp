import { program } from "commander";
import { uploadCli } from "./upload";
import { listCli } from "./list";
import { downloadCLi } from "./download";
import { initCli } from "./init";
import { deleteCli } from "./delete";
// Define the root command
program
  .name("gitFire")
  .description("A CLI tool to interact with Git repositories using Firebase.");
// subcommands
uploadCli();
listCli();
downloadCLi();
initCli();
deleteCli();
// Parse the command line arguments
program.parse(process.argv);

// If no command was specified, print help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
