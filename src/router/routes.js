const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: '/student' },
      {
        path: '/admin',
        component: () => import('pages/admin/Admin.vue'),
        children: [
          { path: '', redirect: '/admin/login' },
          { path: 'login', component: () => import('pages/admin/AdminLogin.vue') },
          { path: 'registration', component: () => import('pages/admin/AdminRegistration.vue') },
          {
            path: 'main',
            component: () => import('pages/admin/AdminMain.vue'),
            children: [
              {
                path: 'teacher',
                component: () => import('pages/admin/teacher/Teacher.vue'),
                children: [
                  { path: 'schedule', component: () => import('pages/admin/teacher/TeacherSchedule.vue') },
                  { path: 'appointment', component: () => import('pages/admin/teacher/TeacherAppointment.vue') }
                ]
              },
              {
                path: 'working_student',
                component: () => import('pages/admin/working_student/WorkingStudent.vue'),
                children: [
                  { path: 'report', component: () => import('pages/admin/working_student/WorkingStudentReports.vue') }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '/student',
        component: () => import('pages/student/Student.vue'),
        children: [
          { path: '', redirect: '/student/login' },
          { path: 'login', component: () => import('pages/student/StudentLogin.vue') },
          { path: 'registration', component: () => import('pages/student/StudentRegistration.vue') },
          { path: 'appointment', component: () => import('pages/student/StudentAppointment.vue') }
        ]
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
