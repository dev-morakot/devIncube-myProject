import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input,InputGroup,InputGroupAddon,Button } from 'reactstrap';
import history from './../history';
import _ from 'lodash';
import Lang from './Lang/Lang';
import i18n from './../i18n';
const style = {
    btnSearch: {
        background: '#ffffff',
        borderRight: 0
    }
}
class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        page: 1,
        pageLimit: 10,
        keyword: '',
        sort: {column: this.props.column[0].name, by: 'asc'},
        Lang: {}
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

  componentDidMount(){
    const { limit } = this.props;
    if('undefined' !== typeof limit){
        this.setState({pageLimit: limit});
    }
  }

  previousPage(){
      if(this.state.page<=1) {
        return (
            <PaginationItem disabled>
                <PaginationLink previous tag="button"></PaginationLink>
            </PaginationItem>
          )
      } else {
        return (
            <PaginationItem>
                <PaginationLink previous tag="button" onClick={this.selectPreviousPage.bind(this)}></PaginationLink>
            </PaginationItem>
          )
      }
  }

  pagination(){
    let html = [];
    const { header, data, column ,btn} = this.props;
    let total = data.filter((item,key)=>{
        if(''!==this.state.keyword){
            let checkMatch = false;
            column.map((col,ckey)=>{
                if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                    checkMatch = true;
                }
            });
            if(checkMatch){
                return item;
            } else {
                return false;
            }
        } else {
            return item;
        }
    }).length;
    for(let i =0; i < (_.ceil(total/this.state.pageLimit)); i++) {
        if((i+1)==this.state.page){
            html.push(
                <PaginationItem key={(i+1)} onClick={this.selectPage.bind(this,(i+1))} active>
                    <PaginationLink tag="button">{(i+1)}</PaginationLink>
                </PaginationItem>
            );
        } else {
            if(this.firstPagination(i)||this.rangPagination(i,total)||this.lastPagination(i,total)){
                html.push(
                    <PaginationItem key={(i+1)} onClick={this.selectPage.bind(this,(i+1))}>
                        <PaginationLink tag="button">{(i+1)}</PaginationLink>
                    </PaginationItem>
                );
            }
        }
    }
    return html;
  }

  firstPagination(i){
    if((i+1)==1){
      return true;
    }
    return false;
  }

  rangPagination(i,total){
    let numCheck = 10;
    //page < numCheck
    if(this.state.page<numCheck&&(i+1)<=(2*numCheck)){
      return true;
    }
    //page = numCheck
    else if(this.state.page===numCheck&&((i+1)>=this.state.page-numCheck)&&((i+1)<=this.state.page+numCheck)){
      return true;
    }
    //page > numCheck
    else if(this.state.page>numCheck&&((i+1)>this.state.page-numCheck)&&((i+1)<this.state.page+numCheck)){
      return true;
    }
    //total - page < numCheck
    else if((total-this.state.page)<numCheck&&(i+1)>(this.state.page-numCheck-(numCheck-(total-this.state.page)))){
      return true;
    }
    return false;
  }

  lastPagination(i,total){
    if((i+1)==_.ceil(total/this.state.pageLimit)){
      return true;
    }
    return false;
  }

  nextPage(){
    const { header, data, column ,btn} = this.props;
    let total = data.filter((item,key)=>{
        if(''!==this.state.keyword){
            let checkMatch = false;
            column.map((col,ckey)=>{
                if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                    checkMatch = true;
                }
            });
            if(checkMatch){
                return item;
            } else {
                return false;
            }
        } else {
            return item;
        }
    }).length;
    if(this.state.page>=(_.ceil(total/this.state.pageLimit))) {
        return (
            <PaginationItem disabled>
                <PaginationLink next tag="button"></PaginationLink>
            </PaginationItem>
          )
      } else {
        return (
            <PaginationItem>
                <PaginationLink next tag="button" onClick={this.selectNextPage.bind(this)}></PaginationLink>
            </PaginationItem>
          )
      }
  }

  selectPreviousPage(){
    this.setState({page: (this.state.page-1)});
  }

  selectPage(page){
    this.setState({page: page});
  }

  selectNextPage(){
    this.setState({page: (this.state.page+1)});
  }

  handleSearch = e => {
    this.setState({keyword: e.target.value});
    this.setState({page: 1});
  }

  sortByColumn(column){
    let sort = this.state.sort;
    if(sort.column === column){
        sort.column = column;
        if(sort.by === 'asc'){
            sort.by = 'desc';
        } else {
            sort.by = 'asc';
        }
    } else {
        sort.column = column;
        sort.by = 'asc';
    }
    this.setState({sort: sort});
  }

  render() {
    const { header, data, column, rowclick, pk ,btn} = this.props;
    const dataTable = _.orderBy(data, [this.state.sort.column],[this.state.sort.by]);
    return (
      <div className="table-view">

                        <Row>
                            <Col md="6" align="left">
                                {((_.has(btn,'add')&&false!==btn.add)||(!_.has(btn,'add')))&&
                                <Link to={rowclick+'/add'}>
                                    <Button type="button" color="success"><i className="fa fa-plus-circle"></i> <Lang name="Add"/></Button>
                                </Link>}
                            </Col>
                            <Col md="6">

                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Button type="button" style={style.btnSearch}  disabled><i className="fa fa-search"></i></Button>
                                    </InputGroupAddon>
                                    <Input type="text" id="input-keyword" name="input-keyword" placeholder={this.state.Lang['Enter keyword']} value={this.state.keyword} onChange={e=>this.handleSearch(e)}/>
                                </InputGroup>
                            </Col>
                        </Row>
                        <br/>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    {column.map((item,key)=>{
                                        return (
                                            <th key={key} onClick={this.sortByColumn.bind(this,item.name)} className="table-haeder-pointer" style={(_.has(item,'width')&&parseInt(item.width)>0)?{width: item.width}:{}}>
                                                <Lang name={item.label}/>&nbsp;
                                                {this.state.sort.column===item.name&&this.state.sort.by==='asc'&&
                                                    <i className="fa fa-sort-amount-asc"></i>}
                                                {this.state.sort.column===item.name&&this.state.sort.by==='desc'&&
                                                    <i className="fa fa-sort-amount-desc"></i>}
                                            </th>
                                        )
                                    })}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.filter((item,key)=>{
                                    if(''!==this.state.keyword){
                                        let checkMatch = false;
                                        column.map((col,ckey)=>{
                                            if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                                checkMatch = true;
                                            }
                                        });
                                        if(checkMatch){
                                            return item;
                                        } else {
                                            return false;
                                        }
                                    } else {
                                        return item;
                                    }
                                }).filter((item,key)=>{
                                    if(key>(((this.state.page-1)*this.state.pageLimit)-1)&&key<=((this.state.page*this.state.pageLimit)-1)){
                                        return item;
                                    }
                                }).map((item,key)=>{
                                    return (
                                        <tr key={key}>
                                            {column.map((col,ckey)=>{
                                                return (
                                                    <td key={ckey}>{item[col.name]}</td>
                                                )
                                            })}
                                            <td>
                                                <Link to={rowclick+'/'+item[pk]}>
                                                    <Button type="button" color="primary"><i className="fa fa-eye"></i> View</Button>
                                                </Link>
                                                &nbsp;
                                                <Link to={rowclick+'/edit/'+item[pk]}>
                                                    <Button type="button" color="danger"><i className="fa fa-pencil-square-o"></i> Edit</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                                {dataTable.filter((item,key)=>{
                                    if(''!==this.state.keyword){
                                        let checkMatch = false;
                                        column.map((col,ckey)=>{
                                            if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                                checkMatch = true;
                                            }
                                        });
                                        if(checkMatch){
                                            return item;
                                        } else {
                                            return false;
                                        }
                                    } else {
                                        return item;
                                    }
                                }).length<=0&&
                                <tr>
                                    <td colSpan={column.length} align="center"> <Lang name="No data available"/></td>
                                </tr>}
                            </tbody>
                        </Table>
                        <Pagination size="sm">
                            {this.previousPage()}
                            {this.pagination()}
                            {this.nextPage()}
                        </Pagination>
                        {dataTable.filter((item,key)=>{
                            if(''!==this.state.keyword){
                                let checkMatch = false;
                                column.map((col,ckey)=>{
                                    if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                        checkMatch = true;
                                    }
                                });
                                if(checkMatch){
                                    return item;
                                } else {
                                    return false;
                                }
                            } else {
                                return item;
                            }
                        }).length>0&&
                        <div><Lang name="Showing"/> {(((this.state.page-1)*this.state.pageLimit)+1)} <Lang name="to"/> {(dataTable.filter((item,key)=>{
                            if(''!==this.state.keyword){
                                let checkMatch = false;
                                column.map((col,ckey)=>{
                                    if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                        checkMatch = true;
                                    }
                                });
                                if(checkMatch){
                                    return item;
                                } else {
                                    return false;
                                }
                            } else {
                                return item;
                            }
                        }).length>=((this.state.page)*this.state.pageLimit))?((this.state.page)*this.state.pageLimit):dataTable.filter((item,key)=>{
                            if(''!==this.state.keyword){
                                let checkMatch = false;
                                column.map((col,ckey)=>{
                                    if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                        checkMatch = true;
                                    }
                                });
                                if(checkMatch){
                                    return item;
                                } else {
                                    return false;
                                }
                            } else {
                                return item;
                            }
                        }).length} <Lang name="of"/> {dataTable.filter((item,key)=>{
                            if(''!==this.state.keyword){
                                let checkMatch = false;
                                column.map((col,ckey)=>{
                                    if(!_.isUndefined(item[col.name])&&item[col.name].toString().toLowerCase().search(this.state.keyword.toLowerCase())>=0){
                                        checkMatch = true;
                                    }
                                });
                                if(checkMatch){
                                    return item;
                                } else {
                                    return false;
                                }
                            } else {
                                return item;
                            }
                        }).length} <Lang name="entries"/></div>}

      </div>
    );
  }
}

export default TableView;
