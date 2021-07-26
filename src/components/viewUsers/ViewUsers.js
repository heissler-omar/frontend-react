import React from 'react';
import './ViewUsers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input} from 'reactstrap';
import axios from 'axios';

class CreateUsers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            userId: '',
            openUpdate: false,
            openDelete: false,
            updateForm: {
                username: '',
                email: '',
                password: ''
            }
            
        }
    }

    getUsers = async() =>{ 
        await axios.get('http://localhost:5000/users')
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
        })
        .catch(error => {console.log(error)})
    }

    openModal=()=>{
        this.setState({openUpdate: !this.state.openUpdate});
    }
    openModalDelete=()=>{
        this.setState({openDelete: !this.state.openDelete});
    }


    deleteUserModal=async()=>{
        await axios.delete('http://localhost:5000/users/' + this.state.userId)
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
    }

    selectedUser = (user) => {
        this.setState({
            updateForm: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        })
    }

    changeHandler = async e => {
        e.persist()
        await this.setState({
            updateForm: {
                ...this.state.updateForm,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.updateForm)
    }
    updateUsersModal = () =>{
        axios.put('http://localhost:5000/users/' + this.state.userId, this.state.updateForm)
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.getUsers();
          })
    }

    componentDidMount() {
        // fetch('http://localhost:5000/users').then(resposne => resposne.json())
        this.getUsers();
    }

    render() {
        const {users} = this.state
        const modalStyles = {
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
        const updateForm = this.state.updateForm

        return (
            <div className="contenedor">
                <h2>Ver Usuarios</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length ?
                            users.map(user =>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    {/* <td>{user._id.$oid}</td> */}
                                    <td className="buttonsTd">
                                        <Button color="primary" onClick={() => {this.openModal(); this.setState({userId: user._id.$oid}); this.selectedUser(user);}}>
                                            Actualizar
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button color="danger" onClick={() => {this.openModalDelete(); this.setState({userId: user._id.$oid})}}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ): null
                        }
                    </tbody>
                </table>

                <Modal isOpen={this.state.openUpdate} style={modalStyles}>
                    <ModalHeader>
                        Actualizar
                    </ModalHeader>
                    <ModalBody>
                        <Row className="updateRow">
                            <Col xs="4">Nombre:</Col>
                            <Col><Input name="username" value={updateForm.username} onChange={this.changeHandler}></Input></Col>
                        </Row>
                        <Row className="updateRow">
                            <Col xs="4">Correo:</Col>
                            <Col><Input name="email" value={updateForm.email} onChange={this.changeHandler}></Input></Col>
                        </Row>
                        <Row className="updateRow">
                            <Col xs="4">Contraseña:</Col>
                            <Col><Input name="password" value={updateForm.password} onChange={this.changeHandler}></Input></Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={() => {this.updateUsersModal(); this.openModal();}}>
                            Actualizar
                        </Button>{' '}
                        <Button color="secondary" onClick={this.openModal}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.openDelete} style={modalStyles}>
                    <ModalHeader>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de querer eliminar el registro?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={()=>{this.deleteUserModal(); this.openModalDelete(); this.getUsers();}}>Eliminar</Button>{' '}
                        <Button color="secondary" onClick={this.openModalDelete}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>
            
        );
    }
}

export default CreateUsers