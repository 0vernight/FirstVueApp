<template>
  <div class="home">
    {{ msg }}
    <div>
      名字：<input v-model='phone' name="username">
      <button @dblclick="see">Greet</button><br/>
      <audio ref="media"
             controls="controls"
             v-on:click="see"
             src='static/media/nega.mp3' >
        nega
      </audio>
    </div>
    <table>
      <th>数据开始输出</th>
      <tr v-for="(item,index) in data" :key="index">
        <td>{{ index }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.author }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.brief }}</td>
        <td>{{ item.pubyear }}</td>
      </tr>
    </table>
    <table>
      <tr v-for="(item1,index) in strdata" :key="index">
        <td>最后一行！</td>
        <td>{{ item1.type }}</td>
        <td>{{ item1.name }}</td>
        <td>{{ item1.author }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '这个是home模板页',
      data: [],
      strdata: []
    }
  },
  created: function () {
    console.log('测试日志打不出来？')
    const _this = this
    this.$axios({
      url: 'http://localhost:8181/showAllBook',
      method: 'get',
      headers: {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*'},
      responseType: 'json',
      responseEncoding: 'utf8',
      data: ' ',
      dataType: 'json'
    }).then(res => {
      console.log('成功xml=' + res.data.data)
      _this.data = res.data.data
      // alert(typeof res.data.data)
      let json = JSON.stringify(res.data.data)
      // JSON.parse()
      console.log('成功json=' + json)
      json = JSON.parse(json)
      // alert(typeof json)
      let strdata = [{
        type: 'horn',
        name: 'boy',
        author: 'mike gadfather'
      }]
      this.strdata = strdata
      console.log('测试进来了 =' + _this.data.length + _this.data)

      // alert(res.data.code);
    }).catch(err => {
      console.log('失败' + err.data)
    })
    // this.$axios.get('http://localhost:8181/showAllBook').then(function (resp) {
    //   _this.data = resp.data
    //   console.log(resp)
    //
    // })
    console.log('created final!')
  },
  methods: {
    see () {
      var self = this
      alert('see hanshu jinlaile')
      self.audio.play()
      console.log(self.media.action.play())
    }
  }
}
</script>

<style scoped>

</style>
