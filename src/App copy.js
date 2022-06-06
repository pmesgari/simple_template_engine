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
        <input type="text" value={key} onChange={updateKeyValue} />: <input type="text" value={value} onChange={updateKeyValue} />
      </li>
      <button>+Add Value</button>
    </div>
  );
};

const Level = function ({ data, handleChange }) {
  const { key, value } = data

  return (
    <div>
      <input type="text" value={key} onChange={(k, val) => handleChange()} />: <Pair data={value} handleChange={handleChange}></Pair>
    </div>
  )
};

const Pair = function ({ data, handleChange }) {
  const handlePairChange = function (root, key, value) {
    const update = { [key]: value }
    if (typeof value === 'string') {

    }
    console.log(root, update, data);
    console.log({ ...data, ...update })
    handleChange(key, { ...data, ...update })
  }
  return Object.entries(data).map(([key, value]) => {
    return (
      <ul key={key}>
        {typeof value === "string" ? (
          <ValuePair data={{ key, value }} handleChange={(k, val) => handlePairChange(key, k, val)} />
        ) : (
          <li>
            <Level data={{ key, value }} handleChange={(k, val) => handlePairChange(key, k, val)} />
          </li>
        )}
      </ul>
    );
  });
};

const ValueInput = function ({ value, handleValueChange }) {
  return <input type="text" value={value} onChange={handleValueChange} />
}

const DataEditor = function ({ data, handleValueChange, handleKeyChange }) {
  const handleValueInputChange = function (key, value) {
    console.log(key, value)
    handleValueChange({ [key]: value });
  }

  const handleDataChange = function (key, value) {
    console.log('data changed', key, value, data)
    // console.log({[key]: {...data[key], ...value}})
    handleValueChange({ [key]: { ...data[key], ...value } })
  }

  const handleKeyInputChange = function (key, update, context, val) {
    console.log(key, update, context, val);
    handleKeyChange(key, update, context, val);
  }

  const handleKeyUpdate = function (key, update, context, val) {
    console.log('key changed', key, update, context, val)
    handleKeyChange(key, update, context, val)
  }



  return Object.entries(data).map(([key, value]) => {
    return (
      <ul key={key}>
        {typeof value === "string" ?
          <li><input type="text" value={key} onChange={(e) => handleKeyInputChange(key, e.target.value, data, data[key])} />: <ValueInput value={value} handleValueChange={(e) => handleValueInputChange(key, e.target.value)} /></li> :
          <li><input type="text" value={key} onChange={(e) => handleKeyInputChange(key, e.target.value, data, data[key])} />: <DataEditor data={value} handleValueChange={(e) => handleDataChange(key, e)} handleKeyChange={(key, update, context, val) => handleKeyUpdate(key, update, data, val)} /></li>}
      </ul>
    )
  })
}

function App() {
  const sample_nested = {
    earth: {
      europe: {
        netherlands: {
          amsterdam: "rokin",
          rotterdam: "blaak",
        },
      },
    },
  };

  const sample_flat = {
    netherlands: "amsterdam",
    france: "paris"
  }

  const simple_nested = {
    europe: {
      netherlands: "amsterdam"
    }
  }

  const [data, setData] = useState(simple_nested);

  const handleValueChange = function (value) {
    console.log(value)
    setData({ ...data, ...value })
  }

  const handleKeyChange = function (key, update, context, value) {
    console.log(key, update, context, value);
    const partialData = Object.entries(context).filter(([k, v]) => k !== key);
    const newData = {[update]: value};
    let totalData = {};
    if (partialData.length > 0) {
      totalData = {...Object.fromEntries(partialData), ...newData}
    } else {
      totalData = {...newData}
    }
    console.log(totalData);
    // setData(newData)

  }

  return (
    <div className="App">
      <div>
        <DataEditor data={data} handleValueChange={handleValueChange} handleKeyChange={handleKeyChange}></DataEditor>
      </div>
    </div>
  );
}

export default App;
