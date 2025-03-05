const {logger} = require('./util/logger');
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let body = "";

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on("end", () => {
            body = body.length > 0 ? JSON.parse(body) : {};

            const contentType = {"Content-Type": "application/json"};

            if (req.url.startsWith("/items")){
                logger.info(req.url.split('/'));
                let index = parseInt(req.url.split("/")[2]);

                switch(req.method){
                    case "POST":
                        const {name, price} = body;
                        if (!name || !price){
                            res.writeHead(400, contentType);
                            res.end(
                                JSON.stringify({
                                    message: "Please provide a valid name and price"
                                })
                            )
                        }
                        else{

                            res.end(
                                JSON.stringify({
                                    message: "Item Added to List!",
                                    name,
                                    price
                                })
                            )
                        }
                }
            }
        })
});

server.listen(PORT, () => {
    logger.info(`Server is listening on http://localhost:${PORT}`);
});