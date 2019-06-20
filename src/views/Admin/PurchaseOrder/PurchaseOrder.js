import React, { Component } from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import TableView from './../../../components/TableView';
import { connect } from 'react-redux';

 class PurchaseOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            pkColumn: 'prodCode',
            tableHeader: 'Products',
            column: [
              {name: 'productName', label: 'Product Name'}
            ],
            data: [
              {name: 'product',label: 'stsfsdf'}
            ],
            rowclick: this.props.match.path,
        }
      }
    
    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        this.setLanguage();
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> <Lang name='Cerate Purchse Order' />
                                <div className="card-header-actions">
                                <Lang name="The Purchase Order (International)" /> <Badge color="primary">{'2'}</Badge> <Lang name="Item(s)" />
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

const mapStateToProps = (state) => {
    console.log('fb',state);
    return { loader: state.loader, auth: state.auth}
  }
export default connect(mapStateToProps,{}) (PurchaseOrder);
