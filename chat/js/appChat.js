(function() {
       
        function ChatModel() {
            this.init();
            // this.workBtn = workBtn;
            // this.robotBtn = robotBtn;
        }
        ChatModel.prototype = {
            //初始化
            init: function(){
                var self = this;
                //生成表情
                $('.chatArea', $('.chatCtn')).face({
                    src: './src/yun',//表情包路径
                    rowNum: 5,//每行最多显示数量，此属性不适用于常用语
                    ctnAttr: ['0px', '20px', '40px', '40px'],//[left bottom width height] 表情框相对targetEl位置和里面的表情格子宽高  要写单位
                    triggerEl: $('.moodBtn', $('.chatCtn')),//触发按钮(不存在则自己生成，不要由a包裹)
                    targetEl: $('.chatBodyCtn', $('.chatCtn')),//父级参照物(用于appendTo和定位)
                    hideAdv: true,//是否隐藏广告
                    callback: function(data) {},
                });
    
                //聊天
                FAQ = new Faqrobot({
                    logoUrl: './img/logo_max.png',//logo地址 ----------
                    logoId: 'logo',
                    intelTitleChange: true,// 智能聊天是否修改标题
                    artiTitleChange: true,// 人工时是否修改标题
                    artiTitle: '人工客服',// 人工时的标题
                    robotInfo:'robotInfo',
                    kfPic: './img/robot.png',  //客服图标
                    khPic: './img/serv.png', //客户图标
                    formatDate: '%month%月%date%日 %hour%:%minute%:%second%',//配置时间格式(默认10:42:52 2016-06-24)
                    topQueId: 'commonQue',//热门、常见问题Id --------
                    quickServId: 'quickLink',//快捷服务Id
                    thirdUrlId:'thirdUrl',
                    chatCtnId: 'chat-client',//聊天展示Id y   --------------
                    inputCtnId: 'replyContent',//输入框Id y   --------
                    sendBtnId: 'itSend',//发送按钮Id y   ------
                    tipWordId: 'inputTip',
                    commentFormId: 'feedBackForm',//评论框formId -------
                    commentInputCtnId: 'feedBackInput',//评论输入框Id ----
                    commentSendBtnId: 'feedBackBtn',//评论发送按钮Id ---------
                    commentTipWordId: 'feedBackTip',//评论输入框提示语Id
                    artiSearchId: 'artiSearch',//智能搜索
                    artiSearchCallback: function(data) {
                        if(data.fullTextSearch) {
                            $('.thirdURL').addClass('thirdURLRecommend');
                            $('.artiSearch').removeClass('artiSearchHide');
                            $('.itemCtn').css('width', '25%');
                            $('.itemHead4').trigger('click');
                        }else {
                            $('.artiSearch').addClass('artiSearchHide');
                            if($('.thirdURL').hasClass('thirdURLRecommend')){
                                //存在推荐链接
                                $('.itemCtn').removeAttr('style');
                            }
                            if($('.itemHead4').is('.itemHeadFocus')) {
                                $('.itemHead1').trigger('click');
                            }else {
                                $('#artiSearch').hide();
                            }
                        }
    
                    },
                    leaveQue: {// 未知问题已回复
                        open: true,//是否启用功能
                    },
                    autoSkip: {//手机不能访问pc页面
                        open: true,//是否启用功能
                        chatUrl: 'h5chat',// 默认跳转的页面
                    },
                    clearBtnId: 'clearMsg',//清除按钮Id
                    closeBtnId: 'close',//关闭聊天页面
                    // faceModule: {//表情模块
                    //     open: true,//是否启用功能
                    //     faceObj: Face,//表情插件实例
                    // },
                    poweredCtnId: 'power',//技术支持Id
                    thirdUrlCallBack:function(data,index){
                        if(!index)index=0;
                        if(data.robotAnswer[index].thirdUrl && data.robotAnswer[index].thirdUrl.url){
                            $('.thirdURL').removeClass('thirdURLRecommend');
                            $('.itemHead5').trigger('click');
                            $('.itemCtn').css('width', '25%');
                            if(!$('.artiSearch').hasClass('artiSearchHide')){
                                $('.artiSearch').addClass('artiSearchHide')
                            }
                            $('#'+ FAQ.options.thirdUrlId+' iframe').attr('src',data.robotAnswer[index].thirdUrl.url);
                        }else{
                            $('.thirdURL').addClass('thirdURLRecommend');
                            $('.itemCtn').removeAttr('style');
                            $('.itemHead1').trigger('click');
                        };
                    }
                });
    
                //调用自动补全插件
                $('.input').autocomplete({
                    url: '../../servlet/AQ?s=ig',
                        targetEl: $('.inputCtn'),//参照物(用于appendTo和定位)
                        posAttr: ['-1px', '138px'],//外边框的定位[left bottom]
                        itemNum: 10,//[int] 默认全部显示
                        callback: function(data) {//获取文本后的回调函数
                            $('.sendBtn').trigger('click');
                    }
                });

                //转人工
                $("#switchHuman").click(function () {
                    $(".chat-operation").removeClass('hide');
                    $(".outWork").removeClass('hide');
                    
                    $(".scoll-reference").css({ 'height': '394px'});
                    FAQ.offline();
                });

                // 转机器人
                $(".outWork").click(function () {
                    $(".chat-operation").addClass('hide');
                    $(".outWork").addClass('hide');
                    $(".scoll-reference").css({ 'height': '414px'});
                    FAQ.init();
                });

                // 显示催单modal
                $(".expediteOrder").click(function () {
                    $(".expediteModel").removeClass('hide');
                });

                // 关闭催单modal
                $(".expedite-close").click(function(event) {
                    event.stopPropagation();
                    $(".expediteModel").addClass('hide')
                });

                // 点击催单禁用按钮并调借口
                $('.evaluateOrderFn').click(function(e){
                    $(e.target).attr('disabled','disabled');
                    var tiem = setTimeout(function() {
                        $(e.target).removeAttr('disabled');
                    },1000*10);
                    tiem = null;
                });

                //点击勾选礼物
                $('.present').click(function(event) {
                    $(event.currentTarget).children('.present-box').toggleClass('show');
                    console.log($(".present-box",".show").prevObject);

                    var arr = new Array().slice.apply($(".present-box",".show").prevObject);
                    arr.forEach(function(element) {
                        console.log($(element).siblings('img').attr('title'));
                    });
                });



                //截屏
                this.captureObj = new NiuniuCaptureObject();//生成实例
                this.captureObj.InitNiuniuCapture();//初始化控件

                this.captureObj.FinishedCallback = function(type, x, y, width, height, info, content, localpath) {//截屏完毕
                    if(type == 1) {
                        $.ajax({
                            url: '../../MaterialNoAuth/doSaveScreenPic',
                            data: {'picData': content},
                            type: 'post',
                            success: function(data) {
                                if(data.status) {
                                    new jBox('Notice', {
                                        content: data.message,
                                        color: 'red',
                                        autoClose: '3000',
                                    });
                                }else {
                                    content = '<img class="imgBox" src="/'+ data.url +'">';

                                    // $('#chat-client').append('<div class="servCtn"><span class="time">'+ MN_Base.getFormatDate() +'</span><div class="wordCtn"><img class="chatPic" src="images/robot.png"><p class="name">'+ (webConfig.RobotName || '') +'</p><div>'+ content +'</div><i class="tri"></i></div></div>');


                                    $('#chat-client').append('<div class="MN_ask">'+
                                        '<div class="MN_khtime">'+MN_Base.getFormatDate()+'</div>'+
                                        '<div class="MN_khName">我</div>'+
                                        '<div class="MN_khCtn">'+
                                            '<img class="MN_khImg" src="'+ data.url +'">'+
                                            '<i class="MN_khTriangle1 MN_triangle"></i>'+
                                            '<i class="MN_khTriangle2 MN_triangle"></i>'+
                                        '</div>'+
                                    '</div>')

                                    // $('.monitorTalkCtn', $curMonitor).append('<div class="servCtn"><span class="time">'+ MN_Base.getFormatDate() +'</span><div class="wordCtn"><p class="name">'+ (webConfig.RobotName || '') +'</p><div>'+ content +'</div><i class="tri"></i></div></div>');
                                    // $('.chatBodyLeftCtnScroll', $curChat).mCustomScrollbar('scrollTo', 'bottom');
                                    // srcToolTip.close();
                                    // sendMsg($curChat.attr('cId'), content);
                                    // var $imgBox = $('.imgBox:last', $curChat);
                                    // //放大图片
                                    // new jBox('Tooltip', {
                                    //     attach: $imgBox.parent(),
                                    //     title: data.url.match(/\/(\d+\.jpg)/)[1],
                                    //     content: content,
                                    //     trigger: 'click',
                                    //     target: $('body'),
                                    //     overlay: true,
                                    //     position: {
                                    //         x: 'center',
                                    //         y: 'center',
                                    //     },
                                    //     animation: false,
                                    //     closeOnClick: 'body',
                                    //     closeOnEsc: true,
                                    // });
                                    // //提示放大
                                    // new jBox('Mouse', {
                                    //     attach: $imgBox.parent(),
                                    //     content: '点击放大',
                                    //     animation: false,
                                    //     closeOnClick: 'body',
                                    // });

                                }
                            }
                        });

                    }
                }

                //截屏
                $('.screenBtn','.chatCtn').unbind('click').bind('click',function(){
                    var captureRet = self.captureObj.DoCapture("1.jpg", 0, 3, 0, 0, 0, 0);
                    console.log(captureRet)
                    if(!captureRet) {//没有安装控件
                        self.ShowDownLoad();
                    }
                });

    
                
            },
            //转义表情
            replaceFace: function (data, bool) {
                var src = 'src/',
                    faceType = ['云问表情', 'png', 'png'],
                    face = {//表情包
                    '云问表情': [
                        ['[微笑]', '/::)'],
                        ['[色]', '/::B'],
                        ['[得意]', '/:8-)'],
                        ['[流泪]', '/::<'],
                        ['[害羞]', '/::$'],
                        ['[闭嘴]', '/::X'],
                        ['[发怒]', '/::@'],
                        ['[呲牙]', '/::D'],
                        ['[惊讶]', '/::O'],
                        ['[难过]', '/::('],
                        ['[酷]', '/::+'],
                        ['[愉快]', '/:,@-D'],
                        ['[流汗]', '/::L'],
                        ['[奋斗]', '/:,@f'],
                        ['[疑问]', '/:?'],
                        ['[晕]', '/:,@@'],
                        ['[委屈]', '/:P-(']
                    ],
                };
                for(var i in face) {
                    if(i == faceType[0]) {
                        for(var j=0; j<face[i].length; j++) {//考虑到含有特殊字符，不用正则
                            while(data.indexOf(face[i][j][0])+1) {
                                var index = data.indexOf(face[i][j][0]),
                                    len = face[i][j][0].length,
                                    str1 = data.substr(0, index),
                                    str2 = data.substr(index+len);
                                data = str1 + (bool?face[i][j][1]:('<img src="'+ src + j +'.'+ faceType[2] +'">')) + str2;
                            }
                            if(!bool) {
                                while(data.indexOf(face[i][j][1])+1) {
                                    var index = data.indexOf(face[i][j][1]),
                                        len = face[i][j][1].length,
                                        str1 = data.substr(0, index),
                                        str2 = data.substr(index+len);
                                    data = str1 +'<img src="'+ src + j +'.'+ faceType[2] +'">'+ str2;
                                }
                            }
                        }
                    }
                }
                return data;
            },
            //转人工
            switchWork: function() {

            },
            //转机器人
            outWork: function () {

            },
            //根据是否是Chrome新版本来控制下载不同的控件安装包
            ShowDownLoad: function () {
                if(this.captureObj.IsNeedCrx()) {
                    this.ShowChromeInstallDownload();
                }else {
                    this.ShowIntallDownload();
                }
            },
            ShowChromeInstallDownload: function () {
                var ret = confirm("您需要先下载Chrome扩展安装包进行安装，点击确定继续!");
                if(ret) {
                    window.location.href="http://www.ggniu.cn/download/CaptureInstallChrome.exe";
                }

            },
            ShowIntallDownload: function () {
                var ret = confirm("您需要先下载控件进行安装，点击确定继续!");
                if(ret) {
                    window.location.href="http://www.ggniu.cn/download/CaptureInstall.exe";
                }
            }



        }
    
        var ChatModel = new ChatModel();
    
    
       
    }())