import { useState } from "react";
import "./App.css";


const KeyValueInput = function ({ data, parent, handleDataChange }) {
  const handleKeyChange = function (p, u, t) {
    console.log('key changed', p, u, t, data);

    const partials = Object.fromEntries(Object.entries(data[p]).filter(([k, v]) => k !== t));
    const update = { [p]: { ...u, ...partials, } }
    handleDataChange(parent, update, p)

  }



  return (
    <ul>
      {Object.entries(data).map(([key, value], index) =>
        <li key={index}>
          <input type="text" value={key} onChange={(e) => handleDataChange(parent, { [e.target.value]: value }, key)} />
          {typeof value === 'string' ?
            <input type="text" value={value} onChange={(e) => console.log(e)} /> :
            <KeyValueInput data={value} parent={key} handleDataChange={(p, u, t) => handleKeyChange(p, u, t)} />
          }
        </li>
      )}
    </ul>
  )
}

const Tree = function ({ data }) {
  return (
    <ul>
      {Object.entries(data).map(([key, value], index) => {
        if (typeof value === 'number') {
          return <li key={index}>{key}: {value}</li>
        } else {
          return <li key={index}>{key} <Tree data={value} /></li>
        }
      }
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

  const sample_numbers = {
    a: {
      b: {
        c: 1,
        d: 2
      }
    }
  }

  const [data, setData] = useState(sample_nested);
  const [numbers, setNumbers] = useState(sample_numbers);
  const [count, setCount] = useState(1)

  const handleDataChange = function (p, u, t) {
    console.log(p, u, t)
    const partials = Object.fromEntries(Object.entries(data).filter(([k, v]) => k !== t));
    const newData = { ...u, ...partials }
    setData(newData);
  }

  const increment = function () {
    console.log('increment')
    const newNumbers = {
      a: {
        b: {
          c: numbers["a"]["b"]["c"] + 1,
          d: numbers['a']['b']["d"]
        }
      }
    }
    console.log(newNumbers)
    setNumbers(newNumbers)
  }

  return (
    <div className="App">
      <div>
        <KeyValueInput data={data} handleDataChange={(p, u, t) => handleDataChange(p, u, t)} parent={""} />
        <Tree data={numbers} />
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
}

export default App;
