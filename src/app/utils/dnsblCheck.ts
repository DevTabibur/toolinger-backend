import dns from "dns/promises";

const dnsblServers = [
  "dnsbl-1.uceprotect.net",
  "dnsbl-2.uceprotect.net",
  "dnsbl-3.uceprotect.net",
  "dnsbl.dronebl.org",
  "dnsbl.sorbs.net",
  "spam.dnsbl.sorbs.net",
  "bl.spamcop.net",
  "recent.dnsbl.sorbs.net",
  "all.spamrats.com",
  "b.barracudacentral.org",
  "bl.blocklist.de",
  "bl.mailspike.org",
  "cblplus.anti-spam.org.cn",
  "dnsbl.anticaptcha.net",
  "ip.v4bl.org",
  "fnrbl.fast.net",
  "dnsrbl.swinog.ch",
  "mail-abuse.blacklist.jippg.org",
  "spam.abuse.ch",
  "spamsources.fabel.dk",
  "virbl.dnsbl.bit.nl",
  "cbl.abuseat.org",
  "dnsbl.justspam.org",
  "zen.spamhaus.org"
];

export const checkBlacklist = async (ip: string) => {
  const reversedIp = ip.split(".").reverse().join(".");

  const results = await Promise.allSettled(
    dnsblServers.map(async (server) => {
      const query = `${reversedIp}.${server}`;
      try {
        await dns.resolve4(query); 
        return { server, listed: true };
      } catch {
        return { server, listed: false };
      }
    })
  );

  const formattedResults = results
    .filter((r) => r.status === "fulfilled")
    .map((r: any, i) => ({
      server: dnsblServers[i],
      status: r.value.listed ? "Listed" : "Not Listed",
    }));

  const isListed = formattedResults.some((r) => r.status === "Listed");

  return {
    ip,
    overall: isListed ? "Listed" : "Not Listed",
    blacklistStatus: formattedResults,
  };
};
