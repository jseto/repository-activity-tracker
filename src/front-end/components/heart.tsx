import React, { useState } from 'react'
const HeartIcon = require( "@fortawesome/fontawesome-free/svgs/solid/heart.svg" );

interface HeartProps {
	selected: boolean
	onClick: ( selected: boolean ) => void
}

export function Heart( props: HeartProps ) {
	const [ selected, setSelected ] = useState( props.selected )

	const clicked = () => {
		if ( props.onClick ) props.onClick( !selected )
		setSelected( !selected )
	}

	return(
		<>
			<HeartIcon className="heart-icon" width="1em" 
				color={ selected? 'red' : 'gray'} 
				fill={ selected? 'red' : 'gray'} 
				onClick={ ()=> clicked() }
			/>
		</>
	)

}