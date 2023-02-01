/* eslint-disable */

export const Styles = {
        inputForm : {
          margin: "20px",
        },
        inputForm_sc: {
          margin:"10px"
        },
        submitButton : {
          height: "40px",
          width: "100px",
          marginLeft: "88.5%",
          marginTop: "-10px",
        },
        submitButton2 : {
          height: "40px",
          width: "100px",
          marginLeft: "94%",
          marginTop: "-40px",
        },
        tableStyle : {
        },
        selectStyle : {
          display: "inline",
          width: "200px",
        },
        dateStyle : {
          float: "left",
          display: "inline",
          width: "200px",
        },
        formItem : {
          
        },
        formLabel : {
          color: "black",
          display: "inline"
        },
        formInput: {
          width: 400
        },
        proccessBtn: {
          display: "inline-block"
        },
        fileUpload: {
          width: "500px",
          height: "35px"
        },
        monitorSubmit: {
          height: "40px",
          width: "100px",
          marginLeft: "50%",
          marginTop: "-10px",
        },
        downBtn: {
          display: "inline-block"
        },
        tdText: {
          textAlign: "center"
        },
        tdText2: {
          textAlign: "center",
          verticalAlign: "middle"
        },
        backgroundColor: {
          backgroundColor: "#c3cad4"
        }
    }

export const RequiredText = {
  smallText: {
    textAlign: "center",
    color: "#28A0FF"
  }
}

export const Span = ({ space = 1160}) => {
  return (
    <span style={{paddingRight: space}}></span>
  );
}

export const Space = ({ px }) => {
  return <span style={{ marginLeft:`${px}px`, marginBottom: `${px}px`  }} ></span>
}