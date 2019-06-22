import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Button, CardHeader, CardFooter,  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { productDelete, productUpdate, productFetch } from './../../../actions';
import { formatDateTime } from './../../../lib/_functions';
import Swal from 'sweetalert2';

 class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
            id: this.props.match.params.id,
            pkColumn: 'id',
            data: {},
            back: false,
            toProductEdit: false
        }
    }

    setData(data) {
        console.log('setData', data);
        let prod = this.state.data;
        prod.id = data.id;
        prod.code = data.code;
        prod.name = data.name;
        prod.category = data.category;
        prod.price = data.price;
        prod.unit = data.unit;
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
        if(_.findIndex(this.props.products.data, function(o) { return o[pkColumn] === id; })>=0) {
            this.setData(this.props.products.data[_.findIndex(this.props.products.data, function(o) { return o[pkColumn] === id })]);
        } else {
            this.props.productFetch();
        }
        this.setLanguage();
    }

    componentWillReceiveProps(nextProps){
        if(!_.has(this.state.data,'code')&&nextProps.products.data.length>0){
            const pkColumn = this.state.pkColumn;
            const id = this.state.id;
            if(_.findIndex(nextProps.products.data, function(o) { return o[pkColumn] == id; })>=0){
                this.setData(nextProps.products.data[_.findIndex(nextProps.products.data, function(o) { return o[pkColumn] == id;})]);
            }
        }
        if(this.state.processType==='delete'){
          this.resultDelete(nextProps.products.message);
        }
      }

    deleteProduct(){
   

        Swal.fire({
          title: this.state.Lang['Are you sure?'],
          text: this.state.Lang['You will not be able to recover this product!'],
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: this.state.Lang['Yes, delete it!'],
          cancelButtonText: this.state.Lang['No, keep it']
        }).then((result) => {
          if (result.value) {
            
            Swal.fire({
                title: this.state.Lang['Deleted!'],
                text: this.state.Lang['Your product has been deleted.'],
                type: 'success'
            })
            this.setState({processType: 'delete'});
            if (typeof this.props.productDelete === 'function') {
              let delId = {
                  id: this.state.data.id
              }
              
              this.props.productDelete(delId);
             
            }
            
         
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              this.state.Lang['Cancelled'],
              this.state.Lang['Your product is safe'],
              'error'
            )
          }
        })
    
      }

      resultDelete(message) {
        this.setState({processType: ''});
        if(_.has(message,'error')||_.has(message,'errors')){
          if(_.has(message,'error')){
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Delete Hospital'],
              text: message.error,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          } else {
            Swal.fire({
              type: 'error',
              title: this.state.Lang['Delete Hospital'],
              text: message.errors[0].msg,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }
        } else {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: this.state.Lang['Delete success'],
            text: this.state.Lang['Delete product success.'],
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 3000,
            onClose: () => {
              this.backPage();
            }
          }); 
        }
      }

    backPage() {
        this.setState({back: true});
    }

    toProductEdit() {
        this.setState({toProductEdit: true});
    }

    render() {
        if(this.state.back) {
            return <Redirect push to="/admin/products" />;
        }

        if(this.state.toProductEdit) {
            return <Redirect push to={`/admin/${this.props.match.path.split('/')[2]}/edit/${this.state.data.id}`}/>;
          }
        return (
            <div>
                <Row>
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Product Detail" />
                            <div className="card-header-actions">
                                <Button onClick={this.toProductEdit.bind(this)} color="primary"><Lang name="Edit" /></Button>{ '   ' }
                                <Button type="button" onClick={this.deleteProduct.bind(this)} color="danger" ><i className="fa fa-trash"></i> <Lang name="Delete" /></Button>
                            </div>
                            </CardHeader>
                            
                            <CardBody>

                                <ListGroup>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Product Code" />: {this.state.data.code}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Product Name" />:  {this.state.data.name}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Category" />:  {this.state.data.category}</ListGroupItem>
                                    <ListGroupItem tag="a" href="#" action><Lang name="Price" />: {this.state.data.price}</ListGroupItem>
                                    <ListGroupItem disabled tag="a" href="#" action><Lang name="Unit" />: {this.state.data.unit}</ListGroupItem>
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

function mapStateToProps(state){
    return {
        products: state.products
    }
}

export default connect(mapStateToProps,{productDelete, productFetch,productUpdate})(ProductDetail);
