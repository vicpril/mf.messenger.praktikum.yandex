import { v4 as uuidv4 } from "uuid";
import { $, TDomAbstraction } from "../utils/dom-abstraction";
import {
   IComponentLifeCycleNames,
   IIngredients,
   IMethods,
} from "./ComponentInterfaces";
import {
   ISubscriberMethods,
   ISubscription,
   TEmmiter,
   getEmmiter,
} from "./Emmiter";

import { ComponentDOMListener } from "./ComponentDOMListener";
import { Templator } from "./templators/templator";
import { TemplatorProps } from "./templators/templator-props";
import { get } from "../utils/pure-functions";
import { isEmpty } from "../utils/isEmpty";
import { IContext } from "./templators/templatorInterface";

export class Component extends ComponentDOMListener {
   EVENTS: IComponentLifeCycleNames;
   emmiter: TEmmiter = getEmmiter();
   emmiterSubscriptions: ISubscription[] = [];
   components: IIngredients[] = [];
   componentsInst: Component[] = [];
   template: string = "";
   subscribers?: ISubscriberMethods = {};
   options: IIngredients;
   props: any;
   models: any;
   id: string = uuidv4();
   methods: IMethods = {};
   page?: string;

   constructor(
      private $targetEl: TDomAbstraction,
      options: IIngredients,
      public parentComponent: Component | null = null,
      ...args: object[]
   ) {
      super(options.listeners);
      if (isEmpty(options)) {
         throw new Error(`No options in Component`);
      }
      if (!options.name) {
         throw new Error(`No name defined in Component`);
      }

      Object.assign(options, ...args);
      Object.assign(this, ...args);

      this.name = options.name ?? (Component.name as string);
      this.components = options.components ?? [];
      this.template = options.template ?? "";
      this.props = options.props ?? {};
      this.models = options.models ?? [];
      this.subscribers = options.subscribers ?? {};

      this.initMethods(options);

      this.prepare();
   }

   private initMethods(options: IIngredients): void {
      if (options.methods) {
         this.methods = options.methods;
         Object.getOwnPropertyNames(this.methods).forEach((key) => {
            Object.defineProperty(this, key, {
               configurable: false,
               writable: false,
               value: this.methods[key].bind(this),
            });
         });
      }

      const BaseMethods = [
         "beforePrepare",
         "beforeCreate",
         "beforeMount",
         "beforeInit",
         "afterInit",
         "beforeUpdate",
         "beforeDestroy",
      ];

      BaseMethods.forEach((key: string) => {
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
   beforePrepare(): void {}
   private prepare(): void {
      this.getPropsFromTemplate();
      this.beforePrepare();
      this.initSubscribers();
      this.initEventsNames();
      this.initLifeCycleEvents();
      this.$emit(this.EVENTS.BEFORE_CREATE);
   }

   private getPropsFromTemplate(): void {
      if (!this.parentComponent || isEmpty(this.parentComponent)) return;
      if (!get(this.parentComponent, "props", false)) {
         this.props = {};
         return;
      }
      const templator = new TemplatorProps(this.$targetEl.html());
      const propsFromParent = templator.compile(this.parentComponent.props);
      this.props = { ...this.props, ...this.makePropsProxy(propsFromParent) };
   }

   private makePropsProxy(prop: IContext): object {
      const proxies: IContext = {};
      Object.getOwnPropertyNames(prop).forEach((key: string) => {
         if (this.parentComponent && typeof prop[key] === "object") {
            const proxy = new Proxy(prop[key], {
               get(target, prop) {
                  return target[prop];
               },
               set(target, prop, value) {
                  target[prop] = value;
                  return true;
               },
            });
            proxies[key] = proxy;
         } else {
            proxies[key] = prop[key];
         }
      });

      return proxies;
   }

   private initEventsNames(): void {
      const prefix = this.emmiter.contains(`${this.name}:beforeCreate`)
         ? `${this.name}_${this.id}`
         : this.name;

      this.EVENTS = {
         BEFORE_CREATE: `${prefix}:beforeCreate`,
         BEFORE_MOUNT: `${prefix}:beforeMount`,
         BEFORE_INIT: `${prefix}:beforeInit`,
         AFTER_INIT: `${prefix}:afterInit`,
         UPDATE: `${prefix}:update`,
         DESTROY: `${prefix}:destroy`,
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
      this.bindModels();

      // RENDER all children components
      this.initChildren();

      this.$emit(this.EVENTS.BEFORE_MOUNT);
   }

   private bindModels(): void {
      if (this.models) {
         this.models.forEach((modelName: string) => {
            const elements = [...this.$root.findAll(`[model="${modelName}"]`)];

            let value: string = "";

            Object.defineProperty(this.props, modelName, {
               configurable: true,
               get() {
                  return value;
               },
               set(newValue: string) {
                  value = newValue;
                  elements.forEach((el) => {
                     if (el.tagName === "INPUT") {
                        (el as HTMLInputElement).value = newValue;
                     } else {
                        el.textContent = value;
                     }
                  });
               },
            });

            this.$root.findAll(`input[model="${modelName}"]`);
            this.addSingleListener("keyup", (e) => {
               this.props[modelName] = (e.target as HTMLInputElement).value;
            });
         });
      }
   }

   private initRoot(): void {
      const templateCompiled = this.compileTemplate(this.template);
      this.$root = this.buildDomAbstraction(templateCompiled);
   }

   private compileTemplate(template: string): string {
      if (isEmpty(template.trim())) {
         return "";
      }
      // const context = get(this.parentComponent, "props", {});
      const context = this.props;
      const templator = new Templator(template);
      return templator.compile(context).trim();
   }

   private buildDomAbstraction(template: string): TDomAbstraction {
      return $.create("template")
         .html(template as string)
         .firstChild() as TDomAbstraction;
   }

   private initChildren(): void {
      this.components.forEach((Ingredients: IIngredients) => {
         const $tags: TDomAbstraction[] = this.findAllTags(Ingredients.name);
         $tags.forEach(($targetEl) => {
            const component = new Component($targetEl, Ingredients, this);
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
      if (!this.$root.isEmpty()) {
         this.$targetEl.parent().replaceChild(this.$root, this.$targetEl);
      } else {
         this.$targetEl.remove();
      }

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
         if (this.subscribers) {
            this.$on(key, this.subscribers[key].bind(this));
         }
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
      this.reBuild();
   }

   beforeDestroy(): void {}
   private _destroy(): void {
      this.beforeDestroy();
      // DESTROY:
      // remove listeners, unsubscribe, recursive for children
      this.removeDOMListeners();
      this.emmiterSubscriptions.forEach((sub) => sub.unsubscribe());
      this.componentsInst.forEach((component) => {
         component.$emit(component.EVENTS.DESTROY);
      });
      this.componentsInst = [];
   }

   private reBuild(): void {
      this.$targetEl = this.$root;
      this.$emit(this.EVENTS.DESTROY);
      this.$emit(this.EVENTS.BEFORE_CREATE);
   }

   $emit(event: string, ...params: any): void {
      this.emmiter.emit(event, ...params);
   }

   $on(event: string, fn: () => {}): void {
      const subscription = this.emmiter.subscribe(event, fn);
      this.emmiterSubscriptions.push(subscription);
   }

   $show(): void {
      this.$root.css({ opacity: 1 });
   }

   $hide(): void {
      this.$root.css({ opacity: 0 });
   }
}
