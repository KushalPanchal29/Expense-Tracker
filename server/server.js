const Express = require("express")
const app = Express()
const cors = require("cors")

require("dotenv").config({ path : "./config.env"});
const port = process.env.PORT || 8000;

app.use(cors());
app.use(Express.json());

const connect = require("./db/connection.js")

app.use(require("./routes/route"));

connect.then(db => {
    if(!db) return process.exit(1);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    });   
    app.on("error", err => {
        console.log("Failed to connect with HTTP server")
    });
}).catch(err => {
    console.log(`Connection Failed...${err}`)
})

