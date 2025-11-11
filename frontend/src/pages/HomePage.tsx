import React, { useState } from "react";
import FiltersPanel from "../components/FiltersPanel";
import ResultsSection from "../components/ResultsSection";
import Header from "../components/Header";
import ConfirmModal from "../components/ConfirmModal";
import { Filters } from "../models/filters.model";
import { DvarTorahResult } from "../models/dvarTorah.model";

const HomePage = () => {
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

  const handleGenerateDummyResponse = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5286/api/torah/generate-dummy-response", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The endpoint returns a JSON object with Response and Status properties
      const data = await response.json();
      console.log("Dummy OpenAI response:", data);

      // Display the response (you can modify this to show in UI as needed)
      if (data && data.response) {
        alert(`Dummy Response: ${data.response}\nStatus: ${data.status}`);
      } else {
        alert(`Dummy Response: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error generating dummy response:", error);
      alert("Error generating dummy response. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Get filter values from form only on submit
    const formData = new FormData(e.currentTarget);
    const filters: Filters = {
      parasha: formData.get("parasha") as string,
      commentator: formData.get("commentator") as string,
    };

    setSubmittedFilters(filters);
    console.log("Selected filters:", filters);

    try {
      const response = await fetch("http://localhost:5286/api/torah/generate-drasha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

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

      const resultToShow: DvarTorahResult = {
        title: `דבר תורה - פרשת ${filters.parasha}`,
        content: result.result
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
    <div className="home-page">
      <Header />
      <div className="main-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Dummy Response Button */}
              <div className="text-center mb-3">
                <button
                  onClick={handleGenerateDummyResponse}
                  disabled={isLoading}
                  className="btn btn-outline-secondary btn-lg"
                >
                  {isLoading ? "יוצר..." : "צור תגובה דמה מ-OpenAI"}
                </button>
              </div>

              {result && submittedFilters ? (
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
      </div>

      <ConfirmModal
        show={showConfirmModal}
        title="אישור יצירת דבר תורה חדש"
        message="האם אתה בטוח שברצונך ליצור דבר תורה חדש? דבר התורה הנוכחי יאבד ולא ניתן יהיה לשחזר אותו."
        confirmText="כן, צור חדש"
        cancelText="ביטול"
        onConfirm={handleConfirmCreateNew}
        onCancel={handleCancelCreateNew}
      />
    </div>
  );
};

export default HomePage;
