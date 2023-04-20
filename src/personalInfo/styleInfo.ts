export const styleInfo: string[] = [
    `/*
* 大家好，我是粽子
* 四月份了，好多公司都在招聘，你是不是也在准备简历呀。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
    transition: all .3s;
}

/* 背景有点单调，先加个背景色 */
#app{
    background: #f3f3f3;
}

/* 加上边框和阴影 */
.styleEditor {
    flex: 1;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    overflow: auto;
    height: 90vh;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    transition: 0.3s;
}

/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 接下来准备一个 markdown 编辑器 */
.resumeEditor{
    flex:2;
    margin-left: 20px;
    padding: 10px;
    height: 90vh;
    border: 1px solid #eee;
    border-radius: 4px;
    background: white; 
    color: #222;
    overflow: auto;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    transition: 0.3s;
}
/* 好了，我开始写简历了 */


`,
    `
/* 这个简历好像差点什么
* 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
* 简单，用开源工具翻译成 HTML 就行了
*/
`,
    `
/* 再对 HTML 加点样式 */
.resumeEditor{
    padding: 2em;
}
.resumeEditor h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
}
.resumeEditor ul, .resumeEditor ol{
    padding-left: 20px;
}
.resumeEditor ul{
    list-style: none;
}
.resumeEditor blockquote {
    margin: 1em;
    padding: .5em;
    background: #ddd;
}
`,
]