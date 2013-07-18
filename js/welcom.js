//
// L_welcom class
//
var L_welcom = function(){};
L_welcom.getMapLayer = function(){
    return mapLayer.scene();
}
L_welcom.prototype.onMap = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    //预加载所需资源。然后启动场景类容
    cc.LoaderScene.preload(g_resources, function () {
        var scene = L_welcom.getMapLayer();
        cc.Director.getInstance().replaceScene(scene);
    }, this);


};


// Create callback for button
L_welcom.prototype.onStartgame = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    var node = cc.BuilderReader.load("interface/mainScene.ccbi")
    var scene = cc.Scene.create();
    scene.addChild(node);
    cc.Director.getInstance().replaceScene(scene);
};

L_welcom.prototype.onList = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    var node = cc.BuilderReader.load("interface/layout.ccbi")
    var scene = cc.Scene.create();
    scene.addChild(node);
    cc.Director.getInstance().replaceScene(scene);
};
L_welcom.prototype.onListSelf = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    var node = myListLayer.create();
    var scene = cc.Scene.create();
    scene.addChild(node);
    cc.Director.getInstance().replaceScene(scene);
};
L_welcom.prototype.onDidLoadFromCCB = function()
{
    cc.log('L_welcom ccb file has been loaded!');


};
