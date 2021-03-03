import NodeRestServer from 'node-rest-server'
import filestream from "fs"
import data from './data/data.json'

function persist() {
	filestream.writeFileSync( 'src/back-end/data/data.json', JSON.stringify( data, undefined, 2 ) );
}

NodeRestServer({
	'/tracked-repos': {
		method: 'GET',
		status: 200,
		controller: () => data,
	},
	'/track-repo': {
		method: 'POST',
		status: 200,
		controller: req => {
			console.log( '--------------', req.body )
			if ( req.body.name ) {
				data[ req.body.name ] = {
					name: req.body.name,
					description: req.body.description,
					lastTrackedDate: new Date( Date.now() ).toISOString()
				}
				persist()
			}
		}
	}
})

// console.log('API Rest listening on port ', port )