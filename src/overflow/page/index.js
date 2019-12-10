import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import TabGroup from './tab-group';
import fetchTabs from './fetch-tabs';
import './index.css';

const Page = () => {
  const [tabGroups, setTabGroups] = useState([]);

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

  return (
    <div className="Page">
      <div className="description">
        {Object.values(tabGroups).reduce((a, b) => a += b.tabs.length, 0)} tabs
      </div>
      {
        tabGroups.map(group => (
          <TabGroup key={group.domain} domain={group.domain} tabs={group.tabs} />
        ))
      }
    </div>
  );
};

ReactDOM.render(<Page />, document.querySelector('main'));
