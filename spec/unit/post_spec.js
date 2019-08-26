const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("routes : posts", () => {
  beforeEach(done => {
    this.topic;
    this.post;

    sequelize.sync({ force: true }).then(response => {
      //#1
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      }).then(topic => {
        this.topic = topic;
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
    });
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
