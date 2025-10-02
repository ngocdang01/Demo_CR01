require("dotenv").config();

mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("kết nối database thành công");
  })
  .catch((error) => {
    console.error("Không thể kết nối MongoDB:", error);
  });

// Export mongoose connection
module.exports = mongoose;
