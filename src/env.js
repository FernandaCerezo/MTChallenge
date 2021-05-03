import app from '../app.json';

const ENV = {
  dev: {
    API_URL: 'https://www.etnassoft.com/api/v1/get/?id=589&callback=?',
  },
};

function getEnvironment(env = '') {
  return ENV.dev;
}

export default getEnvironment(app.releaseChannel);
