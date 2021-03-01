export type ClassMethodNames<T> = {
	[ K in keyof T]: T[K] extends Function? K : never
}[keyof T]

export type ClassMethods<T> = Pick<T, ClassMethodNames<T>>

export type ClassPropNames<T> = {
	[ K in keyof T]: T[K] extends Function? never : K
}[keyof T]

export type ClassProps<T> = Pick<T, ClassPropNames<T>>
