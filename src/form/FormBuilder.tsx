import * as React from 'react'
import {IFieldProps} from './fields/interfaces'
import {FieldComponent} from './fields/FieldComponent'
import {Validator} from './validator'

export const FIELD_METADATA_KEY = Symbol('FIELD_METADATA_KEY')

export class FormBuilder {

  private model: Object

  private fields: Array<FieldComponent> = []

  static add(target: any, propertyKey: string, render: (props: IFieldProps) => React.ReactElement<IFieldProps>) {
    Reflect.defineMetadata(FIELD_METADATA_KEY, render, target, propertyKey)
  }

  constructor(model: Object) {
    this.model = model
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  registerField(field: FieldComponent) {
    this.fields.push(field)
  }

  isValid(): Promise<boolean> {
    const validators: Promise<boolean>[] = this.fields.map(field => field.isValid())

    return Promise.all(validators).then(result => {
      return result.every(value => value)
    })
  }

  get values(): Array<{name, value}> {
    return this.fields.map(field => {
      return {
        name: field.propertyKey,
        value: field.value
      }
    })
  }

  handleSubmit = event => {
    this.isValid()
  }

  get Form() {
    return (props: {children?: any}) => {
      return (
        <form onSubmit={this.handleSubmit}>
          {props.children}
        </form>
      )
    }
  }

  get Fields() {
    const {model} = this
    const target = Object.getPrototypeOf(model)

    const filds = Object.keys(model).map(propertyKey => {
      const render = Reflect.getMetadata(FIELD_METADATA_KEY, target, propertyKey)

      const props: IFieldProps = {
        propertyKey,
        value: model[propertyKey],
        validator: Validator.getValidator(model, propertyKey),
        form: this
      }

      return render(props)
    })

    return () => <div>{filds}</div>
  }
}