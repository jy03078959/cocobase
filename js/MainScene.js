//
// L_mainScene class
//
var L_mainScene = function(){};


L_mainScene.prototype.onDidLoadFromCCB = function()
{
    cc.log('L_mainScene ccb file has been loaded!');


};
L_mainScene.prototype.onAct = function(){
    cc.log("onAct");
    this.linchong.animationManager.runAnimationsForSequenceNamed("act");
}
