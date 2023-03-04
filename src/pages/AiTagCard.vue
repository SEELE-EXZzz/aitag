<template>
  <div id="AiTagCard" style="overflow:auto;">
    <el-row>
      <el-col :span="5" v-for="(o, index) in this.CardNum" :key="o" :offset="index > 0 ? 2 : 0" style="margin-left: 1%; margin-top: 1%;">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" id="Card">
          <div id="name">咒术名:{{CardName[index]}}</div>
          <div v-show="!showicon" class="demo-image__preview">
            <el-image 
              @error ="UpLoadErr($emit,index)"
              style="height: 200px; width: 360px; margin-left: 1%;"
              :src="url[index]"
              fit="contain">
            </el-image>
          </div>
          <div>
            <ul>
              <li @click="copy(tagList[index])">正向tag:{{tagList[index]}}
                <i class="el-icon-copy-document"></i>
              </li>
              <li @click="copy(UnTagList[index])">反向tag:{{UnTagList[index]}} 
                <i class="el-icon-copy-document"></i>
              </li>
              <li>
                  <span  @click="copy(step[index])" style="margin-right:16px;">steps:{{step[index]}} <i class="eel-icon-copy-document"></i></span>
                  <span  @click="copy(scale[index])" style="margin-right:16px;">scale:{{scale[index]}} <i class="el-icon-copy-document"></i></span>
              </li>
              <li  @click="copy(seed[index])" >seed:{{seed[index]}} <i class="el-icon-copy-document"></i></li>
              <li  @click="copy(content[index])" >undesired content:{{content[index]}} <i class="el-icon-copy-document"></i></li>
              <li  @click="copy(sampling[index])" >advanced:sampling:{{sampling[index]}} <i class="el-icon-copy-document"></i></li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
export default {
    name :'AiTagCard',
    data() {
      return {
        CardNum:1,
        url:[],
        urlimage:[],
        tagList:[],
        UnTagList:[],
        FullTag:[],
        FullUnTag:[],
        step:[],
        scale:[],
        seed:[],
        content:[],
        sampling:[],
        CardName:[],
        showicon: true
      }
    },
    methods:{
      upload(file){
        //发送请求
        let FileKey = file.file.name
        let key = FileKey.replace(/[\(\),% -]/g,'')
        let that = this
        this.$axios.get('/AiTagCard/image',{params: {key}})
        .then( function (response) {
          that.HandleFileUpLoad(file,response.data.uploadToken,key)
          that.showicon = false
          that.url.push(response.data.publicDownloadUrl)
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
      UpLoadErr(e,index){
        
      },
      copy(content){
        const clipboardObj = navigator.clipboard
        console.log(clipboardObj)
        clipboardObj.writeText(content)
        this.$message('复制成功')
      },
    },
    computed:{
      ComputedTag(){
        return this.tag.replace(/,[\s\S]*/g,'...')
      },
      ComputedUnTag(){
        return this.UnTag.replace(/,[\s\S]*/g,'...')
      },
    },
    created(){
      
      let storage=window.localStorage //获取本地储存的数据
      let StorageValues = Object.values(storage) //获取本地储存的数据的键，其为数组
      let StorageDataLength = Object.keys(StorageValues).length //获取本地储存数据的条数
      this.CardNum = StorageDataLength
      let FullTag = this.FullTag
      let FullUnTag = this.FullUnTag
      for(let i=0;i<StorageDataLength;i++){
        FullTag[i] = JSON.parse(StorageValues[i])[0]
        this.tagList[i] = FullTag[i][0]  
        FullUnTag[i] = JSON.parse(StorageValues[i])[1]
        this.UnTagList[i] = FullUnTag[i][0]  
        this.step[i] = JSON.parse(StorageValues[i])[2]
        this.scale[i] = JSON.parse(StorageValues[i])[3]
        this.seed[i] = JSON.parse(StorageValues[i])[4]
        this.content[i] = JSON.parse(StorageValues[i])[5]
        this.sampling[i] = JSON.parse(StorageValues[i])[6]
        this.CardName[i] = JSON.parse(StorageValues[i])[7]
        let imageurl = JSON.parse(StorageValues[i])[8]    
        this.url.push(imageurl)        
      }
      this.showicon = false
    }
}
</script>

<style scoped>
#AiTagCard{
  position: absolute;
  top: 10%;
  left: 10%;
  width: 85%;
  height: 80%;
  margin-left: 40px;
  border-radius: 4px;
  background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
ul{
  list-style: none;
  padding-left: 5px;
  margin-top: -5px;
}
#name{
  width: 100%;
  height: 30px;
  font-size: 20px;
  text-align: center;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  margin-bottom: 4px;
}
</style>