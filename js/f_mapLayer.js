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
    var heroWarp = null;
    var map = null;//英雄地图
    var animationKey = "";
    return {
        vaspeed:100,//平均移动速度 s/point
        touchPos:cc.p(0,0),
        animCache:null,
        _touchMoved:false,
        init:function(){
            this._super();
            this.setTouchEnabled(true);
            this.initMap();
            this.initHero();
            this.initLuXian();
            this.initController();
            return true;
        },
        initMap:function(){
            //var color = cc.LayerColor.create(cc.c4b(64, 64, 64, 255));
            map = cc.TMXTiledMap.create(R.tile_iso_offset_tmx);
            this.addChild(map, 0, TAG_TILE_MAP);

            map.setAnchorPoint(cc.p(0.5, 0.5));
            map.setPosition(cc.p(this.getWinSize().width/2, this.getWinSize().height/2));
            //map.setScale(.3);


        },
        initLuXian:function(){
            var layer = map.getLayer("luxian");
            var s = layer.getPositionAt(cc.p(1, 0));
            heroWarp.setPosition(s);
        },
        setHeroPos:function(p){
            var layer = map.getLayer("luxian");
            var s = layer.getPositionAt(p);
            heroWarp.setPosition(s);
        },
        /**
         * 初始化英雄
         */
        initHero:function (fileName) {
            var me = this;


            var group = map.getObjectGroup("role");
            var objects = group.getObjects();


            for (var i = 0; i < objects.length; i++) {
                var dict = objects[i];
                if (!dict)
                    break;

                heroWarp =this.createHero(dict);
               // this.runAction(cc.Follow.create(heroWarp, map.getBoundingBox()));

                map.addChild(heroWarp,2);
            }
        },
        /**
         * 创建一个英雄
         * @param dict
         * @returns {null}
         */
        createHero:function(dict){
            heroWarp = cc.LayerColor.create(cc.c4b(255, 0, 0, 128), 200, 200);
            hero = cc.BuilderReader.load("interface/role/caocao.ccbi");
            var heroSize = hero.getBoundingBox();

            heroWarp.setAnchorPoint(cc.p(0,0));
            heroWarp.setScale(dict.width/heroSize.width);
            heroWarp.setContentSize(cc.size(heroSize.width,heroSize.height));

            heroWarp.addChild(hero);

            return heroWarp;
        },
        run:function(position){
            var me = this;
            //计算平均移动速度
            me.touchPos = position ;
            var currentPos = heroWarp.getPosition();
            var length = cc.pDistance(currentPos,position);

            //创建元素运动，并且加入运动完回调方法
            var callback = cc.CallFunc.create(me.stopRun, me);
            var action = cc.Sequence.create(cc.MoveTo.create(length/me.vaspeed, position),callback)
            this.playRun(position);

            heroWarp.runAction(action);
        },
        playRun:function (position) {
            var me = this;
            //this.stopRun();
            var currentPos = heroWarp.getPosition();
            //取得方向向量
            var forwar = cc.pSub(position,currentPos);

            //取得单位向量信息
            var singer = (function(){
                return cc.p(forwar.x/Math.abs(forwar.x),forwar.y/Math.abs(forwar.y));
            })();

            //console.log(position,currentPos,forwar,singer);
            //从缓存中拿出动画元素
            animationKey = "down";
            if(singer.x>=0&&singer.y>0){
                animationKey = "up";
            }else if(singer.x<0&&singer.y>=0){
                animationKey = "left";
            }else if(singer.x<=0&&singer.y<0){
                animationKey = "down";
            }else if(singer.x>0&&singer.y<=0){
                animationKey = "right";
            }
            hero.animationManager.runAnimationsForSequenceNamed("run_"+animationKey);

        },
        //停止元素运动
        stopRun:function(){
            var me = this;
            hero.animationManager.runAnimationsForSequenceNamed("stand_"+animationKey);

        },
        initController:function(){
            cc.log('L_welcom ccb file has been loaded!');
            var node = cc.BuilderReader.load("interface/control.ccbi")
            this.addChild(node);
        },
        onTouchesMoved:function (touches, event) {
            this._touchMoved = true;
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

        onTouchesEnded:function(touches,event){
            if(!this._touchMoved){
                var touch = touches[0];
                if(touches.length==1){
                    //转换为map场景的坐标系
                    this.run(map.convertTouchToNodeSpace(touch));
                    var pos = map.convertTouchToNodeSpace(touch);
                    this.convertPosToPoint(pos);
                }

            }

              this._touchMoved = false;
        },
        onTouchesBegan:function(touches,event){
            this._touchMoved = false;
            return true;
        },
        convertPosToPoint:function(pos){
            var mapsize = map.getBoundingBox();
            pos.x = mapsize.width/2 - pos.x;
            pos.y =mapsize.height - pos.y;
            var w = map.getTileSize().width;
            var h = map.getTileSize().height;
            var y  =parseInt((pos.x*h+pos.y*w)/(w*h));
            var x  = parseInt((pos.y*w-pos.x*h)/(w*h));
            x<=0?x=0:x;
            y<=0?y=0:y;
            cc.log(x+"x,"+y+"y");
            var p = cc.p(Math.abs(x),Math.abs(y));

            var layer = map.getLayer("warter");
            var selectTile = layer.getTileAt(p);
            if(selectTile){
                selectTile.setScale(.5);
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