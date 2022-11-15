<template>
    <div id="page">
        <el-button type="primary" @click.native="back" v-show="ShowBackButton">上一页</el-button>
        <span class="page">总共:{{pages}}</span>
        <span class="page">当前:{{page}}</span>
        <el-button type="primary" @click.native="next" v-show="ShowNextButton">下一页</el-button>
    </div>
</template>

<script>
export default {
    name:'NextAndBack',
    methods: {
        back(){
            this.page --
            this.ShowNextButton = true
            if(this.page == 1){
            this.ShowBackButton = false
            }
            this.TagName = []
            this.TagName = this.FullTagName.filter((tag,index)=>index>(50*(this.page-1)) && index<(50*this.page))  
        },
      next(){
            this.page ++
            this.ShowBackButton = true
            if(this.page == this.pages){
            this.ShowNextButton = false
            }
            this.TagName = []
            this.TagName = this.FullTagName.filter((tag,index)=>index>(50*(this.page-1)) && index<(50*this.page))  
        },
    },
}
</script>

<style>

</style>