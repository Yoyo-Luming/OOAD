<template>
  <div class="msg-wrapper" v-bind:class="{ self: isSelf }">
    <span class="uname">{{uname}}</span>
    <span>：</span>
      <img :src="url" v-if="isPhoto" alt="">
      <div v-else>{{content}}</div>
  </div>

</template>

<script>
export default {
  name: 'msgBox',
  props: {
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
