const btnFilter = document.querySelectorAll('.f-search__btn');
const checbox = document.querySelector('.f-search__checkbox');
const input = document.querySelector('.f-search__input');
const output = document.querySelector('.f-search__output-data');

async function getTestData() {
  const response = await fetch('/api/test-data');
  let { data } =  await response.json();
  
  btnFilter.forEach((item) => {
    item.addEventListener('click', (e) => {
      switch(e.target.dataset.filter) {
        case 'length' :
          console.log('length');
          const dataLength = data.filter(item => item.length > input.value)
          output.innerHTML = dataLength;
          break;
        case 'str':
          const dataStr = data.filter(item => {
            if (checbox.checked) {
              return item.indexOf(input.value) > -1;
            }

            return item.toLowerCase().indexOf(input.value) > -1;
          });

          output.innerHTML = dataStr;
          break;
      }
    })
  })
};

getTestData();


