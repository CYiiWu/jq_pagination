# QxPage 
基于jQuery的分页组件 （效果请打开QxPage.html查看）
#### 使用说明
1、引入文件
```html
    <link rel="stylesheet" href="./init.css"> <!-- 初始化css  -->
    <link rel="stylesheet" href="./page.css"><!-- 分页组件样式  -->
    <script src="https://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script> <!-- jquery.js  -->
    <script src="./QxPage.js"></script> <!-- 分页js  -->
```
2、需要加分页的地方加上标签
```html
 <div id="page"></div>
```
3、创建分页组件
```html
<script>
var page=new QxPage($('#page'),10)
//页码改变时回调
page.onChange=function(currentPage){
    console.log('当前页数',currentPage)
}
</script>
```
4、QxPage方法参数说明
```javascript
 /* 
 * @param {Object} el -分页组件的DOM节点
 * @param {Number} totle -总页数
 * @param {Function} callFun -回调函数 （返回当前页码）
 * @param {Number} currentP -当前页数（可选，默认为1）
 * @param {Number} small -连续显示的页码个数（可选，默认为5）
 */
```

