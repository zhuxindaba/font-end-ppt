need("biz.login",function(LoginManager){
    LoginManager.init();
    LoginManager.checkLogin(function(){
        g("userinfo").innerHTML = LoginManager.getUin();
        //g("login_nickname_span").innerHTML = LoginManager.getNickName();
        if (isDom(g("logined"))){
            g("logined").style.display = "block";
        }
        if (isDom(g("unlogin"))){
            g("unlogin").style.display = "none";
        }
    });

});
amsCfg_68903 = {
    "iActivityId": 8418, //�id	
    "iFlowId":    68903, //����id
    "fFlowSubmitEnd": function(res){
        if(res.sOutValue - res.sOutValue2 > 0){
            document.getElementById('city_zan').style.display = "none"; 
            document.getElementById('city_lottery').style.display = "block";  
        }else{
            document.getElementById('city_zan').style.display = "block"; 
            document.getElementById('city_lottery').style.display = "none";  
        }
        return;
    }           
};
if(g('selectedCity').innerHTML == '������'){
    need(["biz/loginManager"],function(loginManager){
        loginManager.checkLogin(function(){
            amsSubmit(8418,68903);    
        })		
    });
}
amsCfg_68682 = {
	'iAMSActivityId' : '8418', // AMS���
	'activityId' : '102485', // ģ��ʵ����
	'onBeginGetGiftEvent' : function(){
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        if(callbackObj.iRet == 600){
            document.getElementById('city_zan').style.display = "block"; 
            document.getElementById('city_lottery').style.display = "none";
        }
		alert(callbackObj.sMsg);
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
		if(!callbackObj.sPackageName){
            document.getElementById('city_zan').style.display = "block"; 
            document.getElementById('city_lottery').style.display = "none";
			alert(callbackObj.sMsg);
			return;
		}
		//1��ʵ��
		var str = "������� " + callbackObj.sPackageName + " !";
		if(callbackObj.sPackageOtherInfo && callbackObj.sPackageOtherInfo == "RealGood"){
			document.getElementById('content').innerHTML = str;
            amsInit(8418,68683);
			return;
		}
	}
};
amsCfg_68683 = {
	'iAMSActivityId' : '8418', // AMS���
	'activityId' : '102485', // ģ��ʵ����
	'contentId' : 'personalID', //����������
	'buttonId' : 'personInfoContentBtn_68683', //�ύ��ť
    'fFlowSubmitEnd' : function(callbackObj){
        if(callbackObj.iRet == 0){
            alert(callbackObj.sMsg);
            amsSubmit(8418,68903);
        }else{
            alert(callbackObj.sMsg);
        }
    } //���봫(�ɹ����ѳɹ�����Ϣ���ظ�����������������������ģ���Լ����)

};

g('city_lottery').addEventListener("touchstart",function(){
    amsSubmit(8418,68682);
},false);
function city(){
    need(["biz/loginManager"],function(loginManager){
        loginManager.checkLogin(function(){
            var url = "http://mapps.game.qq.com/lian/a20140416City/City.php?t="+ new Date().getTime();
            include(url, function(){
                if (typeof(City_JSON) == 'undefined' || !City_JSON){return;}
                if(City_JSON.ret_code == 0){
                    document.getElementById('city_zan').style.display = "none"; 
                    document.getElementById('city_lottery').style.display = "block";       
                }
            })    
        },function(){
            loginManager.login();
        })		
    });	
}/*  |xGv00|5fa292cfd09ca051e1eaf03d2c793244 */