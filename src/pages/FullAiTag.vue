<template>
  <div id="FullAiTag">
    <div id="search">
      <div id="SearchDiv">
        <el-input v-model="search" placeholder="请输入要检索的tag标签" id="SearchInput"></el-input>
        <el-button type="primary" id="SearchButton">检索</el-button>
      </div>
      <p>现在检索功能还在制作中,该tag翻译由
        <a href="https://ngabbs.com/read.php?tid=33869519&rand=490" target="_blank">阿巧</a>
        制作,这是我能找到对tag分类最全的.不过再制作其他网站的页面时,看到了一个更全的,一共3万九千条
        <a href="https://www.kdocs.cn/l/cdb09JpUaRvx" target="_blank">在这里</a>
      </p>
    </div>
    <div id="FullTag">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul id="ul1">
              <li v-for="item in tag1" :key="item.id">{{item.tagchinese}}:{{item.tagenglish}}</li>
            </ul>  
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <ul id="ul2">
              <li v-for="item in tag2" :key="item.id">{{item.tagchinese}}:{{item.tagenglish}}</li>
            </ul>  
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <ul id="ul2">
              <li v-for="item in tag3" :key="item.id">{{item.tagchinese}}:{{item.tagenglish}}</li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <div id="page">
        <el-button type="primary" @click.native="back" v-show="ShowBackButton">上一页</el-button>
        <span class="page">总共:{{pages}}</span>
        <span class="page">当前:{{page}}</span>
        <el-button type="primary" @click.native="next" v-show="ShowNextButton">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'FullAiTag',
    data() {
      return {
        search:'',
        FullTag:[],
        tag1:[],
        tag2:[],
        tag3:[],
        page: 1,
        pages:'',
        ShowBackButton:false,
        ShowNextButton: true
      }
    },
    methods: {
      Changetag(){
        this.tag1 = this.FullTag.filter((tag,index)=> index >= (90*(this.page-1)) && index < (90*(this.page-1)+30))
        this.tag2 = this.FullTag.filter((tag,index)=> index >= (90*(this.page-1)+30) && index < (90*(this.page-1)+60))
        this.tag3 = this.FullTag.filter((tag,index)=> index >= (90*(this.page-1)+60) && index < (90*(this.page-1)+90))
      },
      back(){
        this.page --
        this.ShowNextButton = true
        if(this.page == 1){
          this.ShowBackButton = false
        }
        this.Changetag()
      },
      next(){
        this.page ++
        this.ShowBackButton = true
        if(this.page == this.pages){
          this.ShowNextButton = false
        }
        this.Changetag()
      },
    },
    created(){
      this.$axios.get('/FullAiTag').then((res)=>{
        this.FullTag = res.data
        this.pages = Math.ceil(this.FullTag.length / 90) 
        this.tag1 = this.FullTag.filter((tag,index)=> index < 30)
        this.tag2 = this.FullTag.filter((tag,index)=> index >= 30 && index < 60)
        this.tag3 = this.FullTag.filter((tag,index)=> index >= 60 && index < 90)
      })
      // this.$axios.post('https://api.cerfai.com/open/get_full_categories').then((res)=>{
      //   console.log(res)
      // })
    }
}
</script>

<style scoped>
ul{
  list-style: none;
}
#FullAiTag{
  position: absolute;
  top: 10%;
  left: 10%;
  width: 85%;
  height: 80%;
  margin-left: 40px;
  
}
#search{
  width: 100%;
  height: 8%;
  background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#FullTag{
  margin-top: 10px;
  height: 85%;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#SearchDiv{
  position: absolute;
  margin: 15px;
  width: 20%;
  height: 40%;
}
#SearchButton{
  position: absolute;
  margin-left: 10px;
}
p{
  position: absolute;
  left: 30%;
  top: 1%;
}
#page{
    height: 50px;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}
.page{
  margin: 20px;
}
</style>