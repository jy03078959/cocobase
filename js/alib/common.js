/**
 * 基本工具类 提供网络，UI，等操作
 * User: stone
 * Date: 13-7-13
 * Time: 上午9:03
 *
 *
 * */
var $ = $||{};

/**
 * 网络访问 ajax 工具类
 */
(function($,undef){

    var OBJ="object",STR="string";

    var ajax=function(options){
        return new ajax.prototype.init(options);
    };

    function AjaxError(msg){
        this.name="Ajax错误";
        this.message=msg||"未知错误";
    }

    AjaxError.prototype.toString=function(){
        return this.name+":"+this.message;
    };

    ajax.prototype={
        init:function(option){
            this[0]=this.create();//创建Ajax对象
            this[1]={
                url:option.url||"",//数据源地址
                method:option.method||"GET",//请求方法[POST、HEAD...]
                data:option.data||null,//要发送给服务器的数据
                async:option.async||true,//是否是异步请求
                type:option.type||"json",//返回数据后，将数据转换为指定的类型.(text,js,xml,html)
                timeout:option.timeout||10000,//请求超时，默认为十秒
                cache:option.cache||false,//是否从缓存中取数据(如果浏览器已缓存)
                onSuccess:option.onSuccess||function(result){},//请求成功后执行的函数(处理返回结果)
                onError:option.onError||function(){},//请求出错调用的函数
                onComplete:option.onComplete||function(){},//请求完成后(无论成功与否)都执行的函数
                showStatus:option.showStatus||function(){}//显示请求状态
            };

            fix(this[1]);
            return this;
        },

        create:function(){//创建Ajax对象
            return new XMLHttpRequest();
        },
        stop:function(){
            try{
                if(this[0])this[0].abort();
            }catch(e){
                throw new AjaxError(e.message)
            }
            return this;
        },
        getText:function(fn){//fn可选
            return this.exe({"onSuccess":fn,"type":"text"});
        },
        getXML:function(fn){
            return this.exe({"onSuccess":fn,"type":"xml"});
        },
        getScript:function(fn){
            return this.exe({"onSuccess":fn,"type":"js"});
        },
        getHTML:function(fn){
            return this.exe({"onSuccess":fn,"type":"html"});
        },
        getJson:function(fn){
            return this.exe({"onSuccess":fn,"type":"json"});
        },
        exe:function(options){
            if(options.onSuccess)this[1].onSuccess=options.onSuccess;
            if(options.onError)this[1].onError=options.onError;
            if(options.onComplete)this[1].onComplete=options.onComplete;
            if(options.showStatus)this[1].showStatus=options.showStatus;
            if(options.type)this[1].type=options.type;
            try{
                var isTimeout=false,cur=this;
                var timer=setTimeout(function(){
                    isTimeout=true;
                    cur.stop();
                    cur[1].onError(new AjaxError("请求超时"));
                },cur[1].timeout);
                //私有方法
                var open=function(){
                    try{
                        cur[0].open(cur[1].method,cur[1].url,cur[1].async);
                        if(/POST/i.test(cur[1].method)){
                            cur[0].setRequestHeader("Content-Type","application/x-www-form-urlencoded");//表单编码
                            if(cur[0].overrideMimeType)cur[0].setRequestHeader("Connection","close");
                        }
                    }catch(e){
                        throw new AjaxError(e.message);
                    }
                };
                var send=function(){
                    try{
                        cur[0].send(cur[1].data);
                    }catch(e){
                        throw new AjaxError(e.message);
                    }
                };

                open();//发起连接

                this[0].onreadystatechange=function(){
                    cur[1].showStatus(cur[0].readyState);
                    if(cur[0].readyState==4&&!isTimeout){

                        try{
                            if(isOK(cur[0])){//成功完成
                                var t=httpData(cur[0],cur[1].type);

                                cur[1].onSuccess(t);
                            }
                            else{
                                cur[1].onError(new AjaxError("请求未成功完成"));
                            }

                        }catch(et){
                            cur[1].onError(new AjaxError(et.message));
                        }finally{
                            cur[1].onComplete();
                            cur[0]=null;
                            clearTimeout(timer);
                        }

                    }
                };

                send();

            }catch(e){
                this[1].onError(new AjaxError(e.message));
            }finally{
                return this;
            }

        }
    };//end prototype
    ajax.prototype.init.prototype=ajax.prototype;

    ajax.parseToQueryString=function(obj){//将数组或对象序列化
        if(typeof obj===STR)return obj;
        var s=[];
        if(obj instanceof Array){//假定为数组
            for(var i=0;i<obj.length;i++)
                s.push(obj[i].name||i+"="+obj[i]);
        }
        else{
            for(var j in obj) s.push(j+"="+obj[j]);
        }
        return s.join("&");
    } ;

    ajax.parseToObject=function(str){//将查询字符串转化成对象
        if(typeof str==OBJ)return str;
        var set={};
        str=str.split("&");
        var item;
        for(var i=0;i<str.length;i++){
            if(str[i].indexOf("=")>0){
                item=str[i].split("=");
                set[item[0]]=item[1];
            }
        }
        return set;
    };

    var fix=function(p){
        if(p.data){
            p.data=ajax.parseToQueryString(p.data);
        }
        if(p.method.toUpperCase()=="GET"&&p.data){
            p.url=append(p.url,p.data);
        }
        if(!p.cache){
            p.url=append(p.url,"abkjfjk="+(new Date().getTime())+"jrejhjdd");
        }
    };



    function isOK(r){
        try{
            return !r.status&&location.protocol=="file:"
                ||(r.status>=200&&r.status<300)
                ||r.status==304
                ||navigator.userAgent.indexOf("Safari")>=0&&r.status==undef;
        }catch(e){

        }
        return false;
    }

    function httpData(r,type){
        var res=type;
        if(!res){
            var ct=r.getResponseHeader("Content-Type");
            if(/xml/i.test(ct))	res="xml";
            else if(/JavaScript/i.test(ct))res="js";
            else res="";
        }
        switch(res){
            case "xml":
                return r.responseXML.documentElement;
            case "js":
                return eval("("+r.responseText+")");
            case "json":
                return JSON.parse(r.responseText);
            default:
                return r.responseText;
        }
    }

    function append(url,param){
        if(url.indexOf("?")<0){
            return url+"?"+param;
        }
        else{
            if(/\?$/.test(url)){
                return url+param;
            }
            else{
                return url+"&"+param;
            }
        }
    }

    $.ajax=ajax;
})($);

/**
 * 场景创建快捷代码
 */
(function($,undef){


    var isHtml5 = true;
    if (typeof location != 'undefined') {
        isHtml5 = true;
    };

    /**
     * create sprite
     * @return {[type]} [description]
     */
    $.sprite = function(obj){
        obj = obj || {};
        if (typeof obj == 'function') {
            obj = new obj();
        };
        var ctor = obj.ctor;
        obj.ctor = function(){
            if (isHtml5) {
                this._super();
            };
            //js binding下使用
            //cc.associateWithNative( this, cc.Sprite );
            ctor && ctor.call(this);
        }

        var sprite = cc.Sprite.extend(obj);
        sprite.create = function(){
            var s = new sprite();
            if (s && s.init.apply(s, arguments)) {
                return s;
            };
            return null;
        }
        return sprite;
    }
    /**
     * create scene
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    $.scene = function(obj, layer){
        if (typeof obj == 'function') {
            obj = new obj();
        };
        var ctor = obj.ctor;
        obj.ctor = function(){
            if (isHtml5) {
                this._super();
            };
            //cc.associateWithNative( this, cc[layer || "Layer"] );
            ctor && ctor.call(this);
        }
        obj.getWinSize = function(){
            return cc.Director.getInstance().getWinSize();
        }
        var extendLayer = cc[layer || "Layer"].extend(obj);
        extendLayer.create = function(){
            var layer = new extendLayer();
            if (layer && layer.init.apply(layer, arguments)) {
                return layer;
            }
            return null;
        }
        extendLayer.scene = function(){
            this.currentScene = cc.Scene.create();
            var layer = extendLayer.create();
            this.currentScene.addChild(layer);
            return this.currentScene;
        }
        return extendLayer;
    }
    /**
     * 通过frame创建sprite
     * @param  {[type]} name [description]
     * @param  {[type]} left [description]
     * @param  {[type]} top  [description]
     * @return {[type]}      [description]
     */
    $.frameSprite = function(name, left, top){
        var sprite = cc.Sprite.createWithSpriteFrameName(name);
        sprite.setAnchorPoint(cc.p(0, 0));
        sprite.setPosition(cc.p(left || 0, top || 0));
        return sprite;
    }
    $.tranScene = function(scene, dur){
        dur = dur || 0.5;
        return cc.TransitionMoveInR.create(dur, scene);
    };

})($);

/**
 * 基本工具类_ UI
 * 提供系统ui调用接口。并提供一套默认实现方案规则
 */
(function($,undef){
    /**
     * UI 接口定义
     * @type {*}
     */
    var uiInterface = cc.Class.extend({
        /*=================基本提示框=====================*/
        /**
         * alert 弹出框
         * @param msg {Object} 提示信息
         * @param fn {Function|String} 确认回调方法
         */
        alert:function(msg,fn){},
        /**
         * 确认基本对话框
         * @param msg {Object} 提示信息
         * @param yfn {Function|String} 确认回调方法
         * @param nfn {Function|String} 取消回调方法
         */
        confirm:function(msg,yfn,nfn){},
        /**
         * 气泡提示，显示一会后会自动
         * @param msg {Object} 提示信息
         * @param pause 显示停顿时间
         */
        bubble:function(msg,pause){},
        /**
         * 预加载场景资源,提供资源加载完后回调处理
         * Preload multi scene resources.
         * @param {Array} 资源列表
         * @param {Function|String} 回调方法
         * @param {Object} 回调方法的对象
         * @return {cc.LoaderScene}
         * @example
         * //example
         * var g_mainmenu = [
         *    {src:"res/hello.png"},
         *    {src:"res/hello.plist"},
         *
         *    {src:"res/logo.png"},
         *    {src:"res/btn.png"},
         *
         *    {src:"res/boom.mp3"},
         * ]
         *
         * var g_level = [
         *    {src:"res/level01.png"},
         *    {src:"res/level02.png"},
         *    {src:"res/level03.png"}
         * ]
         *
         * //load a list of resources
         * cc.LoaderScene.preload(g_mainmenu, this.startGame, this);
         *
         * //load multi lists of resources
         * cc.LoaderScene.preload([g_mainmenu,g_level], this.startGame, this);
         */
        loaderScene:function(resources, selector, target){}


    })

    var ui = uiInterface.extend({
        alert:function(){

        },
        confirm:function(){

        }
    })

    $.ui = new ui();

})($);
