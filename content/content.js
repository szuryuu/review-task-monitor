console.log("content.js loaded");

function waitForDOM() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve);
    }
  });
}

async function getDOM() {
  await waitForDOM();

  const table = document.querySelector("table.table.table-hover.table-striped");
  const theadData = table ? table.querySelector("thead") : null;
  const tbodyData = table ? table.querySelector("tbody") : null;

  console.log("Table found:", !!table);
  console.log("Thead found:", !!theadData);
  console.log("Tbody found:", !!tbodyData);

  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime
      .sendMessage({
        type: "DOM_DATA",
        payload: {
          thead: theadData ? theadData.innerHTML : null,
          tbody: tbodyData ? tbodyData.innerHTML : null,
          timestamp: new Date().toISOString(),
        },
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
      });
  }
}

getDOM();

const observer = new MutationObserver((mutations) => {
  let shouldUpdate = false;

  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      // Check if table-related elements changed
      const tableRelated = Array.from(mutation.addedNodes)
        .concat(Array.from(mutation.removedNodes))
        .some(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            ((node.matches && node.matches("table, thead, tbody, tr, td")) ||
              (node.querySelector &&
                node.querySelector("table, thead, tbody, tr, td"))),
        );

      if (tableRelated) {
        shouldUpdate = true;
      }
    }
  });

  if (shouldUpdate) {
    console.log("DOM change detected, updating...");
    getDOM();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
