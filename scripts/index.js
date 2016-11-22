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
            console.info(data);
            rendData(data);
        }, function(err) {
            console.info(err);
            layer.msg('未能获取到数据，请联系管理员', { icon: 5 });
        });
    }
    getMarketData();

    //渲染表格函数
    // var data = {
    //     "is_succ": true,
    //     "data": [{
    //         "user_classify": "无数据",
    //         "mt4_real": "82388579",
    //         "contact_job": "lp=,pid=103,unit=,key=",
    //         "user_name": "荻涩",
    //         "register_time": "2016-01-06 10:32:35",
    //         "reg_city": "香港",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82387653",
    //         "contact_job": "lp=wap,pid=103,unit=,key=",
    //         "user_name": "与童共舞",
    //         "register_time": "2015-12-31 16:59:49",
    //         "reg_city": "广东东莞",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82383939",
    //         "contact_job": "lp=,pid=103,unit=,key=",
    //         "user_name": "weiwei68",
    //         "register_time": "2015-12-11 11:42:13",
    //         "reg_city": "上海",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82382191",
    //         "contact_job": "lp=wap,pid=103,unit=,key=",
    //         "user_name": "p_1591027060247",
    //         "register_time": "2015-12-02 18:00:18",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82381826",
    //         "contact_job": "lp=t5,pid=103,unit=,key=",
    //         "user_name": "李阳",
    //         "register_time": "2015-11-25 17:55:17",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82381221",
    //         "contact_job": "lp=wap,pid=103,unit=,key=#/",
    //         "user_name": "13102465223",
    //         "register_time": "2015-11-16 15:25:54",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82379797",
    //         "contact_job": "lp=,pid=103,unit=,key=",
    //         "user_name": "月圆",
    //         "register_time": "2015-11-04 11:22:02",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82377776",
    //         "contact_job": "lp=t15,pid=103,unit=,key=fuchuang",
    //         "user_name": "Adams",
    //         "register_time": "2015-10-13 15:00:12",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82377703",
    //         "contact_job": "lp=t15,pid=103,unit=,key=fuchuang",
    //         "user_name": "一王睿睿一",
    //         "register_time": "2015-10-12 14:05:57",
    //         "reg_city": "",
    //         "is_ib": false
    //     }, {
    //         "user_classify": "无数据",
    //         "mt4_real": "82377702",
    //         "contact_job": "lp=t15,pid=103,unit=,key=fuchuang",
    //         "user_name": "十王睿睿十",
    //         "register_time": "2015-10-12 13:38:21",
    //         "reg_city": "",
    //         "is_ib": false
    //     }],
    //     "total_count": 10
    // }
    //rendData(data);

    //查询按钮
    (function() {
        var query = "daterangepicker_keywords_query-btn".split('_');
        $.each(query, function(index, item) {
            query[index] = $("#" + item);
        })

        query[2].on('click', function() {
            var startDate = query[0].attr("startDate") || '',
                endDate = query[0].attr("endDate") || '',
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

        });
    }())

    //日期选择功能   
    var options = {};
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
        $('#daterangepicker').attr("startDate", start.format('YYYY-MM-DD'))
        $('#daterangepicker').attr("endDate", end.format('YYYY-MM-DD'))
    });

})(jQuery);