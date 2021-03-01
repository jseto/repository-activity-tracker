import { ClassProps } from '../types/utility-types';

export class Persistent {
	fromObject( obj: Partial<ClassProps<this>> ) {

		this._persistentProperties.forEach( prop =>{
			const value = obj[ prop.name.slice(1) ]
			if ( value ) this[ prop.name ] = prop.fromObjectSpecial? prop.fromObjectSpecial( value ) : value
		})

		return this
	}

	toObject(): Partial<ClassProps<this>> {
		const obj: Partial<ClassProps<this>> = {}

		this._persistentProperties.forEach( prop => {
			const value = prop.toObjectSpecial? prop.toObjectSpecial( this[ prop.name ] ) : this[ prop.name ]
			obj[ prop.name.slice(1) ] = value
		})

		return obj
	}

	private _persistentProperties: PersistentProperty[]
}

export interface PersistentProperty {
	name: string
	toObjectSpecial? : ( classObj: any ) => any
	fromObjectSpecial?: ( obj: any ) => any
}

export function persistent(target: Persistent, property: string ) {
	if ( !target[ '_persistentProperties' ] )	target[ '_persistentProperties' ]  = [];
	target[ '_persistentProperties' ].push({ name: property })
}

