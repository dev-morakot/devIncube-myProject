import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import TableView from './../../../components/TableView';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Lang: {},
        pkColumn: 'prodCode',
        tableHeader: 'Products',
        column: [
          {name: 'productName', label: 'Product Name'},
          {name: 'test', label: 'Product Name'}
        ],
        data: [
          {name: 'product',label: 'stsfsdf'},
          {name: 'product1',label: 'test1'}
        ],
        rowclick: this.props.match.path,
    }
  }

  setLanguage(){
    if(_.has(i18n,'language')){
      this.setState({Lang: i18n.store.data[i18n.language].translation});
    }
  }

  setData(data) {
    let dataTmp = data;
    if(_.isArray(dataTmp)) {
      this.setState({data: dataTmp.map((item) => {
        item['productName'] = 'morakot';
        item['test'] = 'test';
        return item;
    })})
    }
  }

  componentWillMount(){
    this.setLanguage();
    this.setData(this.state.data)
  }
    render() {
        return (
            <div>
                <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> <Lang name='Products' />
                        <div className="card-header-actions">
                           <Lang name="Products" /> <Badge color="primary">{'2'}</Badge> <Lang name="Item(s)" />
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
                      />
                    </CardBody>
                </Card>
            </Col>
        </Row>
            </div>
        )
    }
}

export default (Products)
