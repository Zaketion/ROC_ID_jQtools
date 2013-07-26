/*
 ROC ID jQtools 台灣身分證字號工具
 
本專案GitHub: https://github.com/etwu/ROC_ID_jQtools

MIT授權，歡迎使用。
 
 */

//****************驗證字號Main Function****************//
function ROC_ID_check(ROC_ID_string,return_type){
    
    //檢查是否為空
    if (ROC_ID_string == null || ROC_ID_string == '')
    {
        alert('身分證字號為空值！');
        exit();
    }
    
    //return_type沒有送值，則預設為bool
    if (return_type == null)
    {
        return_type = 'bool';
    }
    
    var ID_eng_char = ROC_ID_string.substr(0,1); //英文為第一個字元
    var ID_num_data = ROC_ID_string.substr(1); //從第2位擷取到最後
    var ID_eng_num = Check_Letter_to_Num(ID_eng_char); //將英文轉換為對應數字
    var ID_all_num =  ID_eng_num + ID_num_data; //連接字元
    var validate_result = Validate_ID(ID_all_num); //驗證結果

    //送回結果
    //return_type == bool返回true/false
    //return_type == alert則跳出alert
    if (validate_result)
    {
        if(return_type == 'alert')
        {
            alert('此為有效的身分證字號！');
        }
        else if(return_type == 'bool')
        {
            return true;
        }
        else{}
    } 
    else
    {
        if(return_type == 'alert')
        {
            alert('此為無效的身分證字號！');
        }
        else if(return_type == 'bool')
        {
            return false;
        }
        else{}
    }
}


//***驗證子function***//

//轉換英文為數字
function Check_Letter_to_Num(letter){
    
    //驗證是否為英文
    if(/^[a-zA-Z]$/.test(letter) == false) {
    alert('第一個字元（英文字母）不正確！');
    exit();
    }
    
    letter = letter.toUpperCase(); //轉大寫
    var id_eng_data = data_eng_num_array(); //ID與英文對應資料
    return id_eng_data[letter];
}


//驗證公式
function Validate_ID(ID_num_format)
{
    //驗證長度，應該為11碼純數字
    if(/^[0-9]{11}$/.test(ID_num_format) == false) {
    alert('您輸入的身分證字號長度/字元不正確！');
    exit();
    }
    
    //驗證有效性START
    var total = 0; //總計
    //11位數拆成Array
    var ID_num_array = ID_num_format.split("");
    
    var run_count; //for記數
    var num_now; //目前位數值
    var num_now_times; //目前乘數
    var num_now_ans; //目前位數積
    for (run_count = 0;run_count<11;run_count++)
    {
        num_now = ID_num_array[run_count];
        num_now_times = ID_Validator_digi_times(run_count);
        num_now_ans = num_now * num_now_times;
        total = total + num_now_ans;
    }
    var num_remain = total % 10;
    if (num_remain == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//驗證乘法表
function ID_Validator_digi_times(digi_pos)
{
    var times_table = new Array();
    times_table[0] = 1;
    times_table[1] = 9;
    times_table[2] = 8;
    times_table[3] = 7;
    times_table[4] = 6;
    times_table[5] = 5;
    times_table[6] = 4;
    times_table[7] = 3;
    times_table[8] = 2;
    times_table[9] = 1;
    times_table[10] = 1;
    return times_table[digi_pos];
}

//****************產生字號Main Function****************//
function ROC_ID_Generator(ID_string)
{
    if (ID_string == null)
    {
        ID_string = '';
    }
    var data_length = ID_string.length; //長度
    
    //檢查長度
    if (data_length == 0)
    {
        //直接產生
        //第一碼的英文
        var Num_Eng = Check_Letter_to_Num(Pick_a_Char());
        var remain_long = 8; //剩餘長度（不含驗證碼） 8位數
        var ID_no_verify_code = Num_Eng;
    }
    else if(data_length > 0 && data_length < 10)
    {
        //檢查並還原第一碼，把後面數字隨機產生（不含驗證碼）
        var ID_eng_char = ID_string.substr(0,1); //英文為第一個字元
        var Num_Eng = Check_Letter_to_Num(ID_eng_char);
        //檢查後面的數字字元數量
        var data_remain = ID_string.substr(1);
        var data_remain_length = data_remain.length;
        var remain_long = 8 - data_remain_length;
        ID_no_verify_code = Num_Eng + data_remain;
    }
    else if(data_length == 10)
    {
        //直接進入檢查程序
        var result = ROC_ID_check(ID_string);   
        if (result == true)
        {
            return '此為有效字號！';
        }
        else
        {
            return '此為無效字號！';
        }
    }
    else if(data_length > 10)
    {
        return '輸入的字串長度錯誤!';
    }
    else
    {}
    for(var i=0;i < remain_long;i++)
    {
        //性別代號產生修正//
        if (remain_long == 8 && i == 0)
        {
            var GenderCode = Pick_a_GenderCode();
            ID_no_verify_code = ID_no_verify_code + GenderCode;
        //性別代號產生修正-END//
        }else{
            var randomnumber=Math.floor(Math.random()*10);
        ID_no_verify_code = ID_no_verify_code + randomnumber.toString();
        }
        
        
    }
    //長度不足，則補齊數字
    
    //最後加上驗證碼
    //10位數拆成Array
    var ID_num_array = ID_no_verify_code.split("");
    var run_count; //for記數
    var num_now; //目前位數值
    var num_now_times; //目前乘數
    var num_now_ans = 0; //目前位數積
    var total = 0; //總計
    for (run_count = 0;run_count<10;run_count++)
    {
        num_now = ID_num_array[run_count];
        num_now_times = ID_Validator_digi_times(run_count);
        num_now_ans = num_now * num_now_times;
        total = total + num_now_ans;
    }
    var num_remain = total % 10;
    var new_last_digi = 10 - num_remain;
    if (new_last_digi == 10)
    {
        new_last_digi = 0;
    }
    var ID_new_num = ID_no_verify_code + new_last_digi;
    var ID_new_eng_num = ID_new_num.substr(0,2);
     //反查英文
    var ID_eng_result;
    var ID_numdata_array = data_eng_num_array();
    for (var eng_one in ID_numdata_array){
        if (ID_numdata_array[eng_one] == ID_new_eng_num)
        {
            ID_eng_result = eng_one;
        }
    }
    
     //反查英文-END
    var ID_rest_num = ID_new_num.substr(2);
    var ID_New = ID_eng_result + ID_rest_num
    return ID_New;
}

//***產生子function***//
function Pick_a_Char()
{
    var Eng_Chars = "ABCDEFGHIJKMNOPQTUVWXZ"; //縣市英文,已拿掉不再分發字母
    var Eng_Chars_Array = Eng_Chars.split("");
    var Random_seed = Math.floor(Math.random() * Eng_Chars_Array.length);
    var Eng_Output = Eng_Chars_Array[Random_seed];
    return Eng_Output;
}

function Pick_a_GenderCode()
{
    var Gcode_Chars = "0129"; //性別代號
    var Gcode_Chars_Array = Gcode_Chars.split("");
    var Random_seed = Math.floor(Math.random() * Gcode_Chars_Array.length);
    var Gcode_Output = Gcode_Chars_Array[Random_seed];
    return Gcode_Output;
}


//*******英文與對應數字參照
function data_eng_num_array()
{
    var letter_ref_table = new Array();
    letter_ref_table['A'] = 10; //台北市
    letter_ref_table['B'] = 11; //台中市
    letter_ref_table['C'] = 12; //基隆市
    letter_ref_table['D'] = 13; //台南市
    letter_ref_table['E'] = 14; //高雄市 
    letter_ref_table['F'] = 15; //新北市
    letter_ref_table['G'] = 16; //宜蘭縣
    letter_ref_table['H'] = 17; //桃園縣
    letter_ref_table['I'] = 34; //嘉義市
    letter_ref_table['J'] = 18; //新竹縣
    letter_ref_table['K'] = 19; //苗栗縣
    letter_ref_table['L'] = 20; //台中縣,2010年12月25日停發
    letter_ref_table['M'] = 21; //南投縣
    letter_ref_table['N'] = 22; //彰化縣
    letter_ref_table['O'] = 35; //新竹市
    letter_ref_table['P'] = 23; //雲林縣
    letter_ref_table['Q'] = 24; //嘉義縣
    letter_ref_table['R'] = 25; //台南縣,2010年12月25日停發
    letter_ref_table['S'] = 26; //高雄縣,2010年12月25日停發
    letter_ref_table['T'] = 27; //屏東縣
    letter_ref_table['U'] = 28; //花蓮縣
    letter_ref_table['V'] = 29; //台東縣
    letter_ref_table['W'] = 32; //金門縣
    letter_ref_table['X'] = 30; //澎湖縣
    letter_ref_table['Y'] = 31; //陽明山管理局,1975年停發
    letter_ref_table['Z'] = 33; //連江縣
    return letter_ref_table;
}
