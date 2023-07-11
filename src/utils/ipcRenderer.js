/**
 * 渲染进程向主进程发送异步消息
 * @param channel 通过channel向渲染器进程发送异步消息
 * @param args  发送任意参数
 */
export const ipcRendererSend = (channel, ...args) => ipcRenderer.send(channel, ...args)

/**
 * 渲染进程监听消息
 * @param channel
 * @param listener
 * @returns
 */
export const ipcRendererOn = (channel, listener) => ipcRenderer.on(channel, listener)

/**
 * 渲染进程向主进程发消息且主进程处理完后将结果返回给渲染进程
 * @param channel
 * @param args
 * @returns
 */
export const ipcRendererInvoke = (channel, ...args) => ipcRenderer.invoke(channel, ...args)

/**
 * 通过webContentsId可以在两个渲染进程之间直接发消息
 * @param webContentsId
 * @param channel
 * @param args
 * @returns
 */
export const ipcRendererSendTo = (webContentsId, channel, ...args) =>
	ipcRenderer.sendTo(webContentsId, channel, ...args)

export const ipcRendererOnce = (channel, listener) => ipcRenderer.once(channel, listener)

/**
 * 移除channel的监听
 * @param channel
 * @param listener
 * @returns
 */
export const ipcRendererRemoveListener = (channel, listener) =>
	ipcRenderer.removeListener(channel, listener)
