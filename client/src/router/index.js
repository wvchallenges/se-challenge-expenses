import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ReportSummary from '@/components/ReportSummary'
import ReportUpload from '@/components/ReportUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/report',
      name: 'ReportSummary',
      component: ReportSummary,
    },
    {
      path: '/upload',
      name: 'ReportUpload',
      component: ReportUpload,
    }
  ],
})
