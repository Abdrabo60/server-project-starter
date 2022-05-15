import { cleanOldCache, resizeImage } from "../utils";
import fs from "fs";
it("expect number of cached files to be less than 10 ", () => {
  expect(cleanOldCache("")).toBeLessThan(11);
});

it("expect file is exist ", async () => {
  const filename = await resizeImage("fjord", 500, 500);
  expect(fs.existsSync(filename)).toBeTruthy();
});
