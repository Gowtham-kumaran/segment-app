import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";

export default function AddedSchema({ addedSchema, schema, setAddedSchema }) {
  let replaceField = [...addedSchema];
  const handleChange = (e) => {
    const select = e.target;
    const value = select.value;
    const desc = select.selectedOptions[0].text;
    const selectedSchema = { [value]: desc };
    replaceField.splice(0, 1, selectedSchema);
  };

  useEffect(() => {
    setAddedSchema(replaceField);
  }, [replaceField]);

  return (
    <>
      {addedSchema.length > 0 &&
        addedSchema?.map((item, index) => (
          <>
            <Col xl="1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                className="shema-svg"
              >
                <path
                  d="M10.021 16.812q-1.417 0-2.656-.531-1.24-.531-2.177-1.469-.938-.937-1.469-2.177-.531-1.239-.531-2.635 0-1.417.531-2.646.531-1.229 1.469-2.166.937-.938 2.177-1.469Q8.604 3.188 10 3.188q1.417 0 2.646.531 1.229.531 2.166 1.469.938.937 1.469 2.166.531 1.229.531 2.625 0 1.417-.531 2.656-.531 1.24-1.469 2.177-.937.938-2.166 1.469-1.229.531-2.625.531ZM10 16.438q2.688 0 4.573-1.876 1.885-1.874 1.885-4.562t-1.885-4.573Q12.688 3.542 10 3.542q-2.667 0-4.552 1.885Q3.562 7.312 3.562 10q0 2.667 1.876 4.552Q7.312 16.438 10 16.438Zm0 .062q-2.708 0-4.604-1.896T3.5 10q0-2.708 1.896-4.604T10 3.5q2.708 0 4.604 1.896T16.5 10q0 2.708-1.896 4.604T10 16.5Z"
                  fill={index !== 0 ? "#cc2f2f" : "#03fc77"}
                />
              </svg>
            </Col>
            <Col xl="9">
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                disabled={index !== 0}
              >
                <option>{Object.values(item)}</option>
                {schema
                  .filter(
                    (selected) =>
                      selected.value !== Object.keys(item)[0] &&
                      !selected.isSelect
                  )
                  .map((data) => (
                    <option value={data.value}>{data.field}</option>
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
          </>
        ))}
    </>
  );
}
