const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;

    sequelize.sync({force: true}).then((response) => {
      Topic.create({
        title: "Sight seeing",
        description: "Where did your last road trip take you?"
      })
      .then((topic) => {
        this.topic = topic;

       Post.create({
           title: "Albuquerque",
           body: "I took a wrong turn",
           topicId: this.topic.id
         })
         .then((post) => {
           this.post = post;
           done();
         });
      })
        .catch(error => {
          console.log(error);
      });
   });
 });
describe("#create()", () => {
    it ("should create topic", done => {
      Topic.create({
        title: "Sample topic",
        description: "Just to test"
      })
      .then(topic => {
        expect(topic.title).toBe("Sample topic");
        expect(topic.description).toBe("Just to test");
        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
    });
  });
  describe("#getPosts()", () => {
    it("should retrieve the posts attached to the topic", done => {
      this.topic.getPosts()
      .then(associatedPosts => {
        expect(associatedPosts[0].title).toBe("Albuquerque");
        expect(associatedPosts[0].body).toBe("I took a wrong turn");

        done();
      })
      .catch(error => {
        console.log(error);
        done();
      });
    });
  });
})
