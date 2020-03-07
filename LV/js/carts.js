let uid = JSON.parse(localStorage.getItem("id"));
let username = JSON.parse(localStorage.getItem("username"));
if (uid) {
    //todo 页面初始化加载用具购物车商品列表

    let loadCartsAPI = `http://jx.xuzhixiang.top/ap/api/cart-list.php`;
    $.get(loadCartsAPI, {
        id: uid
    }).then(res => {
        console.log(res.data);
        let arr = res.data;
        $("#number").html(arr.length);
        let html = "";
        $(arr).each(function (i, v) {
            html += `
                    <div class="cartsitem">
                    <div class="details">
                        <div class="itemimg" data-id ="${arr[i].pid}"><img src="${arr[i].pimg}" alt=""></div>
                        <div class="itemdesc">
                            <h2>${arr[i].pname}</h2>
                            <p>产品型号：<span>${arr[i].pid}</span></p>
                            <h3>产品颜色：默认</h3>
                            <button class="del" data-id="${arr[i].pid}"><img src="../images/del.jpg" alt=""></button>
                        </div>
                    </div>
                    <div class="prices">
                        <div class="itemqunatity">
                            <div class="pick" data-id="${arr[i].pid}">
                                <div class="goodsnum">${arr[i].pnum}</div>
                                <select name="" id="">
                                
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    
                                </select>
                            </div>
                            
                        </div>
                        <div class="itemprice">￥${arr[i].pprice}</div>
                    </div>
                </div>
                `;
        });
        $(".cartslist").html(html);

        //todo 点击下拉框时 改变数量并发起请求
        $(".pick").each((i, v) => {
            $(".pick")
                .eq(i)
                .click(function () {
                    $(this)
                        .find(".goodsnum")
                        .html(
                            $(this)
                            .find("select")
                            .val()
                        );

                    var pnum = $(this)
                        .find(".goodsnum")
                        .html();

                    let pid = this.getAttribute("data-id");

                    let addAPI = `http://jx.xuzhixiang.top/ap/api/cart-update-num.php`;
                    $.get(addAPI, {
                        uid: uid,
                        pid: pid,
                        pnum: pnum
                    }).then(res => {
                        console.log(res);

                        loaddatas();
                        money(arr);
                    });

                    money(arr);
                });
            money(arr);
        });

        //todo 如果商品数量发生变化 重载页面以更新总价
        $(".goodsnum").change(function () {
            money(arr);
        });

        $(".itemimg").click(function () {
            location.href = "goods-content.html";
        });

        //todo 删除时弹出遮罩
        $(".del").each(function (i, v) {
            $(".del")
                .eq(i)
                .click(function () {
                    let pid = this.getAttribute("data-id");
                    var pObj = arr.find(v => v.pid == pid);
                    let cartDelAPI = `http://jx.xuzhixiang.top/ap/api/cart-delete.php`;
                    $(".confirm").css({
                        display: "block"
                    });
                    //todo 给遮罩添加事件委托
                    $(".confirm").click(function (event) {
                        if (event.target.className == "no") {
                            $(".confirm").css({
                                display: "none"
                            });
                        }
                        if (event.target.className == "yes") {
                            $.get(cartDelAPI, {
                                pid: pid,
                                uid: uid
                            }).then(res => {
                                console.log(res);
                                $(".confirm").css({
                                    display: "none"
                                });
                                loaddatas();
                                $(".del")
                                    .eq(i)
                                    .parents(".cartsitem")
                                    .remove();
                            });
                        }
                    });
                });
        });

        money(arr);
    });
} else {
    alert("请登录");
    location.href = "login.html";
}

//todo 计算商品总价
function money(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        count += arr[i].pnum * arr[i].pprice;
    }
    $(".totalmoney").html("￥" + count);
}

//todo 点击右上角购物车图标 发起请求获取购物车中商品 并计算总价
$(".gouwuche").click(function () {
    if (username) {
        console.log(1);
        $(".carts").css({
            display: "block"
        });

        let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
        $.get(goodsCartAPI, {
            id: uid
        }).then(res => {
            let arr = res.data;
            console.log(arr.length);

            let html = "";
            $(arr).each(function (i, v) {
                html += `
                    <li>
                        <a href="goods-content.html?pid=${arr[i].pid}">
                        
                            <img src="${arr[i].pimg}" alt="">
                            <span class="goodsname">${arr[i].pname}</span>
                            <span class="goodspprice">￥${arr[i].pprice}</span>
                        
                        </a>
                    </li>
                `;
            });
            $(".cart-ul").html(html);

            let count = 0;
            $(".goodspprice").each((i, v) => {
                count += parseInt(
                    $(".goodspprice")
                    .eq(i)
                    .html()
                );
            });
            $(".money").html($(".money").html() + count);
        });
    } else {
        console.log("没有登录");
        if (confirm("请登录以查看购物车")) {
            location.href = "login.html";
        }
    }
});
$(".login-lv").click(function () {
    if (uid) {
        $("#personal li")
            .eq(0)
            .html("用户" + username);

        $("#personal").toggle();

        $("#loginout").click(function () {
            if (confirm("您确定要退出吗") == true) {
                localStorage.removeItem("id");
                localStorage.removeItem("username");
                localStorage.removeItem("token");
                this.href = "login.html";
            }
        });
    } else {
        alert("请登录");
        location.href = "login.html";
    }
});

function loaddatas() {
    let loadCartsAPI = `http://jx.xuzhixiang.top/ap/api/cart-list.php`;
    $.get(loadCartsAPI, {
        id: uid
    }).then(res => {
        console.log(res);
        money(res.data);
    });
}