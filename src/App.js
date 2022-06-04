import { useState } from "react";
import "./App.css";

const ValuePair = function ({ data, handleChange }) {
  const { key, value } = data;

  const updateKeyValue = function (e) {
    handleChange(key, e.target.value);
  }

  return (
    <div>
      <li>
        <input type="text" value={key} onChange={updateKeyValue}/>: <input type="text" value={value} onChange={updateKeyValue}/>
      </li>
      <button>+Add Value</button>
    </div>
  );
};

const LevelPair = function ({ data, handleChange }) {
  return <Pair data={data} handleChange={handleChange}></Pair>;
};

const Pair = function ({ data, handleChange }) {
  const handleValuePairChange = function (key, value) {
    console.log(key, value)
    handleChange(key, value)
  }

  const handleLevelPairChange = function (level, key, value) {
    console.log(level, key, value)
  }
  
  return Object.entries(data).map(([key, value]) => {
    return (
      <ul key={key}>
        {typeof value === "string" ? (
          <ValuePair data={{ key, value }} handleChange={(k, val) => handleValuePairChange(k, val)}/>
        ) : (
          <li>
            <input type="text" value={key} onChange={(k, val) => handleLevelPairChange(key, k, val)} />: <LevelPair data={value} handleChange={(k, val) => handleLevelPairChange(key, k, val)}/>
          </li>
        )}
      </ul>
    );
  });
};

function App() {
  const sample_nested = {
    earth: {
      europe: {
        netherlands: {
          amsterdam: "rokin",
          rotterdam: "blaak",
        },
        france: "paris",
      },
      asia: {
        japan: "tokyo",
      },
    },
    space: {
      moon: {
        west: "russell",
      },
    },
  };

  const sample_flat = {
    netherlands: "amsterdam",
    france: "paris"
  }

  const [data, setData] = useState(sample_nested);

  const handleChange = function (key, value) {
    //console.log(key, value)
    setData({...data, ...{[key]: value}})
  }

  return (
    <div className="App">
      <div>
        <Pair data={data} handleChange={(key, value) => handleChange(key, value)}/>
      </div>
    </div>
  );
}

export default App;
