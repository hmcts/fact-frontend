import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const app = express();

const data = require('./courts.json');
const port = 8080;


app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = (req.query.search as string).toUpperCase();
  const documents = [...data];
  const filteredDocs = documents.filter(doc => {
    if (doc['postcode'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        doc['address'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        doc['town_name'].toUpperCase().split(' ').indexOf(query) >= 0 ||
        doc['name'].toUpperCase().split(' ').indexOf(query) >= 0) {
      return true;
    }
  });
  res.json(filteredDocs);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
