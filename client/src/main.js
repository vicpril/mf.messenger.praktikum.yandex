import { Templator } from "./classes/templator";
import { blockTemplate } from "./templates/blocks/chats/block.tmpl.js";
import { Button } from "./templates/components/button/button";
import { Input } from "./templates/components/input/input";
import "./style.css";


// const tmpl = new Templator(blockTemplate());

// const context = {
//    text: 'Мой очень важный span',
//    className: 'chats',
//    user: {
//       info: {
//          firstName: 'Alexander',
//       },
//    },
//    handleClick: function () {
//       console.log(document.body);
//    }
// };

// const renderedTemplate = tmpl.compile(context); // Строка с html-вёрсткой

// const root = document.querySelector('.root');

// root.innerHTML = `
//       <p>Результат после нажатия виден в консоли</p>
//       ${renderedTemplate}
//       `;


const btn1 = new Button('.login-form__buttons', {
   id: "mybutton",
   css: "root__button button",
   content: "Say Hello"
})
btn1.render();

const btn2 = new Button('.login-form__buttons', {
   id: "mybutton2",
   css: "root__button button button__red",
   content: "Say Hello 222"
})
btn2.render();

const input1 = new Input('.login-form', {
   id: "myinput1",
   css: "login-form__input",
   name: "phone",
   valur: "123-123",
})
input1.render();

const input2 = new Input('.login-form', {
   id: "myinput2",
   css: "login-form__input",
   name: "phone",
   valur: "123-123",
})
input1.render();
