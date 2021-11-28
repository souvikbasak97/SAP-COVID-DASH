sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    'sap/viz/ui5/format/ChartFormatter'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel,Format,ChartFormatter) {
		"use strict";

		return Controller.extend("covidapp.controller.pie", {
            //dataPath : "../model/data.json",
            dataPath : "https://api.rootnet.in/covid19-in/stats/latest",
            oVizFrame : null,
            onInit: function () {
                Format.numericFormatter(ChartFormatter.getInstance());
                var formatPattern = ChartFormatter.DefaultPattern;
            // set explored app's demo model on this sample
            

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFramepie");
            oVizFrame.setVizProperties({
                legend: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false
                }
            });
            var dataModel = new JSONModel(this.dataPath);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOverpie");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);            
            },
            onNavback:function(){
                this.getOwnerComponent().getRouter().navTo("dashboard");
            }
		});
	});
