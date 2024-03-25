import figlet from "figlet";
import express from "express";
import favico from "express-favicon";
import path from "path";

export default class figgie {
  base;
  config;
  express;
  server;

  constructor(base, config) {
    this.base = base;
    this.config = config;
    this.express = express();

    // express config
    this.express.use(favico(path.join(this.base, this.config.folder.public, this.config.file.favico)));

    // express routes
    this.express.get(
      this.config.route.root,
      (req, res) => { res.sendFile(path.join(this.base, this.config.folder.public, this.config.file.health)) }
    );

    this.express.get(
      this.config.route.font,
      (req, res) => figlet.fonts((err, font) => {
        if (err) {
          res.type("text");
          res.send(err)
        } else {
          res.json(font)
        }
      })
    );

    this.express.get(
      this.config.route.default,
      (req, res) => {
        if (req.params && this.config.param.text in req.params) {
          res.type("text");

          figlet(req.params[this.config.param.text], (err, output) => {
            res.send(err ? err : this.trim(output))
          });
        } else {
          res.redirect(this.config.route.root);
        }
      }
    );

    this.express.get(
      this.config.route.extended,
      (req, res) => {
        if (req.params && this.config.param.text in req.params && this.config.param.font in req.params) {
          res.type("text");

          figlet(req.params[this.config.param.text], req.params[this.config.param.font], (err, output) => {
            res.send(err ? err : this.trim(output))
          });
        } else {
          res.redirect(this.config.route.root);
        }
      }
    );
  }

  // server control
  open() {
    this.server = this.express.listen(this.config.port, () => {
      console.log(this.config.ui.startup + this.server.address().port);
    });
    
  }

  close(err, done) {
    this.server.close(() => { console.log(this.config.ui.shutdownSuccess); done() });

    setTimeout(
      () => { console.log(this.config.ui.shutdownFail); err() },
      this.config.graceTime * 1000
    );
  }

  // clean up text
  trim(input) {
    let output = input;

    if (this.config.trim) {
      output = input.replace(/\s+\n/g, "\n");
    }

    return (output);
  }
}
