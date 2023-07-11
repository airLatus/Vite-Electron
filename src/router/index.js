import {createRouter, createWebHashHistory} from 'vue-router'

import loadComponent from '@/views/load/load.vue'
import homeComponent from '@/views/main/main.vue'
import detailsComponent from '@/views/details/details.vue'

const routes = [
	{
		path: '/load',
		name: 'load',
		meta: {
			title: '加载'
		},
		component: loadComponent
	},
	{
		path: '/home',
		name: 'home',
		meta: {
			title: '首页'
		},
		component: homeComponent
	},
	{
		path: '/details',
		name: 'details',
		meta: {
			title: '详情'
		},
		component: detailsComponent
	}
]
const router = createRouter({
	history: createWebHashHistory(), // 注意这里不能用history模式
	routes
})

export default router
