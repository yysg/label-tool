const proxy = require('http-proxy-middleware');

const mainPort = process.env.PORT || '3000';
const port = process.env.API_PORT || parseInt(mainPort, 10) + 1;
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: `http://ec2-52-53-200-7.us-west-1.compute.amazonaws.com:3001/`,
      changeOrigin: true,
    })
  );
  app.use(
    proxy('/uploads', {
      target: `http://ec2-52-53-200-7.us-west-1.compute.amazonaws.com:3001/`,
      changeOrigin: true,
    })
  );
};
