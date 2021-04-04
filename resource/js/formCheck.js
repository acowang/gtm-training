function boxCheck(name) {
    let chkArr = document.getElementsByName(name);
    let chk = false;
    let checkText = [];
    for (i = 0; i < chkArr.length; i++) {
        if (chkArr[i].checked === true) {
            chk = true;
            checkText.push(chkArr[i].value);
            checkText.join('、');
        }
    }
    return { chk: chk, checkText: checkText };
}

function radioCheck(name) {
    let radioArr = document.getElementsByName(name);
    let checked = false;
    let checkedValue = '';

    for (let i = 0; i < radioArr.length; i++) {
        let radioValue = radioArr[i].value;
        if (radioArr[i].checked === true) {
            checked = true;
            checkedValue = radioValue;
            return { 'checked': checked, 'checkedValue': checkedValue };
        }
    }
    return checked;
}

function fFormCheck(e) {
    e.preventDefault();
    //  let oForm = document.form1;
    var oForm = document.form1;
    var err = "";
    var valid = new ValidationFormUtil();

    if ((oForm.BirYear.options[oForm.BirYear.selectedIndex].value !== '') && (oForm.BirMonth.options[oForm.BirMonth.selectedIndex].value !== '') && (oForm.BirDate.options[oForm.BirDate.selectedIndex].value !== '')) {
        var birthdayStr = oForm.BirYear.options[oForm.BirYear.selectedIndex].value + '-' + oForm.BirMonth.options[oForm.BirMonth.selectedIndex].value + '-' + oForm.BirDate.options[oForm.BirDate.selectedIndex].value
    }
    if (oForm.name.value == "") {
        err += "請填寫姓名\n"
    } else if (!valid.isValidName(oForm.name.value)) {
        err += "姓名格式錯誤，請填寫中文或英文\n"
    }
    if (oForm.sex.value == '') {
        err += '請選擇性別\n';
    }
    if (oForm.city.value == '') {
        err += '請填寫居住/市(縣)\n';
    }
    if (oForm.area.value == '') {
        err += '請填寫居住/區(鄉/鎮)\n';
    }
    //  if (oForm.email.value === '') {
    //    err += '請填寫電子郵件\n';
    //  }else if(!valid.isEmail(oForm.email.value)){
    //    err+= "電子信箱格式錯誤\n";
    //  }
    if (oForm.BirYear.value == '') {
        err += '請填寫生日 年\n';
    }
    if (oForm.BirMonth.value == '') {
        err += '請填寫生日 月\n';
    }
    if (oForm.BirDate.value == '') {
        err += '請填寫生日 日\n';
    }
    if (oForm.phone.value == "") {
        err += "請填寫手機\n"
    } else if (!valid.isCellPhone(oForm.phone.value)) {
        err += "手機號碼格是錯誤\n"
    }
    if (oForm.education.value == '') {
        err += '請選擇最高學歷\n';
    }
    if (boxCheck('message').chk == false) {
        err += "請選擇有訊息來源\n"
    } else if (oForm.message[5].checked == true && oForm.message_t.value == "") {
        err += "訊息來源已選擇其他，請填入來源出處!\n"
    } else if (oForm.message[5].checked == true && oForm.message_t.value != "") {
        oForm.message[5].value = oForm.message_t.value
    }
    if (oForm.session.value == '') {
        err += '請選擇說明會場次\n';
    }
    if (oForm.notify.checked !== true) {
        err += '請確認是否同意個資保護聲明\n';
    }
    //  if (oForm.employment.value == '') {
    //    err += '請選擇就業狀態\n';
    //  }
    //  if (oForm.class_area.value == '') {
    //    err += '請選擇居住地區\n';
    //  }
    //  if (oForm.phone.value == "") {
    //    err += "請填寫聯絡電話\n"
    //  } else if (!valid.isCellPhone(oForm.phone.value)) {
    //    err += "電話號碼格是錯誤\n"
    //  }
    //	if (!checkRadio(oForm.work_job)) {
    //      err += "第17題未填寫，請選擇預計應徵職務!\n"
    //    } else if (oForm.work_job[2].checked == true && oForm.work_job_t.value == "") {
    //      err += "第17題已選擇其他，請填入預計應徵職務!\n"
    //    } else if (oForm.work_job[2].checked == true && oForm.work_job_t.value != "") {
    //      oForm.work_job[2].value = oForm.work_job_t.value
    //    }
    //  if(boxCheck('message').chk == false){
    //    err += "請選擇有興趣的課程\n"
    //  }
    //  if(oForm.class_area.value == ''){
    //    err += '請選擇居住地區\n';
    //  }

    if (err != "") {
        alert(err);
    } else {
        fnLoaderShow();
        let xhr = new XMLHttpRequest();
        let resultObj = {
            'CustomId': '70817744',
            'Event': '210322transglobe',
            'sex': oForm.sex.value,
            'name': oForm.name.value,
            'city': oForm.city.value,
            'area': oForm.area.value,
            //      'email': oForm.email.value,
            //      'employment': oForm.employment.value,
            'birthday': birthdayStr,
            'phone': oForm.phone.value,
            'education': oForm.education.value,
            'message': boxCheck('message').checkText,
            //      'AllowedPolicy': oForm.AllowedPolicy.checked,
            'session': oForm.session.value
                //      'class_area': oForm.class_area.value,
                //      'work_job': boxCheck('work_job').checkText
        }
        let resultKeys = Object.keys(resultObj);
        let resultValue = Object.values(resultObj);
        let resultDone = '';
        for (let i = 1; i < resultKeys.length; i++) {
            resultDone += '&' + resultKeys[i] + '=' + resultValue[i];
        }
        resultDone = resultKeys[0] + '=' + resultValue[0] + resultDone;
        // console.log(resultDone);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let resultValue = xhr.responseText.trim();
                resultValue = JSON.parse(resultValue);
                if (resultValue.success) {
                    fnLoaderHide();
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'formSubmitted'
                    });
                    console.log('data: ', window.dataLayer);
                    //alert('表單已送出，謝謝您！');
                    //window.location.href = 'index.html';
                } else {
                    fnLoaderHide();
                    alert('送出失敗，請重新填寫！');
                    window.location.href = 'index.html';
                }
            }
        };
        xhr.open('POST', '/api/addMessage');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(resultDone);
    }
}