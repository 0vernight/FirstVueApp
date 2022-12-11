<template>

  <div>

    <input type='text' id='username'>
    <input id='connectButton' type='button' value='Connect' @click='connect'>
    <input type='text' id='toUsername'>
    <div id='messages'>{{ data.username +':'+ data.message }}</div>
    <input type='text' id='message'>
    <input type='button' value='send' @click='sendToGroupChat'>
    <div style='hight:350px;overflow: auto;border-top: 1px solid #ccc' v-html="content"></div>

  </div>
</template>

<script type='application/javascript'>
let ws
export default {
  name: 'Im.vue',
  data () {
    return {
      msg: '这个是模板页',
      ulr: '',
      user: {},
      users: [],
      chatUser: '',
      text: '',
      content: '',
      data: [],
      messages: []
    }
  },
  created () {
    // this.init()
  },
  methods: {
    connect: function () {
      var ipPort = window.location.hostname + ':6339'
      let url
      let _this = this
      // alert('点击了connect!')
      url = 'ws://' + ipPort + '//chat'
      url = 'ws://' + ipPort + '//chatting'
      let username = document.getElementById('username').value
      let toUsername = document.getElementById('toUsername').value
      url += '/6339?username=' + username + '&toUsername=' + toUsername

      console.log('url:' + url) // ws://undefined/chat/6339?username=mike&toUsername=mike1
      console.log('port:' + window.location.port) // 16339
      console.log('host:' + window.location.host) // localhost:16339
      console.log('href:' + window.location.href) // http://localhost:16339/#/im
      console.log('hostname:' + window.location.hostname) // localhost
      ws = new WebSocket(url)
      ws.onopen = function () {
        console.log('websocket 已经打开')
      }
      // 客户端从服务端收到的消息
      ws.onmessage = function (e) {
        // alert(e.data)
        console.log(e.date)
        let data = JSON.parse(e.data)
        _this.data = data
        // alert(_this.data.message)
        // alert(this.data)
        // this.data().data(e.data)
        // alert(this.data.data)
        // console.log(data)
        _this.createContent(data.username, null, data.message)
        // this.printMessage(e.data)
      }
      document.getElementById('connectButton').value = 'Connected'
      document.getElementById('connectButton').disabled = true
      document.getElementById('username').disabled = true
      document.getElementById('toUsername').disabled = true
    },
    printMessage: function (data) {
      let messages = document.getElementById('messages')
      let messageData = JSON.parse(data)
      let newMessage = document.createElement('div')
      newMessage.innerHTML = data
      alert('创建好了div')
      newMessage.innerHTML = messageData.username + ' : ' + messageData.message
      messages.appendChild(newMessage)
    },
    sendToGroupChat: function () {
      let _this = this
      let messageText = document.getElementById('message').value
      document.getElementById('message').value = ''
      let username = document.getElementById('username').value
      let messageObject = {
        username: username,
        message: messageText
      }
      // alert(JSON.stringify(messageObject))
      ws.send(JSON.stringify(messageObject))
      _this.user = {username: username}
      _this.users.push(this.user)
      _this.messages.push({user: username, text: messageText})
      _this.createContent(null, this.user.username, messageText)
    },
    createContent: function (remoteUser, nowUser, text) {
      let html
      let _this = this
      // alert('createcontent 进来了' + remoteUser + nowUser + text)
      console.log('createcontent 进来了' + remoteUser + nowUser + text)
      // 当前用户消息
      if (nowUser) {
        html = '<div class=\'el-row\' style=\'padding: 5px 0\'>\n' +
          '     <div class=\'el-col el-col-22\' style=\'text-align: right; padding-right: 10px\'>\n' +
          '       <div class=\'tip left\'>' + text + ':' + nowUser + '</div>\n' +
          '     </div>\n' +
          '     <div class=\'el-col el-col-2\'>\n' +
          '       <span class=\'el-avatar el-avatar--circle\' style=\'height: 40px; width: 40px; line-height: 40px;\'>\n' +
          '          <img src=\'\' style=\'object-fit: cover;\'>\n' +
          '       </span>\n' +
          '     </div>\n' +
          '</div>'
      } else if (remoteUser) { // 远程用户消息
        html = '<div class=\'el-row\' style=\'padding: 5px 0\'>\n' +
          '       <div class=\'el-col el-col-2\' style=\'text-align: right\'>\n' +
          '         <span class=\'el-avatar el-avatar--circle\' style=\'height: 40px; width: 40px; line-height: 40px;\'>\n' +
          '           <img src=\'\' style=\'object-fit: cover;\'>\n' +
          '         </span>\n' +
          '       </div>\n' +
          '     <div class=\'el-col el-col-22\' style=\'text-align: left; padding-left: 10px\'>\n' +
          '       <div class=\'tip right\'>' + remoteUser + ':' + text + '</div>\n' +
          '     </div>\n' +
          '</div>'
      }
      // html = '<div class=\'el-row\' style=\'padding: 5px 0\'>\n' +
      //       '     <div class=\'el-col el-col-22\' style=\'text-align: right; padding-right: 10px\'>\n' +
      //       '       <div class=\'tip left\'>' + text + '</div>\n' +
      //       '     </div>\n' +
      //       ' </div>\n'
      console.log(html)
      _this.content += html
    }
  }
}
</script>

<style scoped>
.tip {
  icolor: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}
.right {
  background-color: deepskyblue;
}
.left{
  background-color: forestgreen;
}
</style>
