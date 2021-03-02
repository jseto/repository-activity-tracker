import { User } from '../user/user'

export class Commit {
	sha: string
	author: User
	message: string
	url: string
}