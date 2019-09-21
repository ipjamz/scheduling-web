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
        children: [
          {
            path: '/teacher',
            component: () => import('pages/teacher/Teacher.vue'),
            children: [{
              path: '/schedule',
              component: () => import('pages/teacher/Schedule.vue')
            },
            {
              path: '/appointment_list',
              component: () => import('pages/teacher/AppointmentList.vue')
            }
            ]
          },
          {
            path: '/working_student',
            component: () => import('pages/working_student/WorkingStudent.vue'),
            children: [
              {
                path: '/appointment',
                component: () => import('pages/working_student/Appointment.vue')
              }
            ]
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
