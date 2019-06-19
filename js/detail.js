//所有的JS代码要放在窗口加载事件里面
window.addEventListener('load', function() {
    //获取元素
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var preview_img = document.querySelector('.preview_img')

    //1.鼠标经过小图片盒子  让mask  和 big 盒子显示
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    //鼠标离开小图片盒子  让mask  和 big 盒子隐藏
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    //2.当鼠标在小图片盒子中移动时, 先获取鼠标在盒子中的坐标
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - preview_img.offsetLeft;
        var y = e.pageY - preview_img.offsetTop;

        //(1) 把鼠标的坐标赋值给遮盖层的top 和 left值  
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //遮盖层最大移动距离
        var maskxMax = preview_img.offsetWidth - mask.offsetWidth;
        var maskyMax = preview_img.offsetHeight - mask.offsetHeight;

        //(2让遮盖层的盒子不超过小图片盒子  加一个判断条件
        if (maskX <= 0) {
            maskX = 0;
        } else
        if (maskX >= maskxMax) {
            maskX = maskxMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskyMax) {
            maskY = maskyMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        /* 遮盖层移动距离           大图片移动距离
        -- -- -- -- -- --    =     -- -- -- -- --
        遮盖层最大移动距离        大图片最大移动距离 */

        //3.大图片的移动距离 = 遮盖层移动距离 * 大图片最大移动距离 / 遮盖层最大移动距离
        var bigImg = document.querySelector('.bigImg');
        //(1).先求出大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //(2).再求出大图片的移动距离
        var bigX = maskX * bigMax / maskxMax;
        var bigY = maskY * bigMax / maskyMax;
        //(3).把求出的值赋值给 大图片 的left 和 top 值
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';

    })


    //tab栏切换模块
    // 1.获取元素
    var detail_tab_list = document.querySelector('.detail_tab_list');
    var lis = detail_tab_list.querySelector('ul').querySelectorAll('li');
    var detail_tab_con = document.querySelectorAll('.detail_tab_con');
    //小li的排他思想,每次点击让当前的Li 添加current类名
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].addEventListener('click', function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            //每次点击让下面对应的tab栏内容先隐藏所有的内容,然后让当前的显示
            for (var i = 0; i < detail_tab_con.length; i++) {
                detail_tab_con[i].style.display = 'none';
            }
            detail_tab_con[index].style.display = 'block';
        })
    }

    //加号,减号
    //获取元素
    var ipt = document.querySelector('.choose_amount').querySelector('input');
    var add = document.querySelector('.add');
    var reduce = document.querySelector('.reduce');

})