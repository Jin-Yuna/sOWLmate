<template>
  <form @submit.prevent="next(letterData)">
    <div id="background">
      <div>
        <p class="push">Dear</p>
        <v-autocomplete
          chips
          deletable-chips
          filled
          solo
          v-model="letterData.toUserId"
          :items="penpalList"
          item-text="nickname"
          item-value="id"
          prepend-inner-icon="mdi-account-outline"
          placeholder="편지를 보낼 상대방을 선택해주세요."
        >
        </v-autocomplete>
        <p>,</p>
      </div>
      <div>
        <label for="title">Title</label><br />
        <v-text-field
          color="primary"
          prepend-inner-icon="mdi-format-title"
          label="title"
          variant="underlined"
          v-model="letterData.title"
        ></v-text-field>
        <p>,</p>
        <br />
        <label for="message">Message</label><br />
        <v-textarea
          prepend-inner-icon="mdi-comment"
          v-model="letterData.message"
          name="message_to_recipient"
          placeholder="Be SOULMATE, WITH SOWLMATE!"
        ></v-textarea
        ><br />
      </div>
      <div>
        <p>Yours soulful</p>
        <br />
        <v-text-field
          color="primary"
          id="sender_name"
          name="sender"
          placeholder="your name"
          prepend-inner-icon="mdi-account-heart-outline"
          variant="underlined"
        ></v-text-field>
        <v-btn class="main-btn btn-big mt-12" width="100%" type="submit">
          다음
        </v-btn>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LetterCreateView',

  data() {
    return {
      totalFriendsList: [],
      letterData: {
        fromUserId: '',
        toUserId: '',
        title: '',
        content: '',
        writingPad: '',
        writingFont: '',
      },
    };
  },
  computed: {
    ...mapGetters([
      'preFriendsList',
      'friendsList',
      'sowlmateList',
      'userInfo',
      'currentUser',
      'penpalList',
    ]),
  },
  mounted() {
    this.letterData.fromUserId = this.currentUser;
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 4em;
  color: #f7f7f7;
  margin-bottom: -15px;
}

p {
  display: inline;
  font-size: 1em;
}

#background {
  display: flex;
}

/*form*/
input,
textarea {
  border: none;
  border-radius: 4%;
  height: 1.9em;
  padding: 0.7em;
  font-size: 1.3em;
}

input:focus,
textarea:focus {
  outline-color: pink;
}

.mail_stamp {
  width: 100px;
  float: left;
}

#address {
  text-decoration: underline;
}

textarea {
  overflow: auto;
  resize: none;
  height: 10em;
  width: 17em;
  margin-top: 0.5em;
  margin-bottom: 1em;
}

.push {
  margin-bottom: 1em;
  margin-top: 0.5em;
}

#sender_name {
  margin-top: 4.5em;
  margin-bottom: 1.5em;
}

/* footer {
  margin: 2em auto;
  text-align: center;
  color: white;
} */
</style>
