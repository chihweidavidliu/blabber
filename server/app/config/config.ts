import config from './config.json';
const env = process.env.NODE_ENV || 'development'; // set the environment
import { IEnvConfig } from '../interfaces';

console.log('env -------', env);

export const setUpConfig = (): void => {
  if (env === 'development' || env === 'test') {
    const envConfig: IEnvConfig = config[env];

    Object.keys(envConfig).forEach(key => {
      // turn the envConfig object into an array of key names
      process.env[key] = envConfig[key]; // for each key, set process.env[key] to the value of that key (taken from envConfig object)
    });
  }
};
