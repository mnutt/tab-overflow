function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default async function fetchTabs(setTabGroups) {
  let tabs = await browser.tabs.query({});

  tabs.forEach(t => {
    try {
      const url = new URL(t.url);
      if (url.toString().match(/github\.com\/movableink/)) {
        t.domain = 'github.com/movableink';
      } else {
        const canonical = url.hostname.split('.').reverse().slice(0, 2).reverse().join('.');
        t.domain = canonical;
      }
    } catch(e) {
      t.domain = t.url;
      // do nothing with bad URLs
    }
  });

  tabs = tabs
    .filter(t => !t.pinned) // don't mess with pinned tabs
    .filter(t => !t.url || !t.url.match(/^moz-extension:/)) // don't reorganize groups
    .filter(t => t.domain && t.domain.length); // maybe couldn't parse URL for some reason

  const groups = Object.entries(groupBy(tabs, 'domain'))
        .map(([domain, tabs]) => {
          return { domain, tabs };
        });

  groups.sort((a, b) => a.tabs.length - b.tabs.length);

  setTabGroups(groups.reverse());
}
