let root = document.getElementById('root');

function render(element) {
  root.appendChild(element);
}

function Header(title) {
  let headerElement = document.createElement('header');
  headerElement.textContent = title;
  render(headerElement);
}

function Footer(year) {
  let footerElement = document.createElement('footer');
  footerElement.textContent = `Copyright ${year}`;
  render(footerElement);
}

function Counter() {
  let count = 0;
  let counterElement = document.createElement('h2');
  counterElement.textContent = count;
  render(counterElement);
  counterElement.addEventListener('click', function() {
    counterElement.textContent = ++count;
  });

}

Header('John\'s Amazing Site');
Counter();
Footer(2022);
