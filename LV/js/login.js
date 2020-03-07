$('#loginBtn').click(function(){
    let loginAPI = "http://jx.xuzhixiang.top/ap/api/login.php";

    $.get(loginAPI,{
        username:$('.username').val(),
        password:$('.password').val()
    }).then(res=>{
        alert(res.msg)
        localStorage.setItem('id',JSON.stringify(res.data.id));
        localStorage.setItem('username',JSON.stringify(res.data.username));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        if(res.code==1){
            location.href='index.html'
        }
    })
    
})