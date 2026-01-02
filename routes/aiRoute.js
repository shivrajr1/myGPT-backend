
import { Router } from 'express'
import { 
    getTitles, 
    getThread, 
    addThread, 
    deleteThread } from '../controllers/aiController.js'

export const aiRouter = Router()

aiRouter.get('/history', getTitles)
aiRouter.post('/thread', addThread)
aiRouter
    .route('/thread/:id')
    .get(getThread)
    .delete(deleteThread)
