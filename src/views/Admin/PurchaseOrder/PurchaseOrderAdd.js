import React, { Component } from 'react'
import { Badge, Card, 
    CardBody, 
    CardHeader, 
    Col, 
    FormText, 
    Label,
    Form,Modal, ModalBody, ModalFooter, ModalHeader,
    FormGroup, 
    Row, 
    Table,
    Input,InputGroup,
    InputGroupAddon,Button } from 'reactstrap';

import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
class PurchaseOrderAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            Lang: {},
            modal: false,
            large: false,
            primary: false,
            mfg: '',
            productName: '',
            qty: 0,
            description: '',
            packSize: '',
            unit: '',
            price: 0,
            discount: 0,
            line_amount_total: 0
        }
      }

      togglePrimary() {
        this.setState({
          primary: !this.state.primary,
        });
      }
    
    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        this.setLanguage();
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})

        this.setState({
            line_amount_total: (this.state.price * this.state.qty) - this.state.discount
        })
    }

    sumTotal = () => {
        return this.state.line_amount_total
       
    }

    checkOrderLine = () => {
        if(this.state.price!==''&&this.state.unit!==''&&this.state.productName!==''&&this.state.qty!=='') {
            return true;
        } else {
            return false;
        }
    }

    handleRemove = (i) => {
        const arr = [...this.state.arr]
        arr.splice(i, 1)
        this.setState({arr})
    }


    saveAs = () => {
        console.log(this.state);
        
        const item = { 
            mfg: this.state.mfg,
            productName: this.state.productName,
            packSize: this.state.packSize,
            description: this.state.description,
            price: this.state.price,
            unit: this.state.unit,
            discount: this.state.discount,
            qty: this.state.qty,
            line_amount_total: (this.state.price * this.state.qty) - this.state.discount
        };
        this.setState({arr: [...this.state.arr, item]});
        
        this.setState({
            mfg: '',
            productName: '',
            packSize: '',
            description: '',
            price: 0,
            unit: '',
            discount: 0,
            qty: 0,
            line_amount_total: 0
        })
        this.setState({
            primary: !this.state.primary,
        });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardBody>
                                <h1><Lang name="Create The Purchase Order" /></h1>
                                <hr className="my-02" />
                                <Form classNmae="form-horizontal" style={{backgroundColor: '#e6e6e6', marginTop: 15, padding: 20}}>

                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Supplier" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Order Date" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="date" name="pacName" required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Contact Person" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Transport Type" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Payment Condition" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Destination Port" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Payment Terms" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Incoterm Version" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Currency Unit" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Incoterms" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Shipment Info" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="textarea" rows='4' name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Sales Contract No" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Invoice No" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Notes" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="textarea" rows='4' name="pacName"  placeholder={this.state.Lang['Please enter your package name']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    
                                </Form>
                                <hr className="my-2" />
                                <Row>
                                    <Col xs='4'>
                                    <FormGroup>
                                        
                                        <Button color="primary" onClick={this.togglePrimary.bind(this)} ><Lang name="Add Item" /></Button>
                                    </FormGroup>
                                    </Col>
                                    
                                </Row>

                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th><Lang name="Code/Product" /></th>
                                            <th><Lang name="MFG BY" /></th>
                                            <th><Lang name="Description" /></th>
                                            <th><Lang name="Pack size" /></th>
                                            <th><Lang name="Qty" /></th>
                                            <th><Lang name="Unit" /></th>
                                            <th><Lang name="Price/Unit" /></th>
                                            <th><Lang name="Discount" /></th>
                                            <th><Lang name="Total" /></th>
                                            <th>-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(this.state.arr)&&this.state.arr.map((item,i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.productName}</td>
                                                    <td>{item.mfg}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.packSize}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.unit}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.line_amount_total}</td>
                                                    <td align="center">
                                                        <Button onClick={()=>this.handleRemove(i)} color='warning' size="sm">
                                                            <i className="fa fa-remove"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col xl='4'></Col>
                                    <Col xl='4'></Col>
                                    <Col xl='4'>
                                        <div style={{border: '3px solid #d3d3d3'}}></div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl='4'></Col>
                                    <Col xl='4'></Col>
                                    <Col xl='4'>
                                        <Form inline style={{marginTop: 10}}>
                                            <FormGroup className="pr-3">
                                                <Label  className="pr-3"><Lang name="Amount Total" /> </Label>
                                                <Input type="text" style={{width: 300,backgroundColor: 'green'}} />
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>

                                <Form className="form-horizontal">
                                    <Col xl='12'>
                                        <FormGroup>
                                            <Label><h4><Lang name="Infomation" /></h4></Label>
                                        </FormGroup>
                                    </Col>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Required Document" />:</Label><FormText className="help-block"><Lang name="Choose multiple" /></FormText></Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Commercial Invoice" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert. of Health" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Advice" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packing List" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert of Origin" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Telex release B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="COA" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form E" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Original B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Insurance" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form AI" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="AWB" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Required Document Notes:" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Step 1: One set of the draft of shipping document is sent to BIC Chemical via email before loading the goods." /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                           
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="• Step 2: One set of the copy of the original shipping document is sent to BIC Chemical via email within 3 working days after shipment dispatched." /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                           
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="• Step 3: One set of original document send direct to BIC Chemical (Or our Bank) within 7 working days after shipment dispatched." /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Packing" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed in export standard packing with Thai Label." /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed in export standard packing and on every packing must be indicated:" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Origin product: Manufacture name & address, Product Name, Chemical for animal use, Batch/Lot No., Manufacturing date,Expiry date,Gross weight,Net weight" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Sample" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Please include 20g sample to be ship along with the cargo(Please insert outside of the package)" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="No need Sample" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Shipping Mark" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Mark is BIC Chemical Co., Ltd." /></Label>
                                            </FormGroup>
                                           
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="CLAIM" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="In case of quality problem, claim should be lodged by the Buyers within 30 days after the arrival of the goods at the port of destination" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="In case of quantity problem; claim should be lodged by the Buyer within 15 days after the arrival of the goods at the port of destination" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <Col xl='3'>
                                        <FormGroup>
                                            <Button color="primary" size="larg"><Lang name="Save" /> </Button>{'  '}
                                            <Button color="warning" size="larg"><Lang name="Cancel" /> </Button>
                                        </FormGroup>
                                    </Col>
                                    
                                </Form>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary.bind(this)}
                       className={'modal-lg modal-primary'}>
                  <ModalHeader toggle={this.togglePrimary.bind(this)}><Lang name="Add / Edit Product" /> </ModalHeader>
                  <ModalBody>
                    
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Manufacturer" /></Label>
                                    <Input type="select" name="mfg" value={this.state.mfg} onChange={e=>this.handleChange(e)} className="form-control">
                                        <option value="">{this.state.Lang['--- select your Manufacturer ---']}</option> 
                                        <option value="SINOPHARM WEIQIDA PHARMACEUTICAL CO., LTD.">SINOPHARM WEIQIDA PHARMACEUTICAL CO., LTD.</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Qty" /></Label>
                                    <Input type="number" name="qty" placeholder={this.state.Lang['Please enter your qty']} value={this.state.qty} onChange={e=>this.handleChange(e)} className="form-control"/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Product Name" /></Label>
                                    <Input type="select" name="productName" value={this.state.productName} onChange={e=>this.handleChange(e)} className="form-control" >
                                        <option value="">{this.state.Lang['--- select your product name ---']}</option>
                                        <option value="SS1-02-099">ยูเนี่ยน PVC แบบสั้น ขนาด 1/2"</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Unit" /></Label>
                                    <Input type="select" name="unit" value={this.state.unit} onChange={e=>this.handleChange(e)}  className="form-control">
                                        <option value="">{this.state.Lang['--- select your unit ---']}</option>
                                        <option value='อัน'>อัน</option>
                                        <option value='ก้อน'>ก้อน</option>
                                        <option value='หลอด'>เม็ด</option>
                                        <option value='กล่อง'>กล่อง</option>
                                        <option value='ชิ้น'>ชิ้น</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </FormGroup>

                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Description" /></Label>
                                    <Input type="textarea" name="description" rows="3" placeholder={this.state.Lang['Please enter your description']} value={this.state.description} onChange={e=>this.handleChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Price/Unit" /></Label>
                                    <Input type="number" name="price" value={this.state.price} placeholder={this.state.Lang['Please enter your price']}  onChange={e=>this.handleChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Pack size" /></Label>
                                    <Input type="text" name="packSize" value={this.state.packSize} placeholder={this.state.Lang['Please enter your pack size']} onChange={e=>this.handleChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Discount" /></Label>
                                    <Input type="number" name="discount" value={this.state.discount} placeholder={this.state.Lang['Please enter your discount']} onChange={e=>this.handleChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Amount" /></Label>
                                    <div style={{background: 'green',color: 'white', padding: 8}} > {this.sumTotal()}</div>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    
                  </ModalBody>
                  <ModalFooter>
                      {this.checkOrderLine() ?
                    <Button color="primary" onClick={()=>this.saveAs()}> <Lang name="Submit" /> </Button> 
                    : 
                    <Button color="primary" disabled> <Lang name="Submit" /> </Button> 
                    }{' '}
                    <Button color="secondary" onClick={this.togglePrimary.bind(this)}><Lang name="Cancel" /></Button>
                  </ModalFooter>
                </Modal>

            </div>

            
        )
    }
}

export default (PurchaseOrderAdd);
