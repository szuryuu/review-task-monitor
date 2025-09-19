function getDOM() {
  const theadData = document.querySelector("thead");
  const tbodyData = document.querySelector("tbody");

  chrome.runtime.sendMessage({
    type: "DOM_DATA",
    payload: {
      thead: theadData ? theadData.innerHTML : null,
      tbody: tbodyData ? tbodyData.innerHTML : null,
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
