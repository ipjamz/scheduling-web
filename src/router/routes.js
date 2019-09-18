const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/main',
        component: () => import('pages/Main.vue'),
        children: [{
          path: '/teacher',
          component: () => import('pages/Teacher.vue')
        },
        {
          path: '/working_student',
          component: () => import('pages/WorkingStudent.vue')
        }]
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
