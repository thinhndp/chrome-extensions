chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === 'URL_CHANGED') {
			showAnkiConnect();
		}
});

showAnkiConnect();

function showAnkiConnect() {
	setTimeout(() => {
		var addToAnkiBtn = document.getElementsByClassName("add-anki-btn")[0];
		if (addToAnkiBtn != null) {
			return;
		}
		var btnList = document.getElementsByClassName("box-btn-right-df")[0];
		if (btnList != null) {
			addToAnkiBtn = document.createElement('div');
			addToAnkiBtn.classList.add('btn-item');
			addToAnkiBtn.classList.add('add-anki-btn');
			addToAnkiBtn.innerHTML = '<div class="sprite_1 icon-22 ic_add inline" style="filter: brightness(0) saturate(100%) invert(8%) sepia(99%) saturate(7182%) hue-rotate(247deg) brightness(95%) contrast(144%);"></div>';
			btnList.append(addToAnkiBtn);
	
			addToAnkiBtn.addEventListener('click', () => {
				var meaningList = [ ...document.getElementsByClassName("mean-fr-word cl-blue") ];
				var meaningListText = meaningList.map(meaning => meaning.innerText);
				var meaningField = meaningListText.join('<br/>');
				var frontCardContent = meaningField;
				
				var wordMainElement = document.createElement('div');
				wordMainElement.style.color = "#e53c20";
				wordMainElement.style.fontSize = "24px";
				wordMainElement.style.fontWeight = "700";
				var wordMainText = document.getElementsByClassName("main-word cl-red-main japanese-char")[0].innerText;
				wordMainElement.innerText = wordMainText;
				var wordMainField = wordMainElement.outerHTML;
				var wordPhoneticField = '';
				var wordPhonetic = document.getElementsByClassName("phonetic-word japanese-char cl-content")[0];
				if (wordPhonetic != null) {
					wordPhoneticField = wordPhonetic.innerText;
				}
				var wordSinoVietField = '';
				var wordSinoViet = document.getElementsByClassName("han-viet-word cl-content")[0];
				if (wordSinoViet != null) {
					wordSinoVietField = wordSinoViet.innerText + '<br/>';
				}
				var backCardContent = wordMainField + wordSinoVietField
					+ wordPhoneticField + '<br/><div style="font-size: 12px; color: lightgray">placeholder</div>';
	
				console.log(frontCardContent);
				console.log(backCardContent);
				invokeAnkiConnect('guiAddCards', 6,
					{
						"note": {
							"deckName": "Jap Class Vocab",
							"modelName": "Basic (and reversed card)",
							"fields": {
								"Front": frontCardContent,
								"Back": backCardContent
							},
							"tags": [
								"mazii_auto"
							]
						}
					}
				);
			});
	
		}
	}, 2000);
}

function invokeAnkiConnect(action, version, params={}) {
	console.log('invoke');
	const options = {
		method: 'POST',
		body: JSON.stringify({action, version, params}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
	chrome.runtime.sendMessage(
		{ type: 'ANKI_CONNECT', options },
		res => { console.log(res); }
	);
}
