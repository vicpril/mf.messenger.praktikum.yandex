import template from "./FormChangeChatAvatar.tmpl";
import "./FormChangeChatAvatar.scss";
import { Avatar } from "../Avatar/Avatar";
import { InputFileGroup } from "../InputFileGroup/InputFileGroup";
import { $ } from "../../../utils/dom-abstraction";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";

export const FormChangeChatAvatar = {
   name: "FormChangeChatAvatar",
   template: template,
   components: [Avatar, InputFileGroup],
   props: {
      chat: {},
   },
   listeners: ["submit"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: HTMLFormElement }): void {
         if ($(e.target).hasClass("form__avatar_change")) {
            e.preventDefault();
            new ChatsController(this).uploadAvatar(
               this.props.chat.id,
               new FormData(e.target)
            );
         }
      },
   },
   beforePrepare() {
      this.props.chat = RightSidebarController.getChat();
   },
};
