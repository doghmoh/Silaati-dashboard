import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BootstrapTable = () => {



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


  const paginated = wilayas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    onItemsPerPageChange(e);
  };
  return (
    <React.Fragment>
      <Row>
      <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Products List</Card.Title>
              <Form inline className="float-right">
                <Form.Label className="mr-2">Items per page:</Form.Label>
                <Form.Control
                  as="select"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="mr-sm-2"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Form.Control>
              </Form>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Wilaya Code</th>
                    <th>Wilaya Name</th>
                    <th>
                      <button
                        className="sort-button"
                        onClick={() => handleSort('supplier')}
                      >
                        {sortBy === 'supplier' && (
                          <span >
                            {sortOrder === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </button>
                      Supplier
                    </th>
                    <th>
                      <button
                        className="sort-button"
                        onClick={() => handleSort('retailer')}
                      >
                        {sortBy === 'retailer' && (
                          <span>
                            {sortOrder === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </button>
                      Retailer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(wilaya => (
                    <tr key={wilaya.wilaya_name_ascii}>
                      <th scope="row">{wilaya.wilayacode}</th>
                      <td>{wilaya.wilayaname}</td>
                      <td>{wilaya.supplier}</td>
                      <td>{wilaya.retailer}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                {[...Array(Math.ceil(wilayas.length / itemsPerPage)).keys()].map(number => (
                  <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                    {number + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </React.Fragment>
  );
};

export default BootstrapTable;
