browser.contextMenus.create({
    id: "start",
    title: "Start"
});
// browser.contextMenus.create({
//     id: "switch",
//     title: "Editing Mode ON/OFF"
// });
// browser.contextMenus.create({
//     id: "deleting",
//     title: "Deleting Mode ON/OFF"
// });
browser.contextMenus.create({
    id: "end",
    title: "Finish"
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
    if (info.menuItemId == "end") {
        browser.tabs.executeScript({
            code: "test()"
        });
    }
});
