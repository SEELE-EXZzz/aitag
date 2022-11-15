<template>
  <div id="AiInput">
    <el-input id="input"
      size="large"
      type="textarea"
      :rows="2"
      placeholder="请输入正向tag"
      :value="textarea"
      v-model="textarea">
    </el-input>
    <el-button 
      type="primary" 
      id="button" 
      data-clipboard-target="#input" data-clipboard-action="copy"
      @click="open"
      class="btn button">复制
      <i style="margin-left:2px" class="el-icon-document-copy">
      </i>
    </el-button>
    <el-button type="danger" class="button" id="ButtonCancel" @click.native="CancelTag('textarea')">清空
      <i style="margin-left:2px" class="el-icon-delete"></i>
    </el-button>
    <el-button type="primary" class="button" id="ButtonSave" @click.native="CreateAiCard">生成卡片
      <i style="margin-left:2px" class="el-icon-folder-add"></i>
    </el-button>
    <el-input id="input2"
      size="large"
      type="textarea"
      :rows="2"
      placeholder="请输入反向tag"
      :value="UnTextarea"
      v-model="UnTextarea">
    </el-input> 
    <el-button 
      type="primary" 
      id="UnButton" 
      data-clipboard-target="#input2"
      data-clipboard-action="copy"
      @click="open"
      class="btn button2">复制
      <i style="margin-left:2px" class="el-icon-document-copy"></i>
    </el-button>
    <el-button type="danger" class="UnButton" id="UnButtonCancel" @click.native="CancelTag('UnTextarea')">清空
      <i style="margin-left:2px" class="el-icon-delete"></i>
    </el-button>
  </div>
  
</template>

<script>
import ClipboardJS from 'clipboard';
export default {
    name: 'AiInput',
    data(){
      return{
        textarea:[],
        UnTextarea:[]
      }
    },
    methods:{
      CancelTag(data){
         this[data] = []
         if(data == 'textarea'){
          this.$bus.$emit('ChangTagColor',) 
         }else{
          this.$bus.$emit('ChangUnTagColor',)
         }
         
      },
      CreateAiCard(){
        const textarea = this.textarea
        const UnTextarea = this.UnTextarea
        const data = {
          textarea,
          UnTextarea
        }
        this.$bus.$emit('ShowCreateAiCard')
        this.$bus.$emit('DeliverAiCard',data)
      },
      StorageTag(){
        let text = this.textarea
        let Now = new Date().getTime()
        localStorage.setItem(`tag${Now}`,JSON.stringify({val:text}))
      },
      open(){
        this.$message('复制成功');
      },
    },
    created() {
      const clipboard = new ClipboardJS('.btn')
      const clipboard2 = new ClipboardJS('.btn2')
      this.$bus.$on('DeliverTag',(tag)=>{   
        this.textarea.push(tag)
      }),
      this.$bus.$on('CancelTag',(tag)=>{
        this.textarea = this.textarea.filter(Aitag=>Aitag != tag)
      }),
      this.$bus.$on('DeliverUnTag',(tag)=>{   
        this.UnTextarea.push(tag)
      }),
      this.$bus.$on('CancelUnTag',(tag)=>{
        this.UnTextarea = this.UnTextarea.filter(Aitag=>Aitag != tag)
      }),
      this.$bus.$on('AppearUnTag',(tag)=>{
        this.UnTextarea.push(tag)
      }),
      this.$bus.$on('AppearTag',(tag)=>{
        this.textarea.push(tag)
      })
    },
    beforeDestroy(){
      this.$bus.$off('ShowCreateAiCard')
      this.$bus.$off('DeliverAiCard')
    }
}
</script>

<style>
  #AiInput{
    position: absolute;
    margin-left: 20px;
    top: 8%;
    left: 10%;
    width: 80%;
    height: 40%;
  }
  #input{
    position: absolute;
    margin-left: 20px;
    width: 90%;
    height: 150px;
  }
  #input2{
    position: absolute;
    margin-left: 20px;
    width: 90%;
    height: 100px;
    top: 200px;
  }
  .button{
    position: absolute;
    top: 25px;
    left: 92%;
  }
  .button2{
    position: absolute;
    top: 240px;
    left: 92%;
  }
  #UnButtonCancel{
    position: absolute;
    top: 300px;
    left: 92%;
    margin-left: -1px;
  }
  #ButtonCancel{
    top: 120px;
    margin-left: -1px;
  }
  #ButtonSave{
    top: 180px;
    margin-left: -1px;
  }
</style>