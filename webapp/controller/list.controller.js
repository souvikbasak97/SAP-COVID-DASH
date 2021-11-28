sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    'sap/viz/ui5/format/ChartFormatter',
    "sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel,Format,ChartFormatter,History) {
        "use strict";

		return Controller.extend("covidapp.controller.list", {
            dataPath:"https://api.rootnet.in/covid19-in/stats/latest",
            onInit: function () {
                var datamodel=new JSONModel(this.dataPath);
                this.getView().setModel(datamodel,"Latest");
            },
            onNavback(){
                this.getOwnerComponent().getRouter().navTo("dashboard");
            }
        });
});