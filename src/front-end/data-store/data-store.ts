import { Commit } from '../commit/commit'
import { Organization } from '../organization/organization'
import { Repository } from '../repository/repository'

export abstract class GenericDataStore {
	abstract getOrganization( name: string ): Promise<Organization>
	abstract getCommits( repo: Repository, page: number ): Promise<Commit[]>
}

type DataStoreFactory = ()=> GenericDataStore

/**
 * Store is a singleton providing a façade to decouple access to concrete 
 * implementations of a Store (Github, Gitlab, Bitbucket, MockGit). The concrete 
 * store should be registered before using this class
 */
export class DataStore extends GenericDataStore {

	private constructor( storeFactory: DataStoreFactory ) {
		super()
		this._concreteStore = storeFactory()
	}

	/**
	 * Registers a factory function providing an instace of the concrete Store	
	 * 
	 * @param storeFactory a function returning an instance of a concrete implementation
	 *  										of a Store.
	 */
	static registerStoreFactory( storeFactory: DataStoreFactory ) {
		this._storeFactory = storeFactory
	}

	static get instance() {
		return this._instance || ( this._instance = new DataStore( this._storeFactory ) )
	}

	getOrganization( name: string ): Promise<Organization> {
		return this._concreteStore.getOrganization( name )
	}
	getCommits( repo: Repository, page: number ): Promise<Commit[]> {
		return this._concreteStore.getCommits( repo, page )
	}

	private static _instance: DataStore
	private static _storeFactory: DataStoreFactory
	private _concreteStore: GenericDataStore
}
