sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ZUX_PERS_CRUD.controller.New", {
		onInit: function () {
			var oModel = new JSONModel({
				Persid: "",
				Name: "",
				Department: "",
				Title: ""
			});
			this.getView().setModel(oModel, "persModel");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("New").attachPatternMatched(this._onNewObjectMatched, this);
		},

		_onNewObjectMatched: function (oEvent) {
			var that = this;

		},
		onSavePersonnel: function () {
			var that = this;
			var persid = this.getView().getModel("persModel").getProperty("/Persid");
			var name = this.getView().getModel("persModel").getProperty("/Name");
			var department = this.getView().getModel("persModel").getProperty("/Department");
			var title = this.getView().getModel("persModel").getProperty("/Title");
			this.getView().getModel().create("/PersonnelSet", { // create request
				Persid: persid,
				Name: name,
				Department: department,
				Title: title
			}, {
				success: function (oData) {
					that.getView().getModel("persModel").setProperty("/Persid");
					that.getView().getModel("persModel").setProperty("/Name");
					that.getView().getModel("persModel").setProperty("/Department");
					that.getView().getModel("persModel").setProperty("/Title");
					sap.m.MessageToast.show("Success");
					var homeBtn = sap.ui.getCore().byId("homeBtn").getDomRef();

					$($(homeBtn).find("a")).on("click", function (event) {
						// do this if user do not want to navigate to launchpad
						event.preventDefault();
					});
				},
				error: function (oError) {
					debugger;
				}
			})
		}

	});

});