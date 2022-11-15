<template>
  <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="NSFW"
  inactive-text="">
</el-switch>
</template>

<script>
export default {
    name:'AiSwitch',
    data() {
      return {
        value: false
      }
    }
}
</script>

<style scoped>

</style>