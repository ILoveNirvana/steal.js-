browser.contextMenus.create({
  id: "title",
  title: "Set Title"
});
browser.contextMenus.create({
  id: "start",
  title: "Start Editing"
});
browser.contextMenus.create({
  id: "finish",
  title: "Finish Editing"
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "start") {
    browser.tabs.executeScript({
      file: "deleteTrash.js"
    });
  }
});
browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "finish") {
    browser.tabs.executeScript({
      code: "document.body.contentEditable='false'; document.designMode='off'; setBackgrounds();"
    });
  }
});
browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "title") {
    browser.tabs.executeScript({
      code: "document.title = prompt('Enter Company Name');"
    });
  }
});