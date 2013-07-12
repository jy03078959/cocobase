/**
 * 场景创建快捷代码
 */
(function($,undef){
    if($==undef){
        $ = {};
    }

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
 * 基本工具类
 */
(function($,undef){


})($);