<template>
    <div id="AiTagTabs">
      <div id="SelectTagType">
        <el-tabs v-model="activeName" @tab-click="handleClickType" style="padding: 20px;" v-show="ShowWriter">
          <el-tab-pane v-for="(Type,index) in TagType[TagNum]" :label="Type" :key="index" ></el-tab-pane>
        </el-tabs>
      </div>
      <div id="SelectWriter">
      <el-select v-model="value" placeholder="狂暴淦饭组长" @change="ChangeTagType" v-show="ShowWriter">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>  
      </div>
      <div>
      <el-tabs :tab-position="tabPosition" style="height: 200px;" @tab-click="ChangeTab">
        <el-tab-pane label="正面tag">
          <AiTag :TagNameList="TagName"></AiTag>
          <el-button type="primary" @click.native="ComeOutTag">来自元素法典的起手式</el-button>
          <a href="https://docs.qq.com/doc/DWHl3am5Zb05QbGVs" target="_blank">元素法典</a>
          <a :href="WriterA[WhichWriter]" target="_blank">tag分类作者</a>
        </el-tab-pane>
        <el-tab-pane label="反面tag">
          <span>由于没找到好的反面tag分类,这里附上元素法典的通用反面tag</span>
          <el-button type="primary" @click.native="ComeOutUnTag">通用反面tag</el-button>
        </el-tab-pane>
      </el-tabs>   
      </div>
      <div id="page">
        <el-button type="primary" @click.native="back()" v-show="ShowBackButton">上一页</el-button>
        <span class="page">总共:{{pages}}</span>
        <span class="page">当前:{{page}}</span>
        <el-button type="primary" @click.native="next()" v-show="ShowNextButton">下一页</el-button>
      </div>
    </div>
  
</template>

<script>
import AiTag from './AiTag.vue'
import AiUnTag from './AiUnTag.vue'
export default {
    components:{
        AiTag,
        AiUnTag
    },
    name:'AiTagTabs',
    data() {
      return {
        tabPosition: 'right', 
        activeName: 'first',   
        ShowBackButton: false,
        ShowNextButton: true,
        pages: 1 , //总共该有的页数
        page: 1 , //当前的页数
        ShowWriter: true, //由于找不到方向tag分类的作者，所以展示反向tag是将正向tag作者隐藏
        WriterA:[
          'https://space.bilibili.com/9056340',
          'https://zcyzcy88.github.io/TagTable/A/Sheet1.html'
        ], //作者连接
        WhichWriter:0, //表示要选择那个作者连接
        Tag:'((masterpiece)), (((best quality))), ((ultra-detailed)), ((illustration)), ((disheveled hair))', //正向tag起手式
        UnTag:'longbody,lowres, bad anatomy,bad hands, missing fingers, pubic hair,extra digit, fewer digits, cropped, worst quality, low quality',//通用反向tag
        TagName:[], //如果后端返回的数据过多，大于50条，就将储存FullTagName一部分数据，用于前端页面展示
        FullTagName:[], //储存后端返回的所有数据包括id，tagchinese，tagenglish，结构为对象
        TagNum:0, //用于展示作者的第几项分类，刚进入页面默认展示第一个
        TagWriter:'狂暴淦饭组长',
        //options 用于储存tag分类的作者
        options: [{
          value: '0',
          label: '狂暴淦饭组长'
        }, {
          value: '1',
          label: 'zcyzcy88'
        }],
        //TagType 用于储存作者的分类标准
        TagType:[
          ['姿势,构图','头发,表情','身体,服装','背景,其他'],
          ['服装风格','服装类物品','人物表情','人物类型','人物形态','人物姿势动作状态','图片属性','物品和背景','和谐类']
        ],
        value:''
      };
    },
    methods: {
      back(){
        this.page --
        this.ShowNextButton = true
        if(this.page == 1){
          this.ShowBackButton = false
        }
        this.TagName = []
        this.TagName = this.FullTagName.filter((tag,index)=>index>=(50*(this.page-1)) && index<(50*this.page))
        this.KeepTagColor(this.TagName)
        
      },
      next(){
        this.page ++
        this.ShowBackButton = true
        if(this.page == this.pages){
          this.ShowNextButton = false
        }
        this.TagName = []
        this.TagName = this.FullTagName.filter((tag,index)=>index>=(50*(this.page-1)) && index<(50*this.page))
        this.KeepTagColor(this.TagName)
      },
      ChangeTab(tab){
        if(tab.index == 1){
          this.ShowWriter = false
        }else{
          this.ShowWriter = true
        }
      },
      ComeOutUnTag(){
        this.$bus.$emit('AppearUnTag',this.UnTag)
      },
      ComeOutTag(){
        this.$bus.$emit('AppearTag',this.Tag)
      },
      KeepTagColor(tag){
        this.$bus.$emit('KeepTagColor',tag)
      },
      handleClickType(tab, event) {
        this.page = 1
        this.ShowBackButton = false
        this.ShowNextButton = true
        this.FullTagName = []
        this.TagName = []
        let id = tab.index
        let writer = this.TagWriter
        this.$axios.get('/writer',{params: {id,writer}}).then((res)=>{
          for(let i=0;i<res.data.length;i++){
          this.FullTagName.push(res.data[i])
        }
        if(res.data.length > 50){
          this.pages = Math.ceil(this.FullTagName.length / 50) 
          this.TagName = this.FullTagName.filter((tag,index)=>index<50)  
        }else{
          this.TagName = this.FullTagName.filter( a => true)
          this.pages = 1
        }
        this.KeepTagColor(this.TagName)
        })
        
      },
      ChangeTagType(index){
        this.WhichWriter = index
        this.page = 1
        this.ShowBackButton = false
        this.ShowNextButton = true
        this.FullTagName = []
        this.TagName = []
        this.TagNum = index
        this.TagWriter = this.options[index].label
        let writer = this.TagWriter
        let type = this.TagType[index]
        this.$axios.get('/writer',{params: {writer,type}}).then((res)=>{ 
          for(let i=0;i<res.data.length;i++){
          this.FullTagName.push(res.data[i])
        }
        if(res.data.length > 50){
          this.pages = Math.ceil(this.FullTagName.length / 50) 
          this.TagName = this.FullTagName.filter((tag,index)=>index<50)  
        }else{
          this.TagName = this.FullTagName.filter( a => true)
          this.pages = 1
        }
        this.KeepTagColor(this.TagName)
        })
        //this.KeepTagColor(this.TagName)
      }
    },
    created(){
      let writer = this.TagWriter
      this.$axios.get('/writer',{params: {writer}}).then((res)=>{
        for(let i=0;i<res.data.length;i++){
          this.FullTagName.push(res.data[i])
        }
        if(res.data.length > 50){
          this.pages = Math.ceil(this.FullTagName.length / 50) 
          this.TagName = this.FullTagName.filter((tag,index)=>index<50)  
        }else{
          this.TagName = this.FullTagName.filter( a => true)
          this.pages = 1
        }
      })
    },
    beforeDestroy(){
      this.$bus.$off('AppearUnTag')
      this.$bus.$off('AppearTag')
      this.$bus.$off('KeepTagColor')
    }
}
</script>

<style scoped>
  #AiTagTabs{
    position: absolute;
    margin-left: 25px;
    left: 10%;
    top: 50%;
    width: 80%;
    height: 30%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  #SelectTagType{
    display: inline-block;
    width: 100%;
    border: 1px;

  }
  #SelectWriter{
    position: absolute;
    top: 4%;
    left: 80%;
    width: 15%;
  }
  #page{
    height: 80px;
    font-size: 20px;
    text-align: center;
    line-height: 80px;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  }
  .page{
    margin: 20px;
  }
  a{
    margin: 10px;
  }
</style>