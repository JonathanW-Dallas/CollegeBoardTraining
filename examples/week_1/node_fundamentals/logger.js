const { createLogger, transports, format} = require("winston");

// import {createLogger, transports, format} from "winston";

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}]: ${message}`
        })
    ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({filename: 'somefile.log'})
    ]
});


// logger.info("Hello!");

// module.exports = {
//     logger
// }




// let firstName = "brian";

// let object = {
//     firstName
// }


// function sayHello(){
//     console.log("Hello");
// }

// sayHello();

// const sayHello2 = function (){console.log("Hello")};

// sayHello2();

// const sayHello3 = () => {
//     let hello = "hello";
//     console.log(hello);
// }

// const addition = (x, y) => x + y;

// const square = x => x * x;
