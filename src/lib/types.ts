export interface ProjectCollection {
  parentTitle: string
  customer: number
  id: number
  name: string
  start: string
  end: string
  comment: string
  visible: boolean
  billable: boolean
  metaFields: ProjectMeta
  teams: Team[]
  globalActivities: boolean
  color: string
}
interface Project {
  customer: number
  id: number
  name: string
  comment: string
  visible: boolean
  billable: boolean
  globalActivites: boolean
  color: string
}
interface ProjectMeta {
  name: string
  value: string
}
interface Team {
  teamlead: User
  users: User[]
  id: number
  name: string
  members: TeamMember[]
  customers: Customer[]
  projects: Project[]
  activites: Activity[]
  color: string
}
interface Activity {
  project: number
  id: number
  name: string
  comment: string
  visible: boolean
  billable: boolean
  color: string
}
export interface CustomerCollection {
  id?: number
  name: string
  number?: string
  comment?: string
  visible: boolean
  billable: boolean
  currency: string
  metaFields?: CustomerMeta[]
  teams?: Team[]
  color?: string
}
interface CustomerMeta {
  name: string
  value: string
}
interface Customer {
  id: number
  name: string
  number: string
  comment: string
  visible: boolean
  billable: boolean
  color: string
}
interface TeamMember {
  user: User
  teamlead: true
}
export interface UserEntity {
  language: string
  timezone: string
  preferences: UserPreference[]
  teams: Team[]
  id: number
  alias: string
  title: string
  avatar: string
  memberships: TeamMembership
  username: string
  accountNumber: string
  enabled: boolean
  roles: string[]
  color: string
}
interface UserPreference {
  name: string
  value: string
}
interface User {
  id: number
  alias: string
  username: string
  accountNumber: string
  enabled: boolean
  color: string
}
interface TeamMembership {
  team: Team
  teamlead: boolean
}
export interface ActivityCollection {
  parentTitle: string
  project: number
  id: number
  name: string
  comment: string
  visible: boolean
  billable: boolean
  metaFields: ActivityMeta[]
  teams: Team[]
  color: string
}
interface ActivityMeta {
  name: string
  value: string
}

export interface TimesheetEditForm {
  begin: string
  end?: string
  project: number
  activity: number
  description?: string
  fixedRate?: string
  hourlyRate?: string
  user?: number
  exported?: boolean
  billable?: boolean
  tags?: string
}

export interface TimesheetEntity {
  activity?: number
  project?: number
  user?: number
  tags?: string[]
  id?: number
  begin: string
  end?: string
  duration?: number
  description?: string
  rate?: number
  internalRate?: number
  fixedRate?: number
  hourlyRate?: number
  exported: boolean
  billable: boolean
  metafields?: TimesheetMeta[]
}
interface TimesheetMeta {
  name: string
  value?: string
}
export interface TimesheetCollectionExpanded {
  user?: number
  tags?: string[]
  id?: number
  begin: string
  end?: string
  duration: number
  activity: ActivityExpanded
  project: ProjectExpanded
  description?: string
  rate?: number
  internalRate?: number
  exported: boolean
  billable: boolean
  metaFields?: TimesheetMeta[]
}

export interface ActivityExpanded {
  id: number
  project: Project
  name?: string
  comment: string
  visible?: boolean
  billable?: boolean
  color: string
}
export interface ProjectExpanded {
  id?: number
  customer: Customer
  name: string
  comment?: string
  visible: boolean
  billable: boolean
  globalActivites: boolean
  color?: string
}
