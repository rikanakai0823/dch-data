require("dotenv").config();

const {
  UA_STRING,
  UPSTREAM_API_DOMAIN,
  UPSTREAM_API_PATH,
  UPSTREAM_ORIGIN_DOMAIN,
} = process.env;

module.exports = {
  uaString: UA_STRING || "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
  upstreamApiDomain: UPSTREAM_API_DOMAIN || "example.com",
  upstreamApiPath: UPSTREAM_API_PATH || "/api",
  upstreamOriginDomain: UPSTREAM_ORIGIN_DOMAIN || "example.org",
};
