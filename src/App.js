import { useState } from "react";
import "./App.css";


const Pair = function ({ data, parent, handleDataChange, handleValueChange }) {
  // const handleKeyChange = function (p, u, t) {
  //   console.log('key changed', p, u, t, data);

  //   const partials = Object.fromEntries(Object.entries(data[p]).filter(([k, v]) => k !== t));
  //   const update = { [p]: { ...u, ...partials, } }
  //   handleDataChange(parent, update, p)

  // }

  const handleKeyChange = function (previous, current) {
    // 1. reconstruct
    const partials = Object.fromEntries(
      Object.entries(data).filter(([key, val]) => key !== previous)
    );
    const update = { [current]: data[previous] };
    handleValueChange({ ...partials, ...update });
    // 2. inform parent
  }

  const handleValueChange = function () {

  }


  return (
    <ul>
      {Object.entries(data).map(([key, value], index) =>
        <li key={index}>
          {/* Base Case */}
          <input type="text" value={key} onChange={(e) => handleKeyChange(previous, current)} />
          {typeof value === 'string' ?
            <input type="text" value={value} onChange={(e) => console.log(e)} /> :
            <Pair data={value} parent={key} handleValueChange={(payload) => handleValueChange(key, payload)} handleDataChange={(p, u, t) => handleKeyChange(p, u, t)} />
          }
        </li>
      )}
    </ul>
  )
}


function App() {
  const sample_nested = {
    earth: {
      europe: {
        netherlands: {
          amsterdam: "rokin",
          rotterdam: "blaak",
        },
        germany: "berlin"
      },
    },
  };

  const sample_flat = {
    netherlands: "amsterdam",
    france: "paris"
  }

  const simple_nested = {
    europe: {
      netherlands: {
        amsterdam: "rokin"
      }
    }
  }


  const [data, setData] = useState(sample_nested);

  const handleDataChange = function (p, u, t) {
    console.log(p, u, t)
    const partials = Object.fromEntries(Object.entries(data).filter(([k, v]) => k !== t));
    const newData = { ...u, ...partials }
    setData(newData);
  }

  return (
    <div className="App">
      <div>
        <Pair data={data} handleDataChange={(p, u, t) => handleDataChange(p, u, t)} parent={""} />
      </div>
    </div>
  );
}

export default App;
