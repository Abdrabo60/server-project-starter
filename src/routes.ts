import { Request, Response } from "express";
import { resizeImage } from "./utils";
export async function imagesRouter(req: Request, res: Response) {
  try {
    const filename = req.query.filename + "";
    const width = parseInt(req.query.width + "");
    const height = parseInt(req.query.height + "");
    if (!filename) {
      console.log("filename error");
      throw "the file name is empty or null";
    }
    if (isNaN(width) || isNaN(height)) {
      console.log("width or height error");
      throw "the width or height is not a number or empty";
    }
    const image = await resizeImage(filename, width, height);
    res.status(200).sendFile(image);
  } catch (error) {
    if ((error + "").startsWith("Input file is missing")) {
      res.status(400).send("Input file is missing");
    } else {
      res.status(400).send(error);
    }
  }
}
