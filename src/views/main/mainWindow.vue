<template>
	<div>
		<p>----main----</p>
		<p>
			{{ storeCounter.count }}
		</p>
		<el-button type="primary" @click="doHandleDecrease">-1</el-button>
		<el-button type="primary" @click="doHandleIncrease">+1</el-button>
		<el-button type="primary" @click="doIntoDetails">into details</el-button>
		<el-button type="danger" :icon="Close" circle @click="doClose" />
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
 * 处理全局count的-1
 */
const doHandleDecrease = () => {
	storeCounter.decrement()
}

/**
 * 处理全局count的-1
 */
const doHandleIncrease = () => {
	storeCounter.increment()
}

/**
 * 进入详情界面
 */
const doIntoDetails = () => {
	router.push({
		name: 'details'
	})
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
