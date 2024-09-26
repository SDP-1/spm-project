const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routers/taskRoutes");
const projectRoutes = require('./routers/projectRoutes'); 
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const githubRoutes = require('./routers/githubRoutes');


app.use(cors());
app.use(express.json());
app.use('/api/github', githubRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (you may want to restrict this in production)
  },
});

const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://avindiobeyesekere:HrKnOaKiVN7BlAeQ@cluster0.edwkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const MONGO_URI = process.env.MONGO_URI ;

mongoose
  .connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));

// Emit a message when a new item is added
app.use("/api", taskRoutes);
app.use('/api/projects', projectRoutes); 


// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });


io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
