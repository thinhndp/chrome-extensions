chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url) {
            chrome.tabs.sendMessage( tabId, {
                message: 'URL_CHANGED'
            });
        }
    }
);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type = 'ANKI_CONNECT') {
            var url = 'http://127.0.0.1:8765';
            fetch(url, request.options)
                .then(res => res.json())
                .then(res => sendResponse(res))
                .catch(err => {
                    console.log('Error: ', err);
                });
            // return true;
        }
    }
);