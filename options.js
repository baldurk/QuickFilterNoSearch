
function saveOptions(e) {
	let disable_upsell = document.querySelector("#disable_upsell").checked;

  browser.storage.local.set({
		disable_upsell: disable_upsell,
  });
  e.preventDefault();
  
	messenger.qfns.setPrefs({disable_upsell: disable_upsell});
}

function restoreOptions() {
  var storageItem = browser.storage.local.get('disable_upsell');
  storageItem.then((res) => {
		messenger.qfns.setPrefs({disable_upsell: res.disable_upsell});
    document.querySelector("#disable_upsell").checked = (res.disable_upsell ? true : false);
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
