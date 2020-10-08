import {
  promises as fs,
  stat
} from 'fs';

let citiesOfStates = [];
let citiesOfState = [];
let biggestStates = [];
let biggestCity = [];
let smallerCity = []
let countCity = [];

const cities = JSON.parse(await fs.readFile('./arquivos/Cidades.json', 'utf-8'));
const states = JSON.parse(await fs.readFile('./arquivos/Estados.json', 'utf-8'));

async function createStates() {
  for (const state of states) {
    citiesOfStates = cities.filter(city => {
      return city.Estado === state.ID
    });
    await fs.writeFile(`./arquivos/estados/${state.Sigla}.json`, JSON.stringify(citiesOfStates));
  }
}

// Quantidade de Cidades por Estado 
async function qtdCitiesOfStates(state) {
  try {
    citiesOfState = JSON.parse(await fs.readFile(`./arquivos/estados/${state.toUpperCase()}.json`, 'utf-8'));
    const qty = Object.keys(citiesOfState).length;
    console.log(`Resposta 2 - O estado ${state.toUpperCase()} possui ${qty}`);
  } catch (error) {
    console.log(error)
  }
}

async function bigStates() {
  try {
    let count = 0;
    states.forEach(state => {
      countCity = Array.from(cities).forEach(city => {
        if (city.Estado === state.ID) count++;
      })
      biggestStates.push([state.Sigla, count])
      count = 0;
    })
    biggestStates.sort((a, b) => b[1] - a[1]);
    console.log(biggestStates.slice(0, 5));
    console.log(biggestStates.slice(biggestStates.length - 5, biggestStates.length));
  } catch (error) {
    console.log(error)
  }
}

async function foundBiggestCity() {
  for (const state of states) {
    let {
      ID,
      Nome,
      Sigla
    } = state;
    const uf = JSON.parse(await fs.readFile(`./arquivos/estados/${Sigla}.json`, 'utf-8'));
    const longest = uf.reduce((a, b) => {
      return a.Nome.length > b.Nome.length ? a : b;
    })
   biggestCity.push([`${longest.Nome} - ${Sigla}`]);
  }
  console.log(biggestCity.sort((a,b)=> a.Nome -b.Nome ? a : b));
}

async function foundSmallestCity() {
  for (const state of states) {
    let {
      ID,
      Nome,
      Sigla
    } = state;
    const uf = JSON.parse(await fs.readFile(`./arquivos/estados/${Sigla}.json`, 'utf-8'));
    const longest = uf.reduce((a, b) => {
      return a.Nome.length < b.Nome.length ? a : b;
    })
   smallerCity.push([`${longest.Nome} - ${Sigla}`]);
  }
  console.log(smallerCity.sort());
}

async function foundSmall() {
  const small = cities.reduce((a,b)=>{
    return a.Nome.length < b.Nome.length ? a : b
  }).sort();
  console.log(small.Nome + "-" + small.Estado );
}
async function foundBig() {
  const big = cities.reduce((a,b)=>{
    return a.Nome.length > b.Nome.length ? a : b
  })
  console.log(big.Nome +'-'+ big.Estado );
}


createStates();
qtdCitiesOfStates('ES');
bigStates();
foundBiggestCity();
foundSmallestCity();
foundBig();
foundSmall();