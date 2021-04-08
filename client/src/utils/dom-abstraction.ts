export type TDomAbstraction = InstanceType<typeof DomAbstraction>;

class DomAbstraction {
   $el: HTMLElement;
   constructor(
      selector: HTMLElement | string,
      $root: HTMLElement | Document = document
   ) {
      this.$el =
         typeof selector === "string"
            ? document.querySelector(selector)
            : (selector as HTMLElement);
   }

   node(): HTMLElement {
      return this.$el;
   }

   html(): string;
   html(html): DomAbstraction;
   html(html?): string | DomAbstraction {
      if (typeof html === "string") {
         this.$el.innerHTML = html.trim();
         return this;
      }
      return this.$el.outerHTML.trim();
   }

   firstChild() {
      // @ts-ignore: Unreachable code error
      return $(this.$el.content.childNodes[0]);
   }

   // text(text: string | null | undefined) {
   //    if (typeof text === "string") {
   //       this.$el.textContent = text;
   //       return this;
   //    }
   //    if (this.$el.tagName.toLowerCase() === "input") {
   //       return (this.$el as HTMLInputElement).value.trim();
   //    }
   //    return this.$el.textContent.trim();
   // }

   clear() {
      this.html("");
      return this;
   }

   on(eventType: string, callback) {
      this.$el.addEventListener(eventType, callback);
   }

   off(eventType: string, callback) {
      this.$el.removeEventListener(eventType, callback);
   }

   find(selector: string) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return $(this.$el.querySelector(selector) as HTMLElement);
   }

   findAll(selector: string): HTMLElement[] {
      return Array.from(this.$el.querySelectorAll(selector));
   }

   closest(selector: string) {
      return $(this.$el.closest(selector) as HTMLElement);
   }

   parent() {
      return $(this.$el.parentNode as HTMLElement);
   }

   replaceChild(newChild: TDomAbstraction, oldChild: TDomAbstraction) {
      this.$el.replaceChild(newChild.$el, oldChild.$el);
      return this;
   }

   append(node: DomAbstraction | HTMLElement | ChildNode | Node) {
      if (node instanceof DomAbstraction) {
         node = node.$el;
      }

      if (Element.prototype.append) {
         this.$el.append(node);
      } else {
         this.$el.appendChild(node);
      }

      return this;
   }
}

export function $(
   selector: HTMLElement | string,
   $root: HTMLElement | Document = document
): DomAbstraction {
   return new DomAbstraction(selector);
}

$.create = (tagName: string, className?: string): DomAbstraction => {
   const el = document.createElement(tagName);
   if (className) {
      el.classList.add(className);
   }
   return $(el);
};
