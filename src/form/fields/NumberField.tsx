import * as React from 'react'
import {FormBuilder} from '../FormBuilder'
import {FieldComponent} from './FieldComponent'
import {IFieldProps, IFieldState, IOptions} from './interfaces'


class NumberFieldComponent extends FieldComponent {

  renderField() {
    const {props, state, htmlId} = this
    const {options} = props

    return (
      <input
        type="number"
        className="form-control"
        value={state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        id={htmlId}/>
    )
  }
}

export const NumberField = (options: IOptions = {}) => {
  return (target: Object, propertyKey: string) => {
    FormBuilder.add(target, propertyKey, (props: IFieldProps): React.ReactElement<IFieldProps> => {
      return <NumberFieldComponent key={props.propertyKey} {...props} options={options}/>
    })
  }
}
