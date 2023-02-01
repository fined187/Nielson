
export const downloadMatching = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getMatchingExcel?userinfo="+userInfo
		//url = " http://10.10.10.44:9000/getMatchingExcel?userinfo="+userInfo

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
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
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

		export const downloadBulk = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getBulkExcel?userinfo="+userInfo
		//url = "http://10.10.10.44:9000/getBulkExcel?userinfo="+userInfo

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "Bulk.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

		export const downloadPriceGet = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getPriceExcel?userinfo="+userInfo+"&dataType=getData"
		//url = "http://10.10.10.44:9000/getPriceExcel?userinfo="+userInfo+"&dataType=getData"

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "GetPrice.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

		export const downloadPriceSend = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getPriceExcel?userinfo="+userInfo+"&dataType=sendData"
		//url = " http://10.10.10.44:9000/getPriceExcel?userinfo="+userInfo+"&dataType=sendData"

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "SendPrice.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};


		export const downloadRocket = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getRocketExcel?userinfo="+userInfo
		//url = " http://10.10.10.44:9000/getRocketExcel?userinfo="+userInfo

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "RocketExcel.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

		export const downloadSendCheck = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		url = "http://192.168.213.54:9000/getSendCheckExcel?userinfo="+userInfo
		//url = " http://10.10.10.44:9000/getSendCheckExcel?userinfo="+userInfo

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "getSend.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

		export  const downloadOverview = (url) => {

		const userInfo = localStorage.getItem("userInfo");
		const startDate = localStorage.getItem("startDate");
		const endDate = localStorage.getItem("endDate");
		const type = localStorage.getItem("type")
		url = "http://192.168.213.54:9000/getAllStatusExcel?startDate="+startDate+"&endDate="+endDate+"&type="+type+"&userinfo="+userInfo
		//url = " http://10.10.10.44:9000/getAllStatusExcel?startDate="+startDate+"&endDate="+endDate+"&type="+type+"&userinfo="+userInfo

		fetch(url, { method: 'GET' })
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = "getOverview.xlsx";
			document.body.appendChild(a);
			a.click();
			setTimeout((_) => {
				window.URL.revokeObjectURL(url);
			}, 60000);
			a.remove();
		})
		.catch((err) => {
			console.error('err: ', err);
		});
		};

