import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Loader from "./Loader";
import logo from "../assets/images/app-logo.png";

interface FiltersPanelProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isLoading, onSubmit }) => {
  return (
    <div className="filters-panel-container">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          צור דבר תורה מותאם אישית בקליק
        </h2>

        <p className="text-muted">
          {" "}
          wge twejh מחר שבת ועוד אין לך דבר תורה מוכן? הגעת למקום הנכון!
        </p>
        <p className="text-muted">
          בחר פרשה או משהו אחר וצור דבר תורה בהתאם למגוון רחב של פילטרים
        </p>

        <img alt="logo" src={logo} className="header__logo-img" />
      </div>

      <Card className="p-4 shadow-lg border-0 filters-card">
        <Form onSubmit={onSubmit}>
          <Row className="g-3 g-md-4 justify-content-center">
            <Col xs={12} sm={10} md={6} lg={5}>
              <Form.Group controlId="parasha">
                <Form.Label className="fw-semibold mb-2">פרשה</Form.Label>
                <Form.Select
                  name="parasha"
                  defaultValue="לך לך"
                  className="form-select-lg"
                  size="lg"
                >
                  <option value="לך לך">לך לך</option>
                  <option value="וירא">וירא</option>
                  <option value="חיי שרה">חיי שרה</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} sm={10} md={6} lg={5}>
              <Form.Group controlId="commentator">
                <Form.Label className="fw-semibold mb-2">מפרש</Form.Label>
                <Form.Select
                  name="commentator"
                  className="form-select-lg"
                  size="lg"
                >
                  <option value="">בחר פרשן (אופציונלי)</option>
                  <option value='רש"י'>רש"י</option>
                  <option value='רמב"ן'>רמב"ן</option>
                  <option value="ספורנו">ספורנו</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4 text-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="px-5 py-2"
              disabled={isLoading}
            >
              {isLoading ? "יוצר..." : "צור דבר תורה"}
            </Button>
          </div>
        </Form>

        {isLoading && <Loader message="יוצר את דבר התורה שלך..." />}
      </Card>
    </div>
  );
};

export default FiltersPanel;
