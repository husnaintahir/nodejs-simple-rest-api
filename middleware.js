let jwt = require('jsonwebtoken');
const url = require('url');

let checkAuthToken = (req, res, next) => {
  const parsedUrl = url.parse(req.url, true);
  const urlPath = parsedUrl.pathname;

  // POST
  const publicEndpoints = [
    '/users/authenticate',
    '/users/register'
  ];
  // only GET request
  const authFreeEndpoints = [
    '/'
  ];




  // console.log('### urlPtah ', urlPath);
  // console.log('### req.method.toUpperCase ', req.method.toUpperCase());
  const reqMethod = req.method.toUpperCase();

  if (publicEndpoints.includes(urlPath) || (authFreeEndpoints.includes(urlPath) && reqMethod !== 'POST' && reqMethod !== 'PUT')) {
    // No authentication required
    next();
  } else {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if (err) {
          return res.json({
            "statusCode": 404,
            "error": 'invalid auth token provided',
            "response": null
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        "statusCode": 400,
        "error": 'Auth token required',
        "response": null
      });
    }
  }
};

module.exports = {
  verifyAuthToken: checkAuthToken
}
