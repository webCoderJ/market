(function ($) {
    var searchInfoArr = window.location.search.substring(1).split('&');
    var searchInfo = {};
    $.each(searchInfoArr, function (index, item) {
        var indexBoundary = item.indexOf("=");
        var name = item.substring(0, indexBoundary);
        var value = item.substring(indexBoundary + 1);
        searchInfo[name] = value;
    });  
    var searchPid = searchInfo["pid"];
    console.info(searchPid);

    getMarketData();

    function getMarketData () {
        $.get("/api/public/market/"+searchPid).then(function (data) {
            console.info(data);
        }, function (err) {
            console.info(err);

            layer.open({
                type: 1,
                area: ['400px', '200px'],
                content: "没找到对应数据，请联系管理员哦～"
            });
        });
    }
})(jQuery);