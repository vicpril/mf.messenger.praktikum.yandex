export default `
<!-- Left sidebar -->
<div class="left_sidebar">

    <!-- Account -->
    <div class="account__wrapper">

        {{account}}

    </div>
    <!-- end Account -->

    <!-- Chats wrapper-->
    <div class="chats__wrapper chats_scrollable scroll_style">
        <!-- Chats -->
        <div class="chats ">

            <v-for :chat :index in chats>
            <!-- User -->
            <div class="chats__user">
                {{chat}}
            </div>
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
<!-- end Left sidebar -->
`;