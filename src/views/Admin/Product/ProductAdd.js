import React, { Component } from 'react';
import { connect } from 'react-redux'
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
// import { increaseQuantity } from '../actions/ProductAction';

class ProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            productName: '',
            productCode: Number,
            productPrice: Number,
            productUnit: Number,
            category: '',
            image: '',
        }
    }

    handleChange(event) {
        const { id, value } = event.target
        this.setState({[id]: value })
    }

    setLanguage() {
        if (_.has(i18n, 'language')) {
            this.setState({ Lang: i18n.store.data[i18n.language].translation });
        }
    }

    componentWillMount() {
        this.setLanguage();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Create Product" /></CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <Button>Increse</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="productName">Product Name</Label>
                                            <Input type="text"
                                                id="productName"
                                                value={this.state.productName}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productCode">Code</Label>
                                            <Input type="text"
                                                id="productCode"
                                                value={this.state.productCode}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="price">Price</Label>
                                            <Input type="text"
                                                id="productPrice"
                                                value={this.state.productPrice}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productUnit">unit</Label>
                                            <Input type="select" id="productUnit" value={this.state.productUnit} onChange={event => this.handleChange(event)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="category">Category</Label>
                                            <Input type="select" id="category" value={this.state.category} onChange={event => this.handleChange(event)}>
                                                <option>A</option>
                                                <option>B</option>
                                                <option>C</option>
                                                <option>D</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="image">Image</Label>
                                            <Input type="file"
                                                id="image"
                                                value={this.state.image}
                                                onChange={event => this.handleChange(event)}
                                            />
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

const mapStateToProps = (state) => {
    console.log('mapStateToProps');
    return {
        items: state.items
    }
};

export default connect(mapStateToProps)(ProductAdd);