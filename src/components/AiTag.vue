<template>
  <div id="tag">
    <el-tag
      style="margin:4px;"
      :type="color[index]"
      :key="tag.id"
      v-for="(tag,index) in TagNameList"
      :closable="true"
      :disable-transitions="true"
      :hit="true"
      @close="handleClose(tag)"
      @click="deliver($event,tag,index)">{{tag.tagchinese}}
    </el-tag>
  </div>
</template>

<script>
export default {
 name:'AiTag',
 props:['TagNameList'],
 data() {
    return {
        inputVisible: false,
        inputValue: '',
        color:[],
        tag:[]
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
    deliver(e,tag,index){
        if(!this.tag.includes(tag.tagenglish)){
          this.tag.push(tag.tagenglish)
        } 
        let AiTag = this.tag
        // this.color.splice(index,1,'danger')
        // console.log(this.color)
        // console.log(index)
        if(e.target.className.search(/el-tag--light/)!=-1){
          e.target.className = e.target.className.replace(/el-tag--light/,'el-tag--danger')
          console.log(AiTag)
          this.$bus.$emit('DeliverTag',AiTag)
          //this.$bus.$off('DeliverTag')
        }else{
          e.target.className = e.target.className.replace(/el-tag--danger/,'el-tag--light')
          this.$bus.$emit('CancelTag',AiTag)
          //this.$bus.$off('CancelTag')
        }  
    },
    TransformTag(){
      this.color = 'true'
    }
 },
 created(){
  //this.$bus.$on('ChangTagColor',this.TransformTag)
  this.$bus.$on('KeepTagColor',(TagNameList)=>{
    console.log(TagNameList)
    TagNameList.forEach((tag,index)=>{
      if(this.tag.includes(tag.tagenglish)){
        this.color.splice(index,1,'danger')
      }else{
        this.color.splice(index,1,'')
      }
    })
  })
 },
 beforeDestroy(){
  this.$bus.$off('DeliverTag')
  this.$bus.$off('CancelTag')
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