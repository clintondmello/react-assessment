import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState(0);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState("");

  const longestSubstringWithKDistinct = (s, k) => {
    let arr = s.split("");
    let distinctChars = new Set(arr);
    let mapObject = {};
    let maxOccorenceidex = [];

    distinctChars.forEach((element) => {
      let elementCount = arr.filter((x) => x === element).length || 0;
      mapObject[element] = elementCount;
    });

    let maxCount = Math.max(...Object.values(mapObject));
    let charWithMaxCount = Object.keys(mapObject).find(
      (key) => mapObject[key] === maxCount
    );

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === charWithMaxCount) {
        maxOccorenceidex.push(i);
      }
    }

    let longest = "";
    for (let start of maxOccorenceidex) {
      for (let end = start; end < arr.length; end++) {
        let sub = arr.slice(start, end + 1);
        let distinctInSub = new Set(sub);

        if (distinctInSub.size <= k) {
          if (sub.length > longest.length) {
            longest = sub.join("");
          }
        } else {
          break;
        }
      }
    }

    return longest.length;
  };

  const handleExecute = (e) => {
    e.preventDefault();
    if (!input1 || input2 <= 0) {
      setError(
        "Please make sure the fields are filled in correctly. Number has to be greater than 0 & String should contain some text"
      );
      setOutput(null);
      return;
    }

    //Validation Success
    setOutput(longestSubstringWithKDistinct(input1, input2));
  };

  return (
    <div className="App">
      <Form.Select
        id="problemSector"
        className="m-2"
        aria-label="Default select example"
      >
        <option value="1">Longest Substring with K Distinct Character</option>
      </Form.Select>
      <div className="jumbotron">
        <h1 className="display-6">
          Longest Substring with K Distinct Characters
        </h1>
        <p className="lead">
          Find the length of the longest substring that contains at most k
          distinct characters{" "}
        </p>
        <hr className="my-4" />
        <p>Examples</p>
        <p className="lead">
          <Button variant="btn btn-outline-secondary m-2">Example 1</Button>
          <Button variant="btn btn-outline-secondary primary m-2">
            Example 2
          </Button>
          <Button variant="btn btn-outline-secondary outlined m-2">
            Example 3
          </Button>
        </p>
      </div>
      <>
        <Form.Label htmlFor="substring">String(s)</Form.Label>
        <Form.Control
          id="substring"
          type="text"
          placeholder="Please Enter the String Input"
          onChange={(e) => setInput1(e.target.value)}
        />
        <br />
        <Form.Label htmlFor="distinctChars">K (distinct characters)</Form.Label>
        <Form.Control
          id="distinctChars"
          type="text"
          placeholder="Please enter the K Distinct Number"
          onChange={(e) => setInput2(e.target.value)}
        />
        <br />
        <Button variant="primary" type="submit" onClick={handleExecute}>
          Execute
        </Button>
        <Alert className="mt-2" key={"success"} variant={"success"}>
          <b>Output: {output || 0}</b>
        </Alert>
        {error && (
          <Alert className="mt-2" key={"warning"} variant={"warning"}>
            <b>Message: {error}</b>
          </Alert>
        )}
      </>
    </div>
  );
}

export default App;
