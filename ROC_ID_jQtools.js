/*
 ROC ID Validator 台灣身分證字號驗證
 
 本專案為GPL授權，歡迎使用。
 
 如有任何問題，請洽詢作者ET Wu
 
 本專案GitHub
 
 */

function ROC_check_ID(ROC_ID,return_type){
    var ID_eng_char = ROC_ID.substr(0,1);
    var ID_num_data = ROC_ID.substr(1); //從第2位擷取到最後
    var ID_eng_num = Convert_Letter_to_Num(ID_eng_char);
    var ID_all_num =  ID_eng_num + ID_num_data;
    var num_result = Validate_ID(ID_all_num);
    var validate_reult_num = num_result % 10;
    
    //return_type == bool返回true/false
    //return_type == alert則跳出alert
    
    //防止return_type沒有送值
    if (return_type == null)
    {
        return_type = 'bool';
    }
    
    //返回結果
        if (validate_reult_num == 0)
        {
            if(return_type == 'alert')
            {
                alert('此為有效的身分證字號！');
            }           
            
            if(return_type == 'bool')
            {
                return true;
            }
        } 
        else
        {
            if(return_type == 'alert')
            {
                alert('此為無效的身分證字號！');
            } 
            
            if(return_type == 'bool')
            {
                return false;
            }
        }
}

//***子function***//

//轉換英文為數字
function Convert_Letter_to_Num(letter){
    
    //驗證是否為英文
    if(/^[a-zA-Z]$/.test(letter) == false) {
    alert('第一個字元（英文字母）不正確！');
    exit();
    }
    
    letter = letter.toUpperCase(); //轉大寫
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
    return letter_ref_table[letter];
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
    return total;
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