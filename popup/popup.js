const myTableHeader = document.getElementById("myTableHeader");
const myTableBody = document.getElementById("myTableBody");

function notification() {
  const audio = new Audio("../assets/sound/alert1.mp3");
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
    myTableHeader.innerHTML =
      msg.payload.thead || "<thead><tr><th>404 Not Found</th></tr></thead>";
    myTableBody.innerHTML =
      msg.payload.tbody || "<tbody><tr><td>404 Not Found</td></tr></tbody>";

    if (msg.payload.tbody) {
      notification();
    }
  }
});
