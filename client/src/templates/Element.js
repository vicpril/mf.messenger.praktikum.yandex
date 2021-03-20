import { Templator } from "../classes/templator";
// import "./../templates/button/button.scss";


export class Element {
   constructor(template, selector, options) {
      this.$el = document.querySelector(selector);
      const tmpl = new Templator(template);
      this.element = tmpl.compile(options);
   }

   render() {
      this.$el.insertAdjacentHTML('beforeend', this.element);
      // this.renderCss(css);
   }

   // renderCss(css) {
   //    const link = document.createElement('link');
   //    link.rel = 'stylesheet';
   //    link.type = 'text/css';
   //    // link.href = 'button.scss';
   //    link.href = css;

   //    document.getElementsByTagName('head')[0]
   //       .appendChild(link);
   // }
}