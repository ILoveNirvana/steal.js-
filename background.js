browser.contextMenus.create({
  id: "start",
  title: "Prepair"
});
browser.contextMenus.create({
  id: "switch",
  title: "Editing Mode ON/OFF"
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "start") {
    browser.tabs.executeScript({
      file: "deleteTrash.js"
    });
  }
});
browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "switch") {
    browser.tabs.executeScript({
      code: "switchEditionMode()"
    });
  }
});