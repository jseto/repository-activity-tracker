import React, { useState } from 'react';
import { RepositoryPanel } from '../repository/repository-panel';
import { Organization } from './organization';

interface OrganizationDetailProps {
	organization: Organization
}

export function OrganizationDetails( props: OrganizationDetailProps ) {
	const { organization } = props
	const [ repoFilter, setRepoFilter ] = useState('')

	return (
		<div className="organization-details">
			
			<img src={ organization?.avatar }/>
			<h2>{ organization?.name }</h2>
			<p>{ organization?.description }</p>

			{ organization?.repositories &&
				<input 
					placeholder="Filter repositories by name"
					onChange={ event => setRepoFilter( event.target.value ) }
					value={ repoFilter }
				/>
			}

			<div className="repository-list">
				{
					organization?.repositories
						.filter( repo => repo.name.includes( repoFilter ) )
						.map( repo => (
							<RepositoryPanel key={ repo.fullName } repository={ repo } />
						))
				}
			</div>
	
		</div>
	)
} 