import "./MainWindow.scss";

import { AppService } from "../../../services/AppService";
import { Messager } from "../Messager/Messager";
import { MessagerMenu } from "../MessagerMenu/MessagerMenu";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import { isEmpty } from "../../../utils/isEmpty";
import template from "./MainWindow.tmpl";

export const MainWindow = {
   name: "MainWindow",
   template: template,
   components: [Messager, MessagerMenu, RightSidebar],
   props: {
      chat: AppService.getSelectedChat(),
   },
   listeners: [],
   subscribers: {
      pageChange: function (page: string) {
         this.props.page = page;
         this.$emit(this.EVENTS.UPDATE);
         this.$emit("openRightSidebar");
      },
      closeRightSidebar: function () {
         this.$root.addClass("right_sidebar__close");
      },
      openRightSidebar: function () {
         this.$root.removeClass("right_sidebar__close");
      },
   },
   methods: {},
   beforePrepare() {
      this.props.is_selected = !isEmpty(this.props.chat);
   },
};
