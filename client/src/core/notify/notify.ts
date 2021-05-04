import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import "./notify.scss";

export enum NoticeStatus {
   SUCCESS = "success",
   ERROR = "danger",
   WARNING = "warning",
}

class Notice {
   private $wrapper: TDomAbstraction;
   constructor(
      private text: string,
      private status: NoticeStatus,
      private delay: number
   ) {
      this.init();
   }

   private init(): Notice {
      this.$wrapper = $.create("div", `notice ${this.status}`).append(
         $.create("span", "notice_text").text(this.text)
      );
      $("body").append(this.$wrapper);
      this.hide = this.hide.bind(this);
      this.$wrapper.on("click", this.hide);
      return this;
   }

   show(): Notice {
      setTimeout(() => {
         this.$wrapper.addClass("show");
         setTimeout(() => {
            this.hide();
         }, this.delay);
      }, 200);
      return this;
   }

   hide(): void {
      this.$wrapper.removeClass("show");
      setTimeout(() => {
         this.destroy();
      }, 200);
   }

   private destroy() {
      this.$wrapper.off("click", this.hide);
      this.$wrapper.remove();
   }
}

export function notify(
   text: string,
   status: NoticeStatus = NoticeStatus.SUCCESS,
   delay: number = 5000
) {
   return new Notice(text, status, delay).show();
}
export function notifyError(text: string, delay: number = 5000) {
   return notify(text, NoticeStatus.ERROR, delay);
}
