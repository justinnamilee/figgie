import figlet from "figlet";
import express from "express";
import favico from "express-favicon";
import path from "path";

export default class figgie {
  base;
  config;
  ex;
  server;

  constructor(base, config) {
    this.base = base;
    this.config = config;

    //! add static route stuff here

    //! add dynamic route stuff here
  }

  open() {
    this.ex = express();
    this.ex.use(favico(path.join(this.base, config.publicFolder, config.favico)));

    this.server = this.ex.listen(config.port, () => {
      console.log(this.config.ui.startup + this.server.address().port);
    });
  }

  close(err, done) {
    this.server.close(() => { console.log(c.ui.shutdownSuccess); done() });

    setTimeout(
      () => { console.log(this.c.ui.shutdownFail); err() },
      this.config.graceTime * 1000
    );
  }
}