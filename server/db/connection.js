const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect(process.env.ATLAS_URI)
        .then(db => {
            console.log("Database Connected.");
            return db;
        }).catch(err => {
            console.error("Error with database connection:");
        });

module.exports = connect;
