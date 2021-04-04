'use strict'

const form = document.querySelector('.f-search');
const btnFilters = document.querySelectorAll('.f-search__filter-btn');
const checkbox = document.querySelector('.f-search__filter-checkbox');
const inputField = document.querySelector('.f-search__input');
const outputArea = document.querySelector('.b-output');
const apiEndPoints = {
	getTestData: '/api/test-data',
};
let rawData = null;

form.addEventListener('submit', (e) => e.preventDefault());

const toggleBtnDisableState = () => {
  [...btnFilters].map(element => {
    element.disabled = !element.disabled;
    return element
  });
};

const fetchData = async () => {
  toggleBtnDisableState();

  try {
    const response = await fetch(apiEndPoints.getTestData);
    rawData = await response.json();
  } catch (error) {
    alert(`Error: ${error.message}`);
  } finally {
    toggleBtnDisableState();
  }
};

const getTestData = () => {
  btnFilters.forEach((item) => {
    item.addEventListener('click', (e) => {
      const { data } = rawData;
      
      if (!data || !data.length) {
        return alert('Data is missing');
      };

      const isNumber = Boolean(+inputField.value);

      switch(e.target.dataset.filter) {
        case 'by-length' : {
          if (!isNumber) {
            return alert('Invalid input data');
          } 
          const dataLength = data.filter(item => item.length > inputField.value);

          printData(dataLength);
          break;
        }
        case 'by-string': {
          if (isNumber) {
            return alert('Invalid input data');
          } 
          const dataStr = data.filter(item => {
            return checkbox.checked 
              ? item.includes(inputField.value)
              : item.toLowerCase().includes(inputField.value);
          });

          printData(dataStr);
          break;
        }
        default: 
          alert('Button is not found');
          break;
      };
    });
  });
};

const printData = (dataToPrint) => {
  const ul = document.createElement('ul');
  const printedList = document.querySelector('.l-string');

  if(!dataToPrint.length) {
    return alert('Data not found');
  };
  
  ul.classList.add('l-string');
  outputArea.classList.add('_visible');
  printedList?.remove();
  for (let item of dataToPrint) {
    const li = document.createElement('li');
    li.innerText = item;
    ul.append(li);
  };

  outputArea.append(ul);
};

fetchData();
getTestData();
