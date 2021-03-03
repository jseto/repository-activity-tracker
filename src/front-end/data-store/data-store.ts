import { Commit } from '../commit/commit'
import { Organization } from '../organization/organization'
import { Repository } from '../repository/repository'
import { TrackedRepository } from '../repository/tracked-repository'
import { User } from '../user/user'

// export abstract class GenericDataStore implements RepoStore, TrackStore {
	// abstract getOrganization( name: string ): Promise<Organization>
	// abstract getCommits( repo: Repository, page: number ): Promise<Commit[]>
	// abstract getContributors( repo: Repository ): Promise<User[]>
	// abstract trackRepo( repo: Repository ): Promise<void> 
	// abstract trackedRepos(): Promise<TrackedRepository[]> 
// }

export interface RepoStore {
	getOrganization( name: string ): Promise<Organization>
	getCommits( repo: Repository, page: number ): Promise<Commit[]>
	getContributors( repo: Repository ): Promise<User[]>
}

export interface TrackStore {
	trackRepo( repo: Repository ): Promise<Response> 
	trackedRepos(): Promise<TrackedRepository[]> 
}

type RepoStoreFactory = ()=> RepoStore
type TrackStoreFactory = ()=> TrackStore

/**
 * Store is a singleton providing a façade to decouple access to concrete 
 * implementations of a Store (Github, Gitlab, Bitbucket, MockGit). The concrete 
 * store should be registered before using this class
 */
export class DataStore implements RepoStore, TrackStore {

	private constructor( repoStoreFactory: RepoStoreFactory, trackStoreFactory: TrackStoreFactory ) {
		this._concreteRepoStore = repoStoreFactory()
		this._concreteTrackStore = trackStoreFactory()
	}

	/**
	 * Registers a factory function providing an instace of the concrete Store	
	 * 
	 * @param repoStoreFactory a function returning an instance of a concrete implementation
	 *  										of a repo Store.
	 * @param trackStoreFactory a function returning an instance of a concrete implementation
	 *  										of a repo track Store.
	 */
	static registerStoreFactory( repoStoreFactory: RepoStoreFactory, trackStoreFactory: TrackStoreFactory ) {
		this._repoStoreFactory = repoStoreFactory
		this._trackStoreFactory = trackStoreFactory
	}

	static get instance() {
		return this._instance || ( this._instance = new DataStore( 
			this._repoStoreFactory, this._trackStoreFactory ) 
		)
	}

	getOrganization( name: string ): Promise<Organization> {
		return this._concreteRepoStore.getOrganization( name )
	}

	getCommits( repo: Repository, page: number ): Promise<Commit[]> {
		return this._concreteRepoStore.getCommits( repo, page )
	}

	getContributors( repo: Repository ): Promise<User[]> {
		return this._concreteRepoStore.getContributors( repo )
	}

	trackRepo( repo: Repository ): Promise<Response> {
		return this._concreteTrackStore.trackRepo( repo )
	}

	trackedRepos(): Promise<TrackedRepository[]> {
		return this._concreteTrackStore.trackedRepos()
	}

	private static _instance: DataStore
	private static _repoStoreFactory: RepoStoreFactory
	private static _trackStoreFactory: TrackStoreFactory
	private _concreteRepoStore: RepoStore
	private _concreteTrackStore: TrackStore
}
