const myTableHeader = document.getElementById("myTableHeader");
const myTableBody = document.getElementById("myTableBody");

function notification() {
  const audio = new Audio("notification.mp3");
  audio.play();
}

document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("currentYear");
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;
});

// Listener
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "DOM_UPDATE") {
    myTableHeader.innerHTML = msg.payload.thead
      ? msg.payload.thead.innerHTML
      : "404 Not Found";
    myTableBody.innerHTML = msg.payload.tbody
      ? msg.payload.tbody.innerHTML
      : "404 Not Found";
    notification();
  }
});
