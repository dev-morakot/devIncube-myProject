import React, { Component } from 'react'
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
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
import { numberWithCommas} from './../../../lib/_functions';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import Select from 'react-select';

function sumProperty(arr, type) {
    return arr.reduce((total, obj) => {
      if (typeof obj[type] === 'string') {
        return total + Number(obj[type]);
      }
      return total + obj[type];
    }, 0);
  }

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
            line_amount_total: 0,
            incotermVersion: 'INCOTERMS ® 2010',
            back: false
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

        
    }

    qtyChange = (e) => {
        const {name, value} = e.target;
        this.setState({qty: value});
    }

    priceChange = (e) => {
        const {value} = e.target;
        this.setState({
            price: value,
            
        });
    }

    logChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

   
    sumTotal = () => {
        if(this.state.discount !== undefined && this.state.discount !== '') {
            return ( parseFloat(this.state.price * this.state.qty) - parseFloat(this.state.discount)).toFixed(2)
        } else {
           return ( parseFloat(this.state.price * this.state.qty)).toFixed(2)
        }
        
       
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
        this.total();
    }


    saveAs = () => {
        console.log(this.state);
        
        const item = { 
            mfg: this.state.mfg,
            productName: this.state.productName,
            packSize: this.state.packSize,
            description: this.state.description,
            price: parseFloat(this.state.price),
            unit: this.state.unit,
            qty: parseFloat(this.state.qty),
            discount: parseFloat(this.state.discount)
        };
        if(this.state.discount !== undefined && this.state.discount !== '') {
            item['line_amount_total'] = ( parseFloat(this.state.price * this.state.qty) - parseFloat(this.state.discount)).toFixed(2)
        } else {
            item['line_amount_total'] = ( parseFloat(this.state.price * this.state.qty)).toFixed(2)
        }
        this.setState({
            arr: [...this.state.arr, item],
           
        });
        
        
        this.setState({
            mfg: '',
            productName: '',
            packSize: '',
            description: '',
            price: 0,
            unit: '',
            discount: 0,
            qty: 0,
            line_amount_total: 0.00
        })
        this.setState({
            primary: !this.state.primary,
        });
    }

    save = () => {
        
        let input = {
            amount_total: this.total()
        };
        if(this.state.supplier !== undefined) {
            input['supplier'] = this.state.supplier;
        }
        if(this.state.orderDate !== undefined) {
            input['orderDate'] = this.state.orderDate;
        }
        if(this.state.contactPerson !== undefined) {
            input['contactPerson'] = this.state.contactPerson;
        }
        if(this.state.arr.length >=0) {
            input['purchaseOrderLine'] = this.state.arr;
        }
        if(this.state.transportType !== undefined) {
            input['transportType'] = this.state.transportType;
        }
        if(this.state.paymentCondition !== undefined) {
            input['paymentCondition'] = this.state.paymentCondition;
        }
        if(this.state.destinationPort !== undefined) {
            input['destinationPort'] = this.state.destinationPort;
        }
        if(this.state.paymentTerms !== undefined) {
            input['paymentTerms'] = this.state.paymentTerms;
        }
        if(this.state.incotermVersion !== undefined) {
            input['incotermVersion'] = this.state.incotermVersion;
        }
        if(this.state.currency !== undefined) {
            input['currency'] = this.state.currency;
        }
        if(this.state.incoterms !== undefined) {
            input['incoterms'] = this.state.incoterms;
        }
        if(this.state.invoiceNo !== undefined) {
            input['invoiceNo'] = this.state.invoiceNo;
        }
        if(this.state.salesContractNo !== undefined) {
            input['salesContractNo'] = this.state.salesContractNo;
        }
        if(this.state.shipment !== undefined) {
            input['shipment'] = this.state.shipment;
        }
        if(this.state.note !== undefined) {
            input['note'] = this.state.note;
        }
    
        if(this.state.commercialInvoice !== undefined) {
            input['commercialInvoice'] = this.state.commercialInvoice;
        }
        if(this.state.certHealth !== undefined) {
            input['certHealth'] = this.state.certHealth;
        }
        if(this.state.shippingAdvice !== undefined) {
            input['shippingAdvice'] = this.state.shippingAdvice;
        }
        if(this.state.packingList !== undefined) {
            input['packingList'] = this.state.packingList;
        }
        if(this.state.certOrigin !== undefined) {
            input['certOrigin'] = this.state.certOrigin;
        }
        if(this.state.telexRelease !== undefined) {
            input['telexRelease'] = this.state.telexRelease;
        }
        if(this.state.coa !== undefined) {
            input['coa'] = this.state.coa;
        }
        if(this.state.formE !== undefined) {
            input['formE'] = this.state.formE;
        }
        if(this.state.originBL !== undefined) {
            input['originBL'] = this.state.originBL;
        }
        if(this.state.insurance !== undefined) {
            input['insurance'] = this.state.insurance;
        }

        if(this.state.formAI !== undefined) {
            input['formAI'] = this.state.formAI;
        }
        if(this.state.awb !== undefined) {
            input['awb'] = this.state.awb;
        }
        if(this.state.reqDocNote !== undefined) {
            input['reqDocNote'] = this.state.reqDocNote;
        }
        if(this.state.packingOne !== undefined) {
            input['packingOne'] = this.state.packingOne;
        }
        if(this.state.packingTwo !== undefined) {
            input['packingTwo'] = this.state.packingTwo;
        }
        if(this.state.sampleOne !== undefined) {
            input['sampleOne'] = this.state.sampleOne;
        }
        if(this.state.sampleTwo !== undefined) {
            input['sampleTwo'] = this.state.sampleTwo;
        }
        if(this.state.shippingMark !== undefined) {
            input['shippingMark'] = this.state.shippingMark;
        }

        if(this.state.claimOne !== undefined) {
            input['claimOne'] = this.state.claimOne;
        }
        if(this.state.claimTwo !== undefined) {
            input['claimTwo'] = this.state.claimTwo;
        }
        console.log(input);
    }

    
    total = () => {
        return this.state.arr
        .map((obj) => { return parseFloat(obj.line_amount_total); })
        .reduce((prev, next) => { 
            
            return prev += next; 
            
        }, 0.00);

        
    }

    cancel = () => {
        this.setState({back: true});
    }
    render() {
        if(this.state.back) {
            return <Redirect push to={'/admin/' + this.props.match.path.split('/')[2]}/>;
        }

        
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
                                            <Input type="select" name="supplier" value={this.state.supplier} onChange={e=>this.logChange(e)}  required >
                                                <option value="">{this.state.Lang['--- select supplier ---']}</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Order Date" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="date" name="orderDate" value={this.state.orderDate} onChange={e=>this.logChange(e)} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Contact Person" />  </Label>
                                            <Input type="text" name="contactPerson" value={this.state.contactPerson} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your contact person']} />
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Transport Type" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="transportType" value={this.state.transportType} onChange={e=>this.logChange(e)}  required>
                                                <option value="">{this.state.Lang['--- select transport type ---']}</option>
                                                <option value="BY SEA">BY SEA</option>
                                                <option value="BY AIR">BY AIR</option>
                                                <option value="BY COUIRER">BY COUIRER</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Payment Condition" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="paymentCondition" value={this.state.paymentCondition} onChange={e=>this.logChange(e)}  required >
                                                <option value="">{this.state.Lang['--- select payment condition ---']}</option>
                                                <option value="L/C">L/C</option>
                                                <option value="TT">TT</option>
                                                <option value="D/P">D/P</option>
                                                <option value="CASH AGAINST DOCUMENTS">CASH AGAINST DOCUMENTS</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Destination Port" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="destinationPort" value={this.state.destinationPort} onChange={e=>this.logChange(e)} required>
                                                <option value="">{this.state.Lang['--- select destination port ---']}</option>
                                                <option value="P.A.T Bangkok Thailand(Port Authority of Thailand)">P.A.T Bangkok Thailand(Port Authority of Thailand)</option>
                                                <option value="Lat Krabang Port, Thailand">Lat Krabang Port, Thailand</option>
                                                <option value="Bangkok, Thailand">Bangkok, Thailand</option>
                                                <option value="SUWANNAPHUM AIRPORT">SUWANNAPHUM AIRPORT</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Payment Terms" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="paymentTerms" value={this.state.paymentTerms} onChange={e=>this.logChange(e)}  required >
                                                <option value="">{this.state.Lang['--- select payment terms ---']}</option>
                                                <option value="100% In Advance">100% In Advance</option>
                                                <option value="In Advance/After received copy B/L 30%/70%">In Advance/After received copy B/L 30%/70%</option>
                                                <option value="In Advance/After received copy B/L 50%/50%">In Advance/After received copy B/L 50%/50%</option>
                                                <option value="3 days after received copy B/L">3 days after received copy B/L</option>
                                                <option value="7 days after received copy B/L">7 days after received copy B/L</option>
                                                <option value="30 days after received copy B/L">30 days after received copy B/L</option>
                                                <option value="60 days after received copy B/L">60 days after received copy B/L</option>
                                                <option value="3 days after B/L date">3 days after B/L date</option>
                                                <option value="7 days after B/L date">7 days after B/L date</option>
                                                <option value="30 days after B/L date">30 days after B/L date</option>
                                                <option value="60 days after B/L date">60 days after B/L date</option>
                                                <option value="At sight">At sight</option>
                                                <option value="Against doc copy">Against doc copy</option>
                                                <option value="30% down payment, within 7 days after received PO 70% final payment, 20 days prior shipment">30% down payment, within 7 days after received PO 70% final payment, 20 days prior shipment</option>
                                                <option value="5 days after against B/L">5 days after against B/L</option>
                                                <option value="100% IN ADVANCE 15 DAYS BEFORE THE SHIPMENT DATE.">100% IN ADVANCE 15 DAYS BEFORE THE SHIPMENT DATE.</option>
                                                <option value="15 days from BL date">15 days from BL date</option>
                                                <option value="In Advance/After FAT/After SAT 40%/50%/10%">In Advance/After FAT/After SAT 40%/50%/10%</option>
                                                <option value="90 days after B/L date">90 days after B/L date</option>
                                                
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Incoterm Version" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="text" name="incotermVersion" value={this.state.incotermVersion} onChange={e=>this.logChange(e)}/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Currency Unit" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="currency" value={this.state.currency} onChange={e=>this.logChange(e)}  required >
                                                <option value="THB">THB</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Incoterms" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="incoterms" value={this.state.incoterms} onChange={e=>this.logChange(e)} required >
                                                <option value="">{this.state.Lang['--- select incoterms ---']}</option>
                                                <option value="EXW">EXW</option>
                                                <option value="FCA">FCA</option>
                                                <option value="FAS">FAS</option>
                                                <option value="FOB">FOB</option>
                                                <option value="CFR">CFR</option>
                                                <option value="CIR">CIF</option>
                                                <option value="CPT">CPT</option>
                                                <option value="CIP">CIP</option>
                                                <option value="DAF">DAF</option>
                                                <option value="DES">DES</option>
                                                <option value="DEQ">DEQ</option>
                                                <option value="DDU">DDU</option>
                                                <option value="DAT">DAT</option>
                                                <option value="DAP">DAP</option>
                                                <option value="DDP">DDP</option>
                                                
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Invoice No" />  </Label>
                                            <Input type="text" name="invoiceNo" value={this.state.invoiceNo} onChange={e=>this.logChange(e)} placeholder={this.state.Lang['Please enter your invoice']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">    
                                        <FormGroup>
                                            <Label><Lang name="Sales Contract No" />  </Label>
                                            <Input type="text" name="salesContractNo" value={this.state.salesContractNo} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your sale contract']}/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        

                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Shipment Info" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="textarea" rows='4' name="shipment" value={this.state.shipment} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your shipment']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Notes" /> </Label>
                                            <Input type="textarea" rows='4' name="note" value={this.state.note} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your note']} />
                                        
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
                                               
                                                <Input  type="text" value={this.total()} readOnly style={{width: 300,backgroundColor: 'green', color: 'white', textAlign: 'right'}} />
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
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="commercialInvoice" value="Commercial Invoice" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Commercial Invoice" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="certHealth" value="Cert. of Health" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert. of Health" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="shippingAdvice" value="Shipping Advice" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Advice" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="packingList" value="Packing List" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packing List" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="certOrigin" value="Cert of Origin" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert of Origin" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="telexRelease" value="Telex release B/L" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Telex release B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="coa" value="COA" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="COA" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="formE" value="Form E" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form E" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="originBL" value="Original B/L" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Original B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="insurance" value="Insurance" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Insurance" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="formAI" value="Form AI" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form AI" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="awb" value="AWB" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="AWB" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Required Document Notes:" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="reqDocNote" value="true" />
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
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="packingOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed in export standard packing with Thai Label." /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="packingTwo" value="true" />
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
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="sampleOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Please include 20g sample to be ship along with the cargo(Please insert outside of the package)" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="sampleTwo" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="No need Sample" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Shipping Mark" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="shippingMark" value="Shipping Mark is BIC Chemical Co., Ltd." />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Mark is BIC Chemical Co., Ltd." /></Label>
                                            </FormGroup>
                                           
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="CLAIM" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="claimOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="In case of quality problem, claim should be lodged by the Buyers within 30 days after the arrival of the goods at the port of destination" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" onChange={e=>this.logChange(e)} name="claimTwo" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="In case of quantity problem; claim should be lodged by the Buyer within 15 days after the arrival of the goods at the port of destination" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <Col xl='3'>
                                        <FormGroup>
                                            <Button onClick={() => this.save()} color="primary" size="larg"><Lang name="Save" /> </Button>{'  '}
                                            <Button onClick={() => this.cancel()} color="warning" size="larg"><Lang name="Cancel" /> </Button>
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
                                    <Input type="number" name="qty" placeholder={this.state.Lang['Please enter your qty']} value={this.state.qty} onChange={e=>this.qtyChange(e)} className="form-control"/>
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
                                    <Input type="number" name="price" value={this.state.price} placeholder={this.state.Lang['Please enter your price']}  onChange={e=>this.priceChange(e)}  className="form-control" />
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
