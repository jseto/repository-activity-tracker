import React, { Children, Component, createRef, ReactElement, RefObject } from 'react'

interface InfiniteScrollProps {
	children: ReactElement | ReactElement[]
	onBottomReached?: ()=>Promise<unknown>
}

export class InfiniteScroll extends Component<InfiniteScrollProps> {
	constructor( props: InfiniteScrollProps ) {
		super( props )
		this._domElement = createRef()
		this._bottomGuard = createRef()
	}

	componentDidMount() {
		this._intersectionObserver = new IntersectionObserver( entries =>{

			const entry = entries[0]
			const { onBottomReached } = this.props

			if ( entry.isIntersecting && onBottomReached) {
				onBottomReached()
			}

		}, {
      rootMargin: '300px',
			threshold: 0
		})
		this._intersectionObserver.observe( this._bottomGuard.current )
	}

	componentWillUnmount() {
		this._intersectionObserver.disconnect()
	}

	render() {
		const { children } = this.props

		return (
			<div className="infinite-scroll" ref={ this._domElement }>

				{ 
					Children.toArray( children ).map( ( child, i ) => 
						<RemoveOnHide key={ i }>{child}</RemoveOnHide> 
					)
				}

				<div ref={ this._bottomGuard }>Bottom</div>
			</div>
		)
	}

	private _intersectionObserver: IntersectionObserver
	private _domElement: RefObject<HTMLDivElement>
	private _bottomGuard: RefObject<HTMLDivElement>
}

interface RemoveOnHideState {
	minHeight: string,
	isVisible: boolean 
}

class RemoveOnHide extends Component<{}, RemoveOnHideState> {

  constructor( props: {}) {
    super( props )
    this._ref = React.createRef()

    this.state = {
			minHeight: '',
      isVisible: true
    }
  }

  componentDidMount() {
    if (!this._ref.current) return

    this._intersectionObserver = new IntersectionObserver( entries => {
      entries.forEach( entry => {
        if ( entry.intersectionRatio > 0) this.setState({ isVisible: true })
        else this.setState({ isVisible: false })
      })}, {
        rootMargin: "200px",
        threshold: 1
    })

    this._intersectionObserver.observe( this._ref.current)

    this.setState({
      minHeight: `${this._ref.current.offsetHeight}px`
    })
  }

	componentWillUnmount() {
		this._intersectionObserver.disconnect()
	}

  render() {
    const { children } = this.props
    return (
      <div
        style={{ minHeight: this.state.minHeight }}
        ref={this._ref}
      >
        {this.state.isVisible && children}
      </div>
    )
  }

	private _ref: RefObject<HTMLDivElement>
	private _intersectionObserver: IntersectionObserver
}
