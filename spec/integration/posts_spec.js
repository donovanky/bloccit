const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("routes : posts", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({
      force: true
    }).then((response) => {
      User.create({
          email: "starman@tesla.com",
          password: "Trekkie4lyfe"
        })
        .then((user) => {
          this.user = user;
          Topic.create({
              title: "Winter Games",
              description: "Post your Winter Games stories.",
              posts: [{
                title: "Snowball Fighting",
                body: "So much snow!",
                userId: this.user.id
              }]
            }, {
              include: {
                model: Post,
                as: "posts"
              }
            })
            .then((topic) => {
              this.topic = topic;
              this.post = topic.posts[0];
              done();
            })
        })
    });

  });

  describe("guest user performing CRUD actions for Post", () => {
    describe("Get /topics/:topicId/posts/:id", () => {

      it("should render a view of the selected post", (done) => {
        request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain("Snowball Fighting");
          done();
        });
      });
    });

  }); //end of guest

  //start of member: show, new, createdAt
  describe("member performing CRUD actions for post", () => {
    beforeEach((done) => {
      User.create({
        email: "user@example.com",
        password: "123456",
        role: "member"
      }).then((user) => {
        request.get({
            url: "http://localhost:3000/auth/fake",
            form: {
              role: user.role,
              userId: user.id,
              email: user.email
            }
          },
          (error, response, body) => {
            done();
          }
        );
      });
    });
    // new
    describe("GET /topics/:topicId/posts/new", () => {
      it("should render a new post form", (done) => {
        request.get(`${base}/${this.topic.id}/posts/new`, (error, response, body) => {
          expect(error).toBeNull();
          expect(body).toContain("New Post");
          done();
        });
      });
    });


    //update
    describe("POST /topics/:topicId/posts/:id/update", () => {

      it("should return a status code 302", (done) => {
        request.post({
          url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
          form: {
            title: "Snowman Building Competition",
            body: "I love watching them melt slowly."
          }
        }, (error, response, body) => {
          expect(response.statusCode).toBe(302);
          done();
        });
      });
      it("should update the post with the given values", (done) => {
        const options = {
          url: `${base}/${this.topic.id}/posts/${this.post.id}/update`,
          form: {
            title: "Snowman Building Competition",
            body: "I really enjoy the funny hats on them."
          }
        };
        request.post(options,
          (error, response, body) => {
            expect(error).toBeNull();
            Post.findOne({
                where: {
                  id: this.post.id
                }
              })
              .then((post) => {
                expect(post.title).toBe("Snowman Building Competition");
                done();
              });
          });
      });
    });


    //create
    describe("POST /topics/:topicId/posts/create", () => {

      it("should create a new post and redirect", (done) => {
        const options = {
          url: `${base}/${this.topic.id}/posts/create`,
          form: {
            title: "Watching snow melt",
            body: "Without a doubt my favorite thing to do besides watching paint dry!"
          }
        };
        request.post(options, (error, response, body) => {
          Post.findOne({
              where: {
                title: "Watching snow melt"
              }
            })
            .then((post) => {
              expect(post).not.toBeNull();
              expect(post.title).toBe("Watching snow melt");
              expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
              expect(post.topicId).not.toBeNull();
              done();
            })
            .catch((error) => {
              console.log(this.topic.id)
              done();
            });
        });
      });


      it("should not create a new post that fails validations", (done) => {
        const options = {
          url: `${base}/${this.topic.id}/posts/create`,
          form: {

            title: "a",
            body: "b"
          }
        };

        request.post(options, (error, response, body) => {
          Post.findOne({
              where: {
                title: "a"
              }
            })
            .then((post) => {
              expect(post).toBeNull();
              done();
            })
            .catch((error) => {
              console.log(error)
              done();
            });
        });
      });
    });

    describe("POST /topics/:topicId/posts/:id/destroy", () => {
      it("should delete the post with the associated ID", (done) => {
        expect(post.id).toBe(1);
        request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (error, response, body) => {
          Post.findByPk(1)
            .then((post) => {
              expect(error).toBeNull();
              expect(post).toBeNull();
              done();
            })
        });
      });
    });

  });

  //show
  describe("GET /topics/:topicId/posts/:id", () => {

    it("should render a view with the selected post", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Snowball Fighting");
        done();
      });
    });
  });

  describe("GET /topics/:topicId/posts/:id/edit", () => {
    it("should render a view with an edit post form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/edit`, (error, response, body) => {
        expect(error).toBeNull();
        expect(body).toContain("Edit Post");
        expect(body).toContain("Snowball Fighting");
        done();
      });
    });
  });



});
