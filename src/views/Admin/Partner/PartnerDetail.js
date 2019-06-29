import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter ,ListGroup, ListGroupItem, Button } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { partnerDelete, partnerUpdate, partnerFetch } from './../../../actions';
import { formatDateTime } from './../../../lib/_functions';
import Swal from 'sweetalert2';

 class PartnerDetail extends Component {
    
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
        let prod = this.state.data;
        prod.id = data.id;
        prod.code = data.code;
        prod.name = data.name;
        prod.address = data.address;
        prod.tel = data.tel;
        prod.tax = data.tax;
        prod.fax = data.fax;
        prod.mobile = (_.has(data,'mobile')&&data.mobile!=='null'&data.mobile!==''&&data.mobile!==null&&data.mobile!==undefined)?data.mobile:'-';
        prod.createAt = data.createAt;
        prod.active = (data.active === '1' || data.active ===1)?'ใช่':'ไม่ใช่';
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
        if(_.findIndex(this.props.partners.data, function(o) { return o[pkColumn] === id; })>=0) {
            this.setData(this.props.partners.data[_.findIndex(this.props.partners.data, function(o) { return o[pkColumn] === id })]);
        } else {
            this.props.partnerFetch();
        }
        this.setLanguage();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'code')&&nextProps.partners.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.partners.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.partners.data[_.findIndex(nextProps.partners.data, function(o) { return o[pkColumn] == id;})]);
            }
        }
        if(this.state.processType==='delete'){
          this.resultDelete(nextProps.partners.message);
        }
    }

    deletePartner(){
   

        Swal.fire({
          title: this.state.Lang['Are you sure?'],
          text: this.state.Lang['You will not be able to recover this partner!'],
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: this.state.Lang['Yes, delete it!'],
          cancelButtonText: this.state.Lang['No, keep it']
        }).then((result) => {
          if (result.value) {
            
            Swal.fire({
                title: this.state.Lang['Deleted!'],
                text: this.state.Lang['Your partner has been deleted.'],
                type: 'success'
            })
            this.setState({processType: 'delete'});
            if (typeof this.props.partnerDelete === 'function') {
              let delId = {
                  id: this.state.data.id
              }
              
              this.props.partnerDelete(delId);
             
            }
            
         
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              this.state.Lang['Cancelled'],
              this.state.Lang['Your partner is safe'],
              'error'
            )
          }
        })
    
      }



    resultDelete(message) {
        this.setState({processType: ''});
        Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Delete success'],
            text: this.state.Lang['Delete partner success.'],
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

    toPartnerEdit() {
        this.setState({toEdit: true});
    }
    render() {

        if(this.state.back) {
            return <Redirect push to="/admin/partners" />;
        }

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
                                <Button onClick={this.toPartnerEdit.bind(this)} color="primary"><Lang name="Edit" /></Button>{ '   ' }
                                <Button type="button" onClick={this.deletePartner.bind(this)} color="danger" ><i className="fa fa-trash"></i> <Lang name="Delete" /></Button>
                            </div>
                            </CardHeader>
                            <CardBody>

                                <ListGroup>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Partner Code" />: {this.state.data.code}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Partner Name" />:  {this.state.data.name}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Address" />:  {this.state.data.address}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="tel" />: {this.state.data.tel}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="mobile" />: {this.state.data.mobile}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="fax" />: {this.state.data.fax}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="tax" />: {this.state.data.tax}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="Active" />: {this.state.data.active}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="Create Date" />: {formatDateTime(this.state.data.createAt)}</ListGroupItem>
                                </ListGroup>
                            </CardBody>
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

export default connect(mapStateToProps,{partnerDelete, partnerUpdate, partnerFetch})(PartnerDetail);
