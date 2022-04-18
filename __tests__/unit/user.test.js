const bcrypt = require("bcryptjs");

const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  test("should encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "FVN3UUR398HIERNC2929ENF2NC",
    });

    const comparehash = await bcrypt.compare(
      "FVN3UUR398HIERNC2929ENF2NC",
      user.password_hash
    );
    expect(comparehash).toBe(true);
  }, 10000);
});
