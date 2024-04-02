// const express = require('express')
// const path = require("path");
// const app = express();
// app.use(express.static("build"));
// app.get("*", (req, res) => res.sendFile(path.resolve("build/index.html")));
// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log('Press Ctrl+C to quit.');
// });

const express = require('express');
const path = require("path");
const app = express();

let server;

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.resolve("build/index.html")));

// Endpoint to receive shutdown signal from client
app.post("/shutdown", (req, res) => {
    console.log('Received shutdown signal from client.');
    res.send('Server shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0); // Exit the Node.js process
    });
});

const PORT = process.env.PORT || 7000;
server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
