import React, { ReactElement } from 'react';
import './gauge.scss'

interface GaugeProps {
	maxValue: number
	value: number
	children: ReactElement | ReactElement[]
}

export function Gauge({ maxValue, value, children }: GaugeProps ) {
	const numIcons = value / maxValue * 5
	const icons = []

	for ( let i = 0; i< numIcons; i++ ) icons.push( children )

	return (
		<div className="gauge">
			{
				icons
			}
		</div>
	)
}