import fs from "fs";
import path from "path";
import yaml from "yaml";

import { fileURLToPath } from "url";

import figgie from "./src/figgie.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __config = path.join(__dirname, "private/config.yml");

if (!fs.existsSync(__config)) {
  console.error(`Config "${__config}" must exist!`);
  process.exit(1);
}

const c = yaml.parse(fs.readFileSync(__config, "utf8"));


//-----------------------
// start of actuall stuff

const config = c.global;

const server = new figgie(__dirname, c.figgie);
server.open();

function shutdown() {
  server.close(() => process.exit(1), () => process.exit(0));
  console.log(config.ui.shutdown);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(config.ui.startup);
