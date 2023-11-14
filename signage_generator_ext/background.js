console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
    txt: 'start'
  };
  chrome.tabs.sendMessage(tab.id, msg);
}