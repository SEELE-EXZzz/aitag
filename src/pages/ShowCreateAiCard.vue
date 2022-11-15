<template>
    <div id="ShowCreateAiCard">
    <div id="upLoad">
        <el-upload
            :http-request="upload"
            action=""
            class="upload-demo"
            drag
            multiple>
            <i v-show="showicon" class="el-icon-upload"></i>
            <el-image 
                style="height: 200px; width: 360px; margin-left: 1%;"
                :src="url"
                fit="contain">
            </el-image>
            <div v-show="showicon" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
    <div id="input">
        step: <el-input v-model="AiCard.step" placeholder="请输入step" class="" size="small"></el-input>
        scale: <el-input v-model="AiCard.scale" placeholder="请输入scale" class="" size="small"></el-input>
        seed: <el-input v-model="AiCard.seed" placeholder="请输入seed" class="" size="small"></el-input>
    </div>
    <div id="shortinput">
        正向tag: <el-input v-model="AiCard.tag" placeholder="请输入正向tag" class="" size="small"></el-input>
        反向tag: <el-input v-model="AiCard.UnTag" placeholder="请输入反向tag" class="" size="small"></el-input>
        content: <el-input v-model="AiCard.content" placeholder="请输入content" class="" size="small"></el-input> 
        sampling: <el-input v-model="AiCard.sampling" placeholder="请输入sampling" class="" size="small"></el-input>
    </div>
    <div id="name">
        请输入咒术名字: <el-input v-model="AiCard.name" placeholder="请输入咒术名字" class="" size="small"></el-input>
    </div>
    <div id="button">
        <el-button type="primary" id="CannelAiCard" @click="CancelAiCard">取消<i style="margin-left:4px;" class="el-icon-close"></i></el-button>
        <el-button type="primary" id="CreateAiCard" @click="CreateAiCard">生成卡片<i style="margin-left:4px;" class="el-icon-check"></i></el-button>
    </div>
    </div>
  
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {
    data() {
      return {
        labelPosition: 'right',
        AiCard: {
          tag:[],
          UnTag:[],
          step:'28',
          scale:'12',
          seed:'',
          content:'Low Quality + Bad Anatomy',
          sampling:'k_euler_ancestral',
          name:''
        },
        showicon: 'true',
        url:''
      };
    },
    created(){
        this.$bus.$on('DeliverAiCard',(data)=>{
            this.AiCard.tag = data.textarea
            this.AiCard.UnTag = data.UnTextarea
        })
    },
    methods:{
        CancelAiCard(){
            this.$bus.$emit('CancelAiCard')
        },
        CreateAiCard(){
            const tag = this.AiCard.tag
            const UnTag = this.AiCard.UnTag
            let step = this.AiCard.step
            let scale = this.AiCard.scale
            let seed = this.AiCard.seed
            let content = this.AiCard.content
            let sampling = this.AiCard.sampling
            let name = this.AiCard.name
            let url = this.url
            const Now = new Date().getTime()
            localStorage.setItem(`tag${Now}`,JSON.stringify([tag,UnTag,step,scale,seed,content,sampling,name,url]))
            this.$bus.$emit('CancelAiCard')
        },
        upload(file){
        //发送请求
        let FileKey = file.file.name
        let key = FileKey.replace(/[\(\),% -]/g,'')
        let that = this
        this.$axios.get('AiTagCard/image',{params: {key}})
        .then( function (response) {
          that.HandleFileUpLoad(file,response.data.uploadToken,key)
          that.showicon = false
          console.log(response.data.publicDownloadUrl)
          that.url = response.data.publicDownloadUrl
          console.log(that.url)
          //that.url.push(response.data.publicDownloadUrl)
        })
        .catch(function (error) {
          console.log('失败')
          console.log(error)
        })
      },
        HandleFileUpLoad(file,token,key){
            const putExtra = {
            //fname: "aitag.png",
            mimeType: "image/png",
        };
        const config = {
            region: qiniu.region.z2
        };
        const observer = {
            next(res){},
            error(err){},
            complete(res){}
        }
        const observable = qiniu.upload(file.file, key, token, putExtra, config)//
        const subscription = observable.subscribe(observer) // 上传开始 
      },
    }
}
</script>

<style scoped>
#ShowCreateAiCard{
    position: absolute;
    z-index: 10;
    height: 50%;
    width: 40%;
    top: 50%;
    left: 50%;
    margin-left: -20%;
    margin-top: -15%;
    box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
    border-radius:15px;
    border-top: 1px solid rgba(255,255,255,0.5);
    border-left: 1px solid rgba(255,255,255,0.5);
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    backdrop-filter: blur(5px);
}
#upLoad{
    position: absolute;
    margin: 10px;
}
#input{
    position: absolute;
    width: 40%;
    left: 50%;
    margin: 10px;
}
#shortinput{
    position: absolute;
    width: 60%;
    top: 40%;
    margin: 10px;
}
#button{
    position: absolute;
    width: 30%;
    top: 60%;
    left: 70%;
}
#CannelAiCard{
    position: absolute;
    top: 60px;
}
#CreateAiCard{
    margin-left: -1px;
}
#name{
    position: absolute;
    width: 20%;
    top: 42%;
    left: 70%;
}
</style>