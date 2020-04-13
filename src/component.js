import React from 'react';


class SubmitButton extends React.Component {
    render() {
        return <button type="submit">Inscrever</button>
    }
}

class FormInput extends React.Component {

    handleChange = (e) => {
        const {name, value} = e.target;

        this.props.onChange(name, value);
    }

    render() {
        return(
            <div>

                <div>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                    <input type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} id={this.props.name} value={this.props.value} onChange={this.handleChange} />
                </div>

            </div>
        );
    }
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                nomeCompleto: '',
                cidade: '',
                email: '',
                cpf: '',
                telefone: ''
            },
            errors:{},
            alert: {
                show: false,
                msg: ''
            }
        }
    }

    handleChange = (name, value) => this.setState((state) => {
        return {
            data: {
                ...state.data,
                [name]: value
            }
        }
    });

    validaEmail = email => email.includes('@') && email.includes('.');

    formValidation = () => {
        let validate= true;
        let objState = {};

        if(this.state.data.nomeCompleto === '') {
            objState["nomeCompleto"] = "Por favor, digite o seu nome completo.";
            validate = false;
        } else {
            delete objState["nomeCompleto"];
        }

        if(this.state.data.cidade === '') {
            objState["cidade"] = "Por favor, digite a sua cidade atual.";
            validate = false;
        } else {
            delete objState["cidade"];
        }

        if( this.state.data.email === '' || 
        (!this.state.data.email.includes('@') && !this.state.data.email.includes('.')) ) {
            objState["email"] = "Por favor, digite o seu e-mail.";
            validate = false;
        } else {
            delete objState["email"];
        }

        if(this.state.data.cpf === '') {
            objState["cpf"] = "Por favor, digite o seu cpf.";
            validate = false;
        } else {
            delete objState["cpf"];
        }

        if(this.state.data.telefone === '') {
            objState["telefone"] = "Por favor, digite o seu telefone.";
            validate = false;
        } else {
            delete objState["cpf"];
        }

        this.setState({errors: objState});
        return validate;
    }

    handleSubmitForm = (e) => {
        e.preventDefault();

        if(this.formValidation()) {
            this.setState((state) => {
                return {
                    ...state,
                    alert: {
                        show: true,
                        msg: 'Formulário preenchido com sucesso!'
                    }
                }
            });
        }
    }

    render() {
        return(
            <>
                <h1>Cadastro de alunas</h1>

                {this.state.alert.show && <div className="alert alert--sucess">{this.state.alert.msg}</div>}

                <form onSubmit={this.handleSubmitForm}>
                    <FormInput type='text' name="nomeCompleto" label="Nome completo" value={this.state.data.nomeCompleto} onChange={this.handleChange} />
                    {this.state.errors.nomeCompleto && <span className="error-input">{this.state.errors.nomeCompleto}</span>}
                    
                    <FormInput type='text' name="cidade" label="Cidade" value={this.state.data.cidade} onChange={this.handleChange} />
                    {this.state.errors.cidade && <span className="error-input">{this.state.errors.cidade}</span>}
                    
                    <FormInput type='text' name="email" label="E-mail" value={this.state.data.email} placeholder="email@email.com" onChange={this.handleChange} />
                    {this.state.errors.email && <span className="error-input">{this.state.errors.email}</span>}

                    <FormInput type='text' name="cpf" label="CPF" value={this.state.data.cpf} placeholder="000.000.000-00" onChange={this.handleChange} />
                    {this.state.errors.cpf && <span className="error-input">{this.state.errors.cpf}</span>}

                    <FormInput type='text' name="telefone" label="Telefone" value={this.state.data.telefone} placeholder="(XX) XXXXX-XXXX" onChange={this.handleChange} />
                    {this.state.errors.telefone && <span className="error-input">{this.state.errors.telefone}</span>}

                    <SubmitButton />
                </form>

            </>
        );
    }
}

export class FormPage extends React.Component {
    render() {
        return(
            <RegisterForm />
        );
    }
}