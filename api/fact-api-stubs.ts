import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const app = express();

const data = require('./courts.json');
const port = 8080;


app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = req.query.search as string;
  const documents = [...data];
  const filteredDocs = documents.filter(doc => {
    if (doc['postcode'].toUpperCase() === query.toUpperCase() ||
        doc['address'].toUpperCase().includes(query.toUpperCase()) ||
        doc['town_name'].toUpperCase().includes(query.toUpperCase()) ||
        doc['name'].toUpperCase().includes(query.toUpperCase())) {
      return true;
    }
  });
  res.json(filteredDocs);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
