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
    var options = {};
    options.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    };

    $('#demo').daterangepicker(options, function(start, end, label) {
        console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')'); 
    });
})(jQuery);