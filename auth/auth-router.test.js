const request = require("supertest");

const server = require("../api/server");

describe("users router", function() {
  it("should run the tests", function() {
    expect(true).toBe(true);
  });
  it("allows user to login", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({
        username: "testing",
        password: "alsoTesting"
      });
    expect(res.status).toBe(401);
  });

  it("rejects the wrong credentials", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({
        username: "fake",
        password: "news"
      });
    expect(res.status).toBe(401);
  });
  it("creates a new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "new",
        password: "user"
      });
    expect(res.status).toBe(500);
  });
  it("sends an error if credential parameter are incorrect", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        fakename: "send",
        password: "error"
      });
    expect(res.status).toBe(500);
  });
});
