console.log("popup.js loaded");

const myTableHeader = document.getElementById("myTableHeader");
const myTableBody = document.getElementById("myTableBody");

document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("currentYear");
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;

  console.log("Popup DOM loaded, requesting initial data");

  // Request initial data from background
  chrome.runtime.sendMessage({ type: "POPUP_OPENED" }, (response) => {
    if (response && response.type === "INITIAL_DATA") {
      console.log("Received initial data:", response);
      updateTable(response.payload);
    }
  });
});

function updateTable(data) {
  console.log("Updating table with data:", data);

  myTableHeader.innerHTML = data.thead || "<tr><th>No Header Data</th></tr>";
  myTableBody.innerHTML = data.tbody || "<tr><td>No Body Data</td></tr>";
}

function notification() {
  const audio = new Audio("../assets/sound/alert1.mp3");
  audio.play().catch((error) => {
    console.log("Audio playback failed:", error);
  });
}

// Listener
chrome.runtime.onMessage.addListener((msg, sender) => {
  console.log("Popup received message:", msg);

  if (msg.type === "DOM_UPDATE") {
    updateTable(msg.payload);

    if (msg.payload.tbody) {
      notification();
    }
  }
});
