import yaml from "yaml";
import path from "path";
import { fileURLToPath } from "url";

import figgie from "./src/figgie.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __config = path.join(__dirname, "private/config.yml");

const server = new figgie(__dirname, __config.figgie);
const config = __config.global;

server.open();

function shutdown() {
  server.close(() => process.exit(1), () => process.exit(0));
  console.log(config.ui.shutdown);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(config.ui.startup);
