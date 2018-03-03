$(function () {
    // 确定身份编号
    // var URL = document.location.toString();
    var URL = "http://www.baidu.com?s_number="+"201616080123";
    // 分离参数
    var URL_str = "";
    for (var i = URL.indexOf("?")+1 ;i<URL.length;i++)
        URL_str += URL[i];
    // 分离编号
    var s_number = "";
    for (var i = URL_str.indexOf("=")+1 ;i<URL_str.length;i++)
        s_number += URL_str[i];
    console.log(s_number);
    //注销
    $('.ok').click(function () {
        $.ajax({
            type:"POST",
            url:"http://result.eolinker.com/tGrqLPad92656345fe212f82da834a43f76cf9d6778c364?uri=./student/logout",
            contentType:"application/json",
            dataType:"json",
            success:function (res) {
                console.log(res.status);
                window.location.href = "";
            }
        });
    })
    //个人信息
    $('.info').click(function(){
        $.ajax({
            data:{
                number : s_number
            },
            type:"GET",
            url:"",
            contentType:"application/json",
            dataType:"json",
            success:function(res){
                $('.number').append(res.number);
                $('.name').append(res.name);
                $('.sex').append(res.sex);
                $('.idcard').append(res.idcard);
                $('.nation').append(res.nation);
                $('.college').append(res.college);
                $('.indentify').append(res.indentify);
                $('.phone').append(res.phone);
                $('.reputation-text').append(res.reputation-text);
            }
        })
    })
    //修改密码
    $('.c-password-change button:first').click(function () {
        console.log($('input[name="new-password"]').val());
        var password = $('input[name="password"]');
        var new_password = $('input[name="new-password"]');
        if(new_password.val() == $('input[name="new-passwords"]').val()){
            $.ajax({
                type:"POST",
                url:"",
                data:{
                    password:password,
                    new_password:new_password
                },
                contentType:"application/json",
                dataType:"json",
                success:function (res) {

                }
            })
        }
        else{
            $('input[name="new-passwords"]').css("border","1px solid red");
            $('input[name="new-passwords"]').parent().append("<p>两次输入不相同,2s后重试</p>");
            $('.c-password-change button:first').attr("disabled",true);
            setTimeout(function () {
                $('.c-password-change button:first').attr("disabled",false);
                $('.c-password-change p').remove();
                $('input[name="new-passwords"]').css("border","1px solid rgb(169,169,169)");
            },2000)
        }

    })
})