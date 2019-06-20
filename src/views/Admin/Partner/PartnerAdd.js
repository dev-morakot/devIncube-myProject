import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Col,
    FormGroup,
    Input,
    Label,
    Row, } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { multicastChannel } from 'redux-saga';

 class PartnerAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            name: '',
            address: '',
            telephone: Number,
            mobile: Number,
            fax: Number,
            code: Number,
            tax: Number,
            active: Boolean
        }
    }
     
     handleChange(event) {
        const { id, value } = event.target
        console.log('handleChange: ', this.state.name);
        this.setState({[id]: value })
    }

    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        this.setLanguage();
    }

    render() {
        return (
            <div>
                <Row>
                <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Create Partner" /></CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Partner Name</Label>
                                            <Input type="text" id="name"
                                                value={this.state.name}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Address</Label>
                                            <Input type="text" id="address"
                                                value={this.state.address}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Telephone</Label>
                                            <Input type="text" id="telephone"
                                                value={this.state.telephone}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Mobile Phone</Label>
                                            <Input type="text" id="mobile"
                                                value={this.state.mobile}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Fax</Label>
                                            <Input type="text" id="fax"
                                                value={this.state.fax}
                                                onChange={event => this.handleChange(event)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Code</Label>
                                            <Input type="text" id="code"
                                                value={this.state.code}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Tax</Label>
                                            <Input type="text" id="tax"
                                                value={this.state.tax}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="name">Active</Label>
                                            <Input type="select" id="active"
                                                value={this.state.active}
                                                onChange={event => this.handleChange(event)}>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PartnerAdd;