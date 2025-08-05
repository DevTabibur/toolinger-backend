import whois from 'whois-json';

export const getDomainAge = async (domain: string): Promise<number | any> => {
  try {
    // const result = await whois(domain);
    // const creationDate = new Date(result?.creationDate || result.createdDate);
    // const now = new Date();
    // const ageInYears = (now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    // return Math.floor(ageInYears);
  } catch (error) {
    return 0; // if failed, assume new domain
  }
};
