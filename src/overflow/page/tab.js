import React, { memo } from 'react';

function removeTab(tab) {
  browser.tabs.remove(tab.id);
}

async function focusTab(tab) {
  await browser.windows.update(tab.windowId, {
    focused: true
  });

  browser.tabs.update(tab.id, {
    active: true,
    highlighted: true
  });
  console.log(tab);
}

function createBookmark(tab) {
  browser.bookmarks.create({
    title: tab.title,
    url: tab.url
  });
}

const Tab = (data) => {
  const tab = data.value;

  return (
      <div className="Tab">
        <button className="bookmark" onClick={() => createBookmark(tab)}><span role="img" aria-label="bookmark">&#x1f516;</span></button>
          <div onClick={() => focusTab(tab)} className="title" title={tab.title}>
          <img alt="" src={tab.favIconUrl} className="favicon" />
          {tab.title}
        </div>
        <button className="close" onClick={() => removeTab(tab)}>&times;</button>
      </div>
  );
};

export default memo(Tab);
