window.addEventListener('hot-update-message', (e) => {
  if (e.detail && e.detail.action === 'built') {
    browser.runtime.reload();
  }
});

function handleClick() {
  let createData = {
    url: "overflow-sidebar.html",
  };

  browser.tabs.create(createData);
}

browser.browserAction.onClicked.addListener(handleClick);
