const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://avindiobeyesekere:HrKnOaKiVN7BlAeQ@cluster0.edwkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
