import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Label, Button, Form, Input, FormGroup, CardFooter } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { partnerFetch, partnerUpdate  } from './../../../actions';
import Swal from 'sweetalert2'

 class PartnerEdit extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            id: this.props.match.params.id,
            pkColumn: 'id',
            data: {},
            back: false,
            processType: '',
        }
    }

    setData(data) {
        console.log('setData', data);
        let prod = this.state.data;
        prod.id = data.id;
        prod.code = data.code;
        prod.name = data.name;
        prod.address = data.address;
        prod.tel = data.tel;
        prod.tax = data.tax;
        prod.fax = data.fax;
        prod.mobile = data.mobile;
        prod.createAt = data.createAt;
        prod.active = data.active;
        this.setState({data: prod});
    }

    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        const pkColumn = this.state.pkColumn;
        const id = this.state.id;
        if(_.findIndex(this.props.partners.data, function(o) { return o[pkColumn] == id; })>=0){
            this.setData(this.props.partners.data[_.findIndex(this.props.partners.data, function(o) { return o[pkColumn] == id;})]);
         
        } else {
           
           this.props.partnerFetch();
           
        }
          this.setLanguage();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'id')&&nextProps.partners.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.partners.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.partners.data[_.findIndex(nextProps.partners.data, function(o) { return o[pkColumn] == id;})]);
            
            }
        }
        if(this.state.processType==='update'){
            this.resultUpdateProduct(nextProps.partners.message);          
        }

    }


    resultUpdateProduct(message){
        this.setState({processType: ''});
        if(_.has(message,'error')||_.has(message,'errors')){
          if(_.has(message,'error')){
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Update Partner'],
              text: message.error,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          } else {
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Update Partner'],
              text: message.errors[0].msg,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }
        } else {
            Swal.fire({
                position: 'center',
                type: 'success',
                title: this.state.Lang['Update Partner'],
                text: this.state.Lang['Update Partner success.'],
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                timer: 3000,
                onClose: () => {
                  
                    this.setState({back: true});
                  
                }
            });
        }
        
    }

    handleChange = e => {
        const {name ,value} = e.target;
        let data = this.state.data;
        data[name] = value;
        this.setState({data: data});
      }

    SaveAS = () => {
        let input = {
            id: this.state.data.id,
            code: this.state.data.code,
            name: this.state.data.name,
            address: this.state.data.address,
            tel: this.state.data.tel,
            mobile: this.state.data.mobile,
            fax: this.state.data.fax,
            tax: this.state.data.tax,
            active: this.state.data.active
        }
        console.log('save',input)
        this.setState({processType: 'update'});
        this.props.partnerUpdate(input);
    }


    render() {

        if (this.state.back) {
            return <Redirect push to={'/admin/'+this.props.match.path.split('/')[2]}/>;
          }
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Edit Partner" /></CardHeader>
                            <CardBody>

                            <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="Partner Code" /></Label>
                                            <Input type="text" name="code"
                                                value={this.state.data.code}
                                                placeholder={this.state.Lang['Please enter your partner code']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="Partner Name" /></Label>
                                            <Input type="text" name="name"
                                                value={this.state.data.name}
                                                placeholder={this.state.Lang['Please enter your partner name']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    
                                </Row>

                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="Address" /></Label>
                                            <Input type="textarea" rows='4' name="address"
                                                value={this.state.data.address}
                                                placeholder={this.state.Lang['Please enter your address']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="tel" /></Label>
                                            <Input type="text" name="tel"
                                                value={this.state.data.tel}
                                                placeholder={this.state.Lang['Please enter your telephone']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                    
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="mobile" /></Label>
                                            <Input type="text" name="mobile"
                                                value={this.state.data.mobile}
                                                placeholder={this.state.Lang['Please enter your mobile phone']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="fax" /></Label>
                                            <Input type="text" name="fax"
                                                value={this.state.data.fax}
                                                placeholder={this.state.Lang['Please enter your fax']}
                                                onChange={event => this.handleChange(event)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    
                    
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="tax" /></Label>
                                            <Input type="text" name="tax"
                                                value={this.state.data.tax}
                                                placeholder={this.state.Lang['Please enter your tax']}
                                                onChange={event => this.handleChange(event)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="Active" /></Label>
                                            <Input type="select" name="active"
                                                value={this.state.data.active}
                                                onChange={event => this.handleChange(event)}>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button type="button" onClick={()=>this.SaveAS()}  color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        partners: state.partners
    }
}

export default connect(mapStateToProps,{partnerFetch, partnerUpdate})(PartnerEdit);
