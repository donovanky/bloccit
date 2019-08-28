const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;


describe("routes : posts", () => {
  beforeEach(done => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({ force: true }).then(response => {

             User.create({
               email: "starman@tesla.com",
               password: "Trekkie4lyfe"
             })
             .then((user) => {
               this.user = user; //store the user

               Topic.create({
                 title: "Expeditions to Alpha Centauri",
                 description: "A compilation of reports from recent visits to the star system.",
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
                 this.topic = topic; //store the topic
                 this.post = topic.posts[0]; //store the post
                 done();
               })
             })
           });
         });


       });

       describe("#createPost()", () => {
         it("should create a post object with a title, body, and assigned topic and user", (done) => {
           Post.create({
             title: "Pros of Cryosleep during the long journey",
             body: "1. Not having to answer the 'are we there yet?' question.",
             topicId: this.topic.id,
             topicId: this.topic.id, //does this really need two topicId? I DOUBT IT
             userId: this.user.id
           })
           .then((post) => {
             expect(post.title).toBe("Pros of Cryosleep during the long journey");
             expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
             expect(post.topicId).toBe(this.topic.id);
             expect(post.userId).toBe(this.user.id);
             done();

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
