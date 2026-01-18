const express = require("express");
const app = express();
const port = 8080;

const contactsRoutes = require("./routes/contacts");

app.use(express.json());

app.use("/v1/contacts", contactsRoutes);

app.get("/", (req, res) => {
  res.send("API is running. Go to /v1/contacts");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
