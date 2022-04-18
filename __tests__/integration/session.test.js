const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  test("should authenticated with valid credentials", async () => {
    const user = await factory.create("User", {
      // sobrepoe a senha do factory para comparação
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    expect(response.status).toBe(200);
  }, 10000);

  test("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "SVN3UUR398HIERNC21314DSFSS",
    });

    expect(response.status).toBe(401);
  }, 10000);

  test("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    expect(response.body).toHaveProperty("token");
  }, 10000);

  test("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  }, 10000);

  test("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  }, 10000);

  test("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer SJDNCSKJDNCKSJDIUEYR7232323ESDC`);

    expect(response.status).toBe(401);
  }, 10000);
});
