import { Repository } from '../repository/repository';
import { TrackedRepository } from '../repository/tracked-repository';
import { TrackStore } from './data-store';

export class TrackRestStore implements TrackStore {
	static endPoint = 'http://localhost:8000'

	trackRepo( repo: Repository ): Promise<Response> {
		return fetch( `${ TrackRestStore.endPoint }/track-repo`,{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: repo.name,
				description: repo.description
			})
		})
	}

	trackedRepos(): Promise<TrackedRepository[]> {
		return new Promise<TrackedRepository[]>( async ( resolve, reject ) => {
			try {
				const resp = await fetch( `${ TrackRestStore.endPoint }/tracked-repos` )
				const data: any[] = await resp.json()

				resolve(
					data.map( track => {
						const trackedRepository = new TrackedRepository()
						trackedRepository.name = track.name
						trackedRepository.description = track.description
						trackedRepository.lastTrackedDate = new Date( track.lastTrackedDate )

						return trackedRepository
					})
				)
			}
			catch ( error ) { reject( error ) }
		})
	}
}