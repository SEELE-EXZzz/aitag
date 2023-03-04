<template>
  <div id="diary">
    <div id="head">
      <span>这里是更新日记,有什么更新内容都会放在这里,本网站的食用指南可以<a :href="url[1]" target="_blank">点击这里</a>,另外关于tag分类,今天刚发现了一个
        <a href="https://ai.kromiose.top/#/" target="_blank">网站</a>叫做Tag词库贡献站,而且还附有数据库接口,回头有空就搬运过来
      </span>
      
    </div>
    <div id="content">
      <p>1.0.0版本正式上线,制作时长2周半,目前还有很多不足的地方,后续慢慢增加</p>
      <p>1.0.1版本,修复了重复点击tag会生成多个tag,上下页或者切换页面时,已有的tag颜色变回去,上下页时,第一个tag消失等bug</p>
      <p>删除了图片上传功能感觉用处不大，而且好多人把这个网站当做ai绘画网站。</p>
    </div>
    <div id="nav">
      <ul>
        <li>1.0.0</li>
        <li>1.0.1</li>
      </ul>
      <el-button id="cancel" @click.native="cancel">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name:'diary',
    data() {
      return {
        url:['https://space.bilibili.com/523424577/dynamic?spm_id_from=444.41.my-info.face.click',
        'https://www.bilibili.com/read/cv19595645?spm_id_from=444.41.list.card_article.click'],
        
      }
    },
    methods:{
      cancel(){
        this.$bus.$emit('CancelDiary')
      }
    }
}
</script>

<style scoped>
ul{
  list-style: none;
}
#diary{
    position: absolute;
    width: 50%;
    height: 60%;
    top: 20%;
    left: 30%;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background-color: rgba(255,255,255,0.8);
}
#head{
    height: 10%;
    background-color: rgba(255,181,228,0.2);
    
}
#content{
    position: absolute;
    margin-top: 10px;
    height: 85%;
    width: 80%;
    background-color: rgba(253,255,190,0.2);
    
}
#nav{
  position: absolute;
  margin: 10px;
  height: 85%;
  width: 18%;
  left: 81%;
  background-color: rgba(130,234,253,0.2);
}
#cancel{
  position: absolute;
  top: 85%;
  left: 40%;
  margin: 10px;
  background-color: rgb(157,199,243,0.8);
}
</style>