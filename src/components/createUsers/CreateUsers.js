import React from 'react';
import './CreateUsers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Row, Col } from 'reactstrap';
import axios from 'axios';

class CreateUsers extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:5000/users', this.state)
        .then(response => {
            console.log(response)
            this.setState({
                username: '',
                email: '',
                password: ''
            });
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        const {username, email, password} = this.state
        return(
            <div className="contenedor">
                <form onSubmit = {this.submitHandler}>
                    <h2>Crear Usuarios</h2>
                    <Row>
                        <Col xs="3" className="formNames">
                            Nombre:
                        </Col>
                        <Col xs="8" className="inputCol">
                            <Input type="text" name="username" value={username} onChange={this.changeHandler}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="formNames">
                            Correo:
                        </Col>
                        <Col xs="8" className="inputCol">
                            <Input type="text" name="email" value={email} onChange={this.changeHandler}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3" className="formNames">
                            Contraseña:
                        </Col>
                        <Col xs="8" className="inputCol">
                            <Input type="text" name="password" value={password} onChange={this.changeHandler}></Input>
                        </Col>
                    </Row>
                    <div className="buttonDiv">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateUsers