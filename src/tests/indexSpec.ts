import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint with status 200", async () => {
    const response = await request.get(
      "/images?filename=fjord&width=500&height=500"
    );
    expect(response.status).toBe(200);
  });
});
