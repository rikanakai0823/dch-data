const fetch = require("node-fetch");
const {
  uaString,
  upstreamApiDomain,
  upstreamApiPath,
  upstreamOriginDomain,
} = require("./config");

const fetchMeta = (path, payload) => {
    const url = `https://${upstreamApiDomain}${upstreamApiPath}${path}`;
    return fetch(url, {
      method: 'post',
      headers: {
        'user-agent': uaString,
        'origin': `https://${upstreamOriginDomain}`,
        'authority': upstreamApiDomain,
        'referer': `https://${upstreamOriginDomain}/`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then(r => r.json());
}

module.exports = {
  fetchMeta
};
