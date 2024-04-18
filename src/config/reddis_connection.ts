import { createClient } from "redis";

export const redisClient = createClient({
  password: "P3DOr90vF17B0Ak9rphFGpfIvGPO2exj",
  socket: {
    host: "redis-13042.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 13042,
  },
});
