import React from 'react';
import './ViewUsers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    deleteUser=async()=>{
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
    updateUser = () =>{
        axios.put('http://localhost:5000/users/' + this.state.userId, this.state.updateForm)
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.getUsers();
          })
    }

    openUpdateModal=()=>{
        this.setState({openUpdate: !this.state.openUpdate});
    }
    openDeleteModal=()=>{
        this.setState({openDelete: !this.state.openDelete});
    }

    componentDidMount() {
        // fetch('http://localhost:5000/users').then(resposne => resposne.json())
        this.getUsers();
    }

    render() {
        const {users} = this.state
        const modalStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px'
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
                                    <td className="buttonsTd">
                                        <Button color="primary" onClick={() => {this.openUpdateModal(); this.setState({userId: user._id.$oid}); this.selectedUser(user);}}>
                                            Actualizar
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button color="danger" onClick={() => {this.openDeleteModal(); this.setState({userId: user._id.$oid})}}>
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
                        <Button type="submit" color="primary" onClick={() => {this.updateUser(); this.openUpdateModal();}}>
                            Actualizar
                        </Button>{' '}
                        <Button color="secondary" onClick={this.openUpdateModal}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.openDelete} style={modalStyles}>
                    <ModalHeader>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        ¿Deseas eliminar definitivamente el registro?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={()=>{this.deleteUser(); this.openDeleteModal(); this.getUsers();}}>Eliminar</Button>{' '}
                        <Button color="secondary" onClick={this.openDeleteModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

            </div>
            
        );
    }
}

export default CreateUsers