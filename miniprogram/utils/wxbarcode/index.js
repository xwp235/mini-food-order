var barcode = require('./barcode');
var qrcode = require('./qrcode');

function convert_length(length) {
    const windowInfo = wx.getWindowInfo()
	return Math.round(windowInfo.windowWidth * length / 750);
}

function barc(selector, code, width, height) {
    barcode.code128(selector, code, convert_length(width), convert_length(height))
}

function qrc(selector, code, width, height) {
    const query = wx.createSelectorQuery()
    query.select(selector)
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      const w = convert_length(width);
      const h = convert_length(height);

      canvas.width = w;
      canvas.height = h;

	  qrcode.api.draw(code, {
		ctx,
		width: convert_length(width),
		height: convert_length(height)
      })
    })
}

module.exports = {
	barcode: barc,
	qrcode: qrc
}