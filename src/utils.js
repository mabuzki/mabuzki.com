export default{
	getUrlKey:function (name) {
		return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
	},

	setLoadingAnimation:function (evt, type = false) {
		let target = evt.target || evt.srcElement
		if (type) {
			target.classList.add('is-loading')
		} else {
			target.classList.remove('is-loading')
		}
	},

	btnSetLoading:function (e, handler) {
		console.log(handler)
		console.log(e)
	},

	// __post:function(url,params){
	// 	axios.post(url,params)
	// 	.then((response) => {
	// 		console.log(response)
	// 		if(response.data.success) {
				
	// 		}
	// 	})
	// 	.catch(function (error) {
	// 		setTimeout(() => {
	// 			btn.classList.remove('is-loading');
	// 		}, 1000);

	// 		if (error.response) {
	// 			return {
	// 				msg: error.response.data,
	// 				status: error.response.status
	// 			}
	// 			console.log(error.response.data);
	// 			console.log(error.response.status);
	// 			console.log(error.response.headers);
	// 		}
	// 	});
	// },

	settingSubmit: function (Form, params, url = null) {
		let btn = Form.querySelector('button')
		btn.classList.add('is-loading')

		// for (let name of params.entries()) {
		// 	console.log(name[0]+ ':' + name[1]);
		// 	let param = params[name];
		// }

		// eslint-disable-next-line
		Vue.prototype.$http.post('/setting/profile/update', params)
			.then((response) => {
				console.log(response)
				if(response.data.success) {
					// eslint-disable-next-line
					Vue.prototype.$toasted.show('修改成功')
				}
			})
			.catch(function (error) {
				if (error.response) {
					if (error.response.status === 405) {
						// eslint-disable-next-line
						Vue.prototype.$toasted.show('服务器无响应')
						// console.log(error.response.data);
						// console.log(error.response.status);
						// console.log(error.response.headers);
					}
				}
			});

		setTimeout(() => {
			btn.classList.remove('is-loading');
		}, 1000);
		
	}
}