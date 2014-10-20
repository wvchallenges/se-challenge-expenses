function drag(e) {
	e.dataTransfer.setData("uploadData", e.target.id);
}

function drop(e) {
	var data = e.dataTransfer.getData("uploadData");
	if (data === "") return;

	e.preventDefault();
	e.target.appendChild(document.getElementById(data));
	animateOverlay({ sample: true });
}

function animateOverlay(cfg) {
	YUI().use('node', 'anim', function(Y) {
		var nodeName = (cfg.sample ? "#sample_overlay" : "#overlay");
		Y.one(nodeName).setStyle("zIndex", 1);

		var animDef = {
			to: { opacity: (cfg.hide ? 0 : 1) },
			node: nodeName,
			duration: 1,
			easing: 'easeBothStrong'
		};

		var anim = new Y.Anim(animDef);
		anim.run();
	});
}

YUI().use('node', 'event', 'uploader', 'uploader-html5', function(Y) {

	Y.Uploader = Y.UploaderHTML5;

	var uploader = new Y.Uploader({
		width: "100%",
		height: "100%",
		dragAndDropArea: "#uploader",
		fileFieldName: "spreadsheet",
		multipleFiles: false,
		uploadURL: "//" + window.location.host + "/upload",
		simLimit: 1,
		withCredentials: false,
		selectButtonLabel: ''
	});

	uploader.after("fileselect", function (e) {
		uploader.uploadAll();
		fadeThanks();
	});

	uploader.after("uploadcomplete", function showTable(e) {
    	Y.one("#sample_overlay").setContent(e.data);
    	animateOverlay({ sample: false, hide: true });
    	animateOverlay({ sample: true, hide: false });
    });
 
	function init() {
		uploader.render("#uploader");
		Y.one(".yui3-button").hide();
	}

	function fadeThanks() {
		//animateOverlay({ sample: false, hide: false });
	}

    Y.on("domready", init);
});
