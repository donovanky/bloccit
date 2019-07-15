const Topics = require("./models").Topics;

module.exports = {

//#1
  getAllTopics(callback){
    return Topics.all()

//#2
    .then((Topics) => {
      callback(null, Topics);
    })
    .catch((error) => {
      callback(error);
    })
  }
}
