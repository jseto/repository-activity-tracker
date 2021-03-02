import React from 'react';
import { RepositoryPanel } from '../repository/repository-panel';
import { Organization } from './organization';

interface OrganizationDetailProps {
	organization: Organization
}

export function OrganizationDetails( props: OrganizationDetailProps ) {
	const { organization } = props
	return (
		<div>
			<img src={ organization?.avatar }/>
			<h2>{ organization?.name }</h2>
			<p>{ organization?.description }</p>
			{
				organization?.repositories.map( repo => (
					<RepositoryPanel key={ repo.fullName } repository={ repo } />
				))
			}
		</div>
	)
} 