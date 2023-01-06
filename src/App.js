import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import AddedSchema from "./components/addedSchema";
import axios from "axios";

const fieldData = [
  { field: "First Name", value: "first_name", isSelect: false },
  { field: "Last Name", value: "last_name", isSelect: false },
  { field: "Gender", value: "'gender", isSelect: false },
  { field: "Age", value: "age", isSelect: false },
  { field: "Account Name", value: "account_name", isSelect: false },
  { field: "City", value: "city", isSelect: false },
  { field: "State", value: "state", isSelect: false },
];

function App() {
  const [schemasData, setSchemasData] = useState(fieldData);
  const [segmentName, setSegmentName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addedSchema, setAddedSchema] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState({});
  const [isSlectSchema, setIsSelectSchema] = useState();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCancel = () => {
    setAddedSchema([]);
    setSelectedSchema({});
    setShowModal(false);
  };

  const handleChangeSchema = (e) => {
    const select = e.target;
    const value = select.value;
    const desc = select.selectedOptions[0].text;
    setSelectedSchema({ [value]: desc });
    setIsSelectSchema(schemasData.map((item) => item.value).indexOf(value));
  };

  const addNewSchema = () => {
    let segmentData = [...fieldData];
    segmentData[isSlectSchema].isSelect = true;
    setSchemasData(segmentData);
    setAddedSchema([...addedSchema, selectedSchema].reverse());
  };

  const handleSaveSegment = () => {
    const createdSegment = {
      segment_name: segmentName,
      schema: addedSchema,
    };
    const response = axios.post(
      "https://webhook.site/token/7d63959e-4fec-49bd-90dc-a4615722825e/actions",
      createdSegment
    );
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h4>View Audience</h4>
        <Button className="save-btn" onClick={handleShow}>
          Save segment
        </Button>
      </div>
      <Offcanvas show={showModal} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                d="M14 18.8 7.2 12 14 5.2l2.2 2.2-4.6 4.6 4.6 4.6Z"
                fill="#fff"
              />
            </svg>{" "}
            Saving Segment
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Enter the name of the segment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name of the segment"
                    onChange={(e) => setSegmentName(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <p>
                To save your segment, you need to add the schemas tobuild the
                query
              </p>
              <ul className="traits">
                <li>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                    >
                      <path
                        d="M10.021 16.812q-1.417 0-2.656-.531-1.24-.531-2.177-1.469-.938-.937-1.469-2.177-.531-1.239-.531-2.635 0-1.417.531-2.646.531-1.229 1.469-2.166.937-.938 2.177-1.469Q8.604 3.188 10 3.188q1.417 0 2.646.531 1.229.531 2.166 1.469.938.937 1.469 2.166.531 1.229.531 2.625 0 1.417-.531 2.656-.531 1.24-1.469 2.177-.937.938-2.166 1.469-1.229.531-2.625.531ZM10 16.438q2.688 0 4.573-1.876 1.885-1.874 1.885-4.562t-1.885-4.573Q12.688 3.542 10 3.542q-2.667 0-4.552 1.885Q3.562 7.312 3.562 10q0 2.667 1.876 4.552Q7.312 16.438 10 16.438Zm0 .062q-2.708 0-4.604-1.896T3.5 10q0-2.708 1.896-4.604T10 3.5q2.708 0 4.604 1.896T16.5 10q0 2.708-1.896 4.604T10 16.5Z"
                        fill="#03fc77"
                      />
                    </svg>{" "}
                    -User Traits
                  </span>
                </li>
                <li>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      width="20"
                    >
                      <path
                        d="M10.021 16.812q-1.417 0-2.656-.531-1.24-.531-2.177-1.469-.938-.937-1.469-2.177-.531-1.239-.531-2.635 0-1.417.531-2.646.531-1.229 1.469-2.166.937-.938 2.177-1.469Q8.604 3.188 10 3.188q1.417 0 2.646.531 1.229.531 2.166 1.469.938.937 1.469 2.166.531 1.229.531 2.625 0 1.417-.531 2.656-.531 1.24-1.469 2.177-.937.938-2.166 1.469-1.229.531-2.625.531ZM10 16.438q2.688 0 4.573-1.876 1.885-1.874 1.885-4.562t-1.885-4.573Q12.688 3.542 10 3.542q-2.667 0-4.552 1.885Q3.562 7.312 3.562 10q0 2.667 1.876 4.552Q7.312 16.438 10 16.438Zm0 .062q-2.708 0-4.604-1.896T3.5 10q0-2.708 1.896-4.604T10 3.5q2.708 0 4.604 1.896T16.5 10q0 2.708-1.896 4.604T10 16.5Z"
                        fill="#cc2f2f"
                      />
                    </svg>{" "}
                    -Group Traits
                  </span>
                </li>
              </ul>
              <div className="schema-section">
                <Row>
                  <AddedSchema
                    addedSchema={addedSchema}
                    schema={schemasData}
                    setAddedSchema={setAddedSchema}
                  />
                </Row>
              </div>
              <Row className="add-schema">
                <Col xl="1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    className="shema-svg"
                  >
                    <path
                      d="M10.021 16.812q-1.417 0-2.656-.531-1.24-.531-2.177-1.469-.938-.937-1.469-2.177-.531-1.239-.531-2.635 0-1.417.531-2.646.531-1.229 1.469-2.166.937-.938 2.177-1.469Q8.604 3.188 10 3.188q1.417 0 2.646.531 1.229.531 2.166 1.469.938.937 1.469 2.166.531 1.229.531 2.625 0 1.417-.531 2.656-.531 1.24-1.469 2.177-.937.938-2.166 1.469-1.229.531-2.625.531ZM10 16.438q2.688 0 4.573-1.876 1.885-1.874 1.885-4.562t-1.885-4.573Q12.688 3.542 10 3.542q-2.667 0-4.552 1.885Q3.562 7.312 3.562 10q0 2.667 1.876 4.552Q7.312 16.438 10 16.438Zm0 .062q-2.708 0-4.604-1.896T3.5 10q0-2.708 1.896-4.604T10 3.5q2.708 0 4.604 1.896T16.5 10q0 2.708-1.896 4.604T10 16.5Z"
                      fill="#737778"
                    />
                  </svg>
                </Col>
                <Col xl="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleChangeSchema}
                  >
                    <option>Add schema to segment</option>
                    {schemasData
                      ?.filter((schema) => !schema.isSelect)
                      .map((item) => (
                        <option value={item.value} data-name={item.field}>
                          {item.field}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
                <Col xl="2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    className="remove-btn"
                  >
                    <path d="M5.025 13.075V10.9h13.95v2.175Z" />
                  </svg>
                </Col>
                <a className="new-schema" onClick={addNewSchema}>
                  + Add new schema
                </a>
              </Row>
            </Row>
            <div className="footer">
              <Button className="shema-save" onClick={handleSaveSegment}>
                Save the segment
              </Button>
              <Button className="shema-cancel" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default App;
