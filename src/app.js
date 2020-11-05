const express = require("express");
const config = require("config");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/about", require("./routes/about.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("PORT") || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}`));
  } catch (e) {
    console.log("Server error: ", e.message);
    process.exit(1);
  }
}

start();
