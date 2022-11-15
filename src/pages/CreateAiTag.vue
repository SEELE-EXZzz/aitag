<template>
    <div>
     <AiTagTabs></AiTagTabs>
     <AiInput></AiInput>   
    </div>
    
</template>

<script>
import AiInput from '../components/AiInput.vue';
import AiTagTabs from '../components/AiTagTabs.vue';

export default {
    name:'CreateAiTagVue',
    components: { AiInput, AiTagTabs }
}
</script>

<style scoped>

</style>