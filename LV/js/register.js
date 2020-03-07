let yzmBtn = document.querySelector('.table-con button')
let tel = document.querySelector('.tel2')
let yzm = document.querySelector('#yzm')

let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
tel.oninput = function () {
    if (reg.test(tel.value) == true) {
        yzmBtn.style.color = "white";
        yzmBtn.onclick = function () {

            yzm.value = numRandom();
        };
    }
}

$('#tiaozhuan').mouseenter(function () {
    $(this).css({
        background: '#ccc',
        color: 'black'
    })

})

$("#tiaozhuan").mouseleave(function () {


    $(this).css({
        background: "#19110b",
        color: "white",
    })


});


let pas1 = document.querySelector('#reg-mima1')
let pas2 = document.querySelector('#reg-mima2')
let span = document.querySelector('#mima span')


let reg2 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
pas1.onblur = function () {
    if (reg2.test(pas1.value) == true) {
        span.innerHTML = "密码格式正确";
        span.style.color = "green";
    }
}


let loginBtn = document.querySelector('#reg-tit button')
loginBtn.onclick = function () {
    location.href = 'login.html'
}

let ipts = document.querySelectorAll('.form1 input')
console.log(ipts)
let registerBtn = document.querySelector('.submit button')
registerBtn.onclick = function () {
    if (pas1.value == pas2.value && ipts[0].value != '' && ipts[1].value != '' && ipts[2].value != '' && ipts[3].value != '' && ipts[4].value != '' && ipts[5].value != '' && ipts[6].value != '' && ipts[7].value != '' && ipts[8].value != '' && ipts[9].value != '') {
        let registerApi = "http://jx.xuzhixiang.top/ap/api/reg.php";

        $.ajax({
            url: registerApi,
            type: "get",
            data: {
                username: $(".tel2").val(),
                password: $("#reg-mima1").val()
            },
            success: function (res) {
                alert(res.msg);

                if (res.code == 1) {
                    location.href = "login.html";
                }
            },
            error: function (err) {
                console.log(err);
            }
        });


    } else {
        alert('请把信息填写完整')
    }
}


function numRandom() {
    let str = "1234567890qwertyuioplkjhgfdsazxcvbnm";
    var res = "";
    for (var i = 0; i < 4; i++) {
        var n = parseInt(Math.random() * str.length);

        res += str[n];
    }
    console.log(res);
    return res
}