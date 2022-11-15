<template>
    <div >
      <el-row class="tac">
      <el-col :span="12">
        <el-menu
          router
          id="AiNavMenu"
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item :index="RouterList[0]">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="Enter">生成咒术</span>
          </el-menu-item>
          <el-menu-item :index="RouterList[1]">
            <i class="el-icon-s-order"></i>
            <span slot="title" @click="Enter">咒术卡片</span>
          </el-menu-item>
          <el-menu-item :index="RouterList[2]">
            <i class="el-icon-goods"></i>
            <span slot="title" @click="Enter">咒术大全</span>
          </el-menu-item>
          <el-menu-item :index="RouterList[3]">
            <i class="el-icon-office-building"></i>
            <span slot="title" @click="Enter">咒术广场</span>
          </el-menu-item>
          <el-menu-item :index="RouterList[4]">
            <i class="el-icon-share"></i>
            <span slot="title" @click="Enter">其他网站</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      </el-row>
    </div>
  
</template>

<script>

export default {
    data(){
      return{
        RouterList:[
          {name:'CreateAiTag'},
          {name:'AiTagCard'},
          {name:'FullAiTag'},
          {name:'playground'},
          {name:'others'}
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      Enter(e){
        let name = e.target.innerHTML
        if(name == '生成咒术'){
          this.$router.push('/')
        }else{
          this.$router.push(name)
        }    
      }
      
    }
}
</script>

<style scoped>
  #AiNavMenu{
    position: absolute;
    top: 100px;
    width: 200px;
    height: 800px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

</style>