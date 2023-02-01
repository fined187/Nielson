/* eslint-disable */
import '../../App.css';
import { Table } from 'react-bootstrap';

function DataSearchResult(props) {
  const Styles = {
    listTitle : {
      textAlign: "center",
      background: "#64A0FF"
    },
    listInfo : {
      width: "100%",
      textAlign: "right",
      margin: "10px",
      paddingRight: "10px"
    },
    contentListBody : {
      overflowY: "auto",
      textAlign: "center",
      height: "100px",
    }
  }

  return (
    <>
      <div>
        <Table striped bordered hover size='sm'>
          {
            (props.formData.type === 'priceCheck' && props.formData.dataType === 'getData' && props.jsonList !== null) ? 
            (
              <thead>
                <tr>
                  <th style={Styles.listTitle}>모델번호</th>
                  <th style={Styles.listTitle}>제조사</th>
                  <th style={Styles.listTitle}>브랜드명</th>
                  <th style={Styles.listTitle}>상품명</th>
                  <th style={Styles.listTitle}>쇼핑몰명</th>
                  <th style={Styles.listTitle}>PL_NO</th>
                  <th style={Styles.listTitle}>배송비 제외 상품가</th>
                  <th style={Styles.listTitle}>배송비 제외 지불가</th>
                  <th style={Styles.listTitle}>주간 최저가</th>
                  <th style={Styles.listTitle}>PL 대표가격</th>
                  <th style={Styles.listTitle}>보정 배송비 제외 상품가</th>
                  <th style={Styles.listTitle}>보정 배송비 제외 지불가</th>
                  <th style={Styles.listTitle}>검수 배송비 제외 상품가</th>
                  <th style={Styles.listTitle}>검수 배송비 제외 지불가</th>
                  <th style={Styles.listTitle}>CNT</th>
                  <th style={Styles.listTitle}>QNTY</th>
                </tr>
              </thead>
            )
            :
            (props.formData.type === 'priceCheck' && props.formData.dataType === 'sendData' && props.jsonList !== null) ?
            (
              <thead>
                <tr>
                  <th style={Styles.listTitle}>모델번호</th>
                  <th style={Styles.listTitle}>제조사</th>
                  <th style={Styles.listTitle}>브랜드명</th>
                  <th style={Styles.listTitle}>상품명</th>
                  <th style={Styles.listTitle}>쇼핑몰명</th>
                  <th style={Styles.listTitle}>PL_NO</th>
                  <th style={Styles.listTitle}>CNT</th>
                  <th style={Styles.listTitle}>QNTY</th>
                  <th style={Styles.listTitle}>AMT</th>
                </tr>
              </thead>
            )
            :
            (props.formData.type === 'matching' && props.jsonList !== null) ?
            (
              <thead>
                <tr>
                    <th style={Styles.listTitle}>기간</th>
                    <th style={Styles.listTitle}>제조사</th>
                    <th style={Styles.listTitle}>브랜드명</th>
                    <th style={Styles.listTitle}>쇼핑몰명</th>
                    <th style={Styles.listTitle}>카테고리명</th>
                    <th style={Styles.listTitle}>매칭 AMT</th>
                    <th style={Styles.listTitle}>미매칭 AMT</th>
                    <th style={Styles.listTitle}>매칭 QNTY</th>
                    <th style={Styles.listTitle}>미매칭 QNTY</th>
                    <th style={Styles.listTitle}>전체 CNT</th>
                    <th style={Styles.listTitle}>매칭 CNT</th>
                    <th style={Styles.listTitle}>미매칭 CNT</th>
                    <th style={Styles.listTitle}>매칭률</th>
                    <th style={Styles.listTitle}>미매칭 AMT_롱테일</th>
                    <th style={Styles.listTitle}>미매칭 QNTY_롱테일</th>
                    <th style={Styles.listTitle}>미매칭 CNT_롱테일</th>
                </tr>
              </thead>
            )
            : 
            (props.formData.type === 'rocket' && props.jsonList !== null) ? 
            (
              <thead>
                <tr>
                    <th style={Styles.listTitle}>기간</th>
                    <th style={Styles.listTitle}>제조사</th>
                    <th style={Styles.listTitle}>브랜드명</th>
                    <th style={Styles.listTitle}>쇼핑몰명</th>
                    <th style={Styles.listTitle}>카테고리명</th>
                    <th style={Styles.listTitle}>전체 CNT</th>
                    <th style={Styles.listTitle}>매칭 CNT</th>
                    <th style={Styles.listTitle}>매칭률</th>
                    <th style={Styles.listTitle}>매칭 CNT 로켓</th>
                    <th style={Styles.listTitle}>매칭 CNT 비로켓</th>
                    <th style={Styles.listTitle}>매칭 로켓 비율</th>
                    <th style={Styles.listTitle}>매칭 비로켓 비율</th>
                    <th style={Styles.listTitle}>미매칭 CNT_로켓</th>
                    <th style={Styles.listTitle}>미매칭 CNT_비로켓</th>
                </tr>
              </thead>
            )
            : (props.formData.type === 'sendCheck' && props.jsonList !== null) ?
            (
              <thead>
                <tr>
                    <th style={Styles.listTitle}>키워드</th>
                    <th style={Styles.listTitle}>상품코드</th>
                    <th style={Styles.listTitle}>URL</th>
                    <th style={Styles.listTitle}>기간</th>
                    <th style={Styles.listTitle}>수집CNT</th>
                    <th style={Styles.listTitle}>수집QNTY</th>
                    <th style={Styles.listTitle}>수집AMT</th>
                    <th style={Styles.listTitle}>전송CNT</th>
                    <th style={Styles.listTitle}>전송QNTY</th>
                    <th style={Styles.listTitle}>전송AMT</th>
                    <th style={Styles.listTitle}>전송모델번호</th>
                    <th style={Styles.listTitle}>전송제조사</th>
                    <th style={Styles.listTitle}>전송브랜드</th>
                    <th style={Styles.listTitle}>전송모델명</th>
                </tr>
              </thead>
            )
            : (props.formData.type === 'bulk' && props.jsonList !== null) ?
            (
              <thead>
                <tr>
                    <th style={Styles.listTitle}>모델번호</th>
                    <th style={Styles.listTitle}>제조사</th>
                    <th style={Styles.listTitle}>브랜드명</th>
                    <th style={Styles.listTitle}>모델병</th>
                    <th style={Styles.listTitle}>쇼핑몰</th>
                    <th style={Styles.listTitle}>PL_NO</th>
                    <th style={Styles.listTitle}>수집명</th>
                    <th style={Styles.listTitle}>옵션명</th>
                    <th style={Styles.listTitle}>URL</th>
                    <th style={Styles.listTitle}>CNT</th>
                    <th style={Styles.listTitle}>QNTY</th>
                    <th style={Styles.listTitle}>AMT</th>
                </tr>
              </thead>
            )
            : null
          }
          <tbody style={Styles.contentListBody}>
            {
              (props.formData.type === 'priceCheck' && props.formData.dataType === 'getData' && props.jsonList !== null) ? 
                (props.jsonList).map((item, i) => {
                  return (
                    <GetData 
                      key={i}
                      ENR_MODEL_NO={item.ENR_MODEL_NO} 
                      MAKER_NAME={item.MAKER_NAME} 
                      BRAND_NAME={item.BRAND_NAME} 
                      MODEL_NAME={item.MODEL_NAME}
                      SMTD_SHOP_NAME={item.SMTD_SHOP_NAME}
                      PL_NO={item.PL_NO} 
                      DRM_GOODS_PRICE={item.DRM_GOODS_PRICE}
                      DRM_PAY_AMT={item.DRM_PAY_AMT} 
                      MIN_PRICE={item.MIN_PRICE}
                      PL_REP_PRICE={item.PL_REP_PRICE}
                      EMP_DRM_GOODS_PRICE={item.EMP_DRM_GOODS_PRICE}
                      EMP_DRM_PAY_AMT={item.EMP_DRM_PAY_AMT}
                      INSPT_DRM_GOODS_PRICE={item.INSPT_DRM_GOODS_PRICE}
                      INSPT_DRM_PAY_AMT={item.INSPT_DRM_PAY_AMT}
                      CNT={item.CNT}
                      QNTY={item.QNTY}
                    />
                  )
                })
                :
              (props.formData.type === 'priceCheck' && props.formData.dataType === 'sendData' && props.jsonList !== null) ?
                (props.jsonList).map((item, i) => {
                  return (
                    <SendData 
                      key={i}
                      ENR_MODEL_NO={item.ENR_MODEL_NO} 
                      MAKER_NAME={item.MAKER_NAME} 
                      BRAND_NAME={item.BRAND_NAME} 
                      MODEL_NAME={item.MODEL_NAME}
                      SMTD_SHOP_NAME={item.SMTD_SHOP_NAME}
                      PL_NO={item.PL_NO}
                      CNT={item.CNT}
                      QNTY={item.QNTY}
                      AMT={item.AMT}
                    />
                  )
                })
                :
              (props.formData.type === 'matching' && props.jsonList !== null) ?
                (props.jsonList).map((item, i) => {
                  return (
                    <Matching 
                      key={i}
                      YM={item.YM} 
                      MAKER={item.MAKER} 
                      BRAND={item.BRAND} 
                      SHOP_NAME={item.SHOP_NAME}
                      CATE_NAME={item.CATE_NAME}
                      MTCH_AMT={item.MTCH_AMT} 
                      NOT_MTCH_AMT={item.NOT_MTCH_AMT}
                      MTCH_QNTY={item.MTCH_QNTY} 
                      NOT_MTCH_QNTY={item.NOT_MTCH_QNTY}
                      TOTAL_CNT={item.TOTAL_CNT}
                      MTCH_CNT={item.MTCH_CNT}
                      NOT_MTCH_CNT={item.NOT_MTCH_CNT}
                      MTCH_RATE_CNT={item.MTCH_RATE_CNT}
                      NOT_MTCH_AMT_LONG={item.NOT_MTCH_AMT_LONG}
                      NOT_MTCH_QNTY_LONG={item.NOT_MTCH_QNTY_LONG}
                      NOT_MTCH_CNT_LONG={item.NOT_MTCH_CNT_LONG}
                    />
                  )
                })
                :
              (props.formData.type === 'rocket' && props.jsonList !== null) ?
                (props.jsonList).map((item, i) => {
                  return (
                    <Rocket 
                      key={i}
                      YM={item.YM} 
                      MAKER={item.MAKER} 
                      BRAND={item.BRAND} 
                      SHOP_NAME={item.SHOP_NAME}
                      CATE_NAME={item.CATE_NAME}
                      TOTAL_CNT={item.TOTAL_CNT}
                      MTCH_CNT={item.MTCH_CNT}
                      MTCH_RATE_CNT={item.MTCH_RATE_CNT}
                      MTCH_CNT_RCK={item.MTCH_CNT_RCK}
                      MTCH_CNT_NOTRCK={item.MTCH_CNT_NOTRCK}
                      MTCH_RATE_RCK={item.MTCH_RATE_RCK}
                      MTCH_RATE_NOTRCK={item.MTCH_RATE_NOTRCK}
                      NOTMTCH_CNT_RCK={item.NOTMTCH_CNT_RCK}
                      NOTMTCH_CNT_NOTRCK={item.NOTMTCH_CNT_NOTRCK}
                    />
                  )
                })
                :
              (props.formData.type === 'sendCheck' && props.jsonList !== null) ?
                (props.jsonList).map((item, i) => {
                  return (
                    <SendCheck 
                      key={i}
                      KEYWORD={item.KEYWORD}
                      GOODS_CODE={item.GOODS_CODE}
                      GOODS_URL={item.GOODS_URL}
                      BUY_DATE={item.BUY_DATE}
                      GET_CNT={item.GET_CNT}
                      GET_QNTY={item.GET_QNTY}
                      GET_AMT={item.GET_AMT}
                      SEND_CNT={item.SEND_CNT}
                      SEND_QNTY={item.SEND_QNTY}
                      SEND_AMT={item.SEND_AMT}
                      SEND_ENR_MODEL_NO={item.SEND_ENR_MODEL_NO}
                      SEND_MAKER={item.SEND_MAKER}
                      SEND_BRAND={item.SEND_BRAND}
                      SEND_MODEL_NAME={item.SEND_MODEL_NAME}
                    />
                  )
                })
                :
              (props.formData.type === 'bulk' && props.jsonList !== null) ?
                (props.jsonList).map((item, i) => {
                  return (
                    <Bulk 
                      key={i}
                      ENR_MODEL_NO={item.ENR_MODEL_NO}
                      MAKER_NAME={item.MAKER_NAME}
                      BRAND_NAME={item.BRAND_NAME}
                      MODEL_NAME={item.MODEL_NAME}
                      SMTD_SHOP_NAME={item.SMTD_SHOP_NAME}
                      PL_NO={item.PL_NO}
                      GOODS_NAME={item.GOODS_NAME}
                      GOODS_OPTN_VLU={item.GOODS_OPTN_VLU}
                      GOODS_URL={item.GOODS_URL}
                      CNT={item.CNT}
                      QNTY={item.QNTY}
                      AMT={item.AMT}
                    />
                  )
                })
                :null
            }
          </tbody>
        </Table>
      </div>
    </>
  );
} 

function GetData(props) {
  return (
      <tr>
        <td>{props.ENR_MODEL_NO}</td>
        <td>{props.MAKER_NAME}</td>
        <td>{props.BRAND_NAME}</td>
        <td>{props.MODEL_NAME}</td>
        <td>{props.SMTD_SHOP_NAME}</td>
        <td>{props.PL_NO}</td>
        <td>{props.DRM_GOODS_PRICE}</td>
        <td>{props.DRM_PAY_AMT}</td>
        <td>{props.MIN_PRICE}</td>
        <td>{props.PL_REP_PRICE}</td>
        <td>{props.EMP_DRM_GOODS_PRICE}</td>
        <td>{props.EMP_DRM_PAY_AMT}</td>
        <td>{props.INSPT_DRM_GOODS_PRICE}</td>
        <td>{props.INSPT_DRM_PAY_AMT}</td>        
        <td>{props.CNT}</td>
        <td>{props.QNTY}</td>
      </tr>
  );
}

function SendData(props) {
  return (
      <tr>
        <td>{props.ENR_MODEL_NO}</td>
        <td>{props.MAKER_NAME}</td>
        <td>{props.BRAND_NAME}</td>
        <td>{props.MODEL_NAME}</td>
        <td>{props.SMTD_SHOP_NAME}</td>
        <td>{props.PL_NO}</td>
        <td>{props.CNT}</td>
        <td>{props.QNTY}</td>
        <td>{props.AMT}</td>
      </tr>
  );
}

function Matching(props) {
  return (
      <tr>
        <td>{props.YM}</td>
        <td>{props.MAKER}</td>
        <td>{props.BRAND}</td>
        <td>{props.SHOP_NAME}</td>
        <td>{props.CATE_NAME}</td>
        <td>{props.MTCH_AMT}</td>
        <td>{props.NOT_MTCH_AMT}</td>
        <td>{props.MTCH_QNTY}</td>
        <td>{props.NOT_MTCH_QNTY}</td>
        <td>{props.TOTAL_CNT}</td>
        <td>{props.MTCH_CNT}</td>
        <td>{props.NOT_MTCH_CNT}</td>
        <td>{props.MTCH_RATE_CNT}</td>
        <td>{props.NOT_MTCH_AMT_LONG}</td>
        <td>{props.NOT_MTCH_QNTY_LONG}</td>
        <td>{props.NOT_MTCH_CNT_LONG}</td>
      </tr>
  );
}

function Rocket(props) {
  return (
      <tr>
        <td>{props.YM}</td>
        <td>{props.MAKER}</td>
        <td>{props.BRAND}</td>
        <td>{props.SHOP_NAME}</td>
        <td>{props.CATE_NAME}</td>
        <td>{props.TOTAL_CNT}</td>
        <td>{props.MTCH_CNT}</td>
        <td>{props.MTCH_RATE_CNT}</td>
        <td>{props.MTCH_CNT_RCK}</td>
        <td>{props.MTCH_CNT_NOTRCK}</td>
        <td>{props.MTCH_RATE_RCK}</td>
        <td>{props.MTCH_RATE_NOTRCK}</td>
        <td>{props.NOTMTCH_CNT_RCK}</td>
        <td>{props.NOTMTCH_CNT_NOTRCK}</td>
      </tr>
  );
}

function SendCheck(props) {
  return (
      <tr>
        <td>{props.KEYWORD}</td>
        <td>{props.GOODS_CODE}</td>
        <td>{props.GOODS_URL}</td>
        <td>{props.BUY_DATE}</td>
        <td>{props.GET_CNT}</td>
        <td>{props.GET_QNTY}</td>
        <td>{props.GET_AMT}</td>
        <td>{props.SEND_CNT}</td>
        <td>{props.SEND_QNTY}</td>
        <td>{props.SEND_AMT}</td>
        <td>{props.SEND_ENR_MODEL_NO}</td>
        <td>{props.SEND_MAKER}</td>
        <td>{props.SEND_BRAND}</td>
        <td>{props.SEND_MODEL_NAME}</td>
      </tr>
  );
}


function Bulk(props) {
  return (
      <tr>
        <td>{props.ENR_MODEL_NO}</td>
        <td>{props.MAKER_NAME}</td>
        <td>{props.BRAND_NAME}</td>
        <td>{props.MODEL_NAME}</td>
        <td>{props.SMTD_SHOP_NAME}</td>
        <td>{props.PL_NO}</td>
        <td>{props.GOODS_NAME}</td>
        <td>{props.GOODS_OPTN_VLU}</td>
        <td>{props.GOODS_URL}</td>
        <td>{props.CNT}</td>
        <td>{props.QNTY}</td>
        <td>{props.AMT}</td>
      </tr>
  );
}

export default DataSearchResult;