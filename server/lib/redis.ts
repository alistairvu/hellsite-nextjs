import { promisify } from 'util';
import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
  console.log('Redis connected!');
});

export const setAdd = promisify(client.sadd).bind(client);
export const setIsMember = promisify(client.sismember).bind(client);
export const setRemove = promisify(client.srem).bind(client);

export default client;
