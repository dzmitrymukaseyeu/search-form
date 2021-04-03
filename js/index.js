const btnFilter = document.querySelectorAll('.f-search__filter-btn');
const checbox = document.querySelector('.f-search__filter-checkbox');
const input = document.querySelector('.f-search__input');
const output = document.querySelector('.f-search__output-data');
const outputTitle = document.querySelector('.f-search__output-title');

async function getTestData() {
  const response = await fetch('/api/test-data');
  let { data } =  await response.json();
  
  btnFilter.forEach((item) => {
    item.addEventListener('click', (e) => {
      switch(e.target.dataset.filter) {
        case 'length' :
            const dataLength = data.filter(item => item.length > input.value);

            output.innerHTML = dataLength;
            outputTitle.innerHTML = `Результат (${dataLength.length})`;
          break;
        case 'str':
          const dataStr = data.filter(item => {
            if (checbox.checked) {
              return item.indexOf(input.value) > -1;
            }

            return item.toLowerCase().indexOf(input.value) > -1;
          });

          output.innerHTML = dataStr;
          outputTitle.innerHTML = `Результат (${dataStr.length})`;
          break;
      }
    })
  })
};

getTestData();


