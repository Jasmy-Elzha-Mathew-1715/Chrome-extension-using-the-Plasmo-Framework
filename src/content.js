// Listen for text selection on the active tab
document.addEventListener('mouseup', function () {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    // Send the selected word to the popup
    chrome.runtime.sendMessage({ action: 'selectedWord', word: selectedText });
  }
});
