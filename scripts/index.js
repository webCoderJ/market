;
(function($) {
    //头部滚动固定
    ;
    (function() {
        function getStyle(obj, name) {
            if (obj.currentStyle) {
                return parseInt(obj.currentStyle[name])
            } else {
                return parseInt(getComputedStyle(obj, false)[name])
            }
        }
        var top_dis = getStyle($("header")[0], 'height')
        var header_height = getStyle($("#datas_header")[0], 'height')

        window.onscroll = function(e) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= top_dis) {
                $("#datas_header").css({
                    position: "fixed",
                    display: "block",
                    width: "100%",
                    top: "0",
                    opacity: "0.8"
                })
                $(".datas").css({
                    display: 'block',
                    paddingTop: header_height + "px"
                });

            } else {
                $("#datas_header").css({
                    position: "static",
                    opacity: "1"
                })
                $(".datas").css({
                    display: "table",
                    paddingTop: 0
                });
            }
        }
    }())

    var index = layer.load(1, {
        shade: [0.5, 'rgb(0,0,0)'] //0.1透明度的白色背景
    });

    var searchInfoArr = window.location.search.substring(1).split('&');
    var searchInfo = {};
    $.each(searchInfoArr, function(index, item) {
        var indexBoundary = item.indexOf("=");
        var name = item.substring(0, indexBoundary);
        var value = item.substring(indexBoundary + 1);
        searchInfo[name] = value;
    });
    var searchPid = searchInfo["pid"];
    console.info(searchPid);

    function rendData(datas) {
        $('#data_content').html(_.template($('#template').html())({ data: datas.data }));
    }

    function getMarketData() {
        $.get("/api/public/market/" + searchPid).then(function(data) {
            layer.closeAll();
            console.info(data);
            $("#user_name").html(data.username);
            rendData(data);
        }, function(err) {
            layer.closeAll();
            console.info(err);
            layer.msg('未能获取到数据，请联系管理员', { icon: 5 });
        });
    }
    getMarketData();

    //查询按钮
    ;
    (function() {
        var query = "daterangepicker_keywords_query-btn".split('_');
        $.each(query, function(index, item) {
            query[index] = $("#" + item);
        })
        window.handle = handle;

        function handle() {
            var startDate = query[0].val().split('--')[0] || '',
                endDate = query[0].val().split('--')[1] || '',
                keywords = query[1].val().trim() || '',
                errorTips = '请选择日期!_请输入查询关键字_数据拉取失败，请重试！'.split('_')

            layer.closeAll();
            var index = layer.load(1, {
                shade: [0.5, 'rgb(0,0,0)'] //0.1透明度的白色背景
            });

            $.get('/api/public/market/' + searchPid, {
                start_date: startDate,
                end_date: endDate,
                anyway: keywords,
            }, function(data, status) {
                console.log('请求状态--' + status);
                console.log('data' + data)
                layer.close(index);
                if (data.is_succ) {
                    rendData(data);
                } else {
                    layer.msg(errorTips[3], { icon: 5 });
                }
            })
        }

        query[2].on('click', function() {
            handle();
        });

        query[1].on('keydown', function(e) {
            var ev = document.all ? window.event : e;
            if (keywords == '') return;
            if (ev.keyCode == 13) {
                handle();
            }
        });
    }())

    ;
    (function() {
        //日期选择功能   
        var options = {};
        options.autoUpdateInput = false;
        options.ranges = {
            '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近一个月': [moment().subtract(29, 'days'), moment()],
            '当月': [moment().startOf('month'), moment().endOf('month')],
            '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        };

        $('#daterangepicker').daterangepicker(options, function(start, end, label) {
            console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
            $('#daterangepicker').val(start.format('YYYY-MM-DD') + '--' + end.format('YYYY-MM-DD'))
            window.handle();
        });
    }())

})(jQuery);