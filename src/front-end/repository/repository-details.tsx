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
		const { onCloseModal } = this.props

		return (
			<div className="repository-details modal-container">
				<InfiniteScroll onBottomReached={ ()=>this.nextPage() }>
					<div className="commit-container modal full-screen darker">
						{
							commits?.map( commit => (
								<div key={ commit.sha }>{ commit.message }</div>
							))
						}
						<button className="close-modal"
							onClick={ ()=> onCloseModal && onCloseModal() }
						>
						</button>
					</div>
				</InfiniteScroll>
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