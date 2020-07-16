
// VARIABLES

const URL = 'https://jsonplaceholder.typicode.com/users';

const sort_name_btn = document.querySelector('.btn-sort-name');
const sort_id_btn = document.querySelector('.btn-sort-id');
const search_input = document.querySelector('.search-input');

// =================================================================

// FUNCTIONS

// Get data from API (returns an array of objects)
const getData = async url => {
    let response = await fetch(url);
    let data = await response.json();

    let result = [];

    for (item of data) {
        result.push({
            id: item.id,
            name: item.name,
            email: item.email,
            username: item.username,
            website: item.website
        })
    }

    return result
}

// Build table by an array of objects
const buildTable = async data => {

    let users = await data;

    let table = document.querySelector('tbody');

    table.innerHTML = '';

    for (let user of users) {
        table.innerHTML +=
            `
            <tr>
                <th>${user.id}</th>
                <th>${user.name}</th>
                <th>${user.email}</th>
                <th>${user.username}</th>
                <th>${user.website}</th>
            </tr>
        `
    }
}

// Build first table
buildTable(getData(URL))

// ========================================================

// SORTING

// Order of sorting descending or ascending (reversed or not reversed)
let desc = false;

// Because table is already sorted by id starting state is true
let descId = true;

// Sort by name
sort_name_btn.addEventListener('click', async () => {

    let data = await getData(URL);
    let array = sort_array_by(data, 'name', desc);

    buildTable(array);

    desc = !desc;
});

// Sort by id
sort_id_btn.addEventListener('click', async () => {
    let data = await getData(URL);

    let array = sort_array_by(data, 'id', descId);

    buildTable(array);

    descId = !descId;
});

// Function of sorting array of objects by object property
const sort_array_by = (array, sort, desc) =>{
    array.sort((a, b) => {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
    });

    if (desc) array.reverse();

    return array
}

// ======================================================


// SEARCH TABLE DATA

const searchTable = (value, data) => {
    let filteredData = []


    for(let item of data) {
        value = value.toLowerCase()

        let name = item.name.toLowerCase()

        if(name.includes(value)) {
            filteredData.push(item)
        }
    }

    return filteredData
}

search_input.addEventListener('keyup', async () => {
    let value = search_input.value;

    let users = await getData(URL);
    
    let data = searchTable(value, users)

    buildTable(data)
})






