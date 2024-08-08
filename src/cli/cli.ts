import { program } from "commander";
import { upload } from "./upload";
import { list } from "./list";
import { download } from "./download";
// Define the root command
program
  .name("gitFire")
  .description("A CLI tool to interact with Git repositories using Firebase.");
// subcommands
upload();
list();
download();
// Parse the command line arguments
program.parse(process.argv);

// If no command was specified, print help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
