import { cleanOldCache } from "../utils";

it("expect number of cached files to be less than 10 ", () => {
  expect(cleanOldCache("")).toBeLessThan(11);
});
