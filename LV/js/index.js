//  轮播图
$(document).ready(function(){
    loadcarts()
})
class lunbo {
    constructor(sel) {
        this.sel = sel;
        this.el = document.querySelector(this.sel);
        this.pageNum = 0; //记录当前页码
        this.pageLis = this.el.querySelectorAll(".page li");
        this.rightbtn = this.el.querySelector(".rightbtn");
        this.leftbtn = this.el.querySelector(".leftbtn");
        this.oLis = this.el.querySelectorAll(".item li");

        this.pageLisEvent();
        this.autoplay();
        this.btnEvents();
    }

    //小圆点事件
    pageLisEvent() {
        for (let i = 0; i < this.pageLis.length; i++) {
            this.pageLis[this.pageNum].style.display = "none";
        }
        this.pageLis[this.pageNum].style.display = "block";
    }

    //自动播放
    autoplay() {
        this.timer = setInterval(() => {
            this.next();
        }, 3000);

        this.el.onmouseenter = () => {
            this.el;
            clearInterval(this.timer); //使用箭头函数，让函数内部的this跟外部一致
        };

        this.el.onmouseleave = () => {
            this.timer = setInterval(() => {
                this.next();
            }, 2500);
        };
    }

    //左右按钮事件处理
    btnEvents() {
        //右侧按钮点击事件
        let that = this;
        this.rightbtn.onclick = function () {
            that.next();
        };

        this.leftbtn.onclick = function () {
            that.prev();
        };
    }

    //上一步
    prev() {
        let that = this;
        // that.oLis[that.pageNum].style.opacity = 0
        animate(that.oLis[that.pageNum], {
            opacity: 0
        });
        that.pageNum--;
        if (that.pageNum == -1) {
            that.pageNum = 1;
        }
        // that.oLis[that.pageNum].style.opacity = 1
        animate(that.oLis[that.pageNum], {
            opacity: 1
        });
        this.pageLisEvent();
    }

    //下一页
    next() {
        let that = this;

        //that.oLis[that.pageNum].style.opacity = 0
        animate(that.oLis[that.pageNum], {
            opacity: 0
        });
        that.pageNum++;
        if (that.pageNum == 2) {
            that.pageNum = 0;
        }
        //that.oLis[that.pageNum].style.opacity = 1
        animate(that.oLis[that.pageNum], {
            opacity: 1
        });

        this.pageLisEvent();
    }
}

let r = new lunbo(".box");

let uid = JSON.parse(localStorage.getItem("id"));
let token = JSON.parse(localStorage.getItem("token"));
let username = JSON.parse(localStorage.getItem("username"));
console.log(username);

$('.login-lv').click(function () {
    if (uid) {
        $("#personal li")
            .eq(0)
            .html("用户" + username);

        $("#personal").toggle();

        $("#loginout").click(function () {
            if (confirm("您确定要退出吗") == true) {
                localStorage.removeItem("id");
                localStorage.removeItem(
                    "username"
                );
                localStorage.removeItem("token");
                this.href = "login.html";
            }
        });
    } else {
        alert("请登录");
        location.href = "login.html";
    }
});

/* $('.gouwuche').click(function () {

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
                    console.log(arr.length)

                    let html = "";
                    $(arr).each(function (i, v) {
                        html += `
                    <li>
                        <a href="goods-content.html?pid=${arr[i].pid}">
                        
                            <img src="${arr[i].pimg}" alt="">
                            <span class="goodsname">${arr[i].pname}</span>
                            <span class="goodspprice">${arr[i].pprice}</span>
                        
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
                console.log('没有登录')
                if (confirm("请登录以查看购物车")) {
                    location.href = "login.html";
                }
            }

        }) */

$('#cart-clo').click(function () {
    $(".carts").css({
        display: "none"
    });
});


if (uid) {
    //todo:侧边栏购物袋

    $(".gouwuche").click(function () {

        $(".carts").css({
            display: "block"
        });

        let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
        $.get(goodsCartAPI, {
            id: uid
        }).then(res => {
            let arr = res.data;
            $('#number').html(arr.length)
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

            
        });
    });

    $("#cart-clo").click(function () {
        $(".carts").css({
            display: "none"
        });
    });

    $('.item').click(function () {
        location.href = 'goods-list.html'
    })

} else {



    $('.gouwuche').click(function () {
        if (confirm("请登录以查看购物车")) {
            location.href = "login.html";
        }
    })

    $('.item').click(function () {
        if (confirm("请登录以查看更多")) {
            location.href = "login.html";
        } else {
            location.reload()
        }
    });

    $(".c-goods").click(function () {
        if (confirm("请登录以查看更多")) {
            this.href = "login.html";
        }
    });

    $(".goods-item").click(function () {
        if (confirm("请登录以查看更多")) {
            this.href = "login.html";
        }
    });
}


function loadcarts() {
    if (uid) {
        let goodsCartAPI = "http://jx.xuzhixiang.top/ap/api/cart-list.php";
        $.get(goodsCartAPI, {
            id: uid
        }).then(res => {
            console.log(res.data);
            let arr = res.data;
            $("#number").html(arr.length);

            let html = "";
            $(arr).each(function (i, v) {
                html += `
                                <li>
                                    <a href="goods-content.html?pid=${arr[i].pid}">

                                        <img src="${arr[i].pimg}" alt="">
                                        <span class="goodsname">${arr[i].pname}</span>
                                        <span class="goodspprice">${arr[i].pprice}</span>

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
                );
            });
            $(".money").html(
                $(".money").html() + count
            );
        });
    } else {
        $(".gouwuche").click(function () {
            alert("请先登录");
            location.href = "login.html";
        });
    }
}

