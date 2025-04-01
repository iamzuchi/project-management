import React from 'react'
import ResuablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/api'


const High = () => {
  return (
    <ResuablePriorityPage priority={Priority.High} />
  )
}

export default High