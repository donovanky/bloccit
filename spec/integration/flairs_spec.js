const request = require("request");
const server = require("../../src/server");
const base = `http://localhost:3000/topics`;

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((response) => {

      Topic.create({
        title: "How to implement flairs",
        description: "It is pretty similar to implementing posts."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Where's the potatoes",
          body: "Thats pretty vague OP!",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;

          Flair.create({
            name: "Helpful",
            color: "Green",
            postId: this.post.id
          })
          .then(flair => {
            this.flair = flair;
          done();
          });
        });
      });
    });
  });
    describe("GET /posts/:postId/flairs/new", () => {

      it("should render a new flair form", (done) => {
        request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain("New Flair");
          done();
        });
      });
    });

    describe("POST /posts/:postId/flairs/create", () => {

       it("should create a new post and redirect", (done) => {
          const options = {
            url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
            form: {
              name: "Base flair",
              color: "blue"
            }
          };
          request.post(options,
            (error, response, body) => {

              Flair.findOne({where: {name: "Base flair"}})
              .then((flair) => {
                expect(flair).not.toBeNull();
                expect(flair.name).toBe("Base flair");
                expect(flair.color).toBe("blue");
                expect(flair.postId).not.toBeNull();
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

    describe("GET /topics/:topicId/posts/:id", () => {

      it("should render a view with the selected flair", (done) => {
        request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}`, (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain("Helpful");
          done();
        });
      });
    });

    describe("GET /topics/:topicId/posts/:id/edit", () => {
       it("should render a view with an edit post form", (done) => {
         request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/edit`, (error, response, body) => {
           expect(error).toBeNull();
           expect(body).toContain("Edit Flair");
           expect(body).toContain("Helpful");
           done();
         });
       });
     });

     describe("POST /posts/:postId/flairs/:id/destroy", () => {
        it("should delete the flair with the associated ID", (done) => {
          expect(this.flair.id).toBe(1);
          request.post(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/destroy`, (error, response, body) => {
            Flair.findByPk(1)
            .then((flair) => {
              expect(error).toBeNull();
              expect(flair).toBeNull();
              done();
            })
          });
        });
      });

    describe("POST /posts/:postId/flairs/:id/update", () => {
        it("should return a status code 302", (done) => {
          request.post({
            url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
            form: {
              name: "Helpful",
              color: "green"
            }
          }, (error, response, body) => {
            expect(response.statusCode).toBe(302);
            done();
          });
        });

        it("should update the flair with the given values", (done) => {
            const options = {
              url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
              form: {
                name: "Unhelpful",
                color: "blue"
              }
            };
            request.post(options,
              (error, response, body) => {
              expect(error).toBeNull();
              Flair.findOne({
                where: {id: this.flair.id}
              })
              .then((flair) => {
                expect(flair.name).toBe("Unhelpful");
                done();
              });
            });
          });
        });




  });
