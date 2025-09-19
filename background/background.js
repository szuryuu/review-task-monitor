let latestDOMData = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case "DOM_DATA":
      latestDOMData = msg.payload;
      chrome.runtime.sendMessage({
        type: "DOM_UPDATE",
        payload: latestDOMData,
      });
      break;
    case "POPUP_OPEN":
      if (latestDOMData) {
        chrome.runtime.sendMessage({
          type: "POPUP_OPEN",
          payload: latestDOMData,
        });
      }
      break;
  }
});
