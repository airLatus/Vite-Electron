import {ipcMain} from 'electron'

/**
 * 添加 ipc 调用的处理事件
 * @param eventName - ipc 事件名
 * @param listener - 回调事件
 */
export const ipcMainHandle = (eventName, listener) => {
	ipcMain.handle(eventName, (event, ...args) => {
		return listener(event, ...args)
	})
}

export const ipcMainOn = (channel, listener) => {
	ipcMain.on(channel, (event, ...args) => {
		return listener(event, ...args)
	})
}
