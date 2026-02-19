function domainFromUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.toString().match(/github\.com\/movableink/)) {
      return 'github.com/movableink';
    }
    return parsed.hostname.split('.').reverse().slice(0, 2).reverse().join('.');
  } catch (e) {
    return url;
  }
}

function groupTabsByDomain(tabs) {
  const grouped = {};
  for (const tab of tabs) {
    const domain = domainFromUrl(tab.url);
    if (!domain || !domain.length) continue;
    if (!grouped[domain]) grouped[domain] = [];
    grouped[domain].push({ ...tab, domain });
  }

  const groups = Object.entries(grouped).map(([domain, tabs]) => ({ domain, tabs }));
  groups.sort((a, b) => b.tabs.length - a.tabs.length);
  return groups;
}

export default function importTabs(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const tabs = JSON.parse(e.target.result);
        if (!Array.isArray(tabs)) {
          reject(new Error('Expected a JSON array of tabs'));
          return;
        }
        const groups = groupTabsByDomain(tabs);
        resolve({ groups, count: tabs.length });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
