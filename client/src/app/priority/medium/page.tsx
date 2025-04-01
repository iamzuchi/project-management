import React from 'react'
import ResuablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/api'

const Medium = () => {
  return (
    <ResuablePriorityPage priority={Priority.Medium} />
  )
}

export default Medium;