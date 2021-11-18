<template>

  <div class="msg-wrapper" v-bind:class="{ self: isSelf }">
    <span class="uname">{{name}}</span>
    <span>：</span>
      <img :src="url" v-if="isPhoto">
      <div v-else>{{content}}</div>
  </div>

</template>

<script>
export default {
  name: 'msgBox',
  props: {
    isPhoto: Boolean,
    name: String,
    content: String,
    isSelf: Boolean,
    url: String
  },
  data () {
    return {
      isp: false
    }
  },
  mounted () {
    console.log(this.url)
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
.content {
  border: 1px solid #555;
  border-radius: 2px;
  padding: 3px;
}
.self {
  flex-direction: row-reverse;
}

</style>
