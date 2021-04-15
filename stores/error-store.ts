import { makeAutoObservable, toJS } from 'mobx'
import { AxiosResponse } from 'axios'

export type TError = {
	status?: string
	message?: string
	response?: AxiosResponse
}

class ErrorStore {
	private _error: TError = null

	constructor() {
		makeAutoObservable(this)
	}

	async setError(error: TError): Promise<void> {
		this._error = error
	}

	get error(): TError {
		return toJS(this._error)
	}
}

export default ErrorStore
