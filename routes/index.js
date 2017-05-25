import express from 'express';
import fetch from 'node-fetch';
import API_KEY from '../api-key'; // import api key as spearate module so it can be ignored by git

const router = express.Router();

// set default options JSON format and only results with images
const API = `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&format=json&imgonly=True`;

// capture optional search term in route
router.get('/:searchTerm*?', (req, res) => {
  const searchTerm = req.params.searchTerm;

  return fetch(API + (searchTerm ? ('&q=' + searchTerm) : ''))
    .then(response => {
      // for local dev set cross origin to allow localhost
      res.set('Access-Control-Allow-Origin', 'http://localhost:3001');

      response
        .json()
        .then(data => {

          // construct response using only data used by client app
          res.json({
            count: data.count,
            artObjects: data.artObjects.map(artObject => ({
              title: artObject.title,
              imageURL: artObject.headerImage ? artObject.headerImage.url : '',
              pageURL: artObject.links.web
            })).sort((a, b) => { return a.title < b.title ? -1 : 1 }) // sort titles alphabetically
          });
        });
    });
});

export default router;
