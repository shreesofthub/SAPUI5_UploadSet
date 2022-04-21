/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"uploadset_r15/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
