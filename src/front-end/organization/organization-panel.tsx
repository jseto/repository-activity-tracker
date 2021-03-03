import React, { Component } from 'react';
import { Cookie } from '../../libs/cookies/cookies';
import { DataStore } from '../data-store/data-store';
import { Organization } from './organization';
import { OrganizationDetails } from './organization-detail';
import './organization.scss'

interface OrganizationPanelState {
	organizationName: string
	organization: Organization
	apiKey: string
	error: string
}

export class OrganizationPanel extends Component<{}, OrganizationPanelState> {
	constructor( props: {} ) {
		super( props )
		this.state = {
			organization: undefined,
			organizationName: 'facebook',
			apiKey: Cookie.get('repository-activity-tracker-api')? 'Stored' : '',
			error: ''
		}
	}

	render() {
		const { organizationName, organization, apiKey, error } = this.state

		return (
			<div className="organization-panel">

				<input 
					placeholder="Enter an organization to explore"
					value={ organizationName }
					onChange={ event => this.setState({ organizationName: event.target.value }) }
					onKeyUp={ e => this.keyPressed( e.key )}
				/>
				<button onClick={ ()=>this.getRepos() }>Find</button>

				<input
					placeholder="Enter your API key (optional)"
					value={ apiKey }
					onChange={ event => this.setState({ apiKey: event.target.value }) }
				/>
				<button onClick={ ()=>this.setApi() }>Set API key and Store</button>

				{ error === ''

					?	<OrganizationDetails organization={ organization }/>
					: <p className="error">{ error }</p>
				
				}
				
			</div>
		)
	}

	keyPressed( key: string ) {
		if ( key === 'Enter' ) this.getRepos()
	}

	private async getRepos() {
		try {
			const organization = await DataStore.instance.getOrganization( this.state.organizationName )

			this.setState({ 
				organization,
				error: ''
			})
		}
		catch( error ) {
			this.setState({ error: error.message })
		}
	}

	setApi() {
		Cookie.set('repository-activity-tracker-api', this.state.apiKey )
		this.setState({ apiKey: 'Stored' })
	}

}