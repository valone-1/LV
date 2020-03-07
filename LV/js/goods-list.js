$(document).ready(function () {
    window.onscroll = function () {
        var scrolltop =
            document.scrollingElement.scrollTop || document.body.scrollTop;

        if (scrolltop >= 150) {
            $(".top").css({
                display: "block"
            });
        } else {
            $(".top").css({
                display: "none"
            });
        }
    };
    $(".top").click(() => {
        document.scrollingElement.scrollTop = 0;
    });

    let loadDataAPI = "http://jx.xuzhixiang.top/ap/api/productlist.php";

    let uid = JSON.parse(localStorage.getItem("id"));
    let username = JSON.parse(localStorage.getItem("username"));

    $.get(loadDataAPI, {
        uid: uid
    }).then(res => {
        let arr = res.data;
        console.log(arr);
        let html = "";
        $(arr).each(function (i, v) {
            html += `
                        <li>
                    <a href="goods-content.html?pid=${arr[i].pid}">
                        <img src="${arr[i].pimg}" alt="">
                        <h3>${arr[i].pname}</h3>
                        <p>￥${arr[i].pprice}</p>
                    </a>
                </li>
                    `;
        });

        $("#list").html(html);
    });

    loadcarts()

    $(".gouwuche").click(function () {
        if (username) {
            $(".carts").css({
                display: "block"
            });

            loadcarts();
        } else {
            console.log("没有登录");
            if (confirm("请登录以查看购物车")) {
                location.href = "login.html";
            }
        }
    });

    $("#cart-clo").click(function () {
        $(".carts").css({
            display: "none"
        });
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


    function loadcarts() {
        let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
        $.get(goodsCartAPI, {
            id: uid
        }).then(res => {
            let arr = res.data;
            console.log(arr.length);
            $("#number").html(arr.length);
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
                    .html().slice(1)
                );
            });
            $(".money").html('￥' + count);
        });
    }
});