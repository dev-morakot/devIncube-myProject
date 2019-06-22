import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import TableView from './../../../components/TableView';
import { connect } from 'react-redux';
import { purchaseOrderFetch } from './../../../actions';
import { Redirect } from 'react-router-dom';
import { formatDate, numberWithCommas, formatDateTime } from './../../../lib/_functions';

 class PurchaseOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            pkColumn: 'id',
            tableHeader: 'Purchase Order',
            column: [
              {name: 'code', sorting: 'sortingCode', label: 'Purchase Code'},
              {name: 'orderDate', sorting: 'sortingOrderDate', label: 'Order Date'},
              {name: 'shipment' , sorting: 'sortingShipment', label: 'Shipment' },
              {name: 'supplier', sorting: 'sortingSupplier', label: 'Supplier' },
              {name: 'incoterms', sorting: 'sortingIncoterms', label: 'Incoterms'},
              {name: 'transportType', sorting: 'sortingTransport', label: 'Transport Type'},
              {name: 'destinationPort', sorting: 'sortingPort', label: 'Port'},
              {name: 'paymentCondition', sorting: 'sortingCondition', label: 'Payment Condition'},
              {name: 'paymentTerms', sorting: 'sortingTerms', label: 'Payment Terms'},
              {name: 'amount_total', sorting: 'sortingTotal', label: 'Total'},
              {name: 'currency', sorting: 'sortingCurrency', label: 'Currency'}
            ],
            data: [],
            rowclick: this.props.match.path,
            processType: '',
            toDetail: false
        }
      }

    setData(data) {
        console.log(data);
        let dataTmp = data;
        if(_.isArray(dataTmp)) {
            this.setState({data: dataTmp.map((item) => {
                item['code'] = (_.has(item,'code')&&item.code !==null&&item.code!=='null')?item.code: '-';
                item['orderDate'] = (_.has(item,'orderDate')&&item.orderDate!==null&&item.orderDate!=='null'&&item.orderDate!=='')?item.orderDate: 'null';
                item['shipment'] = (_.has(item,'shipment')&&item.shipment!==null&&item.shipment!==''&&item.shipment!=='null')?item.shipment:'-';
                item['supplier'] = this.supplier(item);
                item['incoterms'] = (_.has(item,'incoterms')&&item.incoterms!==null&&item.incoterms!==''&&item.incoterms!=='null')?item.incoterms:'-';
                item['transportType'] = (_.has(item,'transportType')&&item.transportType!==null&&item.transportType!==''&&item.transportType!=='null')?item.transportType:'-';
                item['destinationPort'] = (_.has(item,'destinationPort')&&item.destinationPort!==null&&item.destinationPort!==''&&item.destinationPort!=='null')?item.destinationPort:'-';
                item['paymentCondition'] = (_.has(item,'paymentCondition')&&item.paymentCondition!==null&&item.paymentCondition!==''&&item.paymentCondition!=='null')?item.paymentCondition:'-';
                item['paymentTerms'] = (_.has(item,'paymentTerms')&&item.paymentTerms!==null&&item.paymentTerms!==''&&item.paymentTerms!=='null')?item.paymentTerms:'-';
                item['amount_total'] = (_.has(item,'amount_total')&&item.amount_total!==null&&item.amount_total!==''&&item.amount_total!=='null')?(item.amount_total):'-';
                item['currency'] = (_.has(item,'currency')&&item.currency!==null&&item.currency!==''&&item.currency!=='null')?item.currency:'-';
                return item;
            })});
        }
    }

    supplier(item) {
        return `[${item.partner_code}] - ${item.partner_name}`;
    }
    
    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        this.props.purchaseOrderFetch();
        this.setLanguage();
    }

    componentDidMount(){
        this.setState({data: this.props.purchaseOrder.data});
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.state.data !== nextProps.purchaseOrder.data) {
          this.setData(nextProps.purchaseOrder.data);
        }
    }

    detail(id) {
        this.setState({toDetail: true, id: id});
      }

    
    
    render() {

        if(this.state.toDetail) {
            return <Redirect push to={'/admin/purchaseOrder/'+this.state.id}/>;
         }
        return (
            <div>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> <Lang name='Create Purchase Order' />
                                <div className="card-header-actions">
                                <Lang name="The Purchase Order (International)" /> <Badge color="primary">{this.state.data.length}</Badge> <Lang name="Item(s)" />
                                </div>
                            </CardHeader>
                            <CardBody>
                            <TableView
                            header={this.state.tableHeader}
                            column={this.state.column}
                            data={this.state.data}
                            limit={10}
                            rowclick={this.state.rowclick}
                            pk={this.state.pkColumn}
                            detail={this.detail.bind(this)}
                            />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('fb',state);
    return { loader: state.loader, purchaseOrder: state.purchaseOrder}
  }
export default connect(mapStateToProps,{purchaseOrderFetch}) (PurchaseOrder);
