import { Cookie } from '../../libs/cookies/cookies';
import { Commit } from '../commit/commit';
import { Organization } from '../organization/organization';
import { Repository } from '../repository/repository';
import { User } from '../user/user';
import { GenericDataStore } from './data-store';

type GithubObject = {
	[ key: string ]: any
}

export class GithubStore extends GenericDataStore {
	static readonly endPoint = 'https://api.github.com'

	getOrganization( name: string ): Promise<Organization> {
		return new Promise<Organization>( async ( resolve, reject ) =>{
			try {

				const githubOrg = await this.apiCall( `/orgs/${ name }` )
				const organization = this.createOrganizationFromGithub( githubOrg )

				organization.repositories = await this.getRepositories( organization )

				resolve( organization )

			}
			catch( error ) { reject( error ) }
		})
	}

	getCommits( repo: Repository, page: number ): Promise<Commit[]> {
		return new Promise<Commit[]>( async ( resolve, reject ) => {
			try {

				const data: any[] = await this.apiCall( 
					`/repos/${ repo.organization.name }/${ repo.name }/commits?page=${ page }`
				)
				
				resolve( data.map( ghCommit => this.createCommitFromGithub( ghCommit ) ) )

			}
			catch( error ) { reject( error ) }

		})
	}

	private getRepositories( organization: Organization ): Promise<Repository[]> {
		return new Promise<Repository[]>( async ( resolve, reject ) => {
			try {
				const data: any[] = await this.apiCall( `/orgs/${ organization.name }/repos` )

				resolve( data.map( ghRepo => {
					const repo = this.createRepositoryFromGithub( ghRepo )
					repo.organization = organization
					return repo
				}))

			} catch( error ) { reject( error ) }
		})
	}

	private async apiCall( endPoint: string ) {
		const apiKey = Cookie.get('repository-activity-tracker-api')

		const resp = await fetch( `${ GithubStore.endPoint }${ endPoint }`, {
			headers: { 
				"Accept": "application/vnd.github.v3+json",
				"Authorization": apiKey && "token " + apiKey
			}
		})

		const result = resp.json()

		if ( !resp.ok ) {
			const error = await( result )
			throw new Error( error.message )
		}

		return result
	}

	private createOrganizationFromGithub( githubObj: GithubObject ): Organization {
		const org = new Organization()

		org.avatar = githubObj.avatar_url
		org.name = githubObj.name
		org.description = githubObj.description
		org.company = githubObj.company
		org.location = githubObj.location
		org.email = githubObj.email
		org.homeUrl = githubObj.home_url
		org.twitter = githubObj.twitter_username
		org.followers = githubObj.followers
		org.following = githubObj.following

		return org
	}

	private createRepositoryFromGithub( githubObj: GithubObject ): Repository {
		const repo = new Repository()

		repo.name = githubObj.name
		repo.description = githubObj.description
		repo.fullName = githubObj.full_name
		repo.url = githubObj.home_url
		repo.watchers = githubObj.watchers

		return repo
	}

	private createCommitFromGithub( githubObj: GithubObject ): Commit {
		const commit = new Commit()

		commit.sha = githubObj.sha
		commit.url = githubObj.home_url
		commit.message = githubObj.commit.message
		commit.author = new User()

		const commitAuthor = githubObj.commiter || githubObj.author

		commit.author.name = commitAuthor?.login
		commit.author.avatar = commitAuthor?.avatar_url
		commit.author.reposUrl = commitAuthor?.repos_url

		return commit
	}
}