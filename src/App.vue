<template>
  <div>
    <AiTop></AiTop>
    <AiNavMenu></AiNavMenu>
    <router-view></router-view>
    <ShowCreateAiCard v-show="this.ShowCreateAiCard"></ShowCreateAiCard>
    <diary v-show="this.ShowDiary"></diary>
  </div>
</template>

<script>
import AiTop from './components/AiTop.vue';
import AiNavMenu from './components/AiNavMenu.vue';
import CreateAiTag from './pages/CreateAiTag.vue';
import ShowCreateAiCard from './pages/ShowCreateAiCard.vue';
import FullAiTag from './pages/FullAiTag.vue';
import diary from './pages/diary.vue'

export default{
  components:{
    AiTop,
    AiNavMenu,
    CreateAiTag,
    ShowCreateAiCard,
    FullAiTag,
    diary
  },
  data() {
    return {
      ShowCreateAiCard:false,
      ShowDiary:false
    }
  },
  created(){
    this.$bus.$on('ShowCreateAiCard',()=>{
      this.ShowCreateAiCard = true
    })
    this.$bus.$on('CancelAiCard',()=>{
      this.ShowCreateAiCard = false
    })
    this.$bus.$on('ShowDiary',()=>{
      this.ShowDiary = true
    }),
    this.$bus.$on('CancelDiary',()=>{
      this.ShowDiary = false
    })
  }
}
</script>

<style scoped>
</style>
