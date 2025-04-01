import React from 'react'
import ResuablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/api'


const Backlog = () => {
  return (
    <ResuablePriorityPage priority={Priority.Backlog} />
  )
}

export default Backlog;