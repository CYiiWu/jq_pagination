(function pageModule(factory) {
    window["QxPage"] = factory();
})(function pageFactory() {
    var totlePage=1
    var current=1
    var smallPage=5
    var nowArr=[]
    var temp=$('<div id="pageList">\
                <button  class="btn-prev">\
                    <i class="el-icon el-icon-arrow-left"></i>\
                </button>\
                <ul class="el-pager">\
                </ul>\
                <button type="button" class="btn-next">\
                    <i class="el-icon el-icon-arrow-right"></i>\
                </button>\
            </div>')

    function QxPage (el,totle,small=5,currentPage=1) {
        this.creatPage(el,totle,small=5,currentPage=1)
    }
    QxPage.prototype={
        creatPage:function (el,totle,small=5,currentPage=1) {
            $(el).empty()
            $(el).append(temp)
           
           
            temp.children('.btn-next').click(function(){
                this.next()
            }.bind(this))
            temp.children('.btn-prev').click(function(){
                this.prev()
            }.bind(this))
            totlePage=totle
            smallPage=small
            current=currentPage
            this.randerList()
        },
        setPrev:function setPrev() {
            this.setCurrent(nowArr[0]-1)
        },
        setNext:function setNext() {
            this.setCurrent(nowArr[smallPage-1]+1)
        },
        prev:function prev() {
            if(current==1)return
            this.setCurrent(current-1)
        },
        next:function next() {
            if(current==totlePage)return
            this.setCurrent(current+1)
        },
        // 设置页数
        setCurrent:function setCurrent(i) {
            current=i
            page=current
            // searchList()
            if(this.onChange!=undefined){
                this.onChange(page)
            }
            this.randerList()
        },
        // 渲染列表
        randerList:function randerList(){
            var arr=getPageArr()
            var el_pager=temp.children('.el-pager')
            el_pager.empty()
            for(let i in arr){
                if(arr[i]==-1){
                    var t=$('<li class="number  more-left"><i class="el-icon-more icon_l"></i></li>')
                    t.click(function(){
                        this.setPrev()
                    }.bind(this))
                }else if(arr[i]==-2){
                    var t=$('<li class="number more-right"><i class="el-icon-more icon_r"></i></li>')
                    t.click(function(){
                        this.setNext()
                    }.bind(this))
                }else{
                    var t=$('<li class="number">'+arr[i]+'</li>')
                    t.click(function(){
                        this.setCurrent(arr[i])
                    }.bind(this))
                }
                el_pager.append(t)
                if(arr[i]==current){
                    el_pager.children('.number:eq('+i+')').addClass('active')
                }
            }
        }
    }
    
    
    


function getPageArr() {
    var arr=[]
    if(current<=smallPage){
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
    }else if(totlePage-current<smallPage){
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
function getQueryUrl(name,val){
    var url_query = window.location.search;
    if(url_query.indexOf('?') != -1){
        var reg = new RegExp('(.*)('+name+'=[^&]*)(.*)')
        if(reg.test(url_query)){
            url_query = url_query.replace(reg,'$1'+name+'='+val+'$3')
        } else {
            url_query += '&'+name+'='+val
        }
        if(name != 'page'){
            url_query = url_query.replace(/(.*)(page=[^&]*)(.*)/,'$1'+'page=1'+'$3')
        }
        if(name == 'area'){
            url_query = url_query.replace(/(.*)(country=[^&]*)(.*)/,'$1'+'country='+'$3')
        }
    } else {
        url_query += '?'+name+'='+val
    }
    return url_query;
}
    

    return QxPage
});