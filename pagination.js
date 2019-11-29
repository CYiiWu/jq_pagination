

var pagination=(function ($) {
    var totlePage=1
    var current=1
    var smallPage=5
    var nowArr=[]
    var callFunc
    /**
     * @param {Number} totle -总页数
     * @param {Function} callFun -回调函数
     * @param {Number} currentP -当前页数
     * @param {Number} small -连续显示的页码个数
     */
    $.fn.creatPage=function (totle,callFun,currentP=1,small=5) {
        $(this).empty()
        $(this).append('\
        <div id="pageList">\
            <button  class="btn-prev" onclick="pagination.prev()">\
                <i class="el-icon el-icon-arrow-left"></i>\
            </button>\
            <ul class="el-pager">\
            </ul>\
            <button type="button" class="btn-next" onclick="pagination.next()">\
                <i class="el-icon el-icon-arrow-right"></i>\
            </button>\
        </div>\
        ')
        totlePage=totle
        current=currentP
        smallPage=small
        callFunc=callFun
        randerList()
    }

    function setPrev() {
        var n=nowArr[0]-Math.ceil(smallPage/2)
        n<1?n=1:n
        setCurrent(n)
    }
    function setNext() {
        var n=nowArr[nowArr.length-1]+Math.floor(smallPage/2)+1
        n>totlePage?n=totlePage:n
        setCurrent(n)
    }
    function prev() {
        if(current==1)return
        setCurrent(current-1)
    }
    function next() {
        if(current==totlePage)return
        setCurrent(current+1)
    }
    // 设置页数
    function setCurrent(i) {
        current=i
        page=current
        
        randerList()
        if(callFunc){
            callFunc(current)
        }
    }
    // 渲染列表
    function randerList(){
        var arr=getPageArr()
        $('.el-pager').empty()
        for(var i in arr){
            if(arr[i]==-1){
                $('.el-pager').append('<li class="number  more-left" onclick="pagination.setPrev()"><i class="el-icon-more icon_l"></i></li>')
            }else if(arr[i]==-2){
                $('.el-pager').append('<li class="number more-right" onclick="pagination.setNext()"><i class="el-icon-more icon_r"></i></li>')
            }else{
                $('.el-pager').append('<li class="number" onclick="pagination.setCurrent('+arr[i]+')">'+arr[i]+'</li>')
            }
            if(arr[i]==current){
                $('.el-pager').children('.number:eq('+i+')').addClass('active')
            }
        }
    }
    function getPageArr() {
        var arr=[]
        if(current<Math.floor(smallPage/2)+3){
            var len=totlePage<smallPage?totlePage:smallPage
            for(var i=1;i<=len;i++){
                arr.push(i)
            }
            nowArr=arr.slice(0,arr.length)
            if(arr[len-1]<totlePage-1){
                arr.push(-2)
                arr.push(totlePage)
            }else if(arr[len-1]<totlePage){
                arr.push(totlePage)
            }
            return arr
        }else if(current>totlePage-(Math.floor(smallPage/2)+1)){
            for(var i=smallPage-1;i>=0;i--){
                arr.push(totlePage-i)
            }
            nowArr=arr.slice(0,arr.length)
            if(arr[0]>2){
                arr.unshift(-1)
                arr.unshift(1)
            }else if(arr[0]>1){
                arr.unshift(1)
            }
            return arr
        }else{
            var val=Math.floor(smallPage/2)
            for(var i=0;i<smallPage;i++){
                arr.push(current-val+i)
            }
            nowArr=arr.slice(0,arr.length)
            arr.unshift(-1)
            arr.unshift(1)
            arr.push(-2)
            arr.push(totlePage)
            return arr
        }
    }
    return {
        setCurrent: setCurrent,
        setPrev: setPrev,
        prev:prev,
        setNext:setNext,
        next:next,
　　};
})(jQuery)


