(function (exports) {
	const { QuickFilterManager } = ChromeUtils.importESModule("resource:///modules/QuickFilterManager.sys.mjs");

	const lazy = {};
	ChromeUtils.defineESModuleGetters(lazy, {
		GlodaMsgSearcher: "resource:///modules/gloda/GlodaMsgSearcher.sys.mjs"
	});

	let prefs = {disable_upsell: false};

	// based on https://hg.mozilla.org/comm-central/file/tip/mail/modules/QuickFilterManager.sys.mjs
	// only does a global search if the 'upsell' dialog is shown - meaning no results and the results have been shown
	function searchOnlyWithNoResults(aState, aNode, aEvent, aDocument) {
		const text = aEvent.detail || null;
		const isSearch = aEvent.type === "search";
		if (isSearch) {
			const upsell = aDocument.getElementById("qfb-text-search-upsell");
			if (upsell.state == "open" && prefs.disable_upsell == false) {
				upsell.hidePopup();
				const tabmail =
					aDocument.documentGlobal.top.document.getElementById("tabmail");
				tabmail.openTab("glodaFacet", {
					searcher: new lazy.GlodaMsgSearcher(null, aState.text),
				});
			}
			aEvent.preventDefault();
		}

		aState.text = text;
		aDocument.getElementById("quick-filter-bar-filter-text-bar").hidden = !text;
		return [aState, !isSearch];
	};

  class qfns extends ExtensionCommon.ExtensionAPI {
    onStartup() { }
    onShutdown(isAppShutdown) { }
    getAPI(context) {
    	return {
				qfns: {
					setPrefs: function(p) {
						prefs = p;
					},
					monkeyPatch: async function() {
						QuickFilterManager.filterDefsByName["text"].onCommand = searchOnlyWithNoResults;
					}
				}
			}
		}
	};

  exports.qfns = qfns;

})(this)
