export default /*html*/ `
<div class="left_sidebar">

    <ChatAccount bind:account="account"></ChatAccount>

    <!-- Chats wrapper-->
    <div class="chats__wrapper chats_scrollable scroll_style">
        <!-- Chats -->
        <div class="chats ">

            <v-for :chat :index in chats>
            <!-- User -->

            <Chat bind:chat="chats[{{index}}]"></Chat>
            
            <!-- end User -->
            </v-for>

        </div>
        <!-- end chats -->

        <div class="chats__menu">
            {{form_search}}
        </div>

    </div>
    <!-- end Chats wrapper-->
</div>
`;
