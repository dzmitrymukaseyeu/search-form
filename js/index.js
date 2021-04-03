const btnFilter = document.querySelectorAll('.f-search__filter-btn');
const checbox = document.querySelector('.f-search__filter-checkbox');
const input = document.querySelector('.f-search__input');
const output = document.querySelector('.b-output');
const outputTitle = document.querySelector('.f-search__output-title');
const endPoint = '/api/test-data';
let rawData = null;


const fetchData = async () => {
  try {
    const response = await fetch(endPoint);
    rawData = await response.json();
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
};

const getTestData = () => {
  btnFilter.forEach((item) => {
    item.addEventListener('click', (e) => {
      const { data } = rawData;
      
      if (!data || !data.length) {
        return alert('Data is missing');
      };

      const isNumber = Boolean(+input.value);

      switch(e.target.dataset.filter) {
        case 'by-length' : {
          if (!isNumber) {
            return alert('Invalid input data');
          } 
          const dataLength = data.filter(item => item.length > input.value);

          printData(dataLength);
          break;
        }
        case 'by-string': {
          if (isNumber) {
            return alert('Invalid input data');
          } 
          const dataStr = data.filter(item => {
            return checbox.checked 
              ? item.includes(input.value)
              : item.toLowerCase().includes(input.value);
          });

          printData(dataStr);
          break;
        }
      }
    })
  })
};

const printData = (dataToPrint) => {
  const ul = document.createElement('ul');
  const printedList = document.querySelector('.l-string');
  
  ul.classList.add('l-string');
  output.classList.add('_hidden');
  printedList?.remove();
  dataToPrint.forEach((item) => {
    const li = document.createElement('li');
    li.innerText = item;
    ul.append(li);
  });
  output.append(ul);
};

fetchData();
getTestData();


