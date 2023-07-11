import {app, BrowserWindow, ipcMain} from 'electron'
import {join} from 'path'
import {getIcon} from '../utils/icon'
// import {loadVueDevtools, openDevTools} from './utils/devtools'

// 屏蔽不安全的协议http 提示
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const createLoadWin = () => {
	const loadWin = new BrowserWindow({
		title: '加载资源中...',
		width: 500,
		height: 300,
		resizable: false,
		icon: getIcon(),
		frame: false,
		// transparent: true,
		resizable: true,
		webPreferences: {
			nodeIntegration: true, // 是否集成nodejs
			contextIsolation: true, // 是否开启上下文隔离
			preload: join(__dirname, '../preload/index.js') // 开启预加载脚本
		}
	})
	loadWin.webContents.on('did-finish-load', () => {
		// 利用localStorage存储loadWin.id
		loadWin.webContents.executeJavaScript(`localStorage.setItem("electronLoadWinId",${loadWin.id})`)
		loadWin?.webContents.send('load-process-message', new Date().toLocaleString())
	})

	let windowUrl

	if (app.isPackaged) {
		// 为当前可执行文件设置协议 所有 your-protocol:// 开头的链接将使用当前可执行文件打开
		// if (!app.isDefaultProtocolClient("electronApp")) {
		//   app.setAsDefaultProtocolClient("electronApp");
		// }

		windowUrl = 'file://' + join(__dirname, '../../index.html')
	} else {
		// 环境变量VITE_DEV_SERVER_HOST和VITE_DEV_SERVER_PORT在vite-plugin-electron插件中默认定义
		windowUrl = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
		loadWin.webContents.openDevTools({mode: 'detach'})
	}
	loadWin.loadURL(windowUrl + '#/load')

	return loadWin
}

export default createLoadWin
