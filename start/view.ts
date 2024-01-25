import edge from 'edge.js'
import env from '#start/env'

/**
 * Define a global property
 */
edge.global('ASSETS_BASE_URL', env.get('ASSETS_BASE_URL') || '')
