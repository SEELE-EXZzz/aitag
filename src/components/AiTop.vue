<template>
<div id="AiTop">
  <el-button type="text" @click="open" id="diary">更新日记</el-button>
  <el-button id="bilibili"><a href="https://space.bilibili.com/523424577/dynamic?spm_id_from=444.41.my-info.face.click" target="_blank">b站主页</a></el-button>
</div>
</template>

<script>
export default {
    name: "AiTop",
    methods: {
      open() {
        this.$bus.$emit('ShowDiary')
      }
    }
}
</script>

<style scoped>
  #AiTop{
    position: absolute;
    width: 99%;
    height: 6%;
    background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    
  }
  #AiSwitch{
    position: absolute;
    left: 90%;
  }
  #diary{
    position: absolute;
    left: 80%;
    margin-top: 10px;
  }
  #bilibili{
    position: absolute;
    left: 90%;
    margin-top: 10px;
    background-color: #fb7299;
  }
  a{
    text-decoration: none;
    color: #fff;
  }
</style>