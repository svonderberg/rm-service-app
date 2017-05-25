import express from 'express';
import fetch from 'node-fetch';
import API_KEY from '../api-key';

const router = express.Router();
const API = `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&format=json&imgonly=True`;

router.get('/:searchTerm*?', (req, res) => {
  const searchTerm = req.params.searchTerm;

  return fetch(API + (searchTerm ? ('&q=' + searchTerm) : ''))
    .then(response => {
      res.set('Access-Control-Allow-Origin', 'http://localhost:3001');

      response
        .json()
        .then(data => {
          res.json(data);
        });
    });
});

export default router;
