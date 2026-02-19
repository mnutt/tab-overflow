export default function exportTabs(groups) {
  const tabs = groups.flatMap(group =>
    group.tabs.map(tab => ({
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl || null,
      lastAccessed: tab.lastAccessed
        ? new Date(tab.lastAccessed).toISOString()
        : null
    }))
  );

  const json = JSON.stringify(tabs, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const date = new Date().toISOString().slice(0, 10);
  a.download = `firefox-tabs-${date}.json`;
  a.click();

  URL.revokeObjectURL(url);
}
