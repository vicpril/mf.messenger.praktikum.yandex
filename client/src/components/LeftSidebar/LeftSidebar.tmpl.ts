export default /*html*/ `
<div class="left_sidebar">

    <ChatAccount bind:account="account"></ChatAccount>

    <!-- Chats wrapper-->
    <div class="chats__wrapper chats_scrollable scroll_style">
        <!-- Chats -->
        <Chats bind:chats="chats"></Chats>
        <!-- end chats -->

        <ChatSearch></ChatSearch>
        
    </div>
    <!-- end Chats wrapper-->
</div>
`;
