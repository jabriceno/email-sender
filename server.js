const Express = require("express");
const app = Express();

// Body Parser
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use("/api/email", require("./src/routes/email"));

// Server Setup
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
