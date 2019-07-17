const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topic/";

const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db//models").Topics;

describe("routes : Topics", () => {

  beforeEach((done) => {
        this.topic;
        sequelize.sync({force: true}).then((response) => {

         Topics.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((topic) => {
            this.topic = topic;
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

  describe("GET /Topics/new", () => {

    it("should render a new Topics form", (done) => {
      request.get(`${base}new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("New Topics");
        done();
      });
    });
  });
  describe("POST /Topics/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new Topics and redirect", (done) => {

//#1
      request.post(options,

//#2
        (error, response, body) => {
          Topics.findOne({where: {title: "blink-182 songs"}})
          .then((topic) => {
            expect(response.statusCode).toBe(303);
            expect(Topics.title).toBe("blink-182 songs");
            expect(Topics.description).toBe("What's your favorite blink-182 song?");
            done();
          })
          .catch((error) => {
            console.log(error);
            done();
          });
        }
      );
    });
  });

  describe("GET /Topics/:id", () => {
  it("should render a view with the selected Topics", (done) => {
    request.get(`${base}${this.Topics.id}`, (error, response, body) => {
      expect(error).toBeNull();
      expect(body).toContain("JS Frameworks");
      done();
    });
  });
});

describe("POST /Topics/:id/destroy", () => {
  it("should delete the topic with the associated ID", (done) => {
//#1
    Topics.all()
    .then((topic) => {
//#2
      const topicCountBeforeDelete = Topics.length;
      expect(topicCountBeforeDelete).toBe(1);
//#3
      request.post(`${base}${this.Topics.id}/destroy`, (error, response, body) => {
        Topics.all()
        .then((topic) => {
          expect(error).toBeNull();
          expect(topic.length).toBe(topicCountBeforeDelete - 1);
          done();
        })
      });
    });
  });
});



});
