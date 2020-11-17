import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { calculateDistance } from './utils';
const app = express();

const data = require('./courts.json');
const courtDetails = require('./court-details.json');
const servicesData = require('./services.json');
const moneyServiceAreasData = require('./moneyAreaOfLaw.json');
const familyServiceAreasData = require('./familyAreaOfLaw.json');
const childcareAndParentingServiceAreasData = require('./childcareAndParentingAreaOfLaw.json');
const moneyServiceData = require('./money-service-data.json');
const serviceAreas = require('./service-areas.json');
const port = 8080;

const getServiceArea = (serviceArea: string) => {
  return serviceAreas.find((service: any) => service.slug === serviceArea);
};

app.use(bodyParser.json());

app.get('/courts', (req: Request, res: Response) => {
  const query: string = (req.query.q as string).toUpperCase();
  const courts = data;
  const filteredDocs = courts.filter((court: any) => {
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
  const court = courtDetails.find((court: any) => court.slug.toLowerCase() === slug);
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

app.get('/service-areas/:serviceArea', (req: Request, res: Response) => {
  const serviceArea: string = (req.params.serviceArea as string);
  const serviceAreaObj = getServiceArea(serviceArea);
  res.json(serviceAreaObj);
});

app.get('/search/results', (req: Request, res: Response) => {
  const { postcode, serviceArea } = req.query;
  console.log(postcode, serviceArea);
  const serviceAreaObj = getServiceArea(serviceArea as string);
  const lan = 1;
  const lon = 1;
  const courts = [...courtDetails];
  const distanceSortedCourt = courts.sort((court, court2) => {
    return calculateDistance(lan, lon, court) - calculateDistance(lan, lon, court2);
  });
  const filteredDocs = distanceSortedCourt.filter(court => {
    for (const areaOfLaw of court['areas_of_law']) {
      if (areaOfLaw.name === serviceAreaObj.areaOfLawName) {
        return court;
      }
    }
  });
  const mappedCourts = filteredDocs.slice(0, 10).map(courts => {
    return {
      name: courts.name,
      slug: courts.slug,
      distance: courts.distance
    };
  });

  const results = {
    name: serviceAreaObj.name,
    onlineText: serviceAreaObj.onlineText,
    onlineUrl: serviceAreaObj.onlineUrl,
    courts: mappedCourts
  };
  res.json(results);
});

app.listen(port, () => {
  console.log(`Application started: http://localhost:${port}`);
});
