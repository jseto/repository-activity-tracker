import React, { Component } from 'react';
import { DataStore } from '../data-store/data-store';
import { Organization } from './organization';
import { OrganizationDetails } from './organization-detail';

interface OrganizationPanelState {
	organizationName: string
	organization: Organization
}

export class OrganizationPanel extends Component<{}, OrganizationPanelState> {
	constructor( props ) {
		super( props )
		this.state = {
			organization: undefined,
			organizationName: ''
		}
	}

	render() {
		const { organizationName, organization } = this.state

		return (
			<div className="organization-panel">
				<input 
					placeholder="Enter an organization to explore"
					value={ organizationName }
					onChange={ event => this.setState({ organizationName: event.target.value }) }
					onKeyUp={ e => this.keyPressed( e.key )}
				/>
				
				<button onClick={ ()=>this.getRepos() }>Find</button>

				<OrganizationDetails organization={ organization }/>
				
			</div>
		)
	}

	keyPressed( key: string ) {
		if ( key === 'Enter' ) this.getRepos()
	}

	private async getRepos() {
		const organization = await DataStore.instance.getOrganization( this.state.organizationName )

		this.setState({ organization })
	}

}