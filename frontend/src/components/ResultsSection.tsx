import React from "react";
import { Card, Button, ButtonGroup, Badge } from "react-bootstrap";
import { Filters } from "../models/filters.model";

type ResultsSectionProps = {
  title: string;
  content: string;
  filters: Filters | null;
  onCreateNew?: () => void;
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  title,
  content,
  filters,
  onCreateNew,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    // You can add a toast notification here
    alert("נשמר ללוח!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: content,
      });
    } else {
      handleCopy();
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; direction: rtl; text-align: right; }
              h1 { color: #0d6efd; }
              .meta { color: #6c757d; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            ${
              filters?.topic || filters?.style
                ? `<div class="meta">${
                    filters?.topic ? `נושא: ${filters?.topic}` : ""
                  } ${filters?.parasha ? `| פרשה: ${filters?.parasha}` : ""} ${
                    filters?.style ? `| סגנון: ${filters?.style}` : ""
                  }</div>`
                : ""
            }
            <div>${content.replace(/\n/g, "<br>")}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="results-section-container">
      <Card className="shadow-lg border-0 results-card">
        <Card.Header className="bg-success text-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-0 flex-grow-1 w-100 w-md-auto text-center text-md-end">
              {title}
            </h4>
            <ButtonGroup className="flex-shrink-0 justify-content-center w-100 w-md-auto results-buttons">
              <Button
                variant="info"
                size="sm"
                onClick={onCreateNew}
                title="צור דבר תורה חדש"
              >
                ✨ צור חדש
              </Button>

              <Button
                variant="light"
                size="sm"
                onClick={handleCopy}
                title="העתק"
              >
                📋 העתק
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleShare}
                title="שתף"
              >
                🔗 שתף
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleDownload}
                title="הורד"
              >
                ⬇️ הורד
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handlePrint}
                title="הדפס"
              >
                🖨️ הדפס
              </Button>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body className="p-5">
          <div className="dvar-torah-content mx-auto">{content}</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResultsSection;
