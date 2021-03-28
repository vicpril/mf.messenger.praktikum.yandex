export default `<section class="block block__message 
                    <v-if="is_foreign">
                        block_foreign"
                    <v-else>
                        block_own"
                    </v-if>
                    >
                    <div class="block__username">
                        <span class="user__displayname">{{user.display_name}}</span>
                    </div>

                    <div class="block__user_messages">
                        {{avatar}}
                        <div class="block__messages">

                            <v-for :message :index in messages>
                                <div class="message__wrapper">
                                    <div class="message__content">
                                        <span class="message_text">{{message.content}}</span>
                                    </div>
                                    <span class="message__time">{{message.time}}</span>
                                </div>
                            </v-for>

                        </div>
                    </div>
</section>`;