const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/teacher',
        component: () => import('pages/Teacher.vue')
      },
      {
        path: '/time_table',
        component: () => import('pages/TimeTable.vue')
      },
      {
        path: '/subject',
        component: () => import('pages/Subject.vue')
      },
      {
        path: '/schedule',
        component: () => import('pages/Schedule.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
