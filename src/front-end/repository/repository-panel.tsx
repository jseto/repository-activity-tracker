import React, { Component } from 'react';
import { Repository } from './repository';
import { RepositoryDetails } from './repository-details';
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
				<h3>{ repository?.name }</h3>
				<strong>{ repository.fullName }</strong>
				<p>{ repository?.description }</p>
				<p>Watchers: { repository.watchers}</p>
				{ showDetails &&
					<RepositoryDetails 
						repository={ repository } 
						onCloseModal={ ()=> this.setState(()=>({ showDetails: false })) }
					/>
				}
			</div>
		)
	}
} 