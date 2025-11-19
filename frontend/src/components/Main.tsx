import React, { useState } from "react";
import FiltersPanel from "./FiltersPanel";
import ResultsSection from "./ResultsSection";
import { Filters } from "../models/filters.model";
import { DvarTorahResult } from "../models/dvarTorah.model";
import ConfirmModal from "./ConfirmModal";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DvarTorahResult | null>(null);
  const [submittedFilters, setSubmittedFilters] = useState<Filters | null>(
    null
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCreateNew = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCreateNew = () => {
    setResult(null);
    setSubmittedFilters(null);
    setShowConfirmModal(false);
  };

  const handleCancelCreateNew = () => {
    setShowConfirmModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get filter values from form only on submit
    const formData = new FormData(e.currentTarget);
    const filters: Filters = {
      topic: formData.get("topic") as string,
      style: formData.get("style") as string,
      length: parseInt(formData.get("length") as string),
    };

    // Only include parasha if topic is "פרשת שבוע"
    const parasha = formData.get("parasha") as string;
    if (parasha) {
      filters.parasha = parasha;
    }

    setSubmittedFilters(filters);

    console.log("Filters:", filters);

    try {
      // the response should contain a file, and a content as string.
      const response = await fetch(
        "https://localhost:7061/api/Torah/generate-drasha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Drasha response from openAI:", result);

      // // Get the file from the response
      // const blob = await response.blob();

      // // Extract filename from Content-Disposition header or use default
      // const contentDisposition = response.headers.get("Content-Disposition");
      // let fileName = "dvar-torah.docx";
      // if (contentDisposition) {
      //   const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      //   if (fileNameMatch) {
      //     fileName = fileNameMatch[1];
      //   }
      // }

      // // Create a download link and trigger download
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = fileName;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(url);

      // console.log("File downloaded successfully:", fileName);

      // Display visual result content with title
      let title = `דבר תורה - ${filters.topic}`;
      if (filters.parasha) {
        title = `דבר תורה לפרשת ${filters.parasha}`;
      }

      const resultToShow: DvarTorahResult = {
        title: title,
        content: result.result,
      };

      setResult(resultToShow);
      console.log("D'var Torah generated and downloaded!");
    } catch (error) {
      console.error("Error generating D'var Torah:", error);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {result ? (
              <ResultsSection
                title={result.title}
                content={result.content}
                filters={submittedFilters}
                onCreateNew={handleCreateNew}
              />
            ) : (
              <FiltersPanel isLoading={isLoading} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmModal
          title="אישור יצירת דבר תורה חדש"
          message="האם אתה בטוח שברצונך ליצור דבר תורה חדש? דבר התורה הנוכחי יאבד ולא ניתן יהיה לשחזר אותו."
          confirmText="כן, צור חדש"
          cancelText="ביטול"
          onConfirm={handleConfirmCreateNew}
          onCancel={handleCancelCreateNew}
        />
      )}
    </div>
  );
};

export default Main;
