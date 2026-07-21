import ReactMarkdown from "react-markdown";
import { useRef, useState } from "react";
import styles from "./BloodReport.module.css";

export default function BloodReport() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [analysis, setAnalysis] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function chooseFile() {
    inputRef.current?.click();
  }

  function onFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    if (!event.target.files) return;

    setSelectedFile(event.target.files[0]);

    setAnalysis("");

  }

  async function uploadReport() {

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    setLoading(true);

    try {

    const response = await fetch(
        "http://127.0.0.1:8000/analyse-report",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    const data = await response.json();

    setAnalysis(data.analysis);

    } catch (error) {

      console.log(error);

      setAnalysis(
        "Unable to analyse the blood report. Please try again."
      );

    }

    setLoading(false);

  }

  return (

    <div className={styles.page}>

      <div className={styles.container}>

        <h1>Blood Report Analysis</h1>

        <p>

          Upload a blood report in PDF or image format.
          Annex Assistant will extract important values,
          analyse them and generate an easy-to-understand
          health summary.

        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          hidden
          onChange={onFileChange}
        />

        <div className={styles.uploadArea}>

          <h2>

            Upload Blood Report

          </h2>

          <p>

            Supported formats

            <br />

            PDF, PNG, JPG, JPEG

          </p>

          <button
            className={styles.uploadButton}
            onClick={chooseFile}
          >

            Select File

          </button>

        </div>

        {selectedFile && (

          <div className={styles.file}>

            <strong>Selected File</strong>

            <br />

            {selectedFile.name}

          </div>

        )}

        <button
          className={styles.analyseButton}
          onClick={uploadReport}
          disabled={!selectedFile || loading}
        >

          {loading
            ? "Analysing Blood Report..."
            : "Analyse Report"}

        </button>

        {loading && (

          <p className={styles.loading}>

            Annex Assistant is analysing your report...

          </p>

        )}

        {analysis && (

          <div className={styles.result}>

            <h2>

              Annex Assistant

            </h2>

            <p>

                <ReactMarkdown>

                    {analysis}

                </ReactMarkdown>

            </p>

          </div>

        )}

      </div>

    </div>

  );

}