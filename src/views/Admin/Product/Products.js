import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import TableView from './../../../components/TableView';
import { connect } from 'react-redux';
import { productFetch, productDelete } from './../../../actions';
import Swal from 'sweetalert2';
import { formatDateTime } from './../../../lib/_functions';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Lang: {},
        pkColumn: 'prodCode',
        tableHeader: 'Products',
        column: [
          {name: 'code', sorting: 'sortingCode', label: 'Product Code'},
          {name: 'name', sorting: 'sortingName', label: 'Product Name'},
          {name: 'category', sorting: 'sortingCategory', label: 'Category'},
          {name: 'price', sorting: 'sortingPrice', label: 'Price'},
          {name: 'unit', sorting: 'sortingUnit', label: 'Unit'},
          {name: 'ac', label: 'Active'},
          {name: 'createAt', sorting: 'sortingCreate', label: 'Create date'}
        ],
        data: [],
        rowclick: this.props.match.path,
        processType: '',
        toDetail: false
    }
  }

  setData(data) {
    console.log(data)
    let dataTmp = data;
    if(_.isArray(dataTmp)) {
      this.setState({data: dataTmp.map((item) => {
        item['code'] = (_.has(item,'code')&&item.code !== 'null'&&item.code!==null)?item.code: '-';
        item['name'] = (_.has(item,'name')&&item.name !== 'null'&&item.name!==null)?item.name: '-';
        item['category'] = (_.has(item,'category')&&item.category !== 'null'&&item.category!==null)?item.category: '-';
        item['price'] = (_.has(item,'price')&&item.price !== 'null'&&item.price!==null)?item.price: '-';
        item['unit'] = (_.has(item,'unit')&&item.unit !== 'null'&&item.unit!==null)?item.unit: '-';
        if(item.active === '1') {
          item['ac'] = <i className="fa fa-check" style={{color: 'green'}}></i>
        } else {
          item['ac'] = <i className="fa fa-close" style={{color: 'red'}}></i>
        }
        item['createAt'] = item.createAt;//formatDateTime((_.has(item, 'createAt') && 'null' !== item.createAt && item.createAt !== '' && item.createAt !== undefined) ? item.createAt : "null");
        return item;
    })})
    }
  }

  componentWillMount() {
    this.props.productFetch();
    this.setLanguage();
  }

  componentDidMount(){
    this.setState({data: this.props.products.data});
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.data !== nextProps.products.data) {
      this.setData(nextProps.products.data);
    }

  }

  setLanguage(){
    if(_.has(i18n,'language')){
      this.setState({Lang: i18n.store.data[i18n.language].translation});
    }
  }


  detail(id) {
    this.setState({toDetail: true, id: id});
  }

    render() {
       if(this.state.toDetail) {
          return <Redirect push to={'/admin/products/'+this.state.id}/>;
       }
        return (
            <div>
                <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> <Lang name='Products' />
                        <div className="card-header-actions">
                           <Lang name="Products" /> <Badge color="primary">{this.state.data.length}</Badge> <Lang name="Item(s)" />
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

function mapStateToProps(state) {
  console.log(state);
  return {
    products: state.products
  }
}

export default connect(mapStateToProps,{ productFetch, productDelete })(Products)
