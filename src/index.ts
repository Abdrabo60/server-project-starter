import Express, { Request, Response } from "express";
import { imagesRouter } from "./routes";

const app = Express();

const port = 3000;

app.get("/images", imagesRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

export default app;
