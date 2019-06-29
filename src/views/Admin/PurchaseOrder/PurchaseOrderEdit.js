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
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { partnerFetch,purchaseOrderFetch, purchaseOrderLineUpdate, productFetch,purchaseOrderLineDelete, purchaseOrderUpdate, purchaseOrderLineFetch, loadCompleted, loadProcessing } from './../../../actions';

function sumProperty(arr, type) {
    return arr.reduce((total, obj) => {
      if (typeof obj[type] === 'string') {
        return total + Number(obj[type]);
      }
      return total + obj[type];
    }, 0);
  }

class PurchaseOrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            product_code: '',
            product_name: '',
            id: this.props.match.params.id,
            pkColumn: 'id',
            Lang: {},
            modal: false,
            large: false,
            primary: false,
            edit: false,
            data: {},
            back: false,
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
            poline: {}
        }
      }

      togglePrimary() {
        this.setState({
          primary: !this.state.primary,
        });
      }

    poEdit = (item) => {
        console.log(item);
        let poline = this.state.poline;
        poline.msg = 'update';
        poline.id = item.id;
        poline.product_id = item.product_id;
        poline.product_code = item.product_code;
        poline.product_name = item.product_name;
        poline.qty = item.qty;
        poline.price = item.price;
        poline.unit = item.unit;
        poline.description = item.description;
        poline.mfg = item.mfg;
        poline.packSize = item.packSize;
        this.setState({
            edit: !this.state.edit,
            poline: poline
        });
    }
    
    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }

    setData(data) {
        console.log('setData',data);
        let po = this.state.data;
        po.id = data.id;
        po.orderDate = data.orderDate;
        po.contactPerson = data.contactPerson;
        po.supplier = data.supplier;
        po.note = data.note;
        po.transportType = data.transportType;
        po.paymentCondition = data.paymentCondition;
        po.destinationPort = data.destinationPort;
        po.paymentTerms = data.paymentTerms;
        po.incotermVersion = data.incotermVersion;
        po.currency = data.currency;
        po.incoterms = data.incoterms;
        po.invoiceNo = data.invoiceNo;
        po.salesContractNo = data.salesContractNo;
        po.shipment = data.shipment;
        po.commercialInvoice = data.commercialInvoice;
        po.certHealth = data.certHealth;
        po.shippingAdvice = data.shippingAdvice;
        po.packingList = data.packingList;
        po.certOrigin = data.certOrigin;
        po.coa = data.coa;
        po.formE = data.formE;
        po.originBL = data.originBL;
        po.insurance = data.insurance;
        po.formAI = data.formAI;
        po.awb = data.awb;
        po.reqDocNote = data.reqDocNote;
        po.packingTwo = data.packingTwo;
        po.packingOne = data.packingOne;
        po.sampleTwo = data.sampleTwo;
        po.sampleOne = data.sampleOne;
        po.shippingMark = data.shippingMark;
        po.claimOne = data.claimOne;
        po.claimTwo = data.claimTwo;
        po.amount_total = data.amount_total;
        this.setState({data: po});
    }
    
    componentWillMount(){
        const pkColumn = this.state.pkColumn;
        const id = this.state.id;
        if(_.findIndex(this.props.purchaseOrder.data, function(o) { return o[pkColumn] == id; })>=0){
            this.setData(this.props.purchaseOrder.data[_.findIndex(this.props.purchaseOrder.data, function(o) { return o[pkColumn] == id;})]);
            this.props.purchaseOrderLineFetch(this.state.data.id);
        } else {
            this.props.purchaseOrderFetch();
        }
        this.setLanguage();
        this.props.partnerFetch();
        this.props.productFetch();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'id')&&nextProps.purchaseOrder.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.purchaseOrder.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.purchaseOrder.data[_.findIndex(nextProps.purchaseOrder.data, function(o) { return o[pkColumn] == id;})]);
                this.props.purchaseOrderLineFetch(this.state.data.id);
            }
        }
        this.setState({arr: nextProps.purchaseOrderLine.data});
        if(this.state.processType == 'save') {
            this.resultSaveProduct(nextProps.purchaseOrder);
        }
        if(this.state.processType == 'delete') {
            this.resultDelete(nextProps.purchaseOrder);
        }

    }

    resultSaveProduct(data) {
        this.setState({processType: ''});
        console.log('error',data)
        Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Update Purchase Order'],
            text: this.state.Lang['Update purchase order success.'],
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000,
            onClose: () => {
              this.backPage();
            }
        }); 
    }

    resultDelete(data) {
        this.setState({processType: ''});
        console.log('error',data)
        Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Delete line'],
            text: this.state.Lang['Delete success.'],
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000,
            onClose: () => {
                
            }
        }); 
    }

    handleEditChange = (e) => {
        const {name, value} = e.target;
        let poline = this.state.poline;
        poline[name] = value;
        this.setState({poline: poline});
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})

        this.checkProduct(name, value);
    }

    checkProduct = (name, value) => {
        switch (name) {
            case 'product_id':
                this.getProduct(value);
                break;
        
            default:
                break;
        }
    }

    getProduct = (value) => {
        let index = _.findIndex(this.props.products.data, function (o) { return o.id === value; });
        if(index>=0) {
           
            this.setState({
                product_name: this.props.products.data[index].name,
                product_code: this.props.products.data[index].code
            });
            
          
        }
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
        const data = this.state.data;
        data[name] = value;
        this.setState({data});
    }

   
    sumTotal = () => {
        if(this.state.discount !== undefined && this.state.discount !== '') {
            return ( parseFloat(this.state.price * this.state.qty) - parseFloat(this.state.discount)).toFixed(2)
        } else {
           return ( parseFloat(this.state.price * this.state.qty)).toFixed(2)
        }
        
       
    }

    sumTotalEdit = () => {
        if(this.state.poline.discount !== undefined && this.state.poline.discount !== '') {
            return ( parseFloat(this.state.poline.price * this.state.poline.qty) - parseFloat(this.state.poline.discount)).toFixed(2)
        } else {
           return ( parseFloat(this.state.poline.price * this.state.poline.qty)).toFixed(2)
        }
        
       
    }

    checkOrderLine = () => {
        if(this.state.price!==''&&this.state.unit!==''&&this.state.product_id!==''&&this.state.qty!=='') {
            return true;
        } else {
            return false;
        }
    }

    handleRemoveInsert = (i) => {
        const arr = [...this.state.arr];
        arr.splice(i, 1);
        this.setState({arr});
    }

    handleRemove = (i, item) => {
        let id = {
            id: item.id
        }
        this.setState({processType: 'delete'});
        this.props.purchaseOrderLineDelete(id);
        setTimeout(() => {
            const arr = [...this.state.arr];
            arr.splice(i, 1);
            this.setState({arr});
            this.total();
        }, 3000);
        /*const arr = [...this.state.arr]
        arr.splice(i, 1)

        this.setState({arr}, () => {
            this.props.purchaseOrderLineDelete(id);
        });*/
       
        
    }


    saveAs = () => {
        console.log(this.state);
        
        const item = { 
            product_code: this.state.product_code,
            product_name: this.state.product_name,
            mfg: this.state.mfg,
            product_id: this.state.product_id,
            productName: this.state.productName,
            packSize: this.state.packSize,
            description: this.state.description,
            price: parseFloat(this.state.price),
            unit: this.state.unit,
            qty: parseFloat(this.state.qty),
            discount: parseFloat(this.state.discount),
            msg: 'insert'
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
            product_code: '',
            product_name: '',
            product_id: '',
            packSize: '',
            description: '',
            price: 0,
            unit: '',
            discount: 0,
            qty: 0,
            msg: '',
            line_amount_total: 0.00
        })
        this.setState({
            primary: !this.state.primary,
        });
    }

    save = () => {
        
        let input = {
            amount_total: this.total(),
            id: this.state.data.id
        };
        if(this.state.data.supplier !== undefined) {
            input['supplier'] = this.state.data.supplier;
        }
        if(this.state.data.orderDate !== undefined) {
            input['orderDate'] = this.state.data.orderDate;
        }
        if(this.state.data.contactPerson !== undefined) {
            input['contactPerson'] = this.state.data.contactPerson;
        }
        if(this.state.arr.length >=0) {
            input['purchaseOrderLine'] = this.state.arr;
        }
        if(this.state.data.transportType !== undefined) {
            input['transportType'] = this.state.data.transportType;
        }
        if(this.state.data.paymentCondition !== undefined) {
            input['paymentCondition'] = this.state.data.paymentCondition;
        }
        if(this.state.data.destinationPort !== undefined) {
            input['destinationPort'] = this.state.data.destinationPort;
        }
        if(this.state.data.paymentTerms !== undefined) {
            input['paymentTerms'] = this.state.data.paymentTerms;
        }
        if(this.state.data.incotermVersion !== undefined) {
            input['incotermVersion'] = this.state.data.incotermVersion;
        }
        if(this.state.data.currency !== undefined) {
            input['currency'] = this.state.data.currency;
        }
        if(this.state.data.incoterms !== undefined) {
            input['incoterms'] = this.state.data.incoterms;
        }
        if(this.state.data.invoiceNo !== undefined) {
            input['invoiceNo'] = this.state.data.invoiceNo;
        }
        if(this.state.data.salesContractNo !== undefined) {
            input['salesContractNo'] = this.state.data.salesContractNo;
        }
        if(this.state.data.shipment !== undefined) {
            input['shipment'] = this.state.data.shipment;
        }
        if(this.state.data.note !== undefined) {
            input['note'] = this.state.data.note;
        }
    
        if(this.state.data.commercialInvoice !== undefined) {
            input['commercialInvoice'] = this.state.data.commercialInvoice;
        }
        if(this.state.data.certHealth !== undefined) {
            input['certHealth'] = this.state.data.certHealth;
        }
        if(this.state.data.shippingAdvice !== undefined) {
            input['shippingAdvice'] = this.state.data.shippingAdvice;
        }
        if(this.state.data.packingList !== undefined) {
            input['packingList'] = this.state.data.packingList;
        }
        if(this.state.data.certOrigin !== undefined) {
            input['certOrigin'] = this.state.data.certOrigin;
        }
        if(this.state.data.telexRelease !== undefined) {
            input['telexRelease'] = this.state.data.telexRelease;
        }
        if(this.state.data.coa !== undefined) {
            input['coa'] = this.state.data.coa;
        }
        if(this.state.data.formE !== undefined) {
            input['formE'] = this.state.data.formE;
        }
        if(this.state.data.originBL !== undefined) {
            input['originBL'] = this.state.data.originBL;
        }
        if(this.state.data.insurance !== undefined) {
            input['insurance'] = this.state.data.insurance;
        }

        if(this.state.data.formAI !== undefined) {
            input['formAI'] = this.state.data.formAI;
        }
        if(this.state.data.awb !== undefined) {
            input['awb'] = this.state.data.awb;
        }
        if(this.state.data.reqDocNote !== undefined) {
            input['reqDocNote'] = this.state.data.reqDocNote;
        }
        if(this.state.data.packingOne !== undefined) {
            input['packingOne'] = this.state.data.packingOne;
        }
        if(this.state.data.packingTwo !== undefined) {
            input['packingTwo'] = this.state.data.packingTwo;
        }
        if(this.state.data.sampleOne !== undefined) {
            input['sampleOne'] = this.state.data.sampleOne;
        }
        if(this.state.data.sampleTwo !== undefined) {
            input['sampleTwo'] = this.state.data.sampleTwo;
        }
        if(this.state.data.shippingMark !== undefined) {
            input['shippingMark'] = this.state.data.shippingMark;
        }

        if(this.state.data.claimOne !== undefined) {
            input['claimOne'] = this.state.data.claimOne;
        }
        if(this.state.data.claimTwo !== undefined) {
            input['claimTwo'] = this.state.data.claimTwo;
        }
        console.log(input);
        this.setState({processType: 'save'});
       this.props.purchaseOrderUpdate(input);
    }


    editAs = () => {
        
        const item = { 
            product_code: this.state.poline.product_code,
            product_name: this.state.poline.product_name,
            mfg: this.state.poline.mfg,
            product_id: this.state.poline.product_id,
            id: this.state.poline.id,
            packSize: this.state.poline.packSize,
            description: this.state.poline.description,
            price: parseFloat(this.state.poline.price),
            unit: this.state.poline.unit,
            qty: parseFloat(this.state.poline.qty),
            discount: parseFloat(this.state.poline.discount),
            msg: 'update'
        };
        if(this.state.poline.discount !== undefined && this.state.poline.discount !== '') {
            item['line_amount_total'] = ( parseFloat(this.state.poline.price * this.state.poline.qty) - parseFloat(this.state.poline.discount)).toFixed(2)
            
        } else {
            item['line_amount_total'] = ( parseFloat(this.state.poline.price * this.state.poline.qty)).toFixed(2)
        }
        this.setState(state => {
            const arr = state.arr.map((v,k) => {
                let a = v;
                a.line_amount_total = item.line_amount_total;
                a.msg = "update";
                a.product_code = item.product_code;
                a.product_name = item.product_name;
                a.product_id = item.product_id;
                a.qty = item.qty;
                a.price = item.price;
                a.unit = item.unit;
                a.mfg = item.mfg;
                a.description = item.description;
                a.packSize  = item.packSize;
                a.id = item.id;
                a.discount = item.discount;
                return  a;
                
            })
           
        })
        
       
        this.setState({
            edit: !this.state.edit,
        });
    }

    
    total = () => {
       // if(this.state.data.amount_total !== ''&&this.state.data.amount_total!=='null'&&this.state.data.amount_total!== undefined){
         //   return this.state.data.amount_total;
        //} else {
            return this.state.arr
            .map((obj) => { return parseFloat(obj.line_amount_total); })
            .reduce((prev, next) => { 
                
                return prev += next; 
                
            }, 0.00);
       // }
        

        
    }

    backPage() {
        this.setState({back: true});
    }

    handdlePatientToggleChange = e => {
        const { name, value } = e.target;
        let data = this.state.data;
        data[name] = this.state.data[name] ? '' : value;
        this.setState({ data: data });
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
                                            <Input type="select" name="supplier" value={this.state.data.supplier} onChange={e=>this.logChange(e)}  required >
                                            <option value="">{this.state.Lang['--- select supplier ---']}</option>
                                                {Array.isArray(this.props.partners.data) && this.props.partners.data.map((item,i) => {
                                                   return (
                                                        <option value={item.id}>{item.name}</option>
                                                   )
                                               })}
                                                
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Order Date" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="date" name="orderDate" value={this.state.data.orderDate} onChange={e=>this.logChange(e)} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Contact Person" />  </Label>
                                            <Input type="text" name="contactPerson" value={this.state.data.contactPerson} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your contact person']} />
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Transport Type" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="transportType" value={this.state.data.transportType} onChange={e=>this.logChange(e)}  required>
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
                                            <Input type="select" name="paymentCondition" value={this.state.data.paymentCondition} onChange={e=>this.logChange(e)}  required >
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
                                            <Input type="select" name="destinationPort" value={this.state.data.destinationPort} onChange={e=>this.logChange(e)} required>
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
                                            <Input type="select" name="paymentTerms" value={this.state.data.paymentTerms} onChange={e=>this.logChange(e)}  required >
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
                                            <Input type="text" name="incotermVersion" value={this.state.data.incotermVersion} onChange={e=>this.logChange(e)}/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Currency Unit" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="currency" value={this.state.data.currency} onChange={e=>this.logChange(e)}  required >
                                                <option value="THB">THB</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                            </Input>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Incoterms" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="select" name="incoterms" value={this.state.data.incoterms} onChange={e=>this.logChange(e)} required >
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
                                            <Input type="text" name="invoiceNo" value={this.state.data.invoiceNo} onChange={e=>this.logChange(e)} placeholder={this.state.Lang['Please enter your invoice']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">    
                                        <FormGroup>
                                            <Label><Lang name="Sales Contract No" />  </Label>
                                            <Input type="text" name="salesContractNo" value={this.state.data.salesContractNo} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your sale contract']}/>
                                        
                                        </FormGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        

                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Shipment Info" />  <span style={{color: 'red'}}>*</span></Label>
                                            <Input type="textarea" rows='4' name="shipment" value={this.state.data.shipment} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your shipment']} required/>
                                        
                                        </FormGroup>
                                        </Col>
                                        <Col xs="4">
                                        <FormGroup>
                                            <Label><Lang name="Notes" /> </Label>
                                            <Input type="textarea" rows='4' name="note" value={this.state.data.note} onChange={e=>this.logChange(e)}  placeholder={this.state.Lang['Please enter your note']} />
                                        
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
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.product_code + '   ' + item.product_name}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.mfg}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.description}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.packSize}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}> {item.qty}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.unit}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.price}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.discount}</td>
                                                    <td onClick={this.poEdit.bind(this, item)}>{item.line_amount_total}</td>
                                                    <td align="center">
                                                        {item.msg ==='insert'?
                                                        <Button onClick={()=>this.handleRemoveInsert(i)} color='warning' size="sm">
                                                            <i className="fa fa-remove"></i>
                                                        </Button>
                                                        :
                                                        <Button onClick={()=>this.handleRemove(i, item)} color='warning' size="sm">
                                                            <i className="fa fa-remove"></i>
                                                        </Button>
                                                        }
                                                        
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
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.commercialInvoice} onChange={e=>this.handdlePatientToggleChange(e)} name="commercialInvoice"  />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Commercial Invoice" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.certHealth} onChange={e=>this.handdlePatientToggleChange(e)} name="certHealth" value="Cert. of Health" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert. of Health" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.shippingAdvice} onChange={e=>this.handdlePatientToggleChange(e)} name="shippingAdvice" value="Shipping Advice" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Advice" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.packingList} onChange={e=>this.handdlePatientToggleChange(e)} name="packingList" value="Packing List" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packing List" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.certOrigin} onChange={e=>this.handdlePatientToggleChange(e)} name="certOrigin" value="Cert of Origin" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Cert of Origin" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.telexRelease} onChange={e=>this.handdlePatientToggleChange(e)} name="telexRelease" value="Telex release B/L" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Telex release B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.coa} onChange={e=>this.handdlePatientToggleChange(e)} name="coa" value="COA" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="COA" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.formE} onChange={e=>this.handdlePatientToggleChange(e)} name="formE" value="Form E" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form E" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.originBL} onChange={e=>this.handdlePatientToggleChange(e)} name="originBL" value="Original B/L" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Original B/L" /></Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md='2'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.insurance} onChange={e=>this.handdlePatientToggleChange(e)} name="insurance" value="Insurance" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Insurance" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.formAI} onChange={e=>this.handdlePatientToggleChange(e)} name="formAI" value="Form AI" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Form AI" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.awb} onChange={e=>this.handdlePatientToggleChange(e)} name="awb" value="AWB" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="AWB" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Required Document Notes:" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.reqDocNote} onChange={e=>this.handdlePatientToggleChange(e)} name="reqDocNote" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Step 1 Required Document Notes" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                           
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Step 2 Required Document Notes" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                           
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Step 3 Required Document Notes" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Packing" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.packingOne} onChange={e=>this.handdlePatientToggleChange(e)} name="packingOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed in export standard packing with Thai Label" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.packingTwo} onChange={e=>this.handdlePatientToggleChange(e)} name="packingTwo" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed in export standard packing and on every packing must be indicated" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Packed other" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Sample" />:</Label><FormText className="help-block"><Lang name="Choose one" /></FormText></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.sampleOne} onChange={e=>this.handdlePatientToggleChange(e)} name="sampleOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Please include 20g sample to be ship along with the cargo(Please insert outside of the package)" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.sampleTwo} onChange={e=>this.handdlePatientToggleChange(e)} name="sampleTwo" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="No need Sample" /></Label>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="Shipping Mark" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.shippingMark} onChange={e=>this.handdlePatientToggleChange(e)} name="shippingMark" value="Shipping Mark is BIC Chemical Co., Ltd." />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="Shipping Mark is BIC Chemical" /></Label>
                                            </FormGroup>
                                           
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="1"></Col>
                                        <Col md="2"><Label><Lang name="CLAIM" />:</Label></Col>
                                        <Col md='9'>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.claimOne} onChange={e=>this.handdlePatientToggleChange(e)} name="claimOne" value="true" />
                                            <Label check className="form-check-label" htmlFor="checkbox1"><Lang name="In case of quality problem, claim should be lodged by the Buyers within 30 days after the arrival of the goods at the port of destination" /></Label>
                                            </FormGroup>
                                            <FormGroup check className="checkbox">
                                            <Input className="form-check-input" type="checkbox" checked={this.state.data.claimTwo} onChange={e=>this.handdlePatientToggleChange(e)} name="claimTwo" value="true" />
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
                                        <option value="HONGKONG TAIYIXIN INTERNATIONAL COMPANY LIMITED">HONGKONG TAIYIXIN INTERNATIONAL COMPANY LIMITED</option>
                                        <option value="ARSHINE PHARMACEUTICAL CO.,LIMITED">ARSHINE PHARMACEUTICAL CO.,LIMITED</option>
                                        <option value="G.N. CHEMICALS CO.,LTD">G.N. CHEMICALS CO.,LTD</option>
                                        <option value="FIPHARM CO.LTD.">FIPHARM CO.LTD.</option>
                                        <option value="ZHUHAI UNITED LABORATORIES TRADING ">ZHUHAI UNITED LABORATORIES TRADING </option>
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
                                    <Input type="select" name="product_id" value={this.state.product_id} onChange={e=>this.handleChange(e)} className="form-control" >
                                        <option value="">{this.state.Lang['--- select your product name ---']}</option>
                                        {Array.isArray(this.props.products.data) && this.props.products.data.filter(item => {
                                                    return item.active === '1' || item.active === 1
                                                })
                                                
                                                .map((item,i) => {
                                                   return (
                                                        <option value={item.id}>{'[' + item.code + ']' + ' -  ' +item.name}</option>
                                                   )
                                               })}
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











                <Modal isOpen={this.state.edit} toggle={this.poEdit.bind(this)}
                       className={'modal-lg modal-primary'}>
                  <ModalHeader toggle={this.poEdit.bind(this)}><Lang name="Add / Edit Product" /> </ModalHeader>
                  <ModalBody>
                    
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Manufacturer" /></Label>
                                    <Input type="select" name="mfg" value={this.state.poline.mfg} onChange={e=>this.handleEditChange(e)} className="form-control">
                                        <option value="">{this.state.Lang['--- select your Manufacturer ---']}</option> 
                                        <option value="SINOPHARM WEIQIDA PHARMACEUTICAL CO., LTD.">SINOPHARM WEIQIDA PHARMACEUTICAL CO., LTD.</option>
                                        <option value="HONGKONG TAIYIXIN INTERNATIONAL COMPANY LIMITED">HONGKONG TAIYIXIN INTERNATIONAL COMPANY LIMITED</option>
                                        <option value="ARSHINE PHARMACEUTICAL CO.,LIMITED">ARSHINE PHARMACEUTICAL CO.,LIMITED</option>
                                        <option value="G.N. CHEMICALS CO.,LTD">G.N. CHEMICALS CO.,LTD</option>
                                        <option value="FIPHARM CO.LTD.">FIPHARM CO.LTD.</option>
                                        <option value="ZHUHAI UNITED LABORATORIES TRADING ">ZHUHAI UNITED LABORATORIES TRADING </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Qty" /></Label>
                                    <Input type="number" name="qty" placeholder={this.state.Lang['Please enter your qty']} value={this.state.poline.qty} onChange={e=>this.handleEditChange(e)} className="form-control"/>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Product Name" /></Label>
                                    <Input type="select" name="product_id" value={this.state.poline.product_id} onChange={e=>this.handleEditChange(e)} className="form-control" >
                                        <option value="">{this.state.Lang['--- select your product name ---']}</option>
                                        {Array.isArray(this.props.products.data) && this.props.products.data.filter(item => {
                                                    return item.active === '1' || item.active === 1
                                                })
                                                
                                                .map((item,i) => {
                                                   return (
                                                        <option value={item.id}>{'[' + item.code + ']' + ' -  ' +item.name}</option>
                                                   )
                                               })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Unit" /></Label>
                                    <Input type="select" name="unit" value={this.state.poline.unit} onChange={e=>this.handleEditChange(e)}  className="form-control">
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
                                    <Input type="textarea" name="description" rows="3" placeholder={this.state.Lang['Please enter your description']} value={this.state.poline.description} onChange={e=>this.handleEditChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Price/Unit" /></Label>
                                    <Input type="number" name="price" value={this.state.poline.price} placeholder={this.state.Lang['Please enter your price']}  onChange={e=>this.handleEditChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Pack size" /></Label>
                                    <Input type="text" name="packSize" value={this.state.poline.packSize} placeholder={this.state.Lang['Please enter your pack size']} onChange={e=>this.handleEditChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Discount" /></Label>
                                    <Input type="number" name="discount" value={this.state.poline.discount} placeholder={this.state.Lang['Please enter your discount']} onChange={e=>this.handleEditChange(e)}  className="form-control" />
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="my-0">
                            <Col xl='6'>
                                
                            </Col>
                            <Col xl='6'>
                                <FormGroup>
                                    <Label><Lang name="Amount" /></Label>
                                    <div style={{background: 'green',color: 'white', padding: 8}} > {this.sumTotalEdit()}</div>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    
                  </ModalBody>
                  <ModalFooter>
                     
                    <Button color="primary" onClick={()=>this.editAs()}> <Lang name="Submit" /> </Button> 
                  
                    <Button color="secondary" onClick={this.poEdit.bind(this)}><Lang name="Cancel" /></Button>
                  </ModalFooter>
                </Modal>

            </div>

            
        )
    }
}

function mapStateToProps(state) {
    console.log('edit',state)
    return {
        purchaseOrder: state.purchaseOrder,
        purchaseOrderLine: state.purchaseOrderLine,
        products: state.products,
        partners: state.partners
    }
}

export default connect(mapStateToProps, {partnerFetch,purchaseOrderLineFetch,productFetch,purchaseOrderLineUpdate, purchaseOrderLineDelete, purchaseOrderUpdate, purchaseOrderFetch, loadCompleted, loadProcessing})(PurchaseOrderEdit);
