import React, { memo } from 'react';
import Tab from './tab';

function removeTabs(tabs) {
  browser.tabs.remove(tabs.map(t => t.id));
}

const TabGroup = ({ domain, tabs }) => {
  if (tabs.length === 1) {
    const tab = tabs[0];
    return (
      <Tab key={tab.id} value={tab} />
    );
  } else {
    return (
      <div className="TabGroup">
        <div className="meta">
          <div className="title domain">
            <img alt="favicon" src={tabs[0].favIconUrl} className="favicon" />
            {domain}
            ({tabs.length})
          </div>
          <button className="close" onClick={() => removeTabs(tabs)}>&times;</button>
        </div>

        <div className="tabs" style={{marginLeft: '10px'}}>
          {tabs.map(tab => (
            <Tab key={tab.id} value={tab} />
          ))}
      </div>
        </div>
    );
  }
};

export default memo(TabGroup);
