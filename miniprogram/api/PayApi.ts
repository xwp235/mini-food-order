export async function pay(body: string,
    orderNo: string,
    totalFee: number,
    functionName: string) {
    const res = await wx.cloud.callFunction({
        name: 'wxPay',
        data: {
            body,
            orderNo,
            totalFee,
            functionName
        }
    })
    console.log('1.调用支付下单云函数预生成订单后的响应结果',res)
}