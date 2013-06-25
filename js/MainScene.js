//
// MainScene class
//
var MainScene = function(){};

// Create callback for button
MainScene.prototype.onPressButton = function()
{	
    // Rotate the label when the button is pressed
    this.helloLabel.runAction(cc.RotateBy.create(1,360));
    
     // Rotate the label when the button is pressed
    //this.helloLabel.runAction(cc.RotateBy.create(1,360));

    //新增以下代码
    var theHelloLabel = this.helloLabel;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {// 4 = "loaded"
            if (xhr.status==200) {// 200 = "OK"
                var response = JSON.parse(xhr.responseText);
                cc.log(response);
                theHelloLabel.setString(response.wang);
            } else {
                cc.log("Problem retrieving JSON data:" + xhr.statusText);
            }
        }
    };
    //发起一个GET请求
    xhr.open("GET", "http://localhost/xampp.json");
    xhr.send(null);
    
};

MainScene.prototype.onDidLoadFromCCB = function()
{
    cc.log('MainScene ccb file has been loaded!');

    this.rootNode.onTouchesBegan = function( touches, event) {
        // 将触屏开始事件转发给控制器 (this)
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.onTouchesMoved = function( touches, event) {
        // 将触屏移动事件转发给控制器 (this)
        this.controller.onTouchesMoved(touches, event);
        return true;
    };

    this.rootNode.onTouchesEnded = function( touches, event) {
        // 将触屏结束事件转发给控制器 (this)
        this.controller.onTouchesEnded(touches, event);
        return true;
    };
};

MainScene.prototype.onTouchesBegan = function(touches, event)
{
    // 修改文本内容
    //this.helloLabel.setString("TOUCH START: "+parseInt(touches[0].getLocation().x)+", "+parseInt(touches[0].getLocation().y));
};

MainScene.prototype.onTouchesMoved = function(touches, event)
{
    // do some staff here
};

MainScene.prototype.onTouchesEnded = function(touches, event)
{
    // do some staff here
};