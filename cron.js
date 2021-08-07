const fs = require("fs");
const { fetchMeta } = require("./fetch");

fetchMeta("/channel", {}).then((resp) => {
  if (resp.status !== "OK" || !Array.isArray(resp.list)) return false;
  fs.writeFileSync("./data/channels.json", JSON.stringify(resp.list, null, 2));
});
