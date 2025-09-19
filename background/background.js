let latestDOMData = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("Background received message:", msg.type);

  switch (msg.type) {
    case "DOM_DATA":
      latestDOMData = msg.payload;
      console.log("DOM data updated:", latestDOMData);

      // Send to all extension contexts (popup, etc)
      chrome.runtime
        .sendMessage({
          type: "DOM_UPDATE",
          payload: latestDOMData,
        })
        .catch((error) => {
          console.log(
            "No receivers for DOM_UPDATE (this is normal if popup is closed)",
          );
        });
      break;

    case "POPUP_OPENED":
      console.log("Popup opened, sending latest data");
      if (latestDOMData) {
        // Send response directly to popup
        sendResponse({
          type: "INITIAL_DATA",
          payload: latestDOMData,
        });
      }
      return true; // Keep message channel open for async response
      break;
  }
});
