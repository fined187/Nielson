/* eslint-disable */
import baseApiInstance from ".";

export const getExcelData = async (userInfo) => {
    const response = await baseApiInstance.get("/getMatchingExcel?userinfo="+userInfo);
    return response.data;
}


/*
/src/components/DataSearch
    import { downloadFile } form "src/utils/downloadFile"

    const handleDownloadBtn = async () => {
        ...
        await downloadFile()
    }

    <button onClick={handleDownloadBtn}>다운로드</button>



/src/utils/downloadFile.js
import { getExcelData } from "api/download"

//  파일 다운로드 로직
export const downloadFile = async () => {
try {
    const userInfo = localStorage.getItem("userInfo");

    const response = await getExcelData(userInfo);
    const blob = response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "MatchingRateExcel.xlsx";
    document.body.appendChild(a);
    a.click();
          setTimeout((_) => {
              window.URL.revokeObjectURL(url);
          }, 60000);
          a.remove();
} catch {
  console.error('err: ', err);
}
};
*/