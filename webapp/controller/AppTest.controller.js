sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
	"use strict";

	return Controller.extend("com.dxc.bootcamp.Bootcamp.controller.AppTest", {

		onInit: function () {
			//set data model on view 
			var oData = {
				field: {
					username: "Username"
				}
			};

			//instantiate new JSON model storing the oData
			var oModel = new JSONModel(oData);

			//set model in this view
			this.getView().setModel(oModel);

			// set i18n model on view
			var i18nModel = new ResourceModel({
				bundleName: "com.dxc.bootcamp.Bootcamp.i18n.i18n"
			});
			this.getView().setModel(i18nModel, "i18n");

		},

		onLoginPress: function (oEvent) {

			var canLogin = true;
			var username = this.getView().byId("username").getValue();
			var password = this.getView().byId("password").getValue();

			if (username == "" && password == "" && canLogin == true) {
				MessageToast.show("Username and password are both required fields.");
				canLogin = false;
			}

			if (canLogin == true) {
				if (username == "") {
					MessageToast.show("Username is a required field.");
					canLogin = false;
				} else if (username.length < 6 || username.length > 8) {
					MessageToast.show("Username must be between 6 to 8 characters.");
					canLogin = false;
				}
			}

			if (canLogin == true) {
				if (password == "") {
					MessageToast.show("Password is a required field.");
					canLogin = false;
				} else if (password.length < 7 || password.length > 10) {
					MessageToast.show("Password must be between 7 to 10 characters.");
					canLogin = false;
				}
			}

			if (canLogin) {
				// read msg from i18n model
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				var sRecipient = this.getView().getModel().getProperty("/field/username");
				var sMsg = oBundle.getText("helloMsg", [sRecipient]);
				// show message
				MessageToast.show(sMsg);
			}

		}

	});
});