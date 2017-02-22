browser.contextMenus.create({
    id: "start",
    title: "Prepair"
});
browser.contextMenus.create({
    id: "switch",
    title: "Editing Mode ON/OFF"
});
browser.contextMenus.create({
    id: "deleting",
    title: "Deleting Mode ON/OFF"
});
browser.contextMenus.create({
    id: "download",
    title: "Download"
});
browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "start") {
        browser.tabs.executeScript({
            code: "prepair()"
        });
    }
    if (info.menuItemId == "switch") {
        browser.tabs.executeScript({
            code: "switchEditionMode()"
        });
    }
    if (info.menuItemId == "deleting") {
        browser.tabs.executeScript({
            code: "deletingElementsModeSwitcher()"
        });
    }
    if (info.menuItemId == "download") {
        browser.tabs.executeScript({
            code: "download()"
        });
    }
});
