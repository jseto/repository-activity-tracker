import React, { Component } from 'react';
import { Commit } from '../commit/commit';
import { InfiniteScroll } from '../components/infinite-scroll';
import { DataStore } from '../data-store/data-store';
import { Repository } from './repository';

interface RepositoryDetailsProps {
	repository: Repository
	onCloseModal: ()=>void
}

interface RepositoryDetailsState {
	commits: Commit[]
}

export class RepositoryDetails extends Component<RepositoryDetailsProps, RepositoryDetailsState> {
	constructor( props: RepositoryDetailsProps ) {
		super( props )
		this.state = {
			commits: []
		}
	}

	async componentDidMount() {
		this.setState({
			commits: await DataStore.instance.getCommits( this.props.repository, this.currentPage ) 
		})
	}

	render() {
		const { commits } = this.state
		const { onCloseModal, repository } = this.props

		return (
			<div className="repository-details modal-container">
				<div className="commit-container modal full-screen darker">
					<RepositoryHeader repository={ repository } />
					<InfiniteScroll 
						onBottomReached={ ()=>this.nextPage() } 
						bottomGuardLabel="First Commit" 
					>
							{
								commits?.map( commit => (
									<div key={ commit.sha } className="commit-panel">
										{ commit.message }
									</div>
								))
							}
					</InfiniteScroll>
					<button className="close-modal"
						onClick={ ()=> onCloseModal && onCloseModal() }
					>
					</button>
				</div>
			</div>
		)
	} 

	private async nextPage() {
		const { repository } = this.props
		
		this.currentPage++
		const newPage = await DataStore.instance.getCommits( repository, this.currentPage )

		this.setState( prevState => ({
			commits: [ ...prevState.commits, ...newPage ]
		}))
	}

	private currentPage: number = 1
}


export function RepositoryHeader({ repository }) {
	return (
		<div className="repository-header">
			<h3>{ repository?.name }</h3>
			<strong>{ repository.fullName }</strong>
			<p>{ repository?.description }</p>
			<p>Watchers: { repository.watchers}</p>
		</div>
	)
}