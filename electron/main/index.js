import {app, BrowserWindow, ipcMain} from 'electron'
import createTray from './modules/createTray'
import maxMinClose from './modules/maxMinClose'
import createLoadWin from './windows/loadWindow'
import createMainWin from './windows/mainWindow'
import log from './utils/log'

class ElectronApp {
	constructor() {
		this.loadWin = null
		this.mainWin = null
		this.tray = null

		this.init().then(async () => {
			await this.initLoadWin()
			await this.initMainWin()
			// this.initListenFullUpdate();
			// handleDatabase();

			await this.loadModules()
			// loadVueDevtools();
		})
	}

	init() {
		// 只允许一个app 运行
		if (!app.requestSingleInstanceLock()) {
			app.quit()
			process.exit(0)
		}
		// 为当前可执行文件设置协议 所有 your-protocol:// 开头的链接将使用当前可执行文件打开
		if (!app.isDefaultProtocolClient('electronApp')) {
			app.setAsDefaultProtocolClient('electronApp')
		}
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})
		return app.whenReady()
	}

	/**
	 * 初始化加载窗口
	 */
	async initLoadWin() {
		this.loadWin = createLoadWin()
		ipcMain.on('loadFinished', () => {
			console.log('loadFinished')
			this.mainWin.show()
			this.mainWin.focus()
			this.loadWin.hide()
		})
	}
	/**
	 * 显示加载窗口
	 */
	showLoadWin() {
		if (this.loadWin) {
			if (this.loadWin.isMinimized()) {
				this.loadWin.restore()
			}

			this.loadWin.show()
			this.loadWin.focus()
		}
	}

	/**
	 * 初始化首页主窗口
	 */
	async initMainWin() {
		this.mainWin = createMainWin()

		ipcMain.on('openMainWin', () => {
			console.log('openMainWin')
			this.mainWin.show()
			this.mainWin.webContents.openDevTools({mode: 'detach'})
		})
	}

	/**
	 * 初始化监听全量根系
	 */
	// initListenFullUpdate() {
	// 	checkFullUpdate(this.mainWin);
	// }

	/**
	 * 加载功能模块
	 */
	async loadModules() {
		// 监听最大化最小化关闭
		maxMinClose()
		// 创建托盘
		this.tray = createTray()
	}
	/**
	 * 退出应用
	 */
	quit() {
		log.info('app quit')
		if (this.tray && !this.tray.isDestroyed()) {
			this.tray.destroy()
			this.tray = null
			log.info('tray quit')
		}

		const windows = BrowserWindow.getAllWindows()
		windows.forEach((item) => item.destroy())

		app.quit()
	}
}
const electronAppInstance = new ElectronApp()

export default electronAppInstance
