import express from "express";

const app = express();
const port = 3000;

app.get("/", (res, req) => {
  res.setEncoding("Hello from Express with Es Modules");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
