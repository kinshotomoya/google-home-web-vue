<template>
  <div id='content'>
    <v-hover>
      <v-timeline v-show='timeLineWrapper'>
        <v-timeline-item
          v-for='message in messages'
          :key='message.created_at'
          large
          class='timeline-item'
          v-show='matchSearchName(message)'
        >
          <v-avatar slot="icon">
            <img v-bind:src="selectUserIcon(message)">
          </v-avatar>
          <span slot="opposite">{{ message.user_name }}</span>
          <v-card class="elevation-2">
            <v-card-title class="headline">{{ message.created_at }}</v-card-title>
            <v-card-text>{{ message.message_text }}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-hover>
  </div>
</template>

<script>
import axios from 'axios'
import lodash from 'lodash'

export default {
  props: {
  },
  data() {
    return {
      messages: this.$store.state.messages,
      colorName: ''
    }
  },
  created() {
    this.get_messages()
  },
  methods: {
    get_messages: async function() {
      // TODO:async awaitで書き直す
      // TODO: 取得したmessagesをstoreに登録する処理を書く
      if (this.$store.state.messages === null) {
        // TODO: No 'Access-Control-Allow-Origin'エラーが出るので対応
        // NOTE: DONE
        const res = await axios.get(
          'https://rh3pf63lma.execute-api.ap-northeast-1.amazonaws.com/production/messages'
        )
        console.log(res.data.Items);
        // TODO: resの中のデータの形式がDynamoDB用に変わっているので、変更する
        this.$store.dispatch('doAddMessages', res.data.Items);
        this.messages = this.$store.state.messages
      }
    }
  },
  computed: {
    setCardColor: function(){  // computedでは引数を受け取ることができないので、このようなfunctionをreturnする書き方にする
      return function(message) {
        var colorName
        var userName = message.user_name
        if(userName === 'ともや') {
          colorName = 'cyan lighten-4'
        } else if(userName === 'まま') {
          colorName = 'deep-orange lighten-4'
        } else if(userName === 'なな') {
          colorName = 'purple lighten-4'
        } else if(userName === 'いくや') {
          colorName = 'pink lighten-4'
        } else if(userName === 'みみ') {
          colorName = 'teal lighten-4'
        } else {
          colorName = 'blue-grey lighten-4'
        }
        return colorName
      }
    },
    matchSearchName: function() {  // searchNameと同じ名前のmesageがあればtrueを返す
      return function(message) {
        var searchName = this.$store.state.searchName
        if (message.user_name.indexOf(searchName) != -1 || searchName === null) {
          return true
        } else {
          return false
        }
      }
    },
    timeLineWrapper: function() {
      if (this.$store.state.messages === null) {
        return false
      } else {
        return true
      }
    },
    selectUserIcon: function() {
      return function(message) {
        // TODO: データの形式が変わっているので、変更
        var userName = message.user_name
        // 以下はハードコーディング
        if (userName === 'ともや') {
          // NOTE:
          // バインドさせてimageのsrcを指定する場合は、requireで画像をモジュールとして
          // 読み込ませて意図的にエンコードしてあげないと、表示できない
          // http://tk2000ex.blogspot.com/2017/11/vue.html
          return require('../../static/tomo.jpg')
          // return '/tomo.jpg'
        } else if (userName === 'まま') {
          return '../../static/mama.jpg'
        } else if (userName === 'なな') {
          return '../../static/nana.jpg'
        } else if (userName === 'いくや') {
          return '../../static/iku.jpg'
        } else if (userName === 'みみ') {
          return '../../static/mimi.jpg'
        } else {
          return '../../static/papa.jpg'
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {  //  これでvmでインスタンスにアクセスできる
      vm.$store.dispatch('doChangeHeaderTitle', 'みんなの会話')
    })
  }
}
</script>

<style lang="css" scoped>
  .message_content {
    margin: 50px;
    text-align: center;
  }
  .each_message_wrapper {
    margin: 30px 0 !important;
  }
  #content {
    margin-top: 130px;
  }
  .message_text {
    margin: 30px 0;
  }
  .card {
    font-size: 15px;
  }
  .v-enter-active, .v-leave-active {
    transition: opacity 0.5s, transform 0.5s;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(-10px);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
  .elevation-2 {
    font-size: 10px;
  }
  .headline {
    font-size: 12px !important;
  }
  .v-timeline {
    margin: 0 5px;
  }
</style>
