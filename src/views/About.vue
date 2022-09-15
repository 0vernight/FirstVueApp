<template>
  <div class="about">
    <table>
      <tr>
        <td>编号</td>
        <td>内容</td>
      </tr>
      <tr v-for="(item,index) in books" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.serial}}</td>
      </tr>
      <tr>
        <td>00</td>
        <td>{{msg}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: '这个是about模板页',
      books: [
        {
          id: 1,
          serial: '测试1'
        },
        {
          id: 2,
          serial: '测试2'
        },
        {
          id: 3,
          serial: 'json格式3'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
