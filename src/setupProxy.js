const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const PLAYOFF_URL= "https://playoffapi.funstufftech.com"

  app.use(
    '/officials',
    createProxyMiddleware({
      target: PLAYOFF_URL,
      changeOrigin: true,
      securet: false
    })
  );
 
  app.use(
    '/history/*',
    createProxyMiddleware({
      target: PLAYOFF_URL,
      changeOrigin: true,
      securet: false
    })
  );
};