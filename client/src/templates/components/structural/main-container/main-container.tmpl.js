export default `
<!-- Main -->
        <main class="main right_sidebar__close">

            <v-if="current_user">

                <!-- messager -->
                <div class="messager ">

                    {{messager}}

                </div>
                <!-- end messager -->

                <!-- messager form -->
                <div class="messager__menu">
                    {{form_send_message}}
                </div>
                <!-- end form -->

            <v-else>
                <div class="chat_placeholder">
                <h3>
                Select a friend to type with...
                </h3>
                </div>

            </v-if>

            <!-- Right-sidebar -->
                {{right_sidebar}}
            <!-- end Right-sidebar -->
        </main>
        <!-- end main -->
`;