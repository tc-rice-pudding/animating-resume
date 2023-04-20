<template>
  <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
  <ResumeEditor
    ref="resumeEditor"
    :markdown="currentMarkdown"
    :enableHtml="enableHtml"
  ></ResumeEditor>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from "vue";
import StyleEditor from "./components/StyleEditor.vue";
import ResumeEditor from "./components/ResumeEditor.vue";
import { styleInfo } from "./personalInfo/styleInfo";
import { resumeInfo } from "./personalInfo/resumeInfo";

export default defineComponent({
  name: "App",
  components: {
    StyleEditor,
    ResumeEditor,
  },
  setup() {
    const styleEditor = ref<typeof StyleEditor>();
    const resumeEditor = ref<typeof ResumeEditor>();

    const interval = ref(10); // 定时器延迟时间
    const enableHtml = ref(false);
    const currentStyle = ref("");
    const fullStyle = reactive(styleInfo);
    const currentMarkdown = ref("");
    const fullMarkdown = ref(resumeInfo);

    const showStyle = async (n: number, resolve: any) => {
      let style = fullStyle[n];
      if (!style) return;

      // 计算前 n 个 style 的字符总数
      let length = fullStyle
        .filter((_, index) => index <= n)
        .map((item) => item.length)
        .reduce((p, c) => p + c, 0);

      let prefixLength = length - style.length;

      if (currentStyle.value.length < length) {
        let l = currentStyle.value.length - prefixLength;
        let char = style.substring(l, l + 1) || " ";
        currentStyle.value += char;

        if (style.substring(l - 1, l) === "\n") {
          nextTick(() => {
            styleEditor.value?.goScrollBottom();
          });
        }
        setTimeout(() => {
          showStyle(n, resolve);
        }, interval.value);
      } else {
        resolve();
      }
    };

    const progressivelyShowStyle = (n: number) => {
      return new Promise((resolve, reject) => {
        showStyle(n, resolve);
      });
    };

    const showHtml = () => {
      enableHtml.value = true;
    };

    const progressivelyShowResume = async () => {
      return new Promise<void>((resolve, reject) => {
        let length = fullMarkdown.value.length;
        let showResume = () => {
          if (currentMarkdown.value.length < length) {
            currentMarkdown.value = fullMarkdown.value.substring(
              0,
              currentMarkdown.value.length + 1
            );
            let prevChar =
              currentMarkdown.value[currentMarkdown.value.length - 2];
            if (prevChar === "\n")
              nextTick(() => resumeEditor.value?.goScrollBottom());
            setTimeout(showResume, interval.value);
          } else {
            resolve();
          }
        };
        showResume();
      });
    };

    // 简历流程
    const makeResumeFlow = async () => {
      await progressivelyShowStyle(0);
      await progressivelyShowResume();
      await progressivelyShowStyle(1);
      await showHtml();
      await progressivelyShowStyle(2);
    };
    makeResumeFlow();

    return {
      interval,
      currentStyle,
      enableHtml,
      fullStyle,
      currentMarkdown,
      fullMarkdown,
      styleEditor,
      resumeEditor,
    };
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  align-items: center;
}
html {
  height: 100%;
}
* {
  box-sizing: border-box;
}
</style>
