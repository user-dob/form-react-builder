import {Violation} from '../validator'
import {FormBuilder} from '../FormBuilder'

export interface IOptions {
  label?: string
  placeholder?: string
}

export interface IFieldProps {
  propertyKey: string
  value: any
  validator: (value: any) => Array<Violation>
  form: FormBuilder
  options?: IOptions
}

export interface IFieldState {
  value: any
  errors: Array<string>
}
