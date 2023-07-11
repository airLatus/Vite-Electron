<template>
	<div>
		<p>DETAILS</p>
		<p>global'count：{{ storeCounter.count }}</p>
		<el-button type="primary" @click="doBackHome">jump back to HOME</el-button>
		<el-button type="danger" @click="doClose" :icon="Close" circle />
	</div>
</template>

<script setup>
import {Close} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {useCounterStore} from '@/stores/counter'
import {ipcRendererSend} from '@/utils/ipcRenderer'
const storeCounter = useCounterStore() // pinia存储的全局count
const router = useRouter()

/**
 * 返回上页
 */
const doBackHome = () => {
	router.back()
}

/**
 * 关闭应用
 */
const doClose = () => {
	ipcRendererSend('close-win', {
		needClose: true
	})
}
</script>

<style></style>
