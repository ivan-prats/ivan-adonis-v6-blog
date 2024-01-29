/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home/index')

const ProjectsController = () =>
  import('../app/modules/project/infraestructure/projects_controller.js')
router.get('/projects', [ProjectsController, 'index'])

const BlogPostsController = () =>
  import('../app/modules/blog-posts/infraestructure/blog_posts_controller.js')
router.get('/blog', [BlogPostsController, 'index']).as('blog.index')
router.get('/blog/:slug', [BlogPostsController, 'show']).as('blog.show')
