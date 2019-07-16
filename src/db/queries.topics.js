const Topics = require("./models").Topics;

module.exports = {

//#1
  getAllTopics(callback){
    console.log("getAllTopics(callback) is called");
    return Topics.all()

//#2
    .then((Topics) => {
      callback(null, Topics);
    })
    .catch((error) => {
      console.log(error);
      callback(error);
    })
  }
}
