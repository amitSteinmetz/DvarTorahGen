import React from "react";
import { Form, Col } from "react-bootstrap";

interface FilterProps {
  controlId: string;
  label: string;
  name: string;
  options: Readonly<Record<string, string | number>>;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  colProps?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const Filter: React.FC<FilterProps> = ({
  controlId,
  label,
  name,
  options,
  placeholder,
  onChange,
  required = true,
  colProps = { xs: 12, sm: 10, md: 6, lg: 5 },
}) => {
  return (
    <Col {...colProps}>
      <Form.Group controlId={controlId}>
        <Form.Label className="fw-semibold mb-2">{label}</Form.Label>
        <Form.Select
          name={name}
          className="form-select-lg"
          size="lg"
          required={required}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {Object.entries(options).map(([label, value]) => (
            <option key={String(value)} value={value}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
  );
};

export default Filter;
