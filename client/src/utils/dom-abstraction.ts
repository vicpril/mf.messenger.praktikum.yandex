export type TDomAbstraction = InstanceType<typeof DomAbstraction>;

class DomAbstraction {
   $el: HTMLElement;
   constructor(selector: HTMLElement | Element | string) {
      this.$el =
         typeof selector === "string"
            ? (document.querySelector(selector) as HTMLElement)
            : (selector as HTMLElement);
   }

   node(): HTMLElement {
      return this.$el;
   }

   html(): string;
   html(html: string): DomAbstraction;
   html(html?: string): string | DomAbstraction {
      if (typeof html === "string") {
         this.$el.innerHTML = html.trim();
         return this;
      }
      return this.$el.outerHTML.trim();
   }

   text(): string;
   text(text: string): DomAbstraction;
   text(text?: string): string | DomAbstraction {
      if (typeof text === "string") {
         this.$el.textContent = text;
         return this;
      }
      if (this.$el.tagName.toLowerCase() === "input") {
         return (this.$el as HTMLInputElement).value.trim();
      }
      return (this.$el.textContent as string).trim();
   }

   get data(): DOMStringMap {
      return this.$el.dataset;
   }

   firstChild() {
      // @ts-ignore: Unreachable code error
      return $(this.$el.content.childNodes[0]);
   }

   clear() {
      this.html("");
      return this;
   }

   on(eventType: string, callback: () => {}, useCapture: boolean = false) {
      this.$el.addEventListener(eventType, callback, useCapture);
   }

   off(eventType: string, callback: () => {}) {
      this.$el.removeEventListener(eventType, callback);
   }

   find(selector: string) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return $(this.$el.querySelector(selector) as HTMLElement);
   }

   findAll(selector: string): HTMLElement[] {
      return Array.from(this.$el.querySelectorAll(selector));
   }

   css(styles: { [name: string]: any }): TDomAbstraction {
      Object.keys(styles).forEach((key) => {
         this.$el.style[<any>key] = styles[key];
      });
      return this;
   }

   hasClass(niddle: string): boolean {
      return this.$el.classList.contains(niddle);
   }

   hasId(niddle: string): boolean {
      return this.$el.id === niddle;
   }

   addClass(niddle: string): TDomAbstraction {
      this.$el.classList.add(niddle);
      return this;
   }

   removeClass(niddle: string): TDomAbstraction {
      this.$el.classList.remove(niddle);
      return this;
   }

   toggleClass(niddle: string): TDomAbstraction {
      if (this.hasClass(niddle)) {
         this.removeClass(niddle);
      } else {
         this.addClass(niddle);
      }
      return this;
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

      if (typeof Element.prototype.append !== "undefined") {
         this.$el.append(node);
      } else {
         this.$el.appendChild(node);
      }

      return this;
   }

   isEmpty(): boolean {
      return typeof this.$el === "undefined";
   }

   remove(): void {
      this.$el.remove();
   }
}

export function $(selector: HTMLElement | Element | string): DomAbstraction {
   return new DomAbstraction(selector);
}

$.create = (tagName: string, className?: string): DomAbstraction => {
   const el = document.createElement(tagName);
   if (className) {
      el.classList.add(className);
   }
   return $(el);
};
