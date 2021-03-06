import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Table, FormGroup,  CardFooter ,ListGroup, ListGroupItem, Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchaseOrderFetch, loadCompleted , loadProcessing , purchaseOrderLineFetch} from './../../../actions';
import { formatDateTime } from './../../../lib/_functions';
import Swal from 'sweetalert2';
import logo from './../../../assets/img/brand/logo.svg'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const style = {
    a4PdfWrapper:{ 
        position: 'fixed',
        background: 'rgb(204,204,204)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10000,
        padding: 20,
        overflow: 'scroll'
      },
      a4Pdf:{
        background: 'white',
        display: 'block',
        margin: '0 auto',
        marginBottom: '0.5cm',
        boxShadow: '0 0 0.5cm rgba(0,0,0,0.5)',
        width: '21cm',
        height: '29.7cm',
        padding: 10
      },
}

class PurchaseOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            id: this.props.match.params.id,
            pkColumn: 'id',
            data: {},
            back: false,
            toEdit: false
        }
    }

    setData(data) {
        console.log('setData', data);
        let po = this.state.data;
        po.id = data.id;
        po.code = data.code;
        po.partner_code = data.partner_code;
        po.partner_name = data.partner_name;
        po.partner_address = data.partner_address;
        po.contactPerson = data.contactPerson;
        po.salesContractNo = data.salesContractNo;
        po.invoiceNo = data.invoiceNo;
        po.note = data.note;
        po.orderDate = data.orderDate;
        po.incotermVersion = data.incotermVersion;
        po.incoterms = data.incoterms;
        po.destinationPort = data.destinationPort;
        po.transportType = data.transportType;
        po.paymentTerms = data.paymentTerms;
        po.paymentCondition = data.paymentCondition;
        po.currency = data.currency;
        po.amount_total = data.amount_total;

        po.commercialInvoice = (_.has(data,'commercialInvoice')&&data.commercialInvoice!=='null'&&data.commercialInvoice!==null&&data.commercialInvoice!==''&&data.commercialInvoice!==undefined)?data.commercialInvoice: "-";
        po.certHealth = (_.has(data,'certHealth')&&data.certHealth!=='null'&&data.certHealth!==null&&data.certHealth!==''&&data.certHealth!==undefined)?data.certHealth: "-";
        po.shippingAdvice = (_.has(data,'shippingAdvice')&&data.shippingAdvice!=='null'&&data.shippingAdvice!==null&&data.shippingAdvice!==''&&data.shippingAdvice!==undefined)?data.shippingAdvice: "-";
        po.packingList = (_.has(data,'packingList')&&data.packingList!=='null'&&data.packingList!==null&&data.packingList!==''&&data.packingList!==undefined)?data.packingList: "-";
        po.certOrigin = (_.has(data,'certOrigin')&&data.certOrigin!=='null'&&data.certOrigin!==null&&data.certOrigin!==''&&data.certOrigin!==undefined)?data.certOrigin: "-";
        po.coa = (_.has(data,'coa')&&data.coa!=='null'&&data.coa!==null&&data.coa!==''&&data.coa!==undefined)?data.coa: "-";
        po.formE = (_.has(data,'formE')&&data.formE!=='null'&&data.formE!==null&&data.formE!==''&&data.formE!==undefined)?data.formE: "-";
        po.originBL = (_.has(data,'originBL')&&data.originBL!=='null'&&data.originBL!==null&&data.originBL!==''&&data.originBL!==undefined)?data.originBL: "-";
        po.insurance = (_.has(data,'insurance')&&data.insurance!=='null'&&data.insurance!==null&&data.insurance!==''&&data.insurance!==undefined)?data.insurance: "-";
        po.formAI = (_.has(data,'formAI')&&data.formAI!=='null'&&data.formAI!==null&&data.formAI!==''&&data.formAI!==undefined)?data.formAI: "-";
        po.awb = (_.has(data,'awb')&&data.awb!=='null'&&data.awb!==null&&data.awb!==''&&data.awb!==undefined)?data.awb: "-";

        po.reqDocNote = (_.has(data,'reqDocNote')&&data.reqDocNote!=='null'&&data.reqDocNote!==null&&data.reqDocNote!==''&&data.reqDocNote!==undefined)?data.reqDocNote: "-";

        po.packingOne = (_.has(data,'packingOne')&&data.packingOne!=='null'&&data.packingOne!==null&&data.packingOne!==''&&data.packingOne!==undefined)?data.packingOne: "-";
        po.packingTwo = (_.has(data,'packingTwo')&&data.packingTwo!=='null'&&data.packingTwo!==null&&data.packingTwo!==''&&data.packingTwo!==undefined)?data.packingTwo: "-";

        po.sampleOne = (_.has(data,'sampleOne')&&data.sampleOne!=='null'&&data.sampleOne!==null&&data.sampleOne!==''&&data.sampleOne!==undefined)?data.sampleOne: "-";
        po.sampleTwo = (_.has(data,'sampleTwo')&&data.sampleTwo!=='null'&&data.sampleTwo!==null&&data.sampleTwo!==''&&data.sampleTwo!==undefined)?data.sampleTwo: "-";

        po.shippingMark = (_.has(data,'shippingMark')&&data.shippingMark!=='null'&&data.shippingMark!==null&&data.shippingMark!==''&&data.shippingMark!==undefined)?data.shippingMark: "-";

        po.claimOne = (_.has(data,'claimOne')&&data.claimOne!=='null'&&data.claimOne!==null&&data.claimOne!==''&&data.claimOne!==undefined)?data.claimOne: "-";
        po.claimTwo = (_.has(data,'claimTwo')&&data.claimTwo!=='null'&&data.claimTwo!==null&&data.claimTwo!==''&&data.claimTwo!==undefined)?data.claimTwo: "-";

        this.setState({data: po});
    }

    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }

    componentWillMount(){
        const pkColumn = this.state.pkColumn;
        const id = this.state.id;
        if(_.findIndex(this.props.purchaseOrder.data, function(o) { return o[pkColumn] === id; })>=0) {
            this.setData(this.props.purchaseOrder.data[_.findIndex(this.props.purchaseOrder.data, function(o) { return o[pkColumn] === id })]);
            this.props.purchaseOrderLineFetch(this.state.data.id);
        } else {
            this.props.purchaseOrderFetch();
        }
        this.setLanguage();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'code')&&nextProps.purchaseOrder.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.purchaseOrder.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.purchaseOrder.data[_.findIndex(nextProps.purchaseOrder.data, function(o) { return o[pkColumn] == id;})]);
                this.props.purchaseOrderLineFetch(this.state.data.id);
            }
        }
       
    }

    toPurchaseEdit() {
        this.setState({toEdit: true});
    }

    printPdf() {
        this.setState({showPdfdoctor: true});
    }
    cancelPdf() {
        this.setState({showPdfdoctor: false});
    }

    downloadPdf() {
        const thisUse = this;
        thisUse.props.loadProcessing('PDF Creating');
        html2canvas(document.querySelector('#pdfForm')).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'pt', 'a4');
          const width = pdf.internal.pageSize.getWidth();
          const height = pdf.internal.pageSize.getHeight();
          pdf.addImage(imgData,'PNG', 0,0,width,height);
          pdf.save("Purchase Order.pdf");
          thisUse.props.loadCompleted();
          thisUse.cancelPdf();
        });
    }

    render() {
        if(this.state.toEdit) {
            return <Redirect push to={`/admin/${this.props.match.path.split('/')[2]}/edit/${this.state.data.id}`}/>;
          }
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Partner Detail" />
                            <div className="card-header-actions">
                            <Button type="button" onClick={this.printPdf.bind(this)}  color="success"><i className="fa fa-file-pdf-o"></i> <Lang name="Export PDF" /></Button>
                            {'  '}
                            
                                <Button onClick={this.toPurchaseEdit.bind(this)} color="primary"><Lang name="Edit" /></Button>{ '   ' }

                            </div>
                            </CardHeader>
                            <CardBody>
                                <h1>{this.state.data.code}</h1>
                                <hr className="my-2" />
                            <Row>
                                <Col xl='6'>
                                <ListGroup>
                                    <ListGroupItem  action><Lang name="Supplier Code" />: {this.state.data.partner_code}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Supplier Name" />:  {this.state.data.partner_name}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Supplier Address" />:  {this.state.data.partner_address}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Contact Person" />: {this.state.data.contactPerson}</ListGroupItem>
                                    <ListGroupItem action><Lang name="Sales Contract No" />: {this.state.data.salesContractNo}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Invoice No" />: {this.state.data.invoiceNo}</ListGroupItem>
                                    <ListGroupItem action><Lang name="Notes" />: {this.state.data.note}</ListGroupItem>
   
                                </ListGroup>
                                </Col>

                                <Col xl='6'>
                                <ListGroup>
                                    <ListGroupItem  action><Lang name="Doc No." /> : {this.state.data.code}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Order Date" />:  {this.state.data.orderDate}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Incoterm Version	" />:  {this.state.data.incotermVersion}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Incoterm" />: {this.state.data.incoterms}</ListGroupItem>
                                    <ListGroupItem action><Lang name="Transport Type" />: {this.state.data.transportType}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Destination Port" />: {this.state.data.destinationPort}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Payment Terms" />: {this.state.data.paymentTerms}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Payment Condition" />: {this.state.data.paymentCondition}</ListGroupItem>
                                    <ListGroupItem  action><Lang name="Currency" />: {this.state.data.currency}</ListGroupItem>
                                </ListGroup>
                                </Col>
                                <Col xl='6'></Col>
                                
                                <Col xl='6'>
                                <ListGroup>
                                    <ListGroupItem disabled action><Lang name="Total Amount" />: {this.state.data.amount_total}</ListGroupItem>
                                    
                                </ListGroup>
                                </Col>

                            </Row>

                            <Row>

                                <Col xl='12'>  
                                    <h4><Lang name="Order Line" /></h4>
                                    <hr className="my-2" />
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th><Lang name="Product Code/Name" /></th>
                                                <th><Lang name="Description" /></th>
                                                <th><Lang name="MFG BY" /></th>
                                                <th><Lang name="Pack size" /></th>
                                                <th><Lang name="Quantity" /></th>
                                                <th><Lang name="Unit" /></th>
                                                <th><Lang name="Price/Unit" /></th>
                                                <th><Lang name="Discount Amount" /></th>
                                                <th><Lang name="Total Amount" /></th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(this.props.purchaseOrderLine.data) && this.props.purchaseOrderLine.data.map((item, i) => {
                                               return(
                                                <tr key={i}>
                                                    <td>[{item.product_code}] - {item.product_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.mfg}</td>
                                                    <td>{item.packSize}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.unit}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.line_amount_total}</td>
                                                </tr>
                                               )
                                               
                                            })}
                                           
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                            <Row>

                                <Col xl='6'>
                                    <h4><Lang name="Required Document"/> :</h4>
                                    <ul>
                                        {(this.state.data.commercialInvoice!=='-'&&this.state.data.commercialInvoice!==''&&this.state.data.commercialInvoice!=='null'&&this.state.data.commercialInvoice!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.commercialInvoice} /></span>
                                        }
                                        <br />
                                        {(this.state.data.certHealth!=='-'&&this.state.data.certHealth!==''&&this.state.data.certHealth!=='null'&&this.state.data.certHealth!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.certHealth} /> </span>
                                        }
                                        <br />
                                        {(this.state.data.shippingAdvice!=='-'&&this.state.data.shippingAdvice!==''&&this.state.data.shippingAdvice!=='null'&&this.state.data.shippingAdvice!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.shippingAdvice} /></span>
                                        }
                                        <br />
                                        {(this.state.data.packingList!=='-'&&this.state.data.packingList!==''&&this.state.data.packingList!=='null'&&this.state.data.packingList!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.packingList} /> </span>
                                        }
                                        <br />
                                        {(this.state.data.certOrigin!=='-'&&this.state.data.certOrigin!==''&&this.state.data.certOrigin!=='null'&&this.state.data.certOrigin!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.certOrigin} /> </span>
                                        }
                                        <br />
                                        {(this.state.data.coa!=='-'&&this.state.data.coa!==''&&this.state.data.coa!=='null'&&this.state.data.coa!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.coa} /></span>
                                        }
                                        <br />
                                        {(this.state.data.formE!=='-'&&this.state.data.formE!==''&&this.state.data.formE!=='null'&&this.state.data.formE!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.formE} /></span>
                                        }
                                        <br />
                                        {(this.state.data.originBL!=='-'&&this.state.data.originBL!==''&&this.state.data.originBL!=='null'&&this.state.data.originBL!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.originBL} /></span>
                                        }
                                        <br />
                                        {(this.state.data.insurance!=='-'&&this.state.data.insurance!==''&&this.state.data.insurance!=='null'&&this.state.data.insurance!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.insurance} /></span>
                                        }
                                        <br />
                                        {(this.state.data.formAI!=='-'&&this.state.data.formAI!==''&&this.state.data.formAI!=='null'&&this.state.data.formAI!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name= {this.state.data.formAI} /></span>
                                        }
                                        <br />
                                        {(this.state.data.awb!=='-'&&this.state.data.awb!==''&&this.state.data.awb!=='null'&&this.state.data.awb!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.awb} /></span>
                                        }
                                    </ul>
                                </Col>
                                <Col xl='6'>
                                    <h4><Lang name="Required Document Notes"/> :</h4>
                                    <ul>
                                        {(this.state.data.reqDocNote!=='-'&&this.state.data.reqDocNote!==''&&this.state.data.reqDocNote!==null&&this.state.data.reqDocNote!=='null')&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp;
                                          <Lang name="Step 1 Required Document Notes" /> <br />
                                           <Lang name="Step 2 Required Document Notes" /> <br />
                                            <Lang name="Step 3 Required Document Notes" />
                                        </span>
                                        }
                                    </ul>
                                </Col>
                            </Row>

                            <Row>

                                <Col xl='6'>
                                    <h4><Lang name="Packing"/> :</h4>
                                    <ul>
                                    {(this.state.data.packingOne!=='-'&&this.state.data.packingOne!==''&&this.state.data.packingOne!=='null'&&this.state.data.packingOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> 
                                            &nbsp;
                                            <Lang name="Packed in export standard packing with Thai Label" />
                                        </span>
                                        }
                                        <br />
                                        {(this.state.data.packingTwo!=='-'&&this.state.data.packingTwo!==''&&this.state.data.packingTwo!=='null'&&this.state.data.packingTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp;
                                               <Lang name="Packed in export standard packing and on every packing must be indicated" /> <br />
                                                <Lang name="Packed other" />
                                        </span>
                                        }
                                    </ul>
                                </Col>
                                <Col xl='6'>
                                    <h4><Lang name="Sample"/> :</h4>
                                    <ul>
                                    {(this.state.data.sampleOne!=='-'&&this.state.data.sampleOne!==''&&this.state.data.sampleOne!=='null'&&this.state.data.sampleOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" />  &nbsp;
                                           <Lang name="Please include 20g sample to be ship along with the cargo(Please insert outside of the package)" />
                                        </span>
                                        }
                                        <br />
                                        {(this.state.data.sampleTwo!=='-'&&this.state.data.sampleTwo!==''&&this.state.data.sampleTwo!=='null'&&this.state.data.sampleTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="No need Sample" /> </span>
                                        }
                                    </ul>
                                </Col>
                            </Row>

                            <Row>

                                <Col xl='6'>
                                    <h4><Lang name="Shipping Mark"/> :</h4>
                                    <ul>
                                    {(this.state.data.shippingMark!=='-'&&this.state.data.shippingMark!==''&&this.state.data.shippingMark!=='null'&this.state.data.shippingMark!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="Shipping Mark is BIC Chemical" /></span>
                                        }
                                    </ul>
                                </Col>
                                <Col xl='6'>
                                    <h4><Lang name="CLAIM"/> :</h4>
                                    <ul>
                                    {(this.state.data.claimOne!=='-'&&this.state.data.claimOne!==''&&this.state.data.claimOne!=='null'&&this.state.data.claimOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="In case of quality problem, claim should be lodged by the Buyers within 30 days after the arrival of the goods at the port of destination" /></span>
                                        }
                                        <br />
                                        {(this.state.data.claimTwo!=='-'&&this.state.data.claimTwo!==''&&this.state.data.claimTwo!=='null'&&this.state.data.claimTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; "><Lang name="In case of quantity problem; claim should be lodged by the Buyer within 15 days after the arrival of the goods at the port of destination" /></span>
                                        }
                                    </ul>
                                </Col>
                            </Row>
                          

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {(this.state.showPdfdoctor)&&
                    <div style={style.a4PdfWrapper}>
                    <div style={{textAlign: 'center',marginBottom: 10}}>
                        <Button type="button" color="success"  onClick={this.downloadPdf.bind(this)}><i className="fa fa-download"></i> <Lang name="Download"/></Button>
                        &nbsp;
                        <Button type="button" color="danger" onClick={this.cancelPdf.bind(this)}><i className="fa fa-remove"></i> <Lang name="Cancel"/></Button>
                    </div>
                    <div id="pdfForm" style={style.a4Pdf}>
                        {this.generatePdf()}
                    </div>
                    
                    </div>
                    }
            </div>
        )
    }

    generatePdf() {
        const styleLogo = {

            logo: {
              width: 250,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 20,
              backgroundRepeat: 'no-repeat',
            },
            bg: {
              marginBottom: 0,
              backgroundColor: '#394862',
              marginTop: -20,
              marginLeft: -20,
              marginRight: -20
            }
            
          }
        return (
            <div>
                <Row>
                <Col xs='12'>
                    <div style={{
                        marginBottom: 0,
                       // backgroundColor: '#394862',
                        marginTop: -10,
                        marginLeft: -10,
                        marginRight: -10,
                        padding: 10
                    }}>
                    <FormGroup row className="my-0">
                    <Col xl='3'>
                    <img src={logo} 
                        style={{
                        width: 130,
                        marginTop: 20,
                        marginLeft: 20,
                        marginBottom: 20,
                        backgroundRepeat: 'no-repeat',
                        }}/>
                    </Col>
                    <Col xs='9' style={{borderLeft: '1px solid #000000'}}>
                        <span style={{textAlign: 'left',fontSize: 12,color: '#000000',padding: 8}}>
                            BIC CHEMICAL CO., LTD <br />
                            333/12-13 Moo 9, Bangbuathong-Suphanburi Rd. Laharn, Bangbuathong, Nonthaburi 11110, Thailand <br />
                            Tel. 662-9644912-4, 9644973-4 Fax. 662-9644915 <br />
                            Tax ID No: 0125541000121
                        </span>
                      </Col>
                    </FormGroup>
                    </div>
                    <hr className="my-2" />
                    <FormGroup row className="my-0">
                        <Col xl='6'>
                            <strong><Lang name="supplier" /></strong> <br />
                            <span style={{fontSize: 11}}> {this.state.data.partner_address} </span><br />
                            <span style={{fontSize: 11}}> <b><Lang name="Contact Person" /></b> {this.state.data.contactPerson}</span>
                        </Col>
                        <Col xl='6'>
                            <strong><Lang name="Purchase Order" /></strong><br />
                            <span style={{fontSize: 11}}><b> P/O No.</b> {this.state.data.code} </span><br/>
                            <span style={{fontSize: 11}}><b><Lang name="Order Date" /></b> {this.state.data.orderDate}</span> <br />
                            <span style={{fontSize: 11}}><b><Lang name="Payment Condition" /></b> </span> <br />
                             <span style={{fontSize: 11}}>
                             {this.state.data.transportType} { ' , '}
                             {this.state.data.incotermVersion} { ' ,  ' }
                             {this.state.data.incoterms} {' , ' }
                             {this.state.data.destinationPort}
                             </span> <br />
                             <span style={{fontSize: 11}}><b><Lang name="Payment Terms" /></b>  {this.state.data.paymentCondition} { ' , ' } {this.state.data.paymentTerms} </span> <br />
                             <span style={{fontSize: 11}}><b><Lang name="Currency" /></b>  {this.state.data.currency}</span>
                        </Col>
                    </FormGroup>
                    <br />
                    <Table style={{fontSize: 11}} responsive>
                        <thead>
                            <tr>
                            <th><Lang name="Product Code/Name" /></th>
                                                <th><Lang name="Description" /></th>
                                                <th><Lang name="MFG BY" /></th>
                                                <th><Lang name="Pack size" /></th>
                                                <th><Lang name="Quantity" /></th>
                                                <th><Lang name="Unit" /></th>
                                                <th><Lang name="Price/Unit" /></th>
                                                <th><Lang name="Discount Amount" /></th>
                                                <th><Lang name="Total Amount" /></th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(this.props.purchaseOrderLine.data) && this.props.purchaseOrderLine.data.map((item, i) => {
                                               return(
                                                <tr key={i}>
                                                   
                                                    <td>[{item.product_code}] - {item.product_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.mfg}</td>
                                                    <td>{item.packSize}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.unit}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.discount}</td>
                                                    <td>{item.line_amount_total}</td>
                                                </tr>
                                               )
                                               
                                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="8"><Lang name="Total Amount" /></th>
                                <th>{this.state.data.amount_total}</th>
                            </tr>
                        </tfoot>
                    </Table>

                    <br />

                    <FormGroup row className="my-0">
                        <Col xl='5'>
                            <b><Lang name="Required Document" />:</b>
                        </Col>

                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xl='3'>
                        {(this.state.data.commercialInvoice!=='-'&&this.state.data.commercialInvoice!==''&&this.state.data.commercialInvoice!=='null'&&this.state.data.commercialInvoice!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.commercialInvoice} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.certHealth!=='-'&&this.state.data.certHealth!==''&&this.state.data.certHealth!=='null'&&this.state.data.certHealth!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.certHealth} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.shippingAdvice!=='-'&&this.state.data.shippingAdvice!==''&&this.state.data.shippingAdvice!=='null'&&this.state.data.shippingAdvice!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.shippingAdvice} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.packingList!=='-'&&this.state.data.packingList!==''&&this.state.data.packingList!=='null'&&this.state.data.packingList!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.packingList} /></span>
                                        }
                        </Col>
                        
                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xl='3'>
                        {(this.state.data.certOrigin!=='-'&&this.state.data.certOrigin!==''&&this.state.data.certOrigin!=='null'&&this.state.data.certOrigin!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.certOrigin} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.coa!=='-'&&this.state.data.coa!==''&&this.state.data.coa!=='null'&&this.state.data.coa!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang nmae={this.state.data.coa} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.formE!=='-'&&this.state.data.formE!==''&&this.state.data.formE!=='null'&&this.state.data.formE!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.formE} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.originBL!=='-'&&this.state.data.originBL!==''&&this.state.data.originBL!=='null'&&this.state.data.originBL!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.originBL} /></span>
                                        }
                        </Col>
                        
                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xl='3'>
                        {(this.state.data.insurance!=='-'&&this.state.data.insurance!==''&&this.state.data.insurance!=='null'&&this.state.data.insurance!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.insurance} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.formAI!=='-'&&this.state.data.formAI!==''&&this.state.data.formAI!=='null'&&this.state.data.formAI!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang name={this.state.data.formAI} /></span>
                                        }
                        </Col>
                        <Col xl='3'>
                        {(this.state.data.awb!=='-'&&this.state.data.awb!==''&&this.state.data.awb!=='null'&&this.state.data.awb!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> <Lang nmae={this.state.data.awb} /></span>
                                        }
                        </Col>
                       
                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xl='12'>
                        {(this.state.data.reqDocNote!=='-'&&this.state.data.reqDocNote!==''&&this.state.data.reqDocNote!==null&&this.state.data.reqDocNote!=='null')&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp;
                                           <Lang name="Step 1 Required Document Notes" /> <br />
                                           <Lang name="Step 2 Required Document Notes" /> <br />
                                            <Lang name="Step 3 Required Document Notes" />
                                        </span>
                                        }
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup  row className="my-0">
                        <Col xl='5'>
                            <b><Lang name="Packing" />:</b>
                        </Col>

                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xs='12'>
                        {(this.state.data.packingOne!=='-'&&this.state.data.packingOne!==''&&this.state.data.packingOne!=='null'&&this.state.data.packingOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> 
                                            &nbsp;
                                            <Lang name="Packed in export standard packing with Thai Label" />
                                        </span>
                                        }
                                        <br />
                                        {(this.state.data.packingTwo!=='-'&&this.state.data.packingTwo!==''&&this.state.data.packingTwo!=='null'&&this.state.data.packingTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp;
                                               <Lang name="Packed in export standard packing and on every packing must be indicated" /> <br />
                                                <Lang name="Packed other" />
                                        </span>
                                        }
                        </Col>
                    </FormGroup>

                    <br />
                    <FormGroup row className="my-0">
                        <Col xl='5'>
                            <b><Lang name="Sample" />:</b>
                        </Col>

                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xs='12'>
                        {(this.state.data.sampleOne!=='-'&&this.state.data.sampleOne!==''&&this.state.data.sampleOne!=='null'&&this.state.data.sampleOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" />  &nbsp;
                                            <Lang name="Please include 20g sample to be ship along with the cargo(Please insert outside of the package)" />
                                        </span>
                                        }
                                        <br />
                                        {(this.state.data.sampleTwo!=='-'&&this.state.data.sampleTwo!==''&&this.state.data.sampleTwo!=='null'&&this.state.data.sampleTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="No need Sample" /> </span>
                                        }
                        </Col>
                    </FormGroup>

                    <br />
                    <FormGroup row className="my-0">
                        <Col xl='5'>
                            <b> <Lang name="Shipping Mark" />:</b>
                        </Col>

                    </FormGroup>

                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xs='12'>
                        {(this.state.data.shippingMark!=='-'&&this.state.data.shippingMark!==''&&this.state.data.shippingMark!=='null'&this.state.data.shippingMark!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="Shipping Mark is BIC Chemical" /></span>
                                        }
                        </Col>
                    </FormGroup>

                    <br />
                    <FormGroup row className="my-0">
                        <Col xl='5'>
                            <b><Lang name="CLAIM" />:</b>
                        </Col>

                    </FormGroup>
                    <FormGroup style={{fontSize: 12}} row className="my-0">
                        <Col xl='12'>
                        {(this.state.data.claimOne!=='-'&&this.state.data.claimOne!==''&&this.state.data.claimOne!=='null'&&this.state.data.claimOne!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="In case of quality problem, claim should be lodged by the Buyers within 30 days after the arrival of the goods at the port of destination" /></span>
                                        }
                                        <br />
                                        {(this.state.data.claimTwo!=='-'&&this.state.data.claimTwo!==''&&this.state.data.claimTwo!=='null'&&this.state.data.claimTwo!==null)&&
                                        <span><i style={{color: 'green'}} className="fa fa-check-circle-o" /> &nbsp; <Lang name="In case of quantity problem; claim should be lodged by the Buyer within 15 days after the arrival of the goods at the port of destination" /></span>
                                        }
                        </Col>
                    </FormGroup>
                </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        purchaseOrder: state.purchaseOrder,
        purchaseOrderLine: state.purchaseOrderLine
    }
}

export default connect(mapStateToProps, {purchaseOrderFetch,purchaseOrderLineFetch, loadCompleted, loadProcessing})(PurchaseOrderDetail);