import "./MainWindow.scss";

import { AppService } from "../../../services/AppService";
import { Messanger } from "../Messanger/Messanger";
import { MessangerMenu } from "../MessangerMenu/MessangerMenu";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import { isEmpty } from "../../../utils/isEmpty";
import * as actions from "../../../core/store/actions";
import template from "./MainWindow.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";

export const MainWindow = {
   name: "MainWindow",
   template: template,
   components: [Messanger, MessangerMenu, RightSidebar],
   props: {},
   listeners: [],
   subscribers: {
      closeRightSidebar: function () {
         this.$root.addClass("right_sidebar__close");
         const actionData = { status: "close" };
         this.$dispatch(actions.rightSidebar(actionData));
      },
      openRightSidebar: function (data?: any) {
         this.$root.removeClass("right_sidebar__close");
         const actionData = {
            status: "open",
            componentName: data.componentName || "InfoAccount",
            chat: data.chat || null,
         };
         this.$dispatch(actions.rightSidebar(actionData));
      },
      refreshRightSidebar: function (data?: any) {
         const actionData = {
            componentName: data.componentName || "InfoAccount",
            chat: data.chat || null,
         };
         this.$dispatch(actions.rightSidebar(actionData));
      },
   },
   storeSubscribers: {},

   methods: {},
   beforePrepare() {},
   beforeCreate() {
      this.props.selectedChat = ChatsController.getSelectedChat();
      this.props.is_selected = this.props.selectedChat !== null;
   },
   afterInit() {
      const sidebarState = RightSidebarController.getState();
      if (sidebarState.status === "open") {
         this.$emit("openRightSidebar", sidebarState);
      } else {
         this.$emit("closeRightSidebar");
      }
   },
};
