require('dotenv').config();
var cors_proxy = require('cors-anywhere');

var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;

cors_proxy.createServer({
    originWhitelist: ['http://localhost:5173', 'https://microbe-one.vercel.app'], // Allow localhost origin
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
    handleInitialRequest: (req, res, location) => {
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
            });
            res.end();
            return true; // Prevent further request handling
        }
        return false; // Continue with the proxy request
    }
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
