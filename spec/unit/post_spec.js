const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("Post", () => {

  beforeEach((done) => {
//#1 declare 2 variables, topic and post
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((response) => {

//#2 create topic
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3 create post
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
//#4 associate post and topic by setting topicId attribute on post object
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((error) => {
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



});
