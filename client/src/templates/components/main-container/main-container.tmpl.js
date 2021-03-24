export default `
<!-- Main -->
        <div class="main">
            <v-if="current_user">
            <v-else>
                <div class="chat_placeholder">
                <h3>
                Select a friend to type with...
                </h3>
                </div>
            </v-if>
            <!-- messager__wrapper -->
            <div class="messager__wrapper messager_scrollable scroll_style">
                <v-for :block :index in blocks>
                    {{block}}
                </v-for>
            </div>
            <!-- end messager__wrapper -->

            <!-- messager form -->
            <div class="messager__menu">
                {{form_send_message}}
            </div>
            <!-- end form -->
        </div>
        <!-- end main -->
`;