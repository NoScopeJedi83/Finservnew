import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate JSON input
    try {
      JSON.parse(jsonData);
    } catch (e) {
      setError('Invalid JSON format');
      return;
    }

    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData,
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMultiSelectChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((opt) => opt !== value)
    );
  };

  const renderResponseData = () => {
    if (!responseData) return null;

    let result = {};

    if (selectedOptions.includes('numbers')) {
      result.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('alphabets')) {
      result.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      result.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>Submit JSON</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder="Enter JSON here"
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {responseData && (
        <div>
          <h2>Select Data to Display:</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleMultiSelectChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleMultiSelectChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleMultiSelectChange}
            />
            Highest Lowercase Alphabet
          </label>

          <h3>Response:</h3>
          {renderResponseData()}
        </div>
      )}
    </div>
  );
}

export default App;
