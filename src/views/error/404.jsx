import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Security Alert" isOption>
            <p>
              You are not authorized. Access denied.
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
