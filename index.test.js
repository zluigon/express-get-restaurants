const request = require("supertest");
const app = require("./src/app");

const { execSync } = require("child_process");
execSync("npm run seed");

describe("restaurant routes", () => {
  test("GET", async () => {
    const respone = await request(app).get("/restaurants");
    const responseData = JSON.parse(respone.text);

    expect(respone.statusCode).toBe(200);
    expect(Object.prototype.toString.call(responseData)).toBe("[object Array]");
  });

  test("GET /:id", async () => {
    const response = await request(app).get("/restaurants/2");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "LittleSheep",
        location: "Dallas",
        cuisine: "Hotpot",
      })
    );
  });

  test("POST", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Cafe 37",
      location: "New Jersey",
      cuisine: "American",
    });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "Cafe 37",
        location: "New Jersey",
        cuisine: "American",
      })
    );
  });

  test("PUT", async () => {
    const response = await request(app).put("/restaurants/4").send({
      name: "Tofu House",
      cuisine: "Korean",
    });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "Tofu House",
        cuisine: "Korean",
      })
    );
  });

  test("DELETE", async () => {
    const response = await request(app).delete("/restaurants/4");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "Tofu House",
        cuisine: "Korean",
      })
    );
  });
});
