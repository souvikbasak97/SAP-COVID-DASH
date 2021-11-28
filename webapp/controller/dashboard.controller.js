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

		return Controller.extend("covidapp.controller.dashboard", {
            //dataPath : "../model/data.json",
            dataPath:"https://api.rootnet.in/covid19-in/stats/history",
            onInit: function () {
                Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            // set explored app's demo model on this sample
            

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:formatPattern.SHORTFLOAT_MFD2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT
                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: false,
                    text: 'Covid Cases History'
                }
            });
            var dataModel = new JSONModel(this.dataPath);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
            
            },
            onPressList:function(){
                this.getOwnerComponent().getRouter().navTo("list");
            },
            onPressGraph:function(){
                this.getOwnerComponent().getRouter().navTo("pie");
            },
            onPressActive:function(){
                this.getOwnerComponent().getRouter().navTo("active");
            }
		});
	});
