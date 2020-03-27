const request = require("supertest");

const server = require("../api/server");

describe("jokes router", function() {
  it("should display a list of dad jokes", function() {
    expect(true).toBe(true);
  });

  describe("GET /api/jokes ", function() {
    it("should return 200 OK", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return list of jokes", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    
  });
});
