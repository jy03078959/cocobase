/**
 *
 * Created with JetBrains WebStorm.
 * User: kevan
 * Date: 13-6-24
 * Time: 下午5:18
 * To change this template use File | Settings | File Templates.
 */
function ajax(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState==4) {// 4 = "loaded"
            if (xhr.status==200) {// 200 = "OK"
                var response = JSON.parse(xhr.responseText);


            } else {

            }
        }
    };
    /**
     * 得到发送数据字符串
     * @param data
     * @return {Object}
     */
    function getPostData(data){
        var datas = [];
        for (var obj in data) {
            datas.push(obj+"="+data[obj]);
        }
        return datas.join("&");
    }
    /**
     * 获取数据

    /**
     *
     * * @param url 通过url获取数据信息
     * @param data {  访问接口核心数据预览结构
     *     c:control,
     *     m:metoh
     * }
     * @param success
     * @param error
     * @private
     */
    function _getData(url,data,success,error){
        //发起一个GET请求
        xhr.open("POST", url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(getPostData(data));
    }


    return {
        getData:_getData
    }
}

