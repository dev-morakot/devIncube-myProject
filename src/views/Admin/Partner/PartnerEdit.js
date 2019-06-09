import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter } from 'reactstrap';
import Lang from './../../../components/Lang/Lang';
import i18n from './../../../i18n';
import _ from 'lodash';

 class PartnerEdit extends Component {
    
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
                            <CardHeader><Lang name="Edit Partner" /></CardHeader>
                            <CardBody>

                                Partner edit
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PartnerEdit;
