import Header from './Header.js';
import Counter from './Counter.js';
import family from './people.json';

console.log(family);

// let counter = new Counter();
// counter.render():
function App() {
  return (
    <>
      <Header title="Our Counter" people={family} />
      <Counter />
    </>
  );
}

export default App;
