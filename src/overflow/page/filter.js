export default function filter(tabGroups, term) {
  return tabGroups.map(group => {
    const tabs = group.tabs.filter(tab => {
      return tab.url.includes(term) || tab.title.includes(term);
    });

    return { ...group, tabs };
  }).filter(g => g.tabs && g.tabs.length);
}
