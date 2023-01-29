import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function returnVal(q: string): void {
  console.log(q);
}

//debounce using use memo
function debounce(f: (val: string) => void, delay = 1000) {
  let time: number;
  return (val: string) => {
    clearTimeout(time);
    time = setTimeout(() => f(val), delay);
  };
}
//throttle
function throttle(f: (val: string) => void, delay = 1000) {
  let time: boolean = false;
  return (val: string) => {
    if (time) return;
    f(val);
    time = true;
    setTimeout(() => {
      time = false;
    }, delay);
  };
}

function App() {
  const [query, setQuery] = useState("");
  // const deb = useMemo(() => {
  //   return debounce(returnVal);
  // }, []);
  const throt = useMemo(() => {
    return throttle(returnVal);
  }, []);
  useEffect(() => {
    throt(query);
  }, [query]);
  return (
    <div className="App">
      <input
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
        type="text"
        placeholder="Query search"
      />
    </div>
  );
}

export default App;
