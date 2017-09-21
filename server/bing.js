import express from 'express';
import bing from 'node-bing-api';

const router = express.Router();

// Example Call... http://localhost:3001/bing/search?suburb=hurstville&num=10
router.get('/search', (req, res) => {
  const suburb = req.query.suburb;
  const numResults = req.query.num;

  if (!suburb || !numResults) {
    res.send("Error: Invalid Parameters");
    return;
  }

  const apikey1 = '2e466941fe314289af733fa47696b09c';
  const apikey2 = '39937d23b2784b3584ce3252c1c11e44';
  bing({ accKey: apikey1 }).news(suburb, {
    count: numResults,
    market: 'en-AU',
    adult: 'Strict'
  }, (error, data, body) => {
    if (error)
      res.send("Error: " + error);
    else {
      const results = [];
      for (const article of body['value']) {
        var result = {
            name:        article['name'],
            url:         article['url'],
            description: article['description'],
            publishDate: article['datePublished'],
            provider:    article['provider'][0]['name']
        }
        if (article['image']) {
          result.image = article['image']['thumbnail']; // provides url,width,height
          result.actualImage = article['image'];
        }
        results.push(result);
      }
      res.json(results);
    }
  });
});

export default router;