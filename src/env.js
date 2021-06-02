//API class
import app from '../app.json';

const ENV = {
  dev: {
    API_URL: 'https://api.thedogapi.com/v1',
  },
};

function getEnvironment(env = '') {
  return ENV.dev;
}

export default getEnvironment(app.releaseChannel);
