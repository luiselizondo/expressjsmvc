var app = require("../../app");
var controller = require("./controllers");

app.get("/api/users/:id", controller.getUser);
app.get("/api/users", controller.getUsers);
app.post("/api/users", controller.postUser);