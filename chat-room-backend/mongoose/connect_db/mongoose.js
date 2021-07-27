const mongoose = require("mongoose");

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/chat-room", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
