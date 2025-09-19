function getDOM() {
  const theadData = document.querySelectorAll("thead");
  const tbodyData = document.querySelectorAll("tbody");

  chrome.runtime.sendMessage({
    type: "DOM_DATA",
    payload: {
      thead: theadData ? theadData : [],
      tbody: tbodyData ? tbodyData : [],
    },
  });
}

getDOM();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      getDOM();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
