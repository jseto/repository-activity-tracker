import React, { Component } from 'react';
import { DataStore } from '../data-store/data-store';
import { Organization } from './organization';
import { OrganizationDetails } from './organization-detail';
import './organization.scss'

interface OrganizationPanelState {
	organizationName: string
	organization: Organization
	error: string
}

export class OrganizationPanel extends Component<{}, OrganizationPanelState> {
	constructor( props: {} ) {
		super( props )
		this.state = {
			organization: undefined,
			organizationName: 'facebook',
			error: ''
		}
	}

	render() {
		const { organizationName, organization, error } = this.state

		return (
			<div className="organization-panel">
				<input 
					placeholder="Enter an organization to explore"
					value={ organizationName }
					onChange={ event => this.setState({ organizationName: event.target.value }) }
					onKeyUp={ e => this.keyPressed( e.key )}
				/>
				
				<button onClick={ ()=>this.getRepos() }>Find</button>

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

}