const { fetchMeta } = require("./fetch");

const dateStr = (d, options) => d.toLocaleString("en-US", {
  timeZone: "Asia/Tokyo",
  ...options
});

const toJSON = (p) => JSON.stringify(p, null, 2);

const fetchList = async (path, payload) => {
  const resp = await fetchMeta(path, payload);
  if (!resp || resp.status !== "OK" || !Array.isArray(resp.list)) return [];
  return resp.list;
}

const getActiveChannels = async () => JSON.parse(await fs.readFile("./data/channels.json"));

const fetchChannels = async () => {
  const list = await fetchList("/channel", {});
  if (!list.length) return false;
  return fs.writeFile("./data/channels.json", toJSON(list));
}

const fetchEpg = async (t) => {
  const y = dateStr(t, {year: 'numeric'});
  const m = dateStr(t, {month: '2-digit'});
  const d = dateStr(t, {day: '2-digit'});

  const dir = `./data/${y}/${m}`;
  await $`mkdir -p ${dir}`;
  const fn = `${dir}/${d}.json`;

  const activeChannels = await getActiveChannels();
  const ch_list = activeChannels.map(({chno}) => chno);

  const list = await fetchList("/channelprogram", {
    ch_list,
    date_list: [`${y}${m}${d}`],
  });

  if (!list.length) return false;

  return fs.writeFile(fn, toJSON({
    channels: ch_list,
    data: list
  }));
}

const now = new Date().getTime();
const oneDay = 86400*1000;

await Promise.all(new Array(30).fill(null).map((_, i) => fetchEpg(new Date(now + (i - 1) * oneDay))));
