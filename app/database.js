const { connect } = require("mongoose");
const { MONGODB_URI } = require("./config");

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

exports.createConnection = async () => {
  try {
    await connect(MONGODB_URI, mongooseConfig);
    console.log("mongodb database connected successfully");
  } catch (error) {
    console.log(`Error while connecting mongodb database ${error}`);
    process.exit(1);
  }
};
