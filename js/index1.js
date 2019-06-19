window.addEventListener('load', function() {
    // 1.获取元素
    var focus = document.querySelector('.focus');
    var focus_l = document.querySelector('.focus-l');
    var focus_r = document.querySelector('.focus-r');
    var focusWdith = focus.offsetWidth;

    //2.当鼠标经过focus  让里面的左右箭头显示
    focus.addEventListener('mouseenter', function() {
        focus_l.style.display = 'block';
        focus_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    //2.当鼠标离开focus  让里面的左右箭头隐藏
    focus.addEventListener('mouseleave', function() {
        focus_l.style.display = 'none';
        focus_r.style.display = 'none';
        timer = setInterval(function() {
            focus_r.click();
        }, 2000)
    })

    // 3.动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');

    //用for循环遍历ul所有图片.有几个图片就创建几个小li
    for (var i = 0; i < ul.children.length; i++) {

        //在页面中创建小li
        var li = document.createElement('li');

        // 创建li的同时给li添加自定义属性 index 从i 开始
        li.setAttribute('index', i);

        //把创建的li放到ol里面
        ol.appendChild(li);

        //5.小圆圈的排他思想,在创建li的同时绑定点击事件
        li.addEventListener('click', function() {

            //先把所有的小li 的类名为空
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }

            //让当前的小li类名设置为current
            this.className = 'current';

            // 6.点击小圆圈移动指定图片  ,注意是ul 移动.
            // 移动的距离是当前的li的索引号*图片的宽度   负值,  用自定义属性获取索引号
            var index = this.getAttribute('index');
            //每次点击让当前的索引号 和num circle 相同
            num = circle = index;
            animate(ul, -index * focusWdith);
        })
    }

    //给第一个小li加上current类名
    ol.children[0].className = 'current';

    //在创建li 之后 克隆第一个小li ,插入到ul的最后面
    var frist = ul.children[0].cloneNode(true);
    ul.appendChild(frist);

    //声明一个变量num.每次点击自加1   让num*图片的宽度 就可以的到图片的移动距离
    var num = 0;
    //声明一个变量控制小圆圈的自加1
    var circle = 0;
    var flag = true;
    focus_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWdith, function() {
                flag = true;
            });
            circle++;
            //小圆圈跳转是,先把所有的样式清除,再给当前的添加current
            if (circle === ol.children.length) {
                circle = 0;
            }
            chage();
        }

    })


    // 左侧按钮 同理右侧, 但num 和circle 都是自减1 判断条件取反
    focus_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWdith + 'px';
            }
            num--;
            animate(ul, -num * focusWdith, function() {
                flag = true;
            });
            circle--;
            //小圆圈跳转是,先把所有的样式清除,再给当前的添加current
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            chage();
        }
    })

    function chage() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    //定时器控制自动播放
    var timer = setInterval(function() {
        focus_r.click();
    }, 2000)
})


$(function() {
    toggleTool()

    //节流阀 互斥锁
    var flag = true;
    //声明一个变量,保存推荐模块距离顶部的距离
    var toolTop = $(".recommend").offset().top;

    //封装页面滚动函数 页面一加载就调用函数
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();

        }
    }
    $(window).scroll(function() {
        //如果页面滚动的距离大于推荐模块距离顶部的距离,则让导航栏显示, 否则隐藏
        toggleTool()

        //当页面在滚动时,如果flag是true则执行内部代码.
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass()
                }
            })
        }
    })

    //  当鼠标点击 导航栏 Li 的时候触发
    $(".fixedtool li").click(function() {
        //获取当前的索引号
        flag = false;
        var index = $(this).index();
        //通过小li的索引号获得对应内容距离顶部的Top 值
        var current = $(".floor .w").eq(index).offset().top;
        //把这个值给页面卷去的Top 值
        $("body,html").animate({
            scrollTop: current
        }, function() {
            flag = true;
        })

        //鼠标点击让当前小Li添加current类  其余的兄弟移除类名
        $(this).addClass("current").siblings().removeClass();
    })
})