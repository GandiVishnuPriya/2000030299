var express = require('express');

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
//var router = express.Router();
var app = express();

const uniqSort = (arr = []) => {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
       if (!map[arr[i]]) {
          map[arr[i]] = true;
          res.push(arr[i]);
       };
    };
    return res.sort((a, b) => a - b);
 };

app.get('/', async function(req, res){   
  //var getUsers = router.get(req.query.url);
  let response = await fetch(req.query.url, {method: 'GET'})
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  response = await response;
response = {numbers: uniqSort(response.numbers)}
    res.status(200).json(response);
});

app.listen(3000);