const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
  beforeEach(done => {
    this.advertisement;
    sequelize.sync({force: true}).then(response => {
      Advertisement.create({
        title: "Buy our widget",
        description: "On sale until Sunday"
      })
      .then(advertisement => {
        this.advertisement = advertisement;
        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
    });
  });

  describe("GET /advertisements", () => {
    it("should return a status code 200 and all advertisements", done => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain("Advertisement");
        done();
      });
    });
  });

  describe("GET /advertisements/new", () => {
    it("should render a new advertisement form", done => {
      request.get(`${base}new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("New Advertisement");
        done();
      });
    });
  });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new advertisement and redirect", done => {
      request.post(options, (error, response, body) => {
        console.log(body);
        Advertisement.findOne({where: {title: "blink-182 songs"}})
        .then(advertisement => {
          expect(response.statusCode).toBe(303);
          expect(advertisement.title).toBe("blink-182 songs");
          expect(advertisement.description).toBe("What's your favorite blink-182 song?");
          done();
        })
        .catch(error => {
          console.log(error);
          done();
        });
      });
    });

  });

  describe("GET /advertisements/:id", () => {
    it("should render a view with the selected advertisement", done => {
      request.get(`${base}${this.advertisement.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("On sale until Sunday");
        done();
      });
    });
  });

  describe("POST /advertisements/:id/destroy", () => {
    it("should delete the topic with the associated ID", done => {
      Advertisement.findAll()
      .then(advertisement => {
        const advertisementCountBeforeDelete = advertisement.length;

        expect(advertisementCountBeforeDelete).toBe(1);

        request.post(`${base}${this.advertisement.id}/destroy`, (error, response, body) => {
          Advertisement.findAll()
          .then(advertisement => {
            expect(error).toBeNull();
            expect(advertisement.length).toBe(advertisementCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /advertisement/:id/edit", () => {
    it("should render a view with an edit advertisement form", done => {
      request.get(`${base}${this.advertisement.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Edit Advertisement");
        expect(body).toContain("Buy our widget");
        done();
      });
    });
  });

  describe("POST /advertisements/:id/update", () => {
    it("should update the topic with the given values", done => {
      const options = {
        url: `${base}${this.advertisement.id}/update`,
        form: {
          title: "!!!",
          description: "!!!"
        }
      };

      request.post(options, (error, response, body) => {
        expect(error).toBeNull();

        Advertisement.findOne({
          where: { id: this.advertisement.id }
        })
        .then(advertisement => {
          expect(advertisement.title).toBe("!!!");
          done();
        })
      });



    });
  });
});
