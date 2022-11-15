<template>
  <div id="others">
    <div id="header">
        <p>以下为我找到一些与ai相关的网站或者文档,如果有其他相关网站或文档欢迎到b站私信我,还有建议直接看合集，做到一半发现有合集</p>
    </div>
    <div id="content">
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <h1>tag生成器</h1>
                    <ul>
                        <li><a href="https://wolfchen.top/tag/" target="_blank">NovelAI tag生成器</a></li>
                        <li><a href="https://aitag.top/" target="_blank">魔咒百科词典</a></li>
                        <li><a href="https://tags.novelai.dev/" target="_blank">Danbooru 标签超市</a></li>
                        <li><a href="https://magic-tag.netlify.app/" target="_blank">魔导绪论</a></li>
                        <li><a href="https://www.noveltags.com/allTag" target="_blank">魔法导论</a></li>
                        <li><a href="https://thereisnospon.github.io/NovelAiTag/" target="_blank">NovelAiTag</a></li>
                        <li><a href="https://www.bilibili.com/video/BV1a8411s7za/" target="_blank">NovelAiTag（浏览器插件）</a></li>
                        <li><a href="https://www.bilibili.com/video/BV1JK411Q7MS/" target="_blank">AI绘图魔导书（APP）</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19028791" target="_blank">AI提词器（电脑软件）</a></li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <h1>tag分类</h1>
                    <ul>
                        <li><a href="https://www.bilibili.com/video/BV1m84y1B7Ny/" target="_blank">分享ai绘图的4万个TAG</a></li>
                        <li><a href="https://bbs.nga.cn/read.php?tid=33810382&rand=877" target="_blank">关于NovelAI一些tag的整理以及一些碎碎念</a></li>
                        <li><a href="https://github.com/zcyzcy88/TagTable" target="_blank">图站词条</a></li>
                        <li><a href="https://docs.qq.com/doc/DWHl3am5Zb05QbGVs?" target="_blank">元素法典</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19019708" target="_blank">关于Novel AI 的prompt tag的一点理解（tag分享）</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19061010" target="_blank">不要乱输入咒语了</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19007299" target="_blank">NovelAI可用tag关键词收集（一 · 姿势，构图</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19008409" target="_blank">NovelAI可用tag关键词收集（二 · 头发，表情</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19010392" target="_blank">NovelAI可用tag关键词收集（三 · 身体，服装</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19008409" target="_blank">NovelAI可用tag关键词收集（四 · 背景，其他</a></li>
                        <li><a href="https://www.bilibili.com/read/cv19060338" target="_blank">NovelAI服装Tag收集</a></li>
                        <li><a href="https://gitlab.com/16777216c/stable-diffusion-embeddings" target="_blank">一堆不穿衣服的tag</a></li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <h1>合集</h1>
                    <ul>
                        <li><a href="https://www.kdocs.cn/l/cvg8ccOGj5sq">NovelAI资源整合</a></li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <h1>相关文章</h1>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#others{
  position: absolute;
  top: 10%;
  left: 10%;
  width: 85%;
  height: 80%;
  margin-left: 40px;
  border-radius: 4px;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#header{
  position: absolute;
  height: 8%;
  width: 100%;
  border-radius: 10px;
  background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
}
#content{
  position: absolute;
  top: 10%;
  height: 90%;
  width: 100%;
  border-radius: 4px;
  background-image: linear-gradient(to top, #209cff 0%, #68e0cf 100%);
}
h1{
  text-align: center;
}
ul{
  list-style: none;
}
</style>