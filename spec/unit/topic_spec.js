/*const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models".User);

describe("Topic", () => {
console.log("We entered Topic_spec");

  beforeEach((done) => {
    console.log("We entered before each");
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((response) => {
      console.log("WE ENTERED THE TEST");
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;
      })

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system",

      posts: [{
         title: "My first visit to Proxima Centauri b",
         body: "I saw some rocks.",
         userId: this.user.id
       }]
     }, {

     include: {
         model: Post,
         as: "posts"
       }
     })
     .then((topic) => {
     console.log("WE GOT THIS FAR");
     this.topic = topic; //store the topic
     this.post = topic.posts[0]; //store the post
     done();
     })
   })
 });
});
*/
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

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
