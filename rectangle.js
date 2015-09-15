/**
 * Created by feichenxi on 2015/9/14.
 */

window.rectangle = (function(){

    // 矩形方框类定义
    function Rect(){

        // 方法
        if(typeof this.init != "function"){

            // 初始化
            Rect.prototype.that = this;
            Rect.prototype.init = function(c, f, i, x, y, w, h){
                // 属性
                if(!c || !f || i<0){
                    return;
                }
                this.container = c;
                this.deleteCallback = f;
                this.index = i;
                this.offsetX    = !x ? 0 : x;
                this.offsetY    = !y ? 0 : y;
                this.width      = !w ? 0 : w;
                this.height     = !h ? 0 : h;

                // dom元素
                this.html = '<div class="rect-main disable-select dotted">' +
                    '<div class="rect-size right-down"></div>' +
                    '<div class="rect-size down"></div>' +
                    '<div class="rect-size left-down"></div>' +
                    '<div class="rect-size left"></div>' +
                    '<div class="rect-size right"></div>' +
                    '<div class="rect-size right-up"></div>' +
                    '<div class="rect-size up"></div>' +
                    '<div class="rect-size left-up"></div>' +
                    '</div>';
                this.ele = {};
                this.ele.main       = $(this.html);

                // 样式
                this.ele.main.css('left', this.offsetX);
                this.ele.main.css('top', this.offsetY);
                this.ele.main.css('width', this.width);
                this.ele.main.css('height', this.height);

                // 加入父元素
                this.container.append(this.ele.main);

                // 绑定事件
                var me = this;
                this.ele.main.on('mousedown', function(e){
                    console.log('mousedown');
                    Rect.prototype.that = me;
                    //console.log(me);
                    Rect.prototype.mousePos = { x: e.pageX, y: e.pageY };
                    Rect.prototype.rectPos = { x: me.offsetX, y: me.offsetY };
                    Rect.prototype.rectSize = { w: me.width, h: me.height };
                    var $target = $(e.target);
                    if($target.hasClass('rect-main')){
                        me.ele.main.addClass('rect-mouse-move');
                        Rect.prototype.optType = 'main';
                    }else if($target.hasClass('rect-size')){
                        if($target.hasClass('right-down')){
                            Rect.prototype.optType = 'right-down';
                        }else if($target.hasClass('down')){
                            Rect.prototype.optType = 'down';
                        }else if($target.hasClass('left-down')){
                            Rect.prototype.optType = 'left-down';
                        }else if($target.hasClass('left')){
                            Rect.prototype.optType = 'left';
                        }else if($target.hasClass('right')){
                            Rect.prototype.optType = 'right';
                        }else if($target.hasClass('right-up')){
                            Rect.prototype.optType = 'right-up';
                        }else if($target.hasClass('up')){
                            Rect.prototype.optType = 'up';
                        }else if($target.hasClass('left-up')){
                            Rect.prototype.optType = 'left-up';
                        }
                    }
                    me.container.on('mousemove', change);
                });
            };

            function change(e){
                //console.log('mousemove');
                var me = Rect.prototype.that;
                //console.log(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y+e.pageY-me.mousePos.y);
                switch (Rect.prototype.optType){
                    case 'main':
                        me.setPosition(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y+e.pageY-me.mousePos.y);
                        break;
                    case 'right-down':
                        me.setSize(me.rectSize.w+e.pageX-me.mousePos.x, me.rectSize.h+e.pageY-me.mousePos.y);
                        break;
                    case 'down':
                        me.setSize(me.rectSize.w, me.rectSize.h+e.pageY-me.mousePos.y);
                        break;
                    case 'left-down':
                        if(e.pageX-me.mousePos.x < me.rectSize.w){
                            me.setPosition(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y);
                        }else{
                            me.setPosition(me.rectPos.x+me.rectSize.w, me.rectPos.y);
                        }
                        me.setSize(me.rectSize.w-e.pageX+me.mousePos.x, me.rectSize.h+e.pageY-me.mousePos.y);
                        break;
                    case 'left':
                        if(e.pageX-me.mousePos.x < me.rectSize.w){
                            me.setPosition(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y);
                        }else{
                            me.setPosition(me.rectPos.x+me.rectSize.w, me.rectPos.y);
                        }
                        me.setSize(me.rectSize.w-e.pageX+me.mousePos.x, me.rectSize.h);
                        break;
                    case 'right':
                        me.setSize(me.rectSize.w+e.pageX-me.mousePos.x, me.rectSize.h);
                        break;
                    case 'right-up':
                        if(e.pageY-me.mousePos.y < me.rectSize.h){
                            me.setPosition(me.rectPos.x, me.rectPos.y+e.pageY-me.mousePos.y);
                        }else{
                            me.setPosition(me.rectPos.x, me.rectPos.y+me.rectSize.h);
                        }
                        me.setSize(me.rectSize.w+e.pageX-me.mousePos.x, me.rectSize.h-e.pageY+me.mousePos.y);
                        break;
                    case 'up':
                        if(e.pageY-me.mousePos.y < me.rectSize.h){
                            me.setPosition(me.rectPos.x, me.rectPos.y+e.pageY-me.mousePos.y);
                        }else{
                            me.setPosition(me.rectPos.x, me.rectPos.y+me.rectSize.h);
                        }
                        me.setSize(me.rectSize.w, me.rectSize.h-e.pageY+me.mousePos.y);
                        break;
                    case 'left-up':
                        if(e.pageY-me.mousePos.y < me.rectSize.h){
                            if(e.pageX-me.mousePos.x < me.rectSize.w){
                                me.setPosition(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y+e.pageY-me.mousePos.y);
                            }else{
                                me.setPosition(me.rectPos.x+me.rectSize.w, me.rectPos.y+e.pageY-me.mousePos.y);
                            }

                        }else{
                            if(e.pageX-me.mousePos.x < me.rectSize.w){
                                me.setPosition(me.rectPos.x+e.pageX-me.mousePos.x, me.rectPos.y+me.rectSize.h);
                            }else{
                                me.setPosition(me.rectPos.x+me.rectSize.w, me.rectPos.y+me.rectSize.h);
                            }
                        }
                        me.setSize(me.rectSize.w-e.pageX+me.mousePos.x, me.rectSize.h-e.pageY+me.mousePos.y);
                        break;
                    default :
                        break;
                }
            }

            // 绑定事件
            $('body').on('mouseup', function(e){
                console.log('mouseup');
                Rect.prototype.that.ele.main.removeClass('rect-mouse-move');
                Rect.prototype.that.container.off('mousemove');
            });

            // 移动位置
            Rect.prototype.setPosition = function(x, y){
                this.offsetX = x;
                this.offsetY = y;
                this.ele.main.css('left', this.offsetX);
                this.ele.main.css('top', this.offsetY);
            };

            // 调整大小
            Rect.prototype.setSize = function(w, h){
                this.width = (w>=0)?w:0;
                this.height = (h>=0)?h:0;
                this.ele.main.css('width', this.width);
                this.ele.main.css('height', this.height);
            };

            // 删除
            Rect.prototype.delete = function(){
                this.ele.main.remove();
                this.deleteCallback(this.index);
            };
        }

        this.init.apply(this, arguments);
    }

    // 当前容器
    var $container;

    // 已创建的Rect队列
    var list;

    function listPop(i){
        list[i] = null;
    }

    function listPush(x, y){
        var i;
        var tmp;
        for(i=0;i<list.length;i++){
            if(list[i] == null){
                tmp = new Rect($container, listPop, i, x, y);
                list[i] = tmp;
                return tmp;
            }
        }
        tmp = new Rect($container, listPop, list.length, x, y);
        list[list.length] = tmp;
        return tmp;
    }

    // 设置
    function setup(id){
        // 初始化
        var $body = $('body');
        var initPos = {x: 0, y: 0};
        var current;
        clear();
        list = [];

        if(!!$container){
            $container.removeClass('rect-container');
            $container.removeClass('disable-select');
            $container.off('mousedown');
            $container.off('mousemove');
            $body.off('mouseup');
        }

        $container = $('#'+id);
        if(!$container){ return; }
        $container.addClass('rect-container');
        $container.addClass('disable-select');

        $container.on('mousedown', function(e){
            if(!$(e.target).hasClass('rect-container')){
                return;
            }

            initPos.x = e.pageX-$container.offset().left;
            initPos.y = e.pageY-$container.offset().top;
            current = listPush(initPos.x, initPos.y);

            $container.addClass('rect-mouse-cross');
            $container.off('mousemove');
            $container.on('mousemove', function(e){
                var nowPos = {
                    x: e.pageX-$container.offset().left,
                    y: e.pageY-$container.offset().top
                };
                var x = initPos.x<nowPos.x?initPos.x:nowPos.x;
                var y = initPos.y<nowPos.y?initPos.y:nowPos.y;
                var X = initPos.x>nowPos.x?initPos.x:nowPos.x;
                var Y = initPos.y>nowPos.y?initPos.y:nowPos.y;
                current.setPosition(x, y);
                var h = (Y-y)>2?Y-y-2:0;
                var w = (X-x)>2?X-x-2:0;
                current.setSize(w, h);
                current.ele.main.focus();
            });
        });

        $body.on('mouseup', function(e){
            $container.removeClass('rect-mouse-cross');
            $container.off('mousemove');
            current.ele.main.removeClass('dotted');
            current.ele.main.addClass('solid');
        });
    }

    // 清除所有矩形
    function clear(){
        var i;
        if(!list || list.length<=0){
            return;
        }
        for(i=0;i<list.length;i++){
            list[i]!=null && list[i].delete();
        }
    }

    // 获取矩形坐标列表
    function getList(){
        var i;
        var result = [];
        if(!list || list.length<=0){
            return result;
        }
        for(i=0;i<list.length;i++){
            if(list[i]!=null){
                result[result.length] = {
                    x: list[i].offsetX,
                    y: list[i].offsetY,
                    w: list[i].width,
                    h: list[i].height
                };
            }
        }
        return result;
    }

    return {
        setup: setup,
        clear: clear,
        getList: getList
    };
}());
