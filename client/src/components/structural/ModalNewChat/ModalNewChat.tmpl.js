export default /* html */ `
<div class="modal_new_chat">
   <div class="modal_new_chat__overlay"></div>

   <form class="modal_new_chat__card">
      <div class="card__header"><span>Create a new Chat</span></div>
      <div class="card__body">
      <InputGroup bind:property="form.title" bind:control="form_control.title" bind:options="fields[0]"></InputGroup>
      </div>
      <div class="card__footer">
         <button
            type="button"
            class="button button_outline_primary"
            data-action="cancel"
         >
            Cancel
         </button>
         <button
            type="submit"
            class="button button_primary"
            data-action="newChatSubmit"
         >
            Create
         </button>
      </div>
   </form>
</div>

`;
