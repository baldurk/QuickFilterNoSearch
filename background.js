var storageItem = browser.storage.local.get('disable_upsell');
storageItem.then((res) => {
	messenger.qfns.setPrefs({disable_upsell: res.disable_upsell});
});

messenger.qfns.monkeyPatch();
