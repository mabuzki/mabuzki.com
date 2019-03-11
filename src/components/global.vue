<script>
// const site = document.querySelector('meta[name=siteurl]').content

// eslint-disable-next-line
const site = process.env.VUE_APP_SITE
// eslint-disable-next-line
const api = process.env.VUE_APP_API
// eslint-disable-next-line
const avatar = process.env.VUE_APP_API + '/avatar/'
var uid = ''
var username = ''
var token = ''

function generateRandom (len, radix) {
	radix = radix ? 10 : 36
	var rdmString = ''
	for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
	return rdmString.substr(0, len)
}

function dataURItoBlob (dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString, mimeString, ia, i

	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1])
	} else {
		byteString = unescape(dataURI.split(',')[1])
	}
	// separate out the mime component
	mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	// write the bytes of the string to a typed array
	ia = new Uint8Array(byteString.length)
	for (i = 0; i < byteString.length; i += 1) {
		ia[i] = byteString.charCodeAt(i)
	}

	return new Blob([ia], {type: mimeString})
}

export default {
	site,
	api,
	avatar,
	uid,
	username,
	token,
	generateRandom,
	dataURItoBlob
}
</script>
