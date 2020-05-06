sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ZUX_PERS_CRUD.controller.View1", {
		onInit: function () {

		},
		onDelete: function (oEvent) {
			var row = oEvent.getSource().getBindingContext().getPath(); // get Path e.g. "/PersonnelSet('0001')"
			var that = this;
			this.getView().getModel().remove(row, { //delete request 
				success: function (oData) {
					that.getView().getModel().refresh(true);
				},
				error: function (oError) {

				}
			});
		},
		onChange: function (oEvent) {
			var editPersid = oEvent.getSource().getBindingContext().getProperty().Persid; //get Persid of selected row e.g "0001" 
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Edit", {
				Persid: editPersid
			});
		},
		onNewPers: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("New", {

			});
		}
	});

});