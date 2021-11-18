<template>
  <el-container>
    <notice-box v-for="(item, index) of noticeList " :key="index+Math.random()" :user1Id="item.user1Id"
                :user2-id="item.user2Id" :user1Name="item.user1Name" :user2Name="item.user2Name"
                :lastInfo="item.lastInfo" :waitNumber="item.waitNumber" :dialogueId="item.dialogueId"></notice-box>
  </el-container>
</template>

<script>
import NoticeBox from './noticeBox'
export default {
  name: 'noticePage',
  components: {NoticeBox},
  data () {
    return {
      noticeList: [],
      start_position: 0,
      end_position: 10
    }
  },
  mounted () {
    // this.noticeList.push({
    //   user1Id: '1',
    //   user2Id: '2',
    //   user1Name: 'a',
    //   user2Name: 'b',
    //   lastInfo: 'hhh',
    //   waitNumber: 3
    // })
    this.$axios.post('dialogue/dialogue_list/', this.$qs.stringify({
      start_position: this.start_position,
      end_position: this.end_position
    })).then(response => {
      console.log(response.data)
      this.$message.info(response.data.message)
      let len = response.data.return_list.length
      let list = response.data.return_list
      for (let i = 0; i < len; ++i) {
        this.noticeList.push({
          user1Id: list[i].user1_id,
          user2Id: list[i].user2_id,
          user1Name: list[i].user1_name,
          user2Name: list[i].user2_name,
          lastInfo: list[i].last_info,
          waitNumber: list[i].wait_number,
          hasNext: list[i].has_next,
          dialogueId: list[i].dialogue_id
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
