import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';
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
 import { productAddItem } from './../../../actions';
 import Swal from 'sweetalert2';

class ProductAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            productName: '',
            productCode: '',
            productPrice: '',
            productUnit: 'ชิ้น',
            category: 'วัตถุดิบ-โรงงาน',
            active: '',
            processType: '',
            back: false
        }
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({[name]: value })
    }

    setLanguage() {
        if (_.has(i18n, 'language')) {
            this.setState({ Lang: i18n.store.data[i18n.language].translation });
        }
    }

    componentWillMount() {
        this.setLanguage();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.processType == 'save') {
            this.resultSaveProduct(nextProps.products);
        }
    }

    resultSaveProduct(data) {
        this.setState({processType: ''});
        console.log('error',data)
        Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Add Product'],
            text: this.state.Lang['Add product success.'],
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000,
            onClose: () => {
              this.backPage();
            }
        }); 
    }

    SaveAS = () => {
        let input = {
            code: this.state.productCode,
            name: this.state.productName,
            unit: this.state.productUnit,
            price: this.state.productPrice,
            category: this.state.category,
            active: this.state.active
        }
        console.log('save',input)
        this.setState({processType: 'save'});
        this.props.productAddItem(input);
    }

    backPage() {
        this.setState({back: true});
    }

    checkSave() {
        if(this.state.productCode!==''&&this.state.productName!==''&&this.state.productPrice!==''){
            return true;
        } else {
            return false;
        }
    }

    render() {
        if(this.state.back) {
            return <Redirect push to={'/admin/'+this.props.match.path.split('/')[2]} />;
        }
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Create Product" /></CardHeader>
                            <CardBody>
                                
                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productCode"><Lang name="Product Code" /></Label>
                                            <Input type="text"
                                                name="productCode"
                                                placeholder={this.state.Lang['Please enter your product code']}
                                                value={this.state.productCode}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productName"><Lang name="Product Name" /></Label>
                                            <Input type="text"
                                                name="productName"
                                                placeholder={this.state.Lang['Please enter your product name']}
                                                value={this.state.productName}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="price"><Lang name="Price" /></Label>
                                            <Input type="number"
                                                name="productPrice"
                                                placeholder={this.state.Lang['Please enter your product price']}
                                                value={this.state.productPrice}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productUnit"><Lang name="Unit" /></Label>
                                            <Input type="select" name="productUnit" value={this.state.productUnit} onChange={event => this.handleChange(event)}>
                                                <option value="ชิ้น">ชิ้น</option>
                                                <option value="อัน">อัน</option>
                                                <option value="ถุง">ถุง</option>
                                                <option value="เครื่อง">เครื่อง</option>
                                    
                                                <option value="กระปุก">กระปุก</option>
                                                <option value="กล่อง" >กล่อง</option>
                                                <option value="ขวด">ขวด</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="category"><Lang name="Category" /></Label>
                                            <Input type="select" name="category" value={this.state.category} onChange={event => this.handleChange(event)}>
                                                <option value="วัตถุดิบ-โรงงาน">วัตถุดิบ-โรงงาน</option>
                                                <option value="อุปกรณ์เครื่องมือ">อุปกรณ์เครื่องมือ</option>
                                                <option value="อะไหล่เครื่องจักร">อะไหล่เครื่องจักร</option>
                                                <option value="เครื่อง">เครื่อง</option>
                                                <option value="อะไหล่-ไฟฟ้า">อะไหล่-ไฟฟ้า</option>
                                                <option value="อะไหล่-ปะปา">อะไหล่-ปะปา</option>
                                                <option value="สินค้าสำเร็จรูป	">สินค้าสำเร็จรูป	</option>
                                                <option value="เคมี" >เคมี</option>
                                                <option value="เครื่องมือแพทย์">เครื่องมือแพทย์</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                            
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="image"><Lang name="Active" /></Label>
                                            <Row>
                                            <Col xs='4'>
                                                <div style={{height: 40}}>
                                                    <FormGroup>
                                                        <label className="container-radio">
                                                        <input type="radio" 
                                                        
                                                            name="active" 
                                                            checked={this.state.active === '1'}
                                                            value="1" 
                                                            onChange={e=>this.handleChange(e)}
                                                            />
                                                        <span className="checkmark-radio"></span>
                                                        </label>
                                                        <span style={{paddingLeft: 35}}><Lang name="Yes"/></span>
                                                    </FormGroup>
                                                    </div>
                                            </Col>
                                            <Col xs="4">
                                                    <div style={{height: 40}}>
                                                    <FormGroup>
                                                        <label className="container-radio">
                                                        <input type="radio" 
                                                            
                                                            name="active" 
                                                            checked={this.state.active === '0'}
                                                            value="0" 
                                                            onChange={e=>this.handleChange(e)}
                                                            />
                                                        <span className="checkmark-radio"></span>
                                                        </label>
                                                        <span style={{paddingLeft: 30}}><Lang name="No"/></span>
                                                    </FormGroup>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                {this.checkSave()?
                                    <Button type="button" onClick={()=>this.SaveAS()}  color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                :
                                <Button type="button" disabled="disabled" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                }
                                
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
        products: state.products
    }
};

export default connect(mapStateToProps, {productAddItem})(ProductAdd);