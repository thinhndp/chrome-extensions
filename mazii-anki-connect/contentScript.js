setTimeout(() => {
	var contentSecurityPolicyTagTemp = document.createElement('template');
	contentSecurityPolicyTagTemp.innerHTML = '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">';
	document.getElementsByTagName('head')[0].append(contentSecurityPolicyTagTemp.content.childNodes[0]);
	var btnList = document.getElementsByClassName("box-btn-right-df")[0];
	if (btnList != null) {
		var addToAnkiBtn = document.createElement('div');
		addToAnkiBtn.classList.add('btn-item');
		addToAnkiBtn.classList.add('add-anki-btn');
		addToAnkiBtn.innerHTML = '<div class="sprite_1 icon-22 ic_add inline" style="filter: brightness(0) saturate(100%) invert(8%) sepia(99%) saturate(7182%) hue-rotate(247deg) brightness(95%) contrast(144%);"></div>';
		btnList.append(addToAnkiBtn);

		addToAnkiBtn.addEventListener('click', () => {
			var meaningList = [ ...document.getElementsByClassName("mean-fr-word cl-blue") ];
			var meaningListText = meaningList.map(meaning => meaning.innerText);
			var meaningField = meaningListText.join('\n');
			var frontCardContent = meaningField;
	
			var wordMainField = document.getElementsByClassName("main-word cl-red-main japanese-char")[0].innerText;
			var wordPhoneticField = document.getElementsByClassName("phonetic-word japanese-char cl-content")[0].innerText;
			var wordSinoVietField = '';
			var wordSinoViet = document.getElementsByClassName("han-viet-word cl-content")[0];
			if (wordSinoViet != null) {
				wordSinoVietField = wordSinoViet.innerText;
			}
			var backCardContent = wordMainField + '\n' + wordPhoneticField + wordSinoVietField;

			console.log(frontCardContent);
			console.log(backCardContent);
			invokeAnkiConnect('guiAddCards', 6,
				{
					"note": {
						"deckName": "newJpWord",
						"modelName": "Basic",
						"fields": {
							"Front": frontCardContent,
							"Back": backCardContent
						},
						"tags": [
							"mazii_auto"
						]
					}
				}
			)
			// .then(result => console.log(`${result}`));
		});

	}
}, 1000);

function invokeAnkiConnect(action, version, params={}) {
	/* const options = {
		method: 'POST',
		body: JSON.stringify({action, version, params}),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	fetch('http://127.0.0.1:8765/', options)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => {
			console.log('Error: ', err);
		}); */
	fetch('http://www.example.com?par=0')
		.then(r => r.text())
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log('Error: ', err);
		});
}

function invokeAnkiConnect2(action, version, params={}) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('error', () => reject('failed to issue request'));
		xhr.addEventListener('load', () => {
			try {
				const response = JSON.parse(xhr.responseText);
				if (Object.getOwnPropertyNames(response).length != 2) {
					throw 'response has an unexpected number of fields';
				}
				if (!response.hasOwnProperty('error')) {
					throw 'response is missing required error field';
				}
				if (!response.hasOwnProperty('result')) {
					throw 'response is missing required result field';
				}
				if (response.error) {
					throw response.error;
				}
				resolve(response.result);
			} catch (e) {
				reject(e);
			}
		});

		xhr.open('POST', 'http://localhost:8765');
		xhr.send(JSON.stringify({action, version, params}));
	});
}