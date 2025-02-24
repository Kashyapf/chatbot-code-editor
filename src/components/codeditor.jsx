import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Box, Button, Text } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../../constant";
import { useToast } from "@chakra-ui/react";
import { executeCode } from "../../api";

const languages = Object.entries(LANGUAGE_VERSIONS);

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]); // Default to JavaScript snippet
  const [language, setLanguage] = useState("javascript");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast(); // Initialize toast

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
    setDropdownOpen(false);
  };

  const handleRun = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear only the terminal output
  const handleClear = () => {
    setOutput(null); // Clear the output
  };

  const LanguageSelector = ({ language, onSelect }) => {
    return (
      <div className="mb-4">
        <div className="relative inline-block text-left">
        <button
  onClick={() => setDropdownOpen(!isDropdownOpen)}
  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none flex items-center space-x-2"
>
  <span>{language} ({LANGUAGE_VERSIONS[language]})</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
    <path d="M6.70831 9.58334L11.5 14.375L16.2916 9.58334" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>


          {isDropdownOpen && (
            <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
              {languages.map(([lang, version]) => (
                <li key={lang}>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => onSelect(lang)}
                  >
                    {lang} ({version})
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen rounded-lg">
      <div className="w-full rounded-lg border-solid flex flex-col">
        <div className="flex justify-between px-2 mb-2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button 
            onClick={handleRun}
            isLoading={isLoading}
            colorScheme="black" // Change button background to black
            className="ml-2 px-3 rounded-lg bg-black text-white hover:bg-gray-800 " // Custom styles for the button
          >
            Run Code
          </Button> 
        </div>

        {/* Editor */}
        
          <Editor
          height="45vh"
          theme="vs-light"
          language={language}
          value={value}
          onMount={onMount}
          onChange={(val) => setValue(val)}
        />
        
        
      </div>

      {/* Terminal Section */}
      <div className="flex flex-col mt-2 w-full bg-gray-50 rounded-xl border border-solid">
        <div className="flex justify-between items-center p-2 border-b border-gray-300">
          <h2 className="font-semibold ">Terminal</h2>
          <Button
            onClick={handleClear} // Add onClick handler
            className="gap-5 px-4 py-2 font-medium rounded-lg border border-gray-300 hover:bg-gray-200"
          >
            Clear
          </Button>
        </div>

        <Box
          className={`flex-1 overflow-y-auto p-4 ${
            isError ? "text-red-500" : ""
          }`}
          borderTop="1px solid"
          borderColor="gray.300"
          minHeight="250px"
        >
          {output
            ? output.map((line, i) => <Text key={i}>{line}</Text>)
            : 'Click "Run Code" to see the output here'}
        </Box>
      </div>
    </div>
  );
};

export default CodeEditor;