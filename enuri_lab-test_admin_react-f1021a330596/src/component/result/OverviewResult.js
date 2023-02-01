/* eslint-disable */
import { Table } from 'react-bootstrap';

function OverviewResult (props) {

    const Styles = {
        listTitle : {
          textAlign: "center",
          background: "#64A0FF"
        },
        listTitle2 : {
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
        },
        contentListBodyAMT : {
            overflowY: "auto",
            textAlign: "right",
            height: "100px",
        }
      }

    return (
			<>
				<div>
						<Table striped bordered hover size='sm'>
							{
								(props.jsonList !== null ) ? 
										(
												<thead>
														<tr>
																<th className='align-middle' rowSpan="2" style={Styles.listTitle2}>기간</th>
																<th className='align-middle' rowSpan="2" style={Styles.listTitle2}>카테코드</th>
																<th className='align-middle' rowSpan="2" style={Styles.listTitle2}>카테고리명</th>
																<th className='align-middle' rowSpan="2" style={Styles.listTitle2}>쇼핑몰</th>
																<th colSpan="4" style={Styles.listTitle}>전체</th>
																<th colSpan="4" style={Styles.listTitle}>쇼핑 다이어리</th>
																<th colSpan="4" style={Styles.listTitle}>쇼핑 매니저</th>
																<th colSpan="4" style={Styles.listTitle}>구매 데이터</th>
														</tr>
														<tr>    
																<th style={Styles.listTitle}>수치</th>                                           
																<th style={Styles.listTitle}>비율</th>
																<th style={Styles.listTitle}>MoM</th>
																<th style={Styles.listTitle}>YoY</th>
																<th style={Styles.listTitle}>수치</th>
																<th style={Styles.listTitle}>비율</th>
																<th style={Styles.listTitle}>MoM</th>
																<th style={Styles.listTitle}>YoY</th>
																<th style={Styles.listTitle}>수치</th>
																<th style={Styles.listTitle}>비율</th>
																<th style={Styles.listTitle}>MoM</th>
																<th style={Styles.listTitle}>YoY</th>
																<th style={Styles.listTitle}>수치</th>
																<th style={Styles.listTitle}>비율</th>
																<th style={Styles.listTitle}>MoM</th>
																<th style={Styles.listTitle}>YoY</th>
														</tr>
												</thead>
										)
										:
										null
							}
								<tbody style={Styles.contentListBody}>
										{
												(props.jsonList !== null) ? 
												(props.jsonList).map((item, i) => {
													return(
														<OverView 
															key={i}
															YM={item.YM}
															CATE_CODE={item.CATE_CODE}
															CATE_NM={item.CATE_NM}
															SMTD_SHOP_NAME={item.SMTD_SHOP_NAME}
															VLU_TOT={item.VLU_TOT}
															RATE={item.RATE}
															MoM={item.MoM}
															YoY={item.YoY}
															VLU_SD={item.VLU_SD}
															RATE_SD={item.RATE_SD}
															MoM_SD={item.MoM_SD}
															YoY_SD={item.YoY_SD}
															VLU_SM={item.VLU_SM}
															RATE_SM={item.RATE_SM}
															MoM_SM={item.MoM_SM}
															YoY_SM={item.YoY_SM}
															VLU_ED={item.VLU_ED}
															RATE_ED={item.RATE_ED}
															MoM_ED={item.MoM_ED}
															YoY_ED={item.YoY_ED}
														/>
													)
												})
												: null
										}
								</tbody>
						</Table>
				</div>
			</>
    )
}

function OverView(props) {

    const Styles = {
        listTitle : {
          textAlign: "center",
          background: "#64A0FF"
        },
        listTitle2 : {
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
        },
        contentListBodyAMT : {
            overflowY: "auto",
            textAlign: "right",
            height: "10px",
        }
      }

    return (
        <tr>
            <td>{props.YM}</td>
            <td>{props.CATE_CODE}</td>
            <td>{props.CATE_NM}</td>
            <td>{props.SMTD_SHOP_NAME}</td>
            <td style={Styles.contentListBodyAMT}>{props.VLU_TOT}</td>
            <td>{props.RATE}</td>
            <td>{props.MoM}</td>
            <td>{props.YoY}</td>
            <td style={Styles.contentListBodyAMT}>{props.VLU_SD}</td>
            <td>{props.RATE_SD}</td>
            <td>{props.MoM_SD}</td>
            <td>{props.YoY_SD}</td>
            <td style={Styles.contentListBodyAMT}>{props.VLU_SM}</td>
            <td>{props.RATE_SM}</td>
            <td>{props.MoM_SM}</td>
            <td>{props.YoY_SM}</td>
            <td style={Styles.contentListBodyAMT}>{props.VLU_ED}</td>
            <td>{props.RATE_ED}</td>
            <td>{props.MoM_ED}</td>
            <td>{props.YoY_ED}</td>
        </tr>
    )
}

export default OverviewResult;