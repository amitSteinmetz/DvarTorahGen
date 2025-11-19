import React, { useMemo, useState } from "react";
import { Form, Button, Row, Card } from "react-bootstrap";
import Loader from "./Loader";
import Filter from "./Filter";
import { TOPICS, PARASHOT, STYLES, LENGTHS } from "../utils/hebrewConstants";

interface FiltersPanelProps {
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isLoading, onSubmit }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.selectedOptions[0]?.text ?? "");
  };
  const showParashaFilter = useMemo(
    () => selectedTopic === "פרשת שבוע",
    [selectedTopic]
  );

  return (
    <div className="filters-panel-container">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary mb-3">
          צור דבר תורה מותאם אישית בקליק
        </h2>

        <p className="text-muted">
          מחר שבת ועוד אין לך דבר תורה מוכן? הגעת למקום הנכון!
        </p>
        <p className="text-muted">בחר נושא וסגנון וצור דבר תורה מותאם עבורך</p>
      </div>

      <Card className="p-4 shadow-lg border-0 filters-card">
        <Form onSubmit={onSubmit}>
          <Row className="g-3 g-md-4 justify-content-center">
            <Filter
              controlId="topic"
              label="נושא"
              name="topic"
              options={TOPICS}
              placeholder="בחר נושא"
              onChange={handleTopicChange}
            />

            {showParashaFilter && (
              <Filter
                controlId="parasha"
                label="בחר פרשה"
                name="parasha"
                options={PARASHOT}
                placeholder="בחר פרשה"
              />
            )}

            <Filter
              controlId="style"
              label="סגנון"
              name="style"
              options={STYLES}
              placeholder="בחר סגנון"
            />

            <Filter
              controlId="length"
              label="אורך"
              name="length"
              options={LENGTHS}
              placeholder="בחר אורך"
            />
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

// Chassidic, Topical, Analytical, Mussar
