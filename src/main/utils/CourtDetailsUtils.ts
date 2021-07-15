import {AdditionalLink} from '../interfaces/CourtDetailsData';

export const decideCatchmentArea = (regionalCentre: boolean, area: { area1: string; area2: string }): string => {
  return regionalCentre ? area.area1 : area.area2;
};

export const formatAreasOfLaw = (areasOfLaw: any[]): string => {
  let output = '';

  areasOfLaw.forEach((areaOfLaw: any, index) => {
    const { name, 'display_name': displayName } = areaOfLaw;
    output += displayName !== null ? displayName : name;

    if(areasOfLaw.length-1 - index > 1) {
      output += ', ';
    } else if (areasOfLaw.length-1 - index === 1) {
      output += ' and ';
    }
  });

  return output.toLowerCase();
};

export const filterByDescription = (contacts: any[], filter: string[]): any[] => {
  return contacts.filter((contact) => filter.includes(contact.description.toLowerCase()));
};

export const filterAdditionalLinks = (additionalLinks: AdditionalLink[], sidebarLocation: string): AdditionalLink[] => {
  return additionalLinks.filter(link => link.location === sidebarLocation);
};
