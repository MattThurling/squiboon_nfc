import { createRouter, createWebHistory } from 'vue-router'
import Question from '../views/Question.vue'
import QuestionIndex from '../views/QuestionIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/questions',
      name: 'questionsIndex',
      component: QuestionIndex
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: Question
    }
  ]
})

export default router
