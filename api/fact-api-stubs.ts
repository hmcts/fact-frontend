import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
const app = express();

const data = require('./courts.json');
const courtDetails = require('./court-details.json');
const servicesData = require('./services.json');
const moneyServiceAreasData = require('./moneyAreaOfLaw.json');
const familyServiceAreasData = require('./familyAreaOfLaw.json');
const childcareAndParentingServiceAreasData = require('./childcareAndParentingAreaOfLaw.json');
const moneyServiceData = require('./money-service-data.json');
const moneyClaimsData = require('./money-claims-data.json');
const serviceAreas = require('./service-areas.json');
const port = 8080;


app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = (req.query.q as string).toUpperCase();
  const courts = [...data];
  const filteredDocs = courts.filter(court => {
    if (court['postcode'].toUpperCase().indexOf(query) >= 0 ||
        court['address'].toUpperCase().indexOf(query) >= 0 ||
        court['townName'].toUpperCase().indexOf(query) >= 0 ||
        court['name'].toUpperCase().indexOf(query) >= 0) {
      return true;
    }
  });
  res.json(filteredDocs);
});

app.get('/courts/:slug', (req: Request, res: Response) => {
  const slug: string = (req.params.slug as string).toLowerCase();
  const courts = [...courtDetails];
  const court = courts.find(court => court.slug.toLowerCase() === slug);
  res.json(court);
});

app.get('/services', (req: Request, res: Response) => {
  res.json(servicesData);
});

app.get('/services/money/service-areas', (req: Request, res: Response) => {
  res.json(moneyServiceAreasData);
});

app.get('/services/money', (req: Request, res: Response) => {
  res.json(moneyServiceData);
});

app.get('/services/probate-divorce-ending-civil-partnerships/service-areas', (req: Request, res: Response) => {
  res.json(familyServiceAreasData);
});

app.get('/services/childcare-and-parenting/service-areas', (req: Request, res: Response) => {
  res.json(childcareAndParentingServiceAreasData);
});

app.get('/service-areas/money-claims', (req: Request, res: Response) => {
  res.json(moneyClaimsData);
});

app.get('/search/postcode', (req: Request, res: Response) => {
  const { postcode, serviceArea } = req.query;
  const serviceAreasData = [...serviceAreas];
  //backend should use mapit to determine the local authorities (council)
  console.log(postcode);
  const localAuthority = 'Haringey Borough Council';

  const serviceAreaObj = serviceAreasData.find(service => service.slug === serviceArea);
  let result = {};
  if (serviceAreaObj.serviceAreaType === 'Family') {
    result = serviceAreaObj.serviceAreaCourts.find((court: any) => court.catchmentType === 'regional' && court.localAuthority === localAuthority);
  }
  res.json(result);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
