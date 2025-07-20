import { useState } from "react";
import axios from "axios";
import { marked } from "marked";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [length, setLength] = useState("Medium");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const res = await axios.post("http://localhost:5000/summarize", {
        text,
        length: length.toLowerCase(),
      });
      setSummary(res.data.summary);
    } catch (error) {
      console.error(error);
      setSummary("Error summarizing text.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const selectOption = (option) => {
    setLength(option);
    setOpenDropdown(false);
  };

  return (
    <div className="min-h-screen bg-lime-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-sm rounded-xl p-8 w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
          AI Text Summarizer
        </h1>

        {/* Flex container for input and summary side by side */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Input Section */}
          <div className="flex-1">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              rows="12"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="flex justify-between mb-4 items-center">
              <p className="text-gray-600">
                {text.split(" ").filter(Boolean).length} words | {text.length}{" "}
                chars
              </p>

              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="border rounded px-4 py-2 bg-white hover:bg-gray-100 flex items-center"
                >
                  {length}
                  <span className="ml-2">▼</span>
                </button>
                {openDropdown && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                    {["Short", "Medium", "Detailed"].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 hover:bg-purple-500 cursor-pointer hover:font-bold hover:text-white"
                        onClick={() => selectOption(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              onClick={handleSummarize}
              disabled={loading}
              className="w-full font-bold bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {/* RIGHT: Summary Section */}
          <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-purple-600 mb-2 text-center">
              Summary
            </h3>
            <div
              className="text-gray-800 whitespace-pre-line min-h-[250px] prose"
              dangerouslySetInnerHTML={{
                __html: marked(
                  summary || "Your summary will appear here after processing..."
                ),
              }}
            ></div>
            {summary && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 font-bold bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Download Summary
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
