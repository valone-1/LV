$(document).ready(() => {
    let uid = JSON.parse(localStorage.getItem("id"));
    let username = JSON.parse(localStorage.getItem("username"));
    let searchParams = new URLSearchParams(location.search.slice(1));
    let pid = searchParams.get("pid");
    console.log(pid);

    if (pid) {
        let loadGoodAPI = "http://jx.xuzhixiang.top/ap/api/detail.php";

        $.get(loadGoodAPI, {
            id: pid
        }).then(res => {
            console.log(res);
            let obj = res.data;
            console.log(obj);
            $("#color").html('<img src="${obj.pimg}">' + $("#color").html());
            $("#pid").html(obj.pid);
            $(".pic1").html(`<img src="${obj.pimg}" alt="">`);
            $("#pname").html(obj.pname);
            $("#price").html($("#price").html() + obj.pprice);
            $(".miaoshu").html(obj.pdesc);
            console.log(obj.pprice);
        });
    } else {
        alert("请登录");
        location.href = "login.html";
    }

    $(".gouwuche").click(function () {
        $(".carts").css({
            display: "block"
        });

        let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
        $.get(goodsCartAPI, {
            id: uid
        }).then(res => {
            let arr = res.data;

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
                console.log(v);
                count += parseInt(
                    $(".goodspprice")
                    .eq(i)
                    .html()
                    .slice(1)
                );
            });
            $(".money").html("￥" + count);
        });
    });

    $("#cart-clo").click(function () {
        $(".carts").css({
            display: "none"
        });
    });

    $("#joincart").click(function () {
        goodcarts()
        let uid = JSON.parse(localStorage.getItem("id"));
        let searchParams = new URLSearchParams(location.search.slice(1));
        let pid = searchParams.get("pid");
        let addCartAPI = `http://jx.xuzhixiang.top/ap/api/add-product.php`;
        let pnum = 1;
        $.get(addCartAPI, {
            uid: uid,
            pid: pid,
            pnum: pnum
        }).then(res => {
            console.log(res);
            $(".tianchong").css({
                display: "block"
            });
        });
    });

    
    goodcarts()

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

    $(".clo-msg").click(function () {
        $(".tianchong").css({
            display: "none"
        });
    });


    function goodcarts() {
      let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
      $.get(goodsCartAPI, {
        id: uid
      }).then(res => {
        console.log(res.data);
        let arr = res.data;
        $("#number").html(arr.length);
        let html = "";
        let html2 = "";
        $(arr).each(function(i, v) {
          html += `
                    <li>
                        <a href="goods-content.html?pid=${arr[i].pid}">
                        
                            <img src="${arr[i].pimg}" alt="">
                            <span class="goodsname">${arr[i].pname}</span>
                            <span class="goodspprice">${arr[i].pprice}</span>
                        
                        </a>
                    </li>
                `;
          html2 = `
                <img src="${arr[i].pimg}" alt="">
                <div class="joinmsg">
                <h2>${arr[i].pname}</h2>
                <p>商品已添加至您的</p>
                <a href="carts.html">购物袋</a>
            </div>
            `;
        });
        $(".cart-ul").html(html);
        $(".joingouwudai").html(html2);

        let count = 0;
        $(".goodspprice").each((i, v) => {
          console.log(v);
          count +=
            parseInt(
              $(".goodspprice")
                .eq(i)
                .html()
            ) * $(".goodspprice").eq(i).pnum;
        });
        $(".money").html("￥" + count);
      });
    }
});

