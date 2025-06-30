export async function uploadFile(tmpFilepath,fileType='image') {
    const cloudPath = `${fileType}${tmpFilepath.substring(tmpFilepath.lastIndexOf('/')).replace('tmp_','')}`
    console.log('cloudPath',cloudPath)
    return await wx.cloud.uploadFile({
        cloudPath,
        filePath: tmpFilepath
    })
}