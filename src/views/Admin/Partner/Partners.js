import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import TableView from './../../../components/TableView';
import { connect } from 'react-redux';
import { partnerFetch } from './../../../actions';
import Swal from 'sweetalert2';
import { formatDateTime } from './../../../lib/_functions';

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Lang: {},
        pkColumn: 'id',
        tableHeader: 'Partners',
        column: [
          {name: 'code', sorting: 'sortingCode', label: 'Product Code'},
          {name: 'name', sorting: 'sortingName', label: 'Product Name'},
          {name: 'address', sorting: 'sortingAddress', label: 'Address'},
          {name: 'tel', sorting: 'sortingTel', label: 'Tel'},
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
    console.log('partner',data)
    let dataTmp = data;
    if(_.isArray(dataTmp)) {
      this.setState({data: dataTmp.map((item) => {
        item['code'] = (_.has(item,'code')&&item.code !== 'null'&&item.code!==null)?item.code: '-';
        item['name'] = (_.has(item,'name')&&item.name !== 'null'&&item.name!==null)?item.name: '-';
        item['address'] = (_.has(item,'address')&&item.address !== 'null'&&item.address!==null)?item.address: '-';
        item['tel'] = (_.has(item,'tel')&&item.tel !== 'null'&&item.tel!==null)?item.tel: '-';
        
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
    this.props.partnerFetch();
    this.setLanguage();
  }

  componentDidMount(){
    this.setState({data: this.props.partners.data});
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.data !== nextProps.partners.data) {
      this.setData(nextProps.partners.data);
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
          return <Redirect push to={'/admin/partners/'+this.state.id}/>;
       }
        return (
            <div>
                <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> <Lang name='Partners' />
                        <div className="card-header-actions">
                           <Lang name="Partners" /> <Badge color="primary">{this.state.data.length}</Badge> <Lang name="Item(s)" />
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
    partners: state.partners
  }
}

export default connect(mapStateToProps,{ partnerFetch })(Partners)
