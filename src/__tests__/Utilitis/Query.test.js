const {
  getZoneByName,
  insertZone,
  insertAQ,
  getMostPolluted,
} = require("../../Utilities/Query");

describe("Database queries", () => {
  describe("Insert zone Query", () => {
    describe('- Insert a zone with name "testing"', () => {
      it("Should return zone object with the same name", async () => {
        let testingZone = await insertZone("testing");
        expect(testingZone.zone).toBe("testing");
        testingZone.destroy();
        // expect(true).toBe(true);
      });
    });
    describe("- Insert a zone with an already exist zone name", () => {
      it("Should return undefined", async () => {
        let firstInserted = await insertZone("someZoneName");
        let lastInserted = await insertZone("someZoneName");
        expect(lastInserted).toBeUndefined();
        firstInserted.destroy();
      });
    });
  });

  describe("Get Zone by name query", () => {
    describe("- Getting zone by passing empty string", () => {
      it("Should return undefined", async () => {
        const nullZone = await getZoneByName("");
        expect(nullZone).toBeNull();
      });
    });
    describe("- Getting zone by passing a zone name that doesn't exist in our database", () => {
      it("Should return null", async () => {
        const nullZone = await getZoneByName("random zone name");
        expect(nullZone).toBeNull();
      });
    });
    describe("- Getting zone by passing Paris", () => {
      it("Should return object with zone name paris", async () => {
        const parisZone = await getZoneByName("Paris");
        expect(parisZone.zone).toBe("Paris");
      });
    });
  });

  describe("Insert Air Quality query", () => {
    const weatherMock = {
      ts: "2022-09-30T22:00:00.000Z",
      tp: 13,
      pr: 1018,
      hu: 63,
      ws: 0.81,
      wd: 81,
      ic: "01d",
    };
    const pollutionMock = {
      ts: "2022-09-30T22:00:00.000Z",
      aqius: 75,
      mainus: "p2",
      aqicn: 38,
      maincn: "p1",
    };
    const idZoneMock = 1;
    describe("- Inserting air quality with missing weather, pollution information or zone id", () => {
      it("should return a undefined", async () => {
        const weatherMissed = await insertAQ(null, pollutionMock, idZoneMock);
        const pollutionMissed = await insertAQ(weatherMock, null, idZoneMock);
        const idZoneMissed = await insertAQ(weatherMock, pollutionMock, null);
        const allMissed = await insertAQ();

        expect(weatherMissed).toBeUndefined();
        expect(pollutionMissed).toBeUndefined();
        expect(idZoneMissed).toBeUndefined();
        expect(allMissed).toBeUndefined();
      });
    });
    describe("- Inserting air quality with valid parameters", () => {
      it("should return the inserted values", async () => {
        const { newWeather, newPollution } = await insertAQ(
          weatherMock,
          pollutionMock,
          idZoneMock
        );

        expect(newWeather.idZone).toBe(idZoneMock);
        expect(newPollution.idZone).toBe(idZoneMock);
        console.log(newWeather.idZOne);
        newWeather.destroy();
        newPollution.destroy();
      });
    });
  });
  describe("Get date and time where Paris zone is most polluted query", () => {
    describe("- Passing a zone name other than Paris", () => {
      it("should return null", async () => {
        const zone = "Algeria";
        const paris = await getMostPolluted(zone);
        expect(paris.pollutionTime).toBeNull();
      });
    });
    describe("- Passing Paris as zone name", () => {
      it("should return an object with pollutionTime and zone name equal to paris", async () => {
        const zone = "Paris";
        const paris = await getMostPolluted(zone);
        expect(paris).toHaveProperty("pollutionTime");
        expect(paris.zones.zone).toBe("Paris");
      });
    });
  });
});
