export default `
<!-- Main -->
        <main class="main">
            <v-if="current_user">
                <!-- messager     -->
                <div class="messager ">

                    <!-- messager__wrapper -->
                    <div class="messager__wrapper messager_scrollable scroll_style">
                        <v-for :block :index in blocks>
                            {{block}}
                        </v-for>
                    </div>
                    <!-- end messager__wrapper -->

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