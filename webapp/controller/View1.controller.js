sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("uploadsetr15.controller.View1", {
            onInit: function () {
                var oViewModel = new JSONModel({
                    page: {
                        busy: false,
                        editable: true
                    },
                    data: {
                        items: [{}],
                        attachments: []
                    }
                });
                this.getView().setModel(oViewModel, "createView");
            },
            onBeforeUploadStarts: function (oEvent) {
                var oUploadSet = oEvent.getSource();
                this.fileName = oEvent.getParameter("item").getFileName();
                var slug = this.getView().byId("idPrd").getValue() + "," + this.fileName;
                var oCustomerHeaderSlug = new sap.ui.core.Item({
                    key: "slug",
                    text: slug
                });
                var oCustomerHeaderToken = new sap.ui.core.Item({
                    key: "x-csrf-token",
                    text: this.getOwnerComponent().getModel().getSecurityToken()
                });
                oUploadSet.removeAllHeaderFields();
                oUploadSet.addHeaderField(oCustomerHeaderToken);
                oUploadSet.addHeaderField(oCustomerHeaderSlug);
            },
            onUploadCompleted: function (oEvent) {
                this.getOwnerComponent().getModel().refresh(true);
                sap.m.MessageToast.show("File Added");
            },
            onUploadToDB: function () {
                var oUploadSet = this.getView().byId("UploadSet");
                var cFiles = oUploadSet.getHeaderFields().length;
                if (cFiles > 0) {
                    oUploadSet.upload();
                }
            }
        });
    });
