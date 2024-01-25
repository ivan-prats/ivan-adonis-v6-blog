/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const ProjectsController = () =>
  import('../app/modules/project/infraestructure/projects_controller.js')

router.on('/').render('pages/home/index')
router.get('/projects', [ProjectsController, 'index'])
