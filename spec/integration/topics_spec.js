const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/Topics/";

const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db//models").Topics;

describe("routes : Topics", () => {

  beforeEach((done) => {
        this.Topics;
        sequelize.sync({force: true}).then((response) => {

         Topics.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((Topics) => {
            this.Topics = Topics;
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
        });
      });
  describe("GET /Topics", () => {
    it("should return a status code 200 and all Topics", (done) => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

});
