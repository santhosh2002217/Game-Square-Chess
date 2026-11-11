const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const tournamentRoutes =
  require("./routes/tournamentRoutes");

const registrationRoutes =
  require("./routes/registrationRoutes");

const userRoutes =
  require("./routes/userRoutes");

const resultRoutes =
  require("./routes/resultRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");  


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Game Square Chess API is running",
  });
});


app.use(
  "/api/tournaments",
  tournamentRoutes
);


app.use(
  "/api/registrations",
  registrationRoutes
);


app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/results",
  resultRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});