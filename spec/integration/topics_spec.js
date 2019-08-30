const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

function authorizeUser(role, done) {
  //helper function

  User.create({
    email: `#{role}@example.com`,
    password: "123456",
    role: role
  })
  .then((user) => {
    request.get({ //mock authentication
    url: "http://localhost:3000/auth/fake",
    form: {
      role: user.role, //mock user dropTable
      userId: user.id,
      email: user.email
    }
  },
  (error, response, body) => {
    done();
  }
);
});
}

describe("routes : topics", () => {
  beforeEach(done => {
    this.topic;
    sequelize.sync({force: true}).then(() => {
      Topic.create({
        title: "JS Frameworks",
        description: "There is a lot of them"
      })
      .then(topic => {
        this.topic = topic;
        done();
      })
      .catch(error => {
        done();
      });
    });
  });

  describe("admin user performing CRUD actions for Topic", () => {

    beforeEach((done) => {
      User.create({
        email: "admin@example.com",
        password: "123456",
        role: "admin"
      })
      .then((user) => {
        request.get({         // mock authentication
          url: "http://localhost:3000/auth/fake",
          form: {
            role: user.role,     // mock authenticate as admin user
            userId: user.id,
            email: user.email
          }
        },
          (err, res, body) => {
            done();
          }
        );
      });
    });

  describe("GET /topics", () => {
    it("should return a status code 200 and all topics", done => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("GET /topics/new", () => {
    it("should render a new topic form", done => {
      request.get(`${base}new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("New Topic");
        done();
      });
    });
  });

  describe("POST /topics/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new topic and redirect", done => {
      request.post(options, (error, response, body) => {
        Topic.findOne({where: {title: "blink-182 songs"}})
        .then(topic => {
          expect(response.statusCode).toBe(303);
          expect(topic.title).toBe("blink-182 songs");
          expect(topic.description).toBe("What's your favorite blink-182 song?");
          done();
        })
        .catch(error => {
          done();
        });
      });
    });
  });

  it("should not create a new post that fails validations", (done) => {
    const options = {
      url: `${base}create`,
      form: {
        title: "ab",
        body: "bc"
      }
    };
    request.post(options,
      (error, response, body) => {
        Topic.findOne({where: {title: "ab"}})
        .then((topic) => {
            expect(topic).toBeNull();
            done();
        })
        .catch((error) => {
          done();
        });
      }
    );
  });



  describe("GET /topics/:id", () => {
    it("should render a view with the selected topic", done => {
      request.get(`${base}${this.topic.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /topics/:id/destroy", () => {
    it("should delete the topic with the associated ID", done => {
      Topic.findAll()
      .then(topics => {
        const topicCountBeforeDelete = topics.length;

        expect(topicCountBeforeDelete).toBe(1);

        request.post(`${base}${this.topic.id}/destroy`, (error, response, body) => {
          Topic.findAll()
          .then(topics => {
            expect(error).toBeNull();
            expect(topics.length).toBe(topicCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /topics/:id/edit", () => {
    it("should render a view with an edit topic form", done => {
      request.get(`${base}${this.topic.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Edit Topic");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /topics/:id/update", () => {

    it("should update the topic with the given values", done => {
      const options = {
        url: `${base}${this.topic.id}/update`,
        form: {
          title: "JavaScript Frameworks",
          description: "There are a lot of them"
        }
      };
      request.post(options, (error, response, body) => {
        expect(error).toBeNull();
        Topic.findOne({
          where: { id: this.topic.id }
        })
        .then(topic => {
          expect(topic.title).toBe("JavaScript Frameworks");
          done();
        })
      });
    });

describe ("member user performing CRUD actions for Topic", () => {
  beforeEach((done) => {
    request.get({
      url: "http://localhost:3000/auth/fake",
      form: {
        role: "member"
      }
    },
    (error, response, body) => {
      done();
    }
  );
});



  describe("GET /topics", () => {
    it("should return a status code 200 and all topics", done => {
      request.get(base, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(error).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("GET /topics/new", () => {
    it("should render a new topic form", done => {
      request.get(`${base}new`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("New Topic");
        done();
      });
    });
  });

  describe("POST /topics/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new topic and redirect", done => {
      request.post(options, (error, response, body) => {
        Topic.findOne({where: {title: "blink-182 songs"}})
        .then(topic => {
          expect(response.statusCode).toBe(303);
          expect(topic.title).toBe("blink-182 songs");
          expect(topic.description).toBe("What's your favorite blink-182 song?");
          done();
        })
        .catch(error => {
          done();
        });
      });
    });
  });

  it("should not create a new post that fails validations", (done) => {
    const options = {
      url: `${base}create`,
      form: {
        title: "ab",
        body: "bc"
      }
    };
    request.post(options,
      (error, response, body) => {
        Topic.findOne({where: {title: "ab"}})
        .then((topic) => {
            expect(topic).toBeNull();
            done();
        })
        .catch((error) => {
          done();
        });
      }
    );
  });

  describe("GET /topics/:id", () => {
    it("should render a view with the selected topic", done => {
      request.get(`${base}${this.topic.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /topics/:id/destroy", () => {
    it("should delete the topic with the associated ID", done => {
      Topic.findAll()
      .then(topics => {
        const topicCountBeforeDelete = topics.length;

        expect(topicCountBeforeDelete).toBe(1);

        request.post(`${base}${this.topic.id}/destroy`, (error, response, body) => {
          Topic.findAll()
          .then(topics => {
            expect(error).toBeNull();
            expect(topics.length).toBe(topicCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("GET /topics/:id/edit", () => {
    it("should render a view with an edit topic form", done => {
      request.get(`${base}${this.topic.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Edit Topic");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /topics/:id/update", () => {

    it("should update the topic with the given values", done => {
      const options = {
        url: `${base}${this.topic.id}/update`,
        form: {
          title: "JavaScript Frameworks",
          description: "There are a lot of them"
        }
      };
      request.post(options, (error, response, body) => {
        expect(error).toBeNull();
        Topic.findOne({
          where: { id: this.topic.id }
        })
        .then(topic => {
          expect(topic.title).toBe("JavaScript Frameworks");
          done();
        })
      });
    });
  })


  });
});
