import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import TabGroup from './tab-group';
import fetchTabs from './fetch-tabs';
import filter from './filter';
import './index.css';

const Page = () => {
  const [tabGroups, setTabGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = () => {
      fetchTabs(setTabGroups);
    }

    browser.tabs.onCreated.addListener(fetch);
    browser.tabs.onUpdated.addListener(fetch);
    browser.tabs.onRemoved.addListener(fetch);

    fetch();

    return () => {
      browser.tabs.onCreated.removeListener(fetch);
      browser.tabs.onUpdated.removeListener(fetch);
      browser.tabs.onRemoved.removeListener(fetch);
    };
  }, []);

  const groups = (searchTerm && searchTerm.length) ? filter(tabGroups, searchTerm) : tabGroups;

  return (
    <div className="Page">
      <div className="description">
        {Object.values(tabGroups).reduce((a, b) => a += b.tabs.length, 0)} tabs
      </div>
      <div className="search">
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>
      {groups.map(group => (
        <TabGroup key={group.domain} domain={group.domain} tabs={group.tabs} />
      ))}
    </div>
  );
};

ReactDOM.render(<Page />, document.querySelector('main'));
