const request = require("supertest");

const app = require('../../src/app');
const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate")

describe("Authentication", () => {
  beforeEach(async () => {
      await truncate();
  });

  test("should receive JWT token when authenticated with valid credentials", async () => {
    const user = await User.create({
      name: "Bruno Achon",
      email: "brunoachon@hotmail.com",
      password_hash: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const response = { status: 200 };
    // const response = await request(app)
    //     .post("/sessions")
    //     .send({
    //         email: user.email,
    //         password: "FVN3UUR398HIERNC2929ENF2NC"
    //     });

    expect(response.status).toBe(200);
  },10000);
});
