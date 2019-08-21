const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((response) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
      })
//#3
    User.create({
      email: "starman@tesla.com",
      password: "Trekkie4lyfe"
      }).then(user => {
          this.user = user;

      Post.create({
        title: "Snowball Fighting",
        body: "So much snow!",
        topicId: this.topic.id,
        userId: this.user.id
      })
        .then(post => {
        this.post = post;
        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
      });

    });

  describe("#create()", () => {

       it("should create a post object with a title, body, and assigned topic", (done) => {
  //#1
         Post.create({
           title: "Pros of Cryosleep during the long journey",
           body: "1. Not having to answer the 'are we there yet?' question.",
           topicId: this.topic.id
         })
         .then((post) => {

  //#2
           expect(post.title).toBe("Pros of Cryosleep during the long journey");
           expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
           done();

         })
         .catch((error) => {
           console.log(error);
           done();
         });
       });

     });

     it("should not create a post with missing title, body, or assigned topic", (done) => {
        Post.create({
          title: "Pros of Cryosleep during the long journey"
        })
        .then((post) => {

         // the code in this block will not be evaluated since the validation error
         // will skip it. Instead, we'll catch the error in the catch block below
         // and set the expectations there

          done();

        })
        .catch((error) => {

          expect(error.message).toContain("Post.body cannot be null");
          expect(error.message).toContain("Post.topicId cannot be null");
          done();

        })
      });


      describe("#setTopic()", () => {

    it("should associate a topic and a post together", (done) => {

// #1
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {

// #2
        expect(this.post.topicId).toBe(this.topic.id);
// #3
        this.post.setTopic(newTopic)
        .then((post) => {
// #4
          expect(post.topicId).toBe(newTopic.id);
          done();

        });
      })
    });

  });

  describe("#getTopic()", () => {

    it("should return the associated topic", (done) => {

      this.post.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      });

    });

  });





});
