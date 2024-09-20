import { createMemoryHistory, createRouter } from 'vue-router'

import ViewFavCity from './components/ViewFavCity.vue'
import ViewWeekShow from './components/ViewWeekShow.vue'

const routes = [
  { path: '/favcity', component: ViewFavCity, },
  { path: '/week', component: ViewWeekShow,  props: true },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router