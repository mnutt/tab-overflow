import React, { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import TabGroup from './tab-group';
import fetchTabs from './fetch-tabs';
import filter from './filter';
import exportTabs from './export-tabs';
import importTabs from './import-tabs';
import './index.css';

const Page = () => {
  const [tabGroups, setTabGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [importedGroups, setImportedGroups] = useState(null);
  const [importedFileName, setImportedFileName] = useState('');
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef(null);
  const stickyHeaderRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

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

  useEffect(() => {
    if (stickyHeaderRef.current) {
      setHeaderHeight(stickyHeaderRef.current.offsetHeight);
    }
  });

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const { groups, count } = await importTabs(file);
      setImportedGroups(groups);
      setImportedFileName(file.name);
      setImportedCount(count);
    } catch (err) {
      console.error('Failed to import tabs:', err);
    }
    e.target.value = '';
  };

  const clearImport = () => {
    setImportedGroups(null);
    setImportedFileName('');
    setImportedCount(0);
  };

  const sourceGroups = importedGroups || tabGroups;
  const groups = (searchTerm && searchTerm.length) ? filter(sourceGroups, searchTerm) : sourceGroups;

  const tabCount = importedGroups
    ? importedCount
    : Object.values(tabGroups).reduce((a, b) => a += b.tabs.length, 0);

  return (
    <div className="Page">
      <div className="sticky-header" ref={stickyHeaderRef}>
        <div className={importedGroups ? "description imported" : "description"}>
          {importedGroups ? (
            <React.Fragment>
              {importedFileName} - {tabCount} tabs
              <button className="dismiss-import" onClick={clearImport}>&times;</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {tabCount} tabs
              <button className="export" onClick={() => exportTabs(groups)}>Export JSON</button>
              <button className="import" onClick={() => fileInputRef.current.click()}>Import JSON</button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleImport}
              />
            </React.Fragment>
          )}
        </div>
        <div className="search">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      {groups.map(group => (
        <TabGroup key={group.domain} domain={group.domain} tabs={group.tabs} stickyTop={headerHeight - 1} />
      ))}
    </div>
  );
};

ReactDOM.render(<Page />, document.querySelector('main'));
