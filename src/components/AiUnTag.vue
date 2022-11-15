<template>
    <div id="tag">
      <el-tag
          :type='color'
          :key="tag"
          v-for="tag in dynamicTags"
          :closable="true"
          :disable-transitions="true"
          :hit="true"
          @close="handleClose(tag)"
          @click="deliver">{{tag}}
      </el-tag>
      
      
      <div id="editId">
          <el-input
          id="edit"
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm">
      <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      
      
    </div>
  </template>
  
  <script>
  export default {
   name:'AiUnTag',
   data() {
      return {
          dynamicTags:['标签1','标签2','标签3','标签4'],
          inputVisible: false,
          inputValue: '',
          color:''
      }
   },
   methods:{
      handleClose(tag){
          
          //this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
      showInput() {
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        },
      handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        },
      deliver(tag){
          let AiTag = tag.target.innerHTML.replace(/<i class="el-tag__close el-icon-close"><\/i>$/,'').replace(/\s/,'').replace(/^/,' ')
          if(tag.target.className.search(/el-tag--light/)!=-1){
            this.$bus.$emit('DeliverUnTag',AiTag)
          }
          if(tag.target.className.search(/el-tag--light/)!=-1){
            tag.target.className = tag.target.className.replace(/el-tag--light/,'el-tag--danger') 
          }else{
            tag.target.className = tag.target.className.replace(/el-tag--danger/,'el-tag--light')
            this.$bus.$emit('CancelUnTag',AiTag)
          }   
        },
        TransformTag(){
          this.color= 'true'
        }
      },
  created(){
      this.$bus.$on('ChangUnTagColor',this.TransformTag)
    },
  beforeDestroy(){
    this.$bus.$off('DeliverUnTag')
    this.$bus.$off('CancelUnTag')
  }
  }
  </script>
  
  <style scoped>
    #editId{
      width: 10%;
    }
    #tag{
      
    }
    #edit{
      
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  </style>