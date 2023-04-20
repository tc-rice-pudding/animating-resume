const Koa = require('koa')
const static = require('koa-static')
const path = require('path')
const mount=require('koa-mount')

const app = new Koa();

app.use(mount('/animating-resume',static(path.join(__dirname, '../dist/'))))

app.listen(4000, () => { console.log('http://localhost:4000/animating-resume') })
