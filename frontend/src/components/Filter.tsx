import React, { useMemo, useState, useEffect } from "react";
import { Form, Col, Dropdown } from "react-bootstrap";

interface FilterProps {
  controlId: string;
  label: string;
  name: string;
  options: Readonly<Record<string, string | number>>;
  placeholder: string;
  onChange?: (value: string, label: string) => void;
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
  const optionEntries = useMemo(() => Object.entries(options), [options]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedLabel("");
    setSelectedValue("");
  }, [options]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) {
      return optionEntries;
    }

    const searchLower = searchTerm.toLowerCase();
    return optionEntries.filter(([label, value]) => {
      const labelMatch = label.toLowerCase().includes(searchLower);
      const valueMatch = String(value).toLowerCase().includes(searchLower);
      return labelMatch || valueMatch;
    });
  }, [optionEntries, searchTerm]);

  const handleSelect = (label: string, value: string | number) => {
    const valueAsString = String(value);
    setSelectedLabel(label);
    setSelectedValue(valueAsString);
    setSearchTerm("");
    setIsOpen(false);
    onChange?.(valueAsString, label);
  };

  return (
    <Col {...colProps}>
      <Form.Group controlId={controlId}>
        <Form.Label className="fw-semibold mb-2">{label}</Form.Label>
        <Dropdown
          show={isOpen}
          onToggle={(next) => setIsOpen(next ?? false)}
          drop="down"
          className="filter-dropdown w-100"
          align="start"
        >
          <Dropdown.Toggle
            id={`${controlId}-dropdown`}
            className={`filter-dropdown-toggle w-100 ${
              selectedLabel ? "" : "placeholder"
            }`}
          >
            {selectedLabel || placeholder}
          </Dropdown.Toggle>

          <Dropdown.Menu className="filter-dropdown-menu w-100">
            <div className="dropdown-search-wrapper">
              <Form.Control
                type="text"
                placeholder="חפש..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dropdown-search-input"
                dir="rtl"
                autoFocus
              />
            </div>
            <div className="dropdown-options-scroll">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(([label, value]) => {
                  const valueAsString = String(value);
                  return (
                    <button
                      type="button"
                      key={valueAsString}
                      className={`dropdown-option ${
                        selectedValue === valueAsString ? "active" : ""
                      }`}
                      onClick={() => handleSelect(label, value)}
                    >
                      {label}
                    </button>
                  );
                })
              ) : (
                <div className="dropdown-no-results">לא נמצאו תוצאות</div>
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Form.Select
          name={name}
          className="d-none"
          value={selectedValue}
          required={required}
          onChange={() => undefined}
        >
          <option value="">{placeholder}</option>
          {optionEntries.map(([label, value]) => (
            <option key={String(value)} value={String(value)}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Col>
  );
};

export default Filter;
