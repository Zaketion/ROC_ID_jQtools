## ROC ID jQtools 台灣身分證字號工具（jQuery）

### 功能及使用方式
#### 1.台灣身分證字號驗證
###### ROC_ID_check('ID_STRING_HERE','bool'); //可回傳True or False驗證結果.(bool可省略)
###### ROC_ID_check('ID_STRING_HERE','alert'); //直接跳出alert提示驗證結果.
#### 2.台灣身分證字號產生
###### ROC_ID_Generator(); //可回傳依據驗證公式產生的身分證字號(回傳字串)
#### 3.台灣身分證字號補完
###### ROC_ID_Generator('A012'); //可輸入部分身分證字號將後面字號補完(回傳字串)

### 授權方式
本專案採用GPL授權，詳細內容請參考gpl.txt