$(function() {
    //如果全选框发生改变, 用prop获取全选框的状态,然后用prop赋值给复选框
    $(".checkall").change(function() {
        // $(this).prop("checked")
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));

        //如果当前选框被选中 则修改当前商品的背景颜色
        if ($(this).prop("checked")) {
            $(".product_first").addClass("product_first_item")
        } else {
            $(".product_first").removeClass("product_first_item")
        }
    })



    //当复选框发生改变,
    $(".j-checkbox").change(function() {
        // 如果复选框的选中的个数等于复选框的个数,则让全选框选中.否则不选中
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }

        //如果当前选框被选中 则修改当前商品的背景颜色
        if ($(this).prop("checked")) {
            $(this).parents(".product_first").addClass("product_first_item")
        } else {
            $(this).parents(".product_first").removeClass("product_first_item")
        }
    })

    //2.点击+号时   声明一个变量n保存 文本框里的值  每次点击让n++;  再把值给文本框
    $(".add").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        //获取单价的文本值 用变量p保存
        var p = $(this).parent().siblings(".p-price").html();

        //截取字符串,把金钱符号取消
        p = p.substr(1);

        //用 商品数量n * 单价p  的到总价 然后赋值给总价的文本值
        $(this).parent().siblings(".p-sum").html("¥" + (n * p).toFixed(2));
        getSum();
    })


    // 3.点击减号的时候
    $(".reduce").click(function() {
        var n = $(this).siblings(".itxt").val();
        //当减到1的时候 让程序不再往后执行
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parent().siblings(".p-price").html();

        //截取字符串,把金钱符号取消
        p = p.substr(1);
        //用 商品数量n * 单价p  的到总价 然后赋值给总价的文本值
        $(this).parent().siblings(".p-sum").html("¥" + (n * p).toFixed(2));
        getSum();
    })

    // 4.当文本框发生改变的时候
    $(".itxt").change(function() {
        //获取当前文本框的值
        var n = $(this).val();
        if (n < 1) {
            n = 1
        }
        $(this).val(n);

        //获取单价
        var p = $(this).parent().siblings(".p-price").html();
        //截取字符串,把金钱符号取消
        p = p.substr(1);
        //用 商品数量n * 单价p  的到总价 然后赋值给总价的文本值
        $(this).parent().siblings(".p-sum").html("¥" + (n * p).toFixed(2));
        //调用函数
        getSum();
    })
    getSum();

    function getSum() {
        var count = 0; //总件数
        var moeny = 0; //总金额
        //遍历件数
        $(".itxt").each(function(i, ele) {
            //每次遍历让文本框中的件数相加
            count += parseInt($(ele).val());
        })

        //最后把相加的结果赋值给总件数
        $(".amount-sum em").text(count);

        // //遍历小计
        $(".p-sum").each(function(i, ele) {
            moeny += parseFloat($(ele).text().substr(1));
        })
        $("i.price-sum").text(moeny.toFixed(2));
    }

    //点击商品后面的删除是,删除当前行的商品
    $(".del").click(function() {
        $(this).parents(".product_first").remove();
        getSum();

    })

    //点击下方的删除选中商品,
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".product_first").remove();
        getSum();

    })

    //点击清空购物车
    $(".clear-all").click(function() {
        $(".product_first").remove();
        getSum();
    })
})