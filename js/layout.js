//
// L_layout class
//
var L_layout = function(){};

L_layout.createScrollview = function(scrollviewPanel){


    var scrollBox = scrollviewPanel.getBoundingBox();
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
L_layout.prototype.onDidLoadFromCCB = function()
{
    cc.log('L_layout ccb file has been loaded!');
    var scrollviewPanel = this.scrollviewPanel;

    scrollviewPanel.addChild(L_layout.createScrollview(scrollviewPanel));

};








