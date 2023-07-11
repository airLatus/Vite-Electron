<template>
	<div>
		<p>loading({{ timeRef }})......</p>
		<el-button type="primary" @click="doHandleJump">jump to main directly</el-button>
		<el-button type="danger" :icon="Close" circle @click="doClose" />
	</div>
</template>

<script setup>
import {Close} from '@element-plus/icons-vue'

import {ipcRendererSend} from '@/utils/ipcRenderer'
const timeRef = ref(0) // 倒计时时间

/**
 * 清理定时器
 */
const doClearTimer = () => {
	timer ? clearInterval(timer) : ''
}

/**
 * 定时器，每秒+1，5秒后跳转到主窗口
 */
const timer = setInterval(() => {
	timeRef.value++
	if (timeRef.value > 5) {
		doClearTimer()
		ipcRendererSend('loadFinished')
	}
}, 1000)

/**
 * 不等待计时结束，告知主进程加载完成，可以跳转
 */
const doHandleJump = () => {
	doClearTimer()

	ipcRendererSend('loadFinished')
}

/**
 * 关闭应用
 */
const doClose = () => {
	doClearTimer()
	ipcRendererSend('close-win', {
		needClose: true
	})
}
</script>

<style></style>
