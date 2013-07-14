/**
 * Created with JetBrains WebStorm.
 * User: stoneship
 * Date: 13-7-13
 * Time: 上午9:32
 * To change this template use File | Settings | File Templates.
 */
;(function(){
    var dirImg = "";
    /**
     * 资源
     * @type {Object}
     */
    R = {
        ccrole_png: dirImg + "role/run/ccrole.png",
        ccrole_plist: dirImg + "role/run/ccrole.plist",
        caocao_plist: dirImg + "role/run/caocao.plist",
        tile_iso_offset_png: dirImg + "bg/tile_iso_offset.png",
        tile_iso_offset_tmx: dirImg + "bg/tile_iso_offset.tmx",
        iso_test_png: dirImg + "bg/iso-test.png",
        iso_test_tmx: dirImg + "bg/iso-test.tmx"
    }
    g_resources = [];
    var types = {
        "png": "image",
        "jpg": "image",
        "jpeg": "image",
        "gif": "image",
        "mp3": "sound",
        "ogg": "sound",
        "plist": "plist"
    }
    for(var name in R){
        var value = R[name];
        var type = '';
        value.replace(/\.(\w+)$/g, function(a, b){
            type = types[b]||b;
        })
        g_resources.push({
            type: type,
            src: value
        })
    }
})();