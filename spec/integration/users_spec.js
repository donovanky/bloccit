const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({
        force: true
      })
      .then(() => {
        done();
      })
      .catch((error) => {

        done();
      });

  });

    describe("GET /users/sign_up", () => {

      it("should render a view with a sign up form", (done) => {
        request.get(`${base}sign_up`, (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain("Sign up");
          done();
        });
      });
    });

  describe("POST /users", () => {

    // #1
    it("should create a new user with valid values and redirect", (done) => {

      const options = {
        url: base,
        form: {
          email: "user@example.com",
          password: "123456789"
        }
      }

      request.post(options,
        (error, response, body) => {

          // #2
          User.findOne({
              where: {
                email: "user@example.com"
              }
            })
            .then((user) => {
              expect(user).not.toBeNull();
              expect(user.email).toBe("user@example.com");
              expect(user.id).toBe(1);
              done();
            })
            .catch((error) => {

              done();
            });
        }
      );
    });

    // #3
    it("should not create a new user with invalid attributes and redirect", (done) => {
      request.post({
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (error, response, body) => {
          User.findOne({
              where: {
                email: "no"
              }
            })
            .then((user) => {
              expect(user).toBeNull();
              done();
            })
            .catch((error) => {

              done();
            });
        }
      );
    });
  });

  describe("GET /users/sign_in", () => {

    it("should render a view with a sign in form", (done) => {
      request.get(`${base}sign_in`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });
  });



});
