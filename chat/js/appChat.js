(function() {
       
        function ChatModel() {
            this.init();
            // 初始化服务单和公告栏页码
            this.orderServeIndex = 1;
            $(".pageIndex").html(this.orderServeIndex);
            this.noticeIndex = 1;
            $(".noticeIndex").html(this.noticeIndex);



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
                    $(".chat-operation").children().eq(1).removeClass('hide');
                    $(".chat-operation").children().eq(2).removeClass('hide');
                    $(".outWork").removeClass('hide');
                    FAQ.offline();
                });

                // 转机器人
                $(".outWork").click(function () {
                    // $(".chat-operation").addClass('hide');
                    $(".chat-operation").children().eq(1).addClass('hide');
                    $(".chat-operation").children().eq(2).addClass('hide');
                    $(".outWork").addClass('hide');
                    FAQ.init();
                });


                //点击勾选礼物
                $('.present').click(function(event) {
                    $(event.currentTarget).children('.present-box').toggleClass('show');
                    // console.log($(".present-box",".show").prevObject);
                    // var arr = new Array().slice.apply($(".present-box",".show").prevObject);
                    // arr.forEach(function(element) {
                    //     console.log($(element).siblings('img').attr('title'));
                    // });
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

                // 初始化服务单和公告栏数据
                this.getRightNoticeList();
                        
            
                // 监听评价建议长度。
                this.listenTextareaLen($(".textareaLen"),$("#textareaVal"));

                this.listenTextareaLen($(".yawpTextareaLen"),$("#yawpTextarea"));
                

                // 点击满意不满意添加css
                $(".isSatisfaction-btn").click(function(e) {
                    $('.isSatisfaction-btn').eq(0).toggleClass('Satisfaction-color');
                    $('.isSatisfaction-btn').eq(1).toggleClass('Satisfaction-color');
                })
            
            

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
                                data = str1 + (bool?face[i][j][1]:('<img src="'+ src + 'yun'+j +'.'+ faceType[2] +'">')) + str2;
                            }
                            if(!bool) {
                                while(data.indexOf(face[i][j][1])+1) {
                                    var index = data.indexOf(face[i][j][1]),
                                        len = face[i][j][1].length,
                                        str1 = data.substr(0, index),
                                        str2 = data.substr(index+len);
                                    data = str1 +'<img src="'+ src + 'yun'+j +'.'+ faceType[2] +'">'+ str2;
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
            },
            // 模版
            template: function() {
                /**
                 * 最近服务单template
                 * @param id 主键
                 * @param orderNumber 单号
                 * @param state 状态(处理or待评价;评价or催单也根据state来判断)
                 * @param context 服务单内容
                 * @param time    时间
                 * @param 评价or催单根据state判断 
                 */
                var serviceOrderTemplate = function(data) {
                   
                    var stateBtnTmp = '';
                    if(data.state === '处理中'){
                        stateBtnTmp = reminderTemplate({
                            number: data.number,
                            id: data.id
                        });
                    }else{
                        stateBtnTmp = '<div class="pull-right gray" data-toggle="modal" data-target="#evaluateModal" onclick="ChatModel.getEvaluateDetailData('+ JSON.stringify(data).replace(/\"/g,"'") +')">评价</div>'
                    }
                    console.log(data);
                    var template =  '<div class="serviceO-Context radius">'+
                        '<div class="serviceOC-titl">'+
                            '<div>单号:<b>'+ data.orderNumber +'</b></div>'+
                            '<div class="pull-right state">'+ data.state +'</div>'+
                        '</div>'+
                        '<div class="serviceOC-context" data-toggle="modal" data-target="#chatModal" onclick="ChatModel.getOrderServeDetailData('+ JSON.stringify(data).replace(/\"/g,"'") +')" > '+ data.context +'</div>'+
                        '<div class="serviceOC-foot">'+
                            '<div class="item state">'+ data.time +'</div>'+
                             stateBtnTmp+
                        '</div>'+
                    '</div>'
                    return template; 
                }

                /**
                 * 催单template
                 * @param number 催单次数
                 */
                var reminderTemplate = function(data) {
                    var template =  '<div class="pull-right gray expediteOrder">催单'+
                    '<div class="expediteModel radius hide">'+
                        '<span class="expedite-assign"></span>'+
                        '<div class="expedite-content">'+
                            '该工单已被催单<span class="red">'+data.number+'</span>次，请确认是否要催单?'+
                        '</div>'+
                        '<div class="expedite-foot">'+
                            '<button type="botton" class="btn btn-default pull-right expedite-close">暂不需要</button>'+
                            '<button type="botton" class="btn btn-primary pull-right evaluate-color evaluateOrderFn" onclick="ChatModel.reminderBtnFn(event,'+ data.id +')" style="margin-right:20px">我要催单</button>'+
                        '</div>'+
                    '</div>'+
                    '</div>'
                    return template; 
                }

                /**
                 * 公告template
                 * @param title 标题
                 * @param context 内容
                 * @param src 查看详情地址
                 * @param time 时间
                 */
                var noticeTemplate = function(data){
                    var template =  '<div class="notice-Context">'+
                        '<div class="">'+ data.title +'</div>'+
                        '<div class="not-Con">'+
                                data.context +
                            '</div>'+
                            '<div class="not-foot">'+
                            '<div><a style="text-decoration: underline;" class="state" href=" '+ data.src +' ">查看详情>></a></div>'+
                            '<div class="item state pull-right">'+ data.time +'</div>'+
                            '</div>'+
                        '</div>'
                        return template;
                }


                return {
                    serviceOrderTemplate: serviceOrderTemplate,
                    reminderTemplate: reminderTemplate,
                    noticeTemplate: noticeTemplate
                }
            },
            // 添加服务单-催单事件
            addReminderFn: function() {
                // 显示催单modal
                $(".expediteOrder").bind('click',function () {
                    $(".expediteModel").removeClass('hide');
                });

                // 关闭催单modal
                $(".expedite-close").click(function(event) {
                    event.stopPropagation();
                    $(".expediteModel").addClass('hide')
                });
            },
            // 获取服务单列表
            getOrderServiceList: function(data) {
                
                var self = this;
                if(data.length > 0){
                    $("#orderSerivceTemplate").empty();
                    var templates = '';
                    data.forEach(function(item) {
                        templates += self.template().serviceOrderTemplate({
                            id:item.id,
                            number: 1,
                            orderNumber: item.orderNumber,
                            state: item.state,
                            context: item.context,
                            time: item.time
                        });
                    });
                    $("#orderSerivceTemplate").append(templates);
                    //绑定催单事件
                    this.addReminderFn();
                }    

            },
            // 获取服务单翻页num
            getPageIndex: function(type,pageIndex,pageDom) {
                if(type === 'Pre' && this[pageIndex] > 1){
                    this[pageIndex]--
                    pageDom.html(this[pageIndex]);
                    return this[pageIndex]
                }else if(type === 'Next' && this[pageIndex] > 0 && this[pageIndex] < 4){
                    this[pageIndex]++
                    pageDom.html(this[pageIndex]);
                    return this[pageIndex]
                }else{
                    return false;
                }
            },
            // 获取公告列表
            getNoticeLise: function(data) {
                if(data){
                    $(".noticeList").empty();
                    var template = this.template().noticeTemplate(data);
                    $(".noticeList").append(template);
                }
            },
            // 初始化服务单和公告数据
            getRightNoticeList: function() {
                var self = this;
                /*----------------服务单----------------------*/
                //服务单列表初始化---后台数据以数组形式传入
                this.getOrderServiceList([{ 
                    id:1,
                    orderNumber:'015415',
                    state:'处理中',
                    context:'服务单详情服务单详情服务单详情服务单详情服务单详情111',
                    time:'2017-10-13 16:21'
                },{
                    id:2,
                    orderNumber:'123456789',
                    state:'待评价',
                    context:'待评价待评价待评价待评价待评价待评价待评价222',
                    time:'2017-10-03 16:21'
                }]);

                //pre-服务单
                $(".servicePagePre").click(function() {
                    //ajax获取数据数组
                    if(self.getPageIndex('Pre','orderServeIndex',$(".pageIndex"))){
                        self.getOrderServiceList([{ 
                            orderNumber:self.orderServeIndex,
                            state:'处理中',
                            context:'服务单详情服务单详情服务单详情服务单详情服务单详情'+self.orderServeIndex,
                            time:'2017-10-13 16:21'
                        },{
                            orderNumber: self.orderServeIndex,
                            state:'待评价',
                            context:'待评价待评价待评价待评价待评价待评价待评价'+self.orderServeIndex,
                            time:'2017-10-03 16:21'
                        }]);
                    }
                });

                //next-服务单
                $('.servicePageNext').click(function() {
                    if(self.getPageIndex('Next','orderServeIndex',$(".pageIndex"))){
                        self.getOrderServiceList([{ 
                            orderNumber: self.orderServeIndex,
                            state:'处理中',
                            context:'服务单详情服务单详情服务单详情服务单详情服务单详情'+self.orderServeIndex,
                            time:'2017-10-13 16:21'
                        },{
                            orderNumber: self.orderServeIndex,
                            state:'待评价',
                            context:'待评价待评价待评价待评价待评价待评价待评价'+self.orderServeIndex,
                            time:'2017-10-03 16:21'
                        }]);
                    }
                });

                /*----------------公告----------------------*/
                // 获取服务单列表
                this.getNoticeLise({
                    title: '<<紧急通知>>',
                    context: '紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知',
                    src:'',
                    time:'2017-10-23 17:56'
                });

                // 服务单Pre翻页
                $(".noticePre").click(function() {
                    if(self.getPageIndex('Pre','noticeIndex',$(".noticeIndex"))){
                        self.getNoticeLise({
                            title: '<<紧急通知'+ self.noticeIndex +'>>',
                            context: '紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知',
                            src:'',
                            time:'2017-10-23 17:56'
                        });
                    }
                });
                // 服务单Next翻页
                $(".noticeNext").click(function() {
                    if(self.getPageIndex('Next','noticeIndex',$(".noticeIndex"))){
                        self.getNoticeLise({
                            title: '<<紧急通知'+ self.noticeIndex +'>>',
                            context: '紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知紧急通知',
                            src:'',
                            time:'2017-10-23 17:56'
                        });
                    }
                });
            },
            // 点击弹出服务单详情
            getOrderServeDetailData: function(data) {
                // 如服务单列表和详情是一个接口直接拿到data进行赋值，反之则拿id再获取详情数据
                console.log(data);//通过id获取数据
                var orderServeData = {
                    id:'3',
                    creationTime: '2017-10-24 11:11',
                    assignTime: '2017-10-25 11:12',
                    figureOutTime: '2017-10-26 11:13',
                    orderNumber: '单号 1321321321',
                    state:'状态 待评价',
                    systemName:'系统名称美信',
                    problemDescription:'账号:你好，描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
                    reminderNumber:'处理此处1',
                    handler:'处理人哦',
                    handlingSuggestion:'处理意见意见'
                }
                var tmpl = $.templates("#chatModalTmpl");
                var html = tmpl.render(orderServeData);
                $("#chat-modal").html(html);
            },
            // 获取评价详情
            getEvaluateDetailData: function(data) {
                // 如服务单列表和详情是一个接口直接拿到data进行赋值，反之则拿id再获取详情数据
                console.log(data);
                // ajax 获取详情
                var evaluateData = {
                    engineer: '工程师',
                    jobNumber: '2102313',
                    id:'4'
                }
                var tmpl = $.templates("#evaluateTmpl");
                var html = tmpl.render(evaluateData);
                $("#evaluateDetail").html(html);
            },
            // 监听数据字数长度
            listenTextareaLen: function(numberDom,inputVal) {
                inputVal.keyup(function() {
                    var length = inputVal.val().length;
                    console.log(length);
                    if(length > 500){
                        var val = inputVal.val().slice(0,500);
                        inputVal.val(val);
                    }
                    numberDom.html(length)
                });
            },
            // 催单点击事件
            reminderBtnFn: function(e,id) {
                console.log(id);
                $(e.target).attr('disabled','disabled');
                var tiem = setTimeout(function() {
                    $(e.target).removeAttr('disabled');
                },1000*10);
                tiem = null;
            },
            // 保存评价数据
            saveEvaluateFn: function() {
                var id = $(".jobId").attr('jobId'); // 获取id
                // 获取选中礼物
                var arr = new Array().slice.apply($(".present-box",".show").prevObject);
                arr.forEach(function(element) {
                    console.log($(element).siblings('img').attr('title'));
                });

                // 满意or不满意
                var isSatisfaction = $(".isSatisfaction-btn",".Satisfaction-color").prevObject.attr("isSatisfaction");
                console.log(isSatisfaction);
                // 服务建议

                var textareaVal = $("#textareaVal").val();
                console.log(textareaVal);
            },
            // 提交报障
            reportedBarrier: function() {
                // .find("option:selected").text();
                var projectName = $(".MprojectName").val();
                var describe = $(".Mdescribe").val();
                var file = '';
                var department = $('.department').val();
                var area = $('.Marea').val();
            },
            // 人工-提交不满意意见
            submitYawp: function() {
                var text = $('#yawpTextarea').val();
                console.log(text)
            }

        }
    
        window.ChatModel = new ChatModel();
    
    }())
    