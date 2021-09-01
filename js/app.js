const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const countryContainer = document.getElementById('country-container');
const countryDetails = document.getElementById('country-details')
const errorDiv = document.getElementById('error-massage');
const spinnerDiv = document.getElementById('spinner');

searchButton.addEventListener('click',function(){
    const searchText = searchInput.value
    // clear  input value  
    searchInput.value = '';
    // clear div innerhtml 
    countryContainer.innerHTML ='';
    countryDetails.innerHTML='';

    if(searchText ===''){
       
        errorDiv.innerText='you have to type any country name'
        return;
    }
    else{
        const url= `https://restcountries.eu/rest/v2/name/${searchText}`
        spinnerDiv.classList.remove('d-none')
        fetch(url)
        .then(res=>res.json())
        .then(data=>showData(data));
        setTimeout(()=>{
            spinnerDiv.classList.add('d-none')
        }),1500;
        errorDiv.innerText ='';
    }

})
const showData = countryArray=>{
    if(countryArray.status===404){
        errorDiv.innerText='No Resut Found'
    }
    else{
        errorDiv.innerText = '';
    }
    countryArray.forEach(item=>{
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`<div class="card h-100">
        <img src="${item.flag}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title text-primary">${item.name}</h5>
        </div>
        <button onclick="loadCountryDetails('${item.alpha3Code}')" class="bg-warning p-2">details</button>
      </div>`
      countryContainer.appendChild(div)

    })
    // console.log(countryArray)

}
// single country details  
const loadCountryDetails= countryCode=>{
    const url=`https://restcountries.eu/rest/v2/alpha/${countryCode}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCountryDeatils(data))
}
const displayCountryDeatils = item=>{
    window.scrollTo(0,40)
    countryDetails.innerHTML='';
    const div =document.createElement('div')
    div.innerHTML=`
     <div class="col-md-12">
        <h1>Country:${item.name}</h1>
        <p>Capital:${item.capital}</p>
        <p>Currency Name:${item.currencies[0].name}</p>
        <p>Currency Symbol:${item.currencies[0].symbol}</p>
</div>`
countryDetails.appendChild(div)
   
}
