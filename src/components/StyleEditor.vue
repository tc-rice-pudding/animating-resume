<template>
  <div class="styleEditor" ref="container">
    <!-- 将样式代码插入到 html 中 -->
    <div class="code" v-html="codeInStyleTag" />
    <!-- 用于展示 -->
    <pre class v-html="highlightedCode"></pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Prism from "prismjs";

export default defineComponent({
  name: "Editor",
  props: ["code"],
  setup(props) {
    const container = ref<HTMLElement>();

    const goScrollBottom = () => {
      container.value!.scrollTop = 100000;
    };

    let highlightedCode = computed(() =>
      Prism.highlight(props.code, Prism.languages.css, "CSS")
    );
    let codeInStyleTag = computed(() => `<style>${props.code}</style>`);

    return { container, goScrollBottom, highlightedCode, codeInStyleTag };
  },
});
</script>

<style scoped>
pre {
}
@media (max-width: 500px) {
  pre {
  }
}
.code {
  display: none;
}
</style>
