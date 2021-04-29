import "./MainWindow.scss";

import { AppService } from "../../../services/AppService";
import { Messager } from "../Messager/Messager";
import { MessagerMenu } from "../MessagerMenu/MessagerMenu";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import { isEmpty } from "../../../utils/isEmpty";
import * as actions from "../../../core/store/actions";
import template from "./MainWindow.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";

export const MainWindow = {
   name: "MainWindow",
   template: template,
   components: [Messager, MessagerMenu, RightSidebar],
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
   },
   methods: {},
   beforePrepare() {
      this.props.chat = AppService.getSelectedChat();
      this.props.is_selected = !isEmpty(this.props.chat);
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
