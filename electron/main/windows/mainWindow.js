import {app, BrowserWindow, ipcMain} from 'electron'
import {join} from 'path'

// import {closeDevTools, openDevTools} from '../utils/devtools'
import {getIcon} from '../utils/icon'

// 屏蔽不安全的协议http 提示
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const createMainWin = () => {
	const mainWin = new BrowserWindow({
		title: '首页...',
		width: 1366,
		height: 768,
		minWidth: 1366,
		minHeight: 768,
		frame: false,
		show: false,
		icon: getIcon(),
		resizable: true,
		webPreferences: {
			nodeIntegration: true, // 是否集成nodejs
			contextIsolation: true, // 是否开启上下文隔离
			preload: join(__dirname, '../preload/index.js')
		}
	})
	mainWin.webContents.on('did-finish-main', () => {
		// 利用localStorage存储mainWin.id
		mainWin.webContents.executeJavaScript(`localStorage.setItem("electronMainWinId",${mainWin.id})`)
	})

	let windowUrl
	if (app.isPackaged) {
		windowUrl = 'file://' + join(__dirname, '../../index.html')
	} else {
		windowUrl = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
	}
	mainWin.loadURL(windowUrl + '#/home')

	// mainWin.on('show', () => openDevTools(mainWin))
	// mainWin.on('hide', () => closeDevTools(mainWin))

	return mainWin
}

export default createMainWin
