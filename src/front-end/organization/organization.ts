import { Repository } from '../repository/repository'

export class Organization {
	avatar: string
	name: string
	description: string
	company: string
	location: string
	email: string
	homeUrl: string
	twitter: string
	followers: number
	following: number
	repositories: Repository[]
}