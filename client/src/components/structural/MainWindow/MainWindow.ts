import "./MainWindow.scss";

import { Messenger } from "../Messenger/Messenger";
import { MessengerMenu } from "../MessengerMenu/MessengerMenu";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import * as actions from "../../../core/store/actions";
import template from "./MainWindow.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { $ } from "../../../utils/dom-abstraction";

export const MainWindow = {
   name: "MainWindow",
   template: template,
   components: [Messenger, MessengerMenu, RightSidebar],
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
            componentName: data?.componentName || "InfoAccount",
            chat: data?.chat || null,
         };
         this.$dispatch(actions.rightSidebar(actionData));
      },
      toggleRightSidebar: function () {
         if (this.$root.hasClass("right_sidebar__close")) {
            this.$emit("openRightSidebar");
         } else {
            this.$emit("closeRightSidebar");
         }
      },
      refreshRightSidebar: function (data?: any) {
         const actionData = {
            componentName: data.componentName || "InfoAccount",
            chat: data.chat || null,
         };
         this.$dispatch(actions.rightSidebar(actionData));
      },
   },
   storeSubscribers: {
      selectedChatId: function (id: number) {
         if (id && id > 0) {
            this.props.is_selected = false;
            showPlaceholder();
         } else {
            this.props.is_selected = true;
            hidePlaceholder();
         }
      },
   },

   methods: {},
   beforePrepare() {},
   beforeCreate() {
      this.props.selectedChatId = ChatsController.getSelectedChatId();
      this.props.is_selected = this.props.selectedChatId > 0;
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

function showPlaceholder() {
   $(".main").removeClass("chat_not_selected");
}
function hidePlaceholder() {
   $(".main").addClass("chat_not_selected");
}
