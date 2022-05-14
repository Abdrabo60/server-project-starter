import Express from "express";

import { resizeImage } from "./utils";

const app = Express();

const port = 3000;

app.get("/images", (req, res) => {
  try {
    const filename = req.query.filename + "";
    const width = parseInt(req.query.width + "");
    const height = parseInt(req.query.height + "");
    resizeImage(filename, width, height)
      .then(value => res.sendFile(value))
      .catch(err => {
        console.log(err);
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
