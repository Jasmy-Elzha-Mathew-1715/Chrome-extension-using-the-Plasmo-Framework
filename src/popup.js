document.addEventListener('DOMContentLoaded', function () {
  var selectedWord = document.getElementById('selectedWord');
  var translateButton = document.getElementById('translateButton');
  var translationResult = document.getElementById('translationResult');

  // Get the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    
    // Inject a content script into the active tab to capture the selected word
    chrome.tabs.executeScript(tab.id, { file: 'content.js' });
  });

  // Listen for a message from the content script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'selectedWord') {
      selectedWord.textContent = request.word;
    }
  });

  // Listen for the translate button click
  translateButton.addEventListener('click', function () {
    var word = selectedWord.textContent;
    // Replace with your backend API endpoint for translation
    var apiUrl = 'https://your-backend-api.com/translations?word=' + word + '&target_language=fr';
    
    // Send a request to your backend API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        translationResult.textContent = 'Translation: ' + data.translation;
      })
      .catch(error => {
        translationResult.textContent = 'Translation not available.';
      });
  });
});
