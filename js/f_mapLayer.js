/**
 * Created with JetBrains WebStorm.
 * User: stoneship
 * Date: 13-7-13
 * Time: 上午9:03
 * To change this template use File | Settings | File Templates.
 */
var mapLayer = $.scene(function(){
    var TAG_TILE_MAP = 1;
    var hero = null;//行走英雄
    var map = null;//英雄地图
    return {
        vaspeed:500,//平均移动速度 s/point
        touchPos:cc.p(0,0),
        animCache:null,
        drunAction:null,//行走动画

        init:function(){
            this._super();
            this.setTouchEnabled(true);
            this.initMap();
            this.initHero();
            this.initLuXian();
            return true;
        },
        initMap:function(){
            //var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
            map = cc.TMXTiledMap.create(R.tile_iso_offset_tmx);
            this.addChild(map, 0, TAG_TILE_MAP);

            map.setAnchorPoint(cc.p(0.5, 0.5));
            map.setPosition(cc.p(this.getWinSize().width/2, this.getWinSize.height/2));
            //map.setScale(.3);

        },
        initLuXian:function(){
            var layer = map.getLayer("luxian");
            var s = layer.getPositionAt(window.cpp||cc.p(1, 0));
            hero.setPosition(s);
        },
        setHeroPos:function(p){
            var layer = map.getLayer("luxian");
            var s = layer.getPositionAt(p);
            hero.setPosition(s);
        },
        /**
         * 初始化英雄
         */
        initHero:function (fileName) {
            var me = this;

            me.animCache= cc.AnimationCache.getInstance();
            //添加plist文件里面的动画信息到缓存中
            me.animCache.addAnimations(R.caocao_plist);

            var group = map.getObjectGroup("role");
            var objects = group.getObjects();

            var frameCache = cc.SpriteFrameCache.getInstance();
            frameCache.addSpriteFrames(R.ccrole_plist);

            for (var i = 0; i < objects.length; i++) {
                var dict = objects[i];
                if (!dict)
                    break;

                hero =this.createHero(dict);

                map.addChild(hero,2);

            }

            //this.run();
        },
        /**
         * 创建一个英雄
         * @param dict
         * @returns {null}
         */
        createHero:function(dict){

            hero = cc.Sprite.createWithSpriteFrameName("33-1.png");
            hero.setAnchorPoint(cc.p(0,0));
            hero.setPosition(cc.p(dict.x,dict.y));
            var heroSize = hero.getBoundingBox();
            hero.setScale(dict.width/heroSize.width);
            return hero;
        },
        run:function(position){
            var me = this;
            //计算平均移动速度
            me.touchPos = position;
            var currentPos = me.getPosition();
            var length = cc.pDistance(currentPos,position);

            //创建元素运动，并且加入运动完回调方法
            var callback = cc.CallFunc.create(me.stopRun, me);
            var action = cc.Sequence.create(cc.MoveTo.create(length/me.vaspeed, position),callback)
            me.runAction(action);
            me.playRun(position);
        },
        playRun:function (position) {
            var me = this;
            var currentPos = me.getPosition();
            //取得方向向量
            var forwar = cc.pSub(position,currentPos);

            //取得单位向量信息
            var singer = (function(){
                return cc.p(forwar.x/Math.abs(forwar.x),forwar.y/Math.abs(forwar.y));
            })();

            //console.log(position,currentPos,forwar,singer);
            //从缓存中拿出动画元素
            var animation2 = me.animCache.getAnimation("caocao_rightrun");
            if(singer.x<0){
                animation2 = me.animCache.getAnimation("caocao_leftrun");
            }else if(singer.x>0){
                animation2 = me.animCache.getAnimation("caocao_rightrun");
            }

            var action2 = cc.Animate.create(animation2);
            me.drunAction = cc.RepeatForever.create(cc.Sequence.create(action2));
            this.runAction(me.drunAction);
        },
        //停止元素运动
        stopRun:function(){
            var me = this;
            this.stopAction(me.drunAction);
        },
        initController:function(){

        },
        onTouchesMoved:function (touches, event) {

            var touch = touches[0];
            if(touches.length>1){
                this.onZoom(touches,event);

            }else{

                //得到前一次拖动与这次拖动的坐标改变值。
                var delta = touch.getDelta();
                var node = this.getChildByTag(TAG_TILE_MAP);
                var diff = cc.pAdd(delta, node.getPosition());
                node.setPosition(diff);
            }

        },
        /**
         * 双手指放大缩小页面
         * @param touches
         * @param event
         */
        onZoom:function(touches, event){
            var touche1 = touches[0];
            var touche2 = touches[1];


        }
    }
})