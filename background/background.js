chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "DOM_DATA") {
    chrome.runtime.sendMessage({ type: "DOM_UPDATE", payload: msg.payload });
  }
});
