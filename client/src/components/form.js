import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Formsy, { withFormsy } from 'formsy-react';
/*todo: add appropriate callbacks to control inputs:
        https://reactjs.org/docs/forms.html
*/

class SelectInput extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue = (event) => {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.currentTarget.value);
    };

    render(){
        const { label, name, options } = this.props;
        return <div className="input-field form-input form-input-select">
            <i></i>
            <select 
                name={name} 
                value={this.props.getValue()} 
                onChange={this.changeValue} 
                className="icons">
                <option value="" disabled={true}>Choose your option</option>
                {React.Children.toArray(options.map((opt) => (
                    <option 
                        value={opt.value} 
                        data-icon={opt.icon} 
                        className="left circle">
                        {opt.label}
                    </option>
                )))}
            </select>
            <label>{label || 'Select Input'}</label>
        </div>
    }
}


class TextInput extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue = (event) => {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        this.props.setValue(event.currentTarget.value);
    };

    render(){
        const {name, icon, label, type, style, inputStyle} = this.props;
        return <div className="input-field form-input" style={style}>
            <i className="material-icons prefix">{icon}</i>
            <input 
                id={`_input_${name}`}
                name={name} 
                value={this.props.getValue() || ''} 
                onChange={this.changeValue}
                type={type || 'text'} 
                className="validate"
                style={inputStyle} />
            <label htmlFor={`_input_${name}`}>{label}</label>
        </div>
    }
}


class DateInput extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        this.setupDatepicker();
    }

    componentDidUpdate() {
        this.setupDatepicker();
    }

    setupDatepicker() {
        // cache this so we can reference it inside the datepicker
        var comp = this;
        // the element
        var el = this.datepicker;
        window.$(ReactDOM.findDOMNode(el)).pickadate({
          // format: 'yyyy-mm-dd',
          // formatSubmit: 'yyyy-mm-dd',
          selectMonths: true,
          selectYears: 5,
          closeOnSelect: true,
          onSet: function(e) {   
            // you can use any of the pickadate options here
            var val = this.get(/*'select', 'yyyy-mm-dd'*/);
            el.value = val;
            comp.changeValue({currentTarget: {value: el.value}});
          }
        });
    }

    changeValue = (event) => {
        // setValue() will set the value of the component, which in
        // turn will validate it and the rest of the form
        // Important: Don't skip this step. This pattern is required
        // for Formsy to work.
        console.log(event.currentTarget.value);
        this.props.setValue(event.currentTarget.value);
    };

    render() {
        const { label, name, style } = this.props;
        return <div className="input-field form-input" style={style}>
            <i className="material-icons prefix">today</i>
            <input
                ref={(el) => {this.datepicker = el;}}
                id={`_input_${name}`}
                style={style} 
                name={name}
                onChange={this.changeValue} 
                value={this.props.getValue() || ''}
                className="datepicker" type="text"
                 />
            <label htmlFor={`_input_${name}`}>{label}</label>
        </div>
    }  
}

export default ({children, containerStyle, ...props}) => (
    /*  Form component that wraps around a `Formsy` for validation.
        children {[ReactElement]}: Nested input elements;
        props {Object}:
            onValidSubmit {(model) => doSomething(model)} 
            onValid {() => ()} 
            onInvalid {() => ()}
    */

    <div className="row" style={containerStyle}>
        <div className="col s12 m-t-20">
            <Formsy ref={props.getRef} {...props}>
                {children}
            </Formsy>
        </div>
    </div>
);

const _TextInput = withFormsy(TextInput);
const _SelectInput = withFormsy(SelectInput);
const _DateInput = withFormsy(DateInput);

export { 
    _TextInput as TextInput, 
    _SelectInput as SelectInput,
    _DateInput as DateInput
};