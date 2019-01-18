const Http = require('http');
const app = require('../app.js');

const server = Http.createServer(app);

// Getting the port from the process environment or use 3000
const port = process.env.PORT || 8080;


server.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});

server.on('error', onError)

// Error handling on Server start

function onError(error) {
    if (err.code == "EADDRINUSE") {
        console.error(`${port} : Already in use. Try again after some time..`);
        return;

    }
    console.error(err);
}
