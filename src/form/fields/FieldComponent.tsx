import * as React from 'react'
import classNames from 'classnames'
import {IFieldProps, IFieldState, IOptions} from './interfaces'

export abstract class FieldComponent extends React.Component<IFieldProps, IFieldState> {

  protected htmlId: string

  static lastHtmlId = 0

  static getNextHtmlId(): string {
    FieldComponent.lastHtmlId++
    return `field-${FieldComponent.lastHtmlId}`
  }

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value || '',
      errors: []
    }

    this.htmlId = FieldComponent.getNextHtmlId()

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.props.form.registerField(this)
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
      errors: []
    })
  }

  handleBlur = event => {
    this.isValid()
  }

  isValid(): Promise<boolean> {
    const {props, state} = this

    return props.validator(state.value).then(violations => {
      const errors = violations.map(violation => violation.info.message)

      return new Promise<boolean>(resolve => {
        this.setState({
          value: state.value,
          errors
        }, () => {
          resolve(!this.hasError)
        })
      })
    })
  }

  get propertyKey(): string {
    return this.props.propertyKey
  }

  get value(): any {
    return this.state.value
  }

  get hasError(): boolean {
    return !!this.state.errors.length
  }

  renderLabel() {
    const {props, state, htmlId} = this
    const {options} = props

    return (
      <label
        className="control-label"
        htmlFor={htmlId}>
        {options.label || props.propertyKey}
      </label>
    )
  }

  abstract renderField(): React.ReactElement<IFieldProps>

  renderErrors() {
    const {props, state} = this
    const {options} = props

    if (this.hasError) {
      return (
        <ul>
          {state.errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      )
    }

    return null
  }

  render() {
    const {props, state} = this
    const {options} = props

    return (
      <div className={classNames('form-group', {'has-error': this.hasError})}>
        {this.renderLabel()}
        {this.renderField()}
        <div className="help-block with-errors">
          {this.renderErrors()}
        </div>
      </div>
    )
  }
}
