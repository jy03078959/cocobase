//
// L_welcom class
//
var L_welcom = function(){};

// Create callback for button
L_welcom.prototype.onStart = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    var node = cc.BuilderReader.load("mainScene.ccbi")
    var scene = cc.Scene.create();
    scene.addChild(node);
    cc.Director.getInstance().replaceScene(scene);
};

L_welcom.prototype.onList = function()
{

    cc.log('L_welcom ccb file has been loaded!');
    var node = cc.BuilderReader.load("layout.ccbi")
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
