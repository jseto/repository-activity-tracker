import { Organization } from '../organization/organization'
import { User } from '../user/user'

export class Repository {
	name: string
	fullName: string
	organization: Organization
	url: string
	description: string
	watchers: number
	updated: Date
	contributors: User[]
}