//
// L_layout class
//
var  myListLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
    },
    init:function(){
        this._super();
        var content= this.initData();
        this.addChild(content);
        return true;
    },
    initData:function(){


        var scrollBox = this.getBoundingBox();
        cc.log(scrollBox.width+":"+scrollBox.height);
        var num = 10;

        var scrollPanel = cc.LayerColor.create(cc.c4b(255, 100, 100, 128), scrollBox.width, 128*num);

        scrollPanel.setContentSize(cc.size(scrollBox.width,128*num));
        scrollPanel.setPosition(cc.p(0,0));
        scrollPanel.setAnchorPoint(cc.p(0,0));


        var content = cc.ScrollView.create(cc.size(scrollBox.width,scrollBox.height),scrollPanel);

        for (var i = 0; i < num; i++) {
            var sprite = cc.Sprite.create("button/5-1.png");
            sprite.setPosition(cc.p(0,128*(num-i-1)));
            sprite.setAnchorPoint(cc.p(0,0));
            scrollPanel.addChild(sprite);

        }

        content.setAnchorPoint(cc.p(0, 0));
        content.setPosition(cc.p(0,0));
        content.setDirection(cc.SCROLLVIEW_DIRECTION_BOTH);
        content.setContentOffset(content.minContainerOffset());
        return content;

    }
})
myListLayer.create = function(){
    var s = new myListLayer();
    if (s && s.init.apply(s, arguments)) {
        return s;
    };
    return null;
}


