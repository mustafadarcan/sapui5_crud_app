sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ZUX_PERS_CRUD.controller.Edit", {
		onInit: function () {
			var oModel = new JSONModel({
				Persid: "",
				Name: "",
				Department: "",
				Title: ""
			});
			this.getView().setModel(oModel, "persModel");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Edit").attachPatternMatched(this._onEditObjectMatched, this);
		},

		_onEditObjectMatched: function (oEvent) {
			var that = this;
			var persId = oEvent.getParameter("arguments").Persid;
			this.getView().getModel().read("/PersonnelSet('" + persId + "')", { //read request  for call GET_ENTITY method
				success: function (oData) {
					that.getView().getModel("persModel").setProperty("/Persid", oData.Persid);
					that.getView().getModel("persModel").setProperty("/Name", oData.Name);
					that.getView().getModel("persModel").setProperty("/Department", oData.Department);
					that.getView().getModel("persModel").setProperty("/Title", oData.Title);
				},
				error: function (oError) {
					//messagebox blablabla
				}
			});
		},
		onChangePersonnel: function () {
			var that = this;
			var persid = this.getView().getModel("persModel").getProperty("/Persid");
			var name = this.getView().getModel("persModel").getProperty("/Name");
			var department = this.getView().getModel("persModel").getProperty("/Department");
			var title = this.getView().getModel("persModel").getProperty("/Title");
			this.getView().getModel().update("/PersonnelSet('" + persid + "')", {
				Persid: persid,
				Name: name,
				Department: department,
				Title: title
			}, {
				success: function (oEvent) {
					that.getView().getModel("persModel").setProperty("/Persid");
					that.getView().getModel("persModel").setProperty("/Name");
					that.getView().getModel("persModel").setProperty("/Department");
					that.getView().getModel("persModel").setProperty("/Title");
					sap.m.MessageToast.show("Success");
				},
				error: function (oError) {

				}

			});

		}

	});

});