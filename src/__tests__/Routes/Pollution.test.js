const supertest = require("supertest");
const app = require("../../app");

describe("Pollution Route", () => {
  describe("Get current pollution", () => {
    describe("with passing valid the coordinates", () => {
      it("should return a 200 and the result", async () => {
        const LATITUDE = 48.856613;
        const LONGITUDE = 2.352222;
        const { body, status } = await supertest(app).get(
          `/pollution/current/${LATITUDE}/${LONGITUDE}`
        );
        expect(status).toBe(200);
        expect(body).toHaveProperty("Result.Pollution");
        expect(body).toHaveProperty("Result.Pollution.ts");
        expect(body).toHaveProperty("Result.Pollution.aqius");
        expect(body).toHaveProperty("Result.Pollution.mainus");
        expect(body).toHaveProperty("Result.Pollution.aqicn");
        expect(body).toHaveProperty("Result.Pollution.maincn");
      });
    });
    describe("without passing the coordinates", () => {
      it("should return a 404", async () => {
        const { body, status } = await supertest(app).get(
          `/pollution/current/`
        );
        expect(status).toBe(404);
        expect(body).toHaveProperty("error");
      });
    });
    describe("with passing invalid coordinates", () => {
      describe("passing string coordinate", () => {
        it("should return a 400", async () => {
          const { body, status } = await supertest(app).get(
            `/pollution/current/falseLat/falseLon`
          );
          expect(status).toBe(400);
          expect(body).toHaveProperty("error");
        });
      });
      describe("passing out of range coordinates ", () => {
        it("should return a 400", async () => {
          const LATITUDE = 99;
          const LONGITUDE = 2.352222;
          const { body, status } = await supertest(app).get(
            `/pollution/current/${LATITUDE}/${LONGITUDE}`
          );
          expect(status).toBe(400);
          expect(body).toHaveProperty("error");
        });
      });
    });
  });
  describe("Get Paris most polluted date", () => {
    it("should return 200", async () => {
      const { body, status } = await supertest(app).get(
        "/pollution/most-polluted/paris"
      );
      expect([200, 204]).toContain(status);
      expect(body).toHaveProperty("datetime");
    });
  });
});
