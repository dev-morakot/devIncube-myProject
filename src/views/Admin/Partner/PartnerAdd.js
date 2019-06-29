import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Col,
    FormGroup,
    Input,
    Label,
    Row, } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {partnerFetch, partnerAdd } from './../../../actions';
import Swal from 'sweetalert2'

 class PartnerAdd extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            name: '',
            address: '',
            telephone: '',
            mobile: '',
            fax: '',
            code: '',
            tax: '',
            active: Boolean,
            back: false,
            processType: ''
        }
    }
     
     handleChange(event) {
        const { name, value } = event.target
        this.setState({[name]: value })
    }

    setLanguage(){
        if(_.has(i18n,'language')){
          this.setState({Lang: i18n.store.data[i18n.language].translation});
        }
      }
    
    componentWillMount(){
        this.setLanguage();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.processType == 'save') {
            this.resultPartner(nextProps.partners);
        }
    }

    saveAs = () => {
        let input = {
            code: this.state.code,
            name: this.state.name,
            address: this.state.address,
            tel: this.state.tel,
            tax: this.state.tax,
            mobile: this.state.mobile,
            fax: this.state.fax,
            active: this.state.active
        };
        console.log(input);
        this.setState({processType: 'save'});
        this.props.partnerAdd(input);
    }

    resultPartner(data) {
        this.setState({processType: ''});
        Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Add Partner'],
            text: this.state.Lang['Add partner success.'],
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000,
            onClose: () => {
              this.backPage();
            }
        }); 
    }

    backPage() {
        this.setState({back: true});
    }

    checkSave() {
        if(this.state.code!==''&&this.state.name!==''&&this.state.address!==''){
            return true;
        } else {
            return false;
        }
    }

    render() {

        if(this.state.back) {
            return <Redirect push to={'/admin/'+this.props.match.path.split('/')[2]} />;
        }
        return (
            <div>
                <Row>
                <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Create Partner" /></CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="name"><Lang name="Partner Code" /></Label>
                                            <Input type="text" name="code"
                                                value={this.state.code}
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
                                                value={this.state.name}
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
                                                value={this.state.address}
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
                                                value={this.state.tel}
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
                                                value={this.state.mobile}
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
                                                value={this.state.fax}
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
                                                value={this.state.tax}
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
                                                value={this.state.active}
                                                onChange={event => this.handleChange(event)}>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                {this.checkSave()?
                                <Button type="submit" onClick={()=>this.saveAs()} color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                :
                                <Button type="submit" disabled color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            }
                                
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        partners: state.partners
    }
}

export default connect(mapStateToProps, { partnerAdd, partnerFetch})(PartnerAdd);