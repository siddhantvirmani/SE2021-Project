export default function doAPI(suburb, numResults) {
    return new Promise((response, fail) => {
        var apikey1 = '2e466941fe314289af733fa47696b09c';
        var apikey2 = '39937d23b2784b3584ce3252c1c11e44';
        var Bing = require('node-bing-api')({ accKey: apikey1 });
        Bing.news(suburb, {
            count: numResults,
            market: 'en-AU',
            adult: 'Strict'
        }, function(error, res, body) {
            response(JSON.stringify(body,null,2))
        });
    });
}
