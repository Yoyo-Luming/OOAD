<template>
  <div class="msg-wrapper" v-bind:class="{ self: isSelf }" style="display: flex;align-items: center;">
    <el-avatar :size="60" fit="fill" style="margin-right: 5px;margin-left: 5px;">
      <el-image style="height: 100%;width: 100%;" :src="header" fit="fill" v-if="hasHeader"></el-image>
      <el-image style="height: 100%;width: 100%;" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" fit="fill" v-else></el-image>
    </el-avatar>
    <span class="uname" style="margin-right: 5px;margin-left: 5px;">{{uname}}</span>
    <span>：</span>
    <el-image :src="url" v-if="isPhoto" alt="" style="margin-right: 5px;margin-left: 5px;"></el-image>
    <div v-else style="margin-right: 5px;margin-left: 5px;">
      {{content}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'msgBox',
  props: {
    hasHeader: Boolean,
    header: String,
    isPhoto: Boolean,
    uname: String,
    content: String,
    isSelf: Boolean,
    url: String
  },
  data () {
    return {
      isp: false
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-wrapper {
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px;
}
.self {
  flex-direction: row-reverse;
}

</style>
