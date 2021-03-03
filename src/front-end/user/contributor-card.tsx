import React from 'react'
import { Gauge } from '../components/gauge';
import { User } from './user';
import './contributor-card.scss'
const HeartIcon = require( "@fortawesome/fontawesome-free/svgs/solid/heart.svg" );

interface ContributorCardProps {
	contributor: User
	maxContributions: number 
}

export function ContributorCard({ contributor, maxContributions }: ContributorCardProps ) {
	
	return (
		<div className="contributor-card">
			<img src={ contributor?.avatar }/>
			<small>{ contributor?.name }</small>
			<Gauge value={ contributor?.contributions } maxValue={ maxContributions }>
				<HeartIcon width="1em" fill="red"/>
			</Gauge>
		</div>
	)
}