import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';

 class PartnerDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Lang: {},
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
                    <Col xl='12'>
                        <Card>
                            <CardHeader><Lang name="Partner Detail" /></CardHeader>
                            <CardBody>

                                Partner detail
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PartnerDetail;
