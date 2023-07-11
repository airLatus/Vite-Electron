import {app, BrowserWindow, session} from 'electron'
import fs from 'fs'
import {homedir} from 'os'
import {join} from 'path'

const home = homedir()
const dir = (...paths) => join(home, ...paths)

/** vue devtool 扩展id */
const vueExtensionId = 'nmmhkkegccagdldgiimedpiccmgmieda'

/** Chrome 用户数据基础目录 */
const ChromeUseDataBaseDirMap = {
	darwin: dir('/Library/Application Support/Google/Chrome'),
	win32: dir('/AppData/Local/Google/Chrome/User Data')
}

const profileDirRegex = /^Default$|^Profile \d+$/

const chromeUseDataBaseDir = ChromeUseDataBaseDirMap[process.platform]

/**
 * 加载 Vue Devtools
 * 如果是生产环境和查询到该扩展ID的情况下return
 */
export function loadVueDevtools() {
	if (app.isPackaged) return
	if (session.defaultSession.getExtension(vueExtensionId)) return

	if (!fs.existsSync(chromeUseDataBaseDir)) return

	const profilePaths = []

	fs.readdirSync(chromeUseDataBaseDir).forEach((it) => {
		if (!profileDirRegex.test(it)) return

		const path = join(chromeUseDataBaseDir, it)
		const dir = fs.statSync(path)

		if (dir.isDirectory()) profilePaths.push(path)
	})

	const vueDevToolPath = profilePaths
		.map((it) => {
			const path = join(it, 'Extensions', vueExtensionId)

			if (!fs.existsSync(path)) return false

			return fs
				.readdirSync(path)
				.map((it) => {
					const sp = join(path, it)
					const dir = fs.statSync(path)

					if (dir.isDirectory() && fs.existsSync(join(sp, 'manifest.json'))) return sp

					return
				})
				.filter(Boolean)[0]
		})
		.filter(Boolean)[0]

	console.log('vueDevToolPath', vueDevToolPath)

	if (vueDevToolPath) {
		session.defaultSession.loadExtension(vueDevToolPath)
	}
}

/**
 * 打开 Devtools
 */
export function openDevTools($win) {
	if (!$win) return
	if (app.isPackaged) return

	$win.webContents.openDevTools({mode: 'detach'})
}

/**
 * 关闭 Devtools
 */
export function closeDevTools($win) {
	if (!$win) return
	if (app.isPackaged) return

	$win.webContents.closeDevTools()
}
