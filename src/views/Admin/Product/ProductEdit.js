import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Label, FormGroup, Form,Input, Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { productFetch, productUpdate  } from './../../../actions';
import Swal from 'sweetalert2'

 class ProductEdit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            id: this.props.match.params.id,
            pkColumn: 'id',
            data: {},
            back: false,
            processType: '',

        }
    }

    setData(data) {
        console.log('setData', data);
        let prod = this.state.data;
        prod.id = data.id;
        prod.code = data.code;
        prod.name = data.name;
        prod.category = data.category;
        prod.price = data.price;
        prod.unit = data.unit;
        prod.createAt = data.createAt;
        prod.active = data.active;
        this.setState({data: prod});
    }


    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        const pkColumn = this.state.pkColumn;
        const id = this.state.id;
        if(_.findIndex(this.props.products.data, function(o) { return o[pkColumn] == id; })>=0){
            this.setData(this.props.products.data[_.findIndex(this.props.products.data, function(o) { return o[pkColumn] == id;})]);
         
        } else {
           
           this.props.productFetch();
           
        }
          this.setLanguage();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'id')&&nextProps.products.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.products.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.products.data[_.findIndex(nextProps.products.data, function(o) { return o[pkColumn] == id;})]);
            
            }
        }
        if(this.state.processType==='update'){
            this.resultUpdateProduct(nextProps.products.message);          
        }

    }

    resultUpdateProduct(message){
        this.setState({processType: ''});
        if(_.has(message,'error')||_.has(message,'errors')){
          if(_.has(message,'error')){
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Update Product'],
              text: message.error,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          } else {
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Update Product'],
              text: message.errors[0].msg,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }
        } else {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: this.state.Lang['Update Product'],
                text: this.state.Lang['Update Product success.'],
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 3000,
                onClose: () => {
                  
                    this.setState({back: true});
                  
                }
            });
        }
        
      }

    handleChange = e => {
        const {name ,value} = e.target;
        let data = this.state.data;
        data[name] = value;
        this.setState({data: data});
      }

    SaveAS = () => {
        let input = {
            id: this.state.data.id,
            code: this.state.data.code,
            name: this.state.data.name,
            unit: this.state.data.unit,
            price: this.state.data.price,
            category: this.state.data.category,
            active: this.state.data.active
        }
        console.log('save',input)
        this.setState({processType: 'update'});
        this.props.productUpdate(input);
    }

    render() {
        if (this.state.back) {
            return <Redirect push to={'/admin/'+this.props.match.path.split('/')[2]}/>;
          }
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Edit Product" /></CardHeader>
                            <CardBody>

                            <Row>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productCode"><Lang name="Product Code" /></Label>
                                            <Input type="text"
                                                name="code"
                                                placeholder={this.state.Lang['Please enter your product code']}
                                                value={this.state.data.code}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productName"><Lang name="Product Name" /></Label>
                                            <Input type="text"
                                                name="name"
                                                placeholder={this.state.Lang['Please enter your product name']}
                                                value={this.state.data.name}
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
                                                name="price"
                                                placeholder={this.state.Lang['Please enter your product price']}
                                                value={this.state.data.price}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="4">
                                        <FormGroup>
                                            <Label htmlFor="productUnit"><Lang name="Unit" /></Label>
                                            <Input type="select" name="unit" value={this.state.data.unit} onChange={event => this.handleChange(event)}>
                                                <option value="ชิ้น">ชิ้น</option>
                                                <option value="อัน">อัน</option>
                                                <option value="ถุง">ถุง</option>
                                                <option value="เครื่อง">เครื่อง</option>
                                                <option value="ชิ้น">ชิ้น</option>
                                                <option value="ชิ้น">ชิ้น</option>
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
                                            <Input type="select" name="category" value={this.state.data.category} onChange={event => this.handleChange(event)}>
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
                                                            checked={this.state.data.active === '1'}
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
                                                            checked={this.state.data.active === '0'}
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
                                <Button type="button" onClick={()=>this.SaveAS()}  color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps,{productFetch, productUpdate})(ProductEdit);
