import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import TableView from './../../../components/TableView';

class Partners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            pkColumn: 'partnerCode',
            tableHeader: 'PartnerName',
            column: [
                {
                    name: 'partnerName', label: 'Partner Name'
                },
                {
                    name: 'address', label: 'Partner Address'
                }
            ],
            data: [
                {
                    name: 'partnerA', label: 'Google Inc.', address: '101/10 RamaII Rd. Bangkok Thailand'
                },
                {
                    name: 'partnerB', label: 'Microsoft', address: '29/111 RamaIV Rd. Bangkok Thailand'
                }
            ],
            rowclick: this.props.match.path,
        }
    }

    setLanguage() {
        if (_.has(i18n, 'language')) {
            this.setState({ Lang: i18n.store.data[i18n.language].translation });
        }
    }

    setData(dataTmp) {
        if (_.isArray(dataTmp)) {
            this.setState({
                data: dataTmp.map((item) => {
                    item['partnerName'] = item.label
                    item['address'] = item.address
                    return item;
                })
            })
        }
    }

    componentWillMount() {
        this.setLanguage();
        this.setData(this.state.data)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" xl='12'>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> <Lang name='Partner' />
                                <div className="card-header-actions">
                                    <Lang name="Partner" />  <Lang name="Item(s)" />
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

export default Partners;