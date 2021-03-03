import React, { Component } from 'react';
import { Repository } from './repository';
import { RepositoryDetails, RepositoryHeader } from './repository-details';
import './repository.scss'

interface RepositoryPanelProps {
	repository: Repository
}

interface RepositoryPanelState {
	showDetails: boolean
}

export class RepositoryPanel extends Component<RepositoryPanelProps, RepositoryPanelState> {
	constructor( props: RepositoryPanelProps ) {
		super( props )
		this.state = {
			showDetails: false
		}
	}
	
	render() {
		const { repository } = this.props
		const { showDetails } = this.state

		return (
			<div className="repository-panel"
				onClick={ () => !showDetails && this.setState({ showDetails: true }) }
			>
				{ showDetails
					? <RepositoryDetails 
							repository={ repository } 
							onCloseModal={ ()=> this.setState(()=>({ showDetails: false })) }
						/>
					: <RepositoryHeader repository={ repository } />
				}
			</div>
		)
	}
} 
