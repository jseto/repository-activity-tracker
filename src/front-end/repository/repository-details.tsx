import React, { Component } from 'react';
import { Commit } from '../commit/commit';
import { InfiniteScroll } from '../components/infinite-scroll';
import { DataStore } from '../data-store/data-store';
import { ContributorCard } from '../user/contributor-card';
import { User } from '../user/user';
import { Repository } from './repository';

interface RepositoryDetailsProps {
	repository: Repository
	onCloseModal: ()=>void
}

interface RepositoryDetailsState {
	commits: Commit[]
	contributors: User[]
}

export class RepositoryDetails extends Component<RepositoryDetailsProps, RepositoryDetailsState> {
	constructor( props: RepositoryDetailsProps ) {
		super( props )
		this.state = {
			commits: [],
			contributors: [],
		}
	}

	async componentDidMount() {
		const { repository } = this.props
		this.setState({
			commits: await DataStore.instance.getCommits( repository, this.currentPage ),
			contributors: await DataStore.instance.getContributors( repository )
		})
	}

	render() {
		const { commits, contributors } = this.state
		const { onCloseModal, repository } = this.props
		const maxContributions = contributors.reduce( ( maxContribs, contrib ) => {
			return maxContribs > contrib.contributions? maxContribs : contrib.contributions
		}, 0)

		return (
			<div className="repository-details modal-container">
				<div className="commit-container modal full-screen darker">
					<RepositoryHeader repository={ repository } />
					<h3>Hall of fame</h3>
					{
						contributors.slice(0, 5).map( contributor =>
							<ContributorCard 
								key={ contributor.name }
								contributor={ contributor } 
								maxContributions={ maxContributions }
							/>
						)
					}
					<button onClick={ ()=> DataStore.instance.trackRepo( repository )}>
						Track this repo
					</button>
					<h3>Commits:</h3>
					<div className="commit-list">
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
					</div>
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

interface RepositoryHeaderProps {
	repository: Repository
}

export function RepositoryHeader({ repository }: RepositoryHeaderProps ) {
	return (
		<div className="repository-header">
			<h3>{ repository?.name }</h3>
			<strong>{ repository.fullName }</strong>
			<p>{ repository?.description }</p>
			<p>Last updated: { repository?.updated.toLocaleString() }</p>
			<p>Watchers: { repository.watchers}</p>
		</div>
	)
}