var btn = document.querySelector('.btn');
var record = document.querySelector('.record');
var bmidata = JSON.parse(localStorage.getItem('bmilist')) || [];
var BmiValres = document.querySelector('.calcbmi');
var renewbtn = document.querySelector('.renew');

//監聽
btn.addEventListener("click", Cal, false);
record.addEventListener("click", del, false);
renewbtn.addEventListener("click", Cal, false);
//更新紀錄畫面
updateBMIList(bmidata);


//監聽細部流程
function Cal(e) {
    e.preventDefault();
    var height = document.querySelector('#height').value;
    var weight = document.querySelector('#weight').value;
    if (height == "" || weight == "") {
        alert('請輸入身高體重');
        return;
    }

    //運算結果紀錄與分類
    var Today = new Date();
    var date = Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate();
    var BMI = BMICalc(height, weight);
    BmiValres.textContent = BMI;
    // console.log(date);

    var BMIrecordList = {
        date: date,
        cm: height,
        kg: weight,
        BMI: BMI,
    }
    bmidata.push(BMIrecordList);//分類後傳入localstorage
    localStorage.setItem('bmilist', JSON.stringify(bmidata));//將傳入的json資料字串化
    updateBMIList(bmidata); //執行組字渲染
    ShowWarning(colorBmi(BMI));
};
//使用判斷分級設定class名稱放入陣列已利抓取
function colorBmi(X) {
    var str = [];
    if (X < 18.6) {
        str = ['BDL_BLUE', '過輕', 'bmiwapcolor_BLUE', 'renew_BG_BLUE'];
        return (str);
    } else if (X < 25) {
        str = ['BDL_GREEN', '理想', 'bmiwapcolor_GREEN','renew_BG_GREEN'];
        return (str);
    } else if (X < 31) {
        str = ['BDL_ORANGE', '輕度肥胖', 'bmiwapcolor_ORANGE','renew_BG_ORANGE'];
        return (str);
    } else {
        str = ['BDL_RED', '肥胖', 'bmiwapcolor_RED','renew_BG_RED'];
        return (str);
    }
}
function updateBMIList(bmidata) {
    var strr = '';
    for (var i = 0; i < bmidata.length; i++) {
        var colorlevel = colorBmi(bmidata[i].BMI);
        strr += '<li class="recordList ' + colorlevel[0] + '"><div class="flex"><p class="Bmilevel">' + colorlevel[1] + '</p><p>' + bmidata[i].date + '</p><p class="Bmilevel">height<span>' + bmidata[i].cm + '</span>cm</p><p class="Bmilevel">weight<span>' + bmidata[i].kg + '</span>kg</p><p class="Bmilevel">BMI<span>' + bmidata[i].BMI + ' </span></p><a class="del" data-num="' + i + '" href="javascript:;">DELETE</a></div></li>';
    }
    record.innerHTML = strr;
}
//del
function del(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return }
    var num = e.target.dataset.num;
    bmidata.splice(num, 1);
    localStorage.setItem('bmilist', JSON.stringify(bmidata));
    updateBMIList(bmidata);
}
//按鈕顯示狀態警示
function ShowWarning(str) {
    //隱藏計算按鈕
    btn.style.display = "none";
    //將警示的區塊打開
    document.querySelector('.ShowBMI').style.display = "block";
    //加入警示的class名稱&文字
    var bmiwrap = document.querySelector('.bmiwrap');
    var warning = document.querySelector('.warning');
    bmiwrap.className = 'bmiwrap calcbmi_style ' + str[2];
    warning.className = 'warning ' + str[2];
    renewbtn.className = 'renew renew-style ' + str[3];
    warning.textContent = str[1];
}
//計算BMI值
function BMICalc(height, weight) {
    var hm = Math.pow(parseInt(height) / 100, 2); //公分換公尺並將字串轉換為數值的平方
    var wm = parseInt(weight); //字串轉換為數值
    var BmiVal = Math.round(wm / hm * 100) / 100; //四捨五入小數第二位
    return BmiVal;
}



