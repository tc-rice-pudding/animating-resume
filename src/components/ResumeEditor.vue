<template>
  <div class="resumeEditor" :class="{htmlMode:enableHtml}" ref="container">
    <div v-if="enableHtml" v-html="result"></div>
    <pre v-else>{{result}}</pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { marked } from 'marked';

export default defineComponent({
  props: ['markdown', 'enableHtml'],
  name: 'ResumeEditor',
  setup(props) {
    const container = ref<HTMLElement>();

    const result = computed(() => (props.enableHtml ? marked(props.markdown) : props.markdown));

    const goScrollBottom = () => {
      container.value!.scrollTop = 100000;
    };
    const goScrollTop = () => {
      container.value!.scrollTop = 0;
    };

    return { container, result, goScrollBottom, goScrollTop };
  },
});
</script>

<style scoped>
@media (max-width: 500px) {
  .resumeEditor {
  }
}
.htmlMode {
  animation: flip 2s;
}

@keyframes flip {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
