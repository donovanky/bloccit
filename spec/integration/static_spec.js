const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000';

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", () => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");
      });
    });
  });
  describe("GET /about", () => {
    it("should contain the string 'About Us'", () => {
      request.get(base + "/about", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
      });
    });
  });
  describe("GET /marco", () => {
    it("should return status code 200", done => {
      request.get(base + "/marco", (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('polo');
        done();
      });
    });
  });
});
