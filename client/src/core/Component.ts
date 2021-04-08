import { $, TDomAbstraction } from "../utils/dom-abstraction";
import { isEmpty } from "../utils/isEmpty";
import { get } from "../utils/pure-functions";
import { ComponentDOMListenrt } from "./ComponentDOMListener";
import { TEmmiter, getEmmiter, Subscription } from "./Emmiter";
import { Templator } from "./templators/templator";
import { TemplatorProps } from "./templators/templator-props";

type TRawStaff = {
   name: string;
   template?: string;
   components: TRawStaff[];
   listeners?: string[];
   subscribers?: Object;
   props?: Object;
   methods?: Object;
   beforeCreate?: () => void;
   beforeMount?: () => void;
   beforeInit?: () => void;
   afterInit?: () => void;
   beforeUpdate?: () => void;
   beforeDestroy?: () => void;
};

// type TMethod = (...args: any) => void;

type ComponentLifeCycleNames = {
   BEFORE_CREATE: string;
   BEFORE_MOUNT: string;
   BEFORE_INIT: string;
   AFTER_INIT: string;
   UPDATE: string;
   DESTROY: string;
};

export class Component extends ComponentDOMListenrt {
   static className: string = "";

   EVENTS: ComponentLifeCycleNames;
   emmiter: TEmmiter;
   emmiterSubscriptions: Subscription[] = [];
   components: TRawStaff[] = [];
   componentsInst: Component[] = [];
   template: string = "";
   subscribers?: Object;
   options?: TRawStaff;
   // parentComponent: Component | null;
   props: any;

   constructor(
      private $targetEl: TDomAbstraction,
      options: TRawStaff,
      public parentComponent: Component | null = null
   ) {
      super(options.listeners);
      this.name = options.name || (Component.name as string);
      this.components = options.components;
      this.template = options.template || "";
      this.props = options.props ?? {};
      this.subscribers = options.subscribers || {};
      this.methods = options.methods || {};

      this.initMethods(options);

      this.emmiter = getEmmiter();

      this.prepare();
   }

   private initMethods(options: TRawStaff) {
      Object.getOwnPropertyNames(options.methods).forEach((key) => {
         Object.defineProperty(this, key, {
            configurable: false,
            writable: false,
            value: options.methods[key].bind(this),
         });
      });

      const LifeCycleMethods = [
         "beforeCreate",
         "beforeMount",
         "beforeInit",
         "afterInit",
         "beforeUpdate",
         "beforeDestroy",
      ];

      LifeCycleMethods.forEach((key) => {
         if (options[key]) {
            Object.defineProperty(this, key, {
               configurable: false,
               writable: false,
               value: options[key].bind(this),
            });
         }
      });
   }

   // get props from template
   // init LifeCycle events in Emmiter
   private prepare(): void {
      this.getPropsFromTemplate();
      this.initSubscribers();
      this.initEventsNames();
      this.initLifeCycleEvents();
      this.$emit(this.EVENTS.BEFORE_CREATE);
   }

   getPropsFromTemplate(): void {
      if (isEmpty(this.parentComponent)) return;
      if (!get(this.parentComponent, "props", false)) {
         this.props = {};
         return;
      }
      const templator = new TemplatorProps(this.$targetEl.html());
      this.props = templator.compile(this.parentComponent.props);
   }

   private initEventsNames(): void {
      this.EVENTS = {
         BEFORE_CREATE: `${this.name}:beforeCreate`,
         BEFORE_MOUNT: `${this.name}:beforeMount`,
         BEFORE_INIT: `${this.name}:beforeInit`,
         AFTER_INIT: `${this.name}:afterInit`,
         UPDATE: `${this.name}:update`,
         DESTROY: `${this.name}:destroy`,
      };
   }

   private initLifeCycleEvents(): void {
      this.$on(this.EVENTS.BEFORE_CREATE, this._beforeCreate.bind(this));
      this.$on(this.EVENTS.BEFORE_MOUNT, this._beforeMount.bind(this));
      this.$on(this.EVENTS.BEFORE_INIT, this._beforeInit.bind(this));
      this.$on(this.EVENTS.AFTER_INIT, this._afterInit.bind(this));
      this.$on(this.EVENTS.UPDATE, this._update.bind(this));
      this.$on(this.EVENTS.DESTROY, this._destroy.bind(this));
   }

   beforeCreate(): void {}
   private _beforeCreate(): void {
      this.beforeCreate();
      // CREATE: create $root
      this.initRoot();

      // RENDER all children components
      //       foreach components
      //             component
      //             find all TAGS of Class in $root  --> $componentsInst
      //                      <Chat bind:chats=chats bind:index=0></Chat>     <--- $root
      //                      <Chat bind:chats=chats bind:index=1></Chat>
      //                      <Chat bind:chats=chats bind:index=2></Chat>
      //                      foreach $components ($component)
      //                            const $el = $component
      //                            const component = new Class($el, {???}, this)

      //                      <div class=""></div>  <-- component.props = {chats, index: 0}
      //                      <div class=""></div>  <-- component.props = {chats, index: 1}

      //                            component.render() - ?????????? возможно ренден не нужен
      //                            this.componentsInst.push(component)
      this.initChildren();

      this.$emit(this.EVENTS.BEFORE_MOUNT);
   }

   private initRoot(): void {
      const templateCompiled = this.compileTemplate(this.template);
      this.$root = this.buildDomAbstraction(templateCompiled);
   }

   private compileTemplate(template: string): string {
      if (isEmpty(template.trim())) {
         return "";
      }
      const context = get(this.parentComponent, "props", {});
      const templator = new Templator(template);
      return templator.compile(context).trim();
   }

   private buildDomAbstraction(template: string): TDomAbstraction {
      return $.create("template")
         .html(template as string)
         .firstChild() as TDomAbstraction;
   }

   private initChildren(): void {
      this.components.forEach((RawStaff: TRawStaff) => {
         const $tags: TDomAbstraction[] = this.findAllTags(RawStaff.name);
         $tags.forEach(($targetEl) => {
            const component = new Component($targetEl, RawStaff, this);
            this.componentsInst.push(component);
         });
      });
   }

   private findAllTags(tagName: string): TDomAbstraction[] {
      return this.$root.findAll(tagName).map((el) => $(el));
   }

   beforeMount(): void {}
   private _beforeMount(): void {
      this.beforeMount();
      // MOUNT: replace $targetEl on $root
      this.$targetEl.parent().replaceChild(this.$root, this.$targetEl);

      this.$emit(this.EVENTS.BEFORE_INIT);
   }

   beforeInit(): void {}
   private _beforeInit(): void {
      this.beforeInit();
      this.initDOMListeners();
      this.$emit(this.EVENTS.AFTER_INIT);
   }

   private initSubscribers(): void {
      Object.getOwnPropertyNames(this.subscribers).forEach((key: string) => {
         this.$on(key, this.subscribers[key].bind(this));
      });
   }

   afterInit(): void {}
   private _afterInit(): void {
      this.afterInit();
   }

   beforeUpdate(): void {}
   private _update(): void {
      this.beforeUpdate();
      // UPDATE: rereder
   }

   beforeDestroy(): void {}
   private _destroy(): void {
      this.beforeDestroy();
      // DESTROY: create $root
      this.removeDOMListeners();
      this.emmiterSubscriptions.forEach((sub) => sub.unsubscribe());
   }

   render(): void {}

   _reRender(): void {}

   $emit(event: string, ...params: any): void {
      this.emmiter.emit(event, ...params);
   }

   $on(event: string, fn): void {
      const subscription = this.emmiter.subscribe(event, fn);
      this.emmiterSubscriptions.push(subscription);
   }
}
