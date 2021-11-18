<template>
  <el-badge :value="waitNumber">
    <el-card :body-style="{ padding: '0px' }">
    <!--    <img :src="photo" class="image">-->
    <div style="padding: 14px;">
      <span>{{user1Name}}</span>
      <!--      <span>{{time}}</span>-->
      <div class="bottom clearfix">
        消息:  {{lastInfo}}
        <el-button type="text" class="button" @click="toChatPage">消息详情</el-button>
      </div>
    </div>
  </el-card>
  </el-badge>

</template>

<script>
export default {
  name: 'noticeBox',
  props: {
    dialogueId: String,
    user1Id: String,
    user2Id: String,
    user1Name: String,
    user2Name: String,
    lastInfo: String,
    waitNumber: String
  },
  data () {
    return {
      // test: ''
    }
  },
  methods: {
    toChatPage () {
      // console.log('toChatPage!')
      let otherName = ''
      let otherId = ''
      if (this.user1Name === this.$global.userName) {
        otherName = this.user2Name
        otherId = this.user2Id
      } else {
        otherName = this.user1Name
        otherId = this.user1Id
      }
      this.$router.push({name: 'chatPage', params: {name: otherName, id: otherId, dialogueId: this.dialogueId}})
    }
  }
}
</script>

<style scoped>

</style>
