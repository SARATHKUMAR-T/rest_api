"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({
    password: "P3DOr90vF17B0Ak9rphFGpfIvGPO2exj",
    socket: {
        host: "redis-13042.c264.ap-south-1-1.ec2.cloud.redislabs.com",
        port: 13042,
    },
});
