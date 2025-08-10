const loadData = (search)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res=>res.json())
    .then(data=>{
        displayData(data.drinks);
    })
}

const btn = document.getElementById('search_btn');
btn.addEventListener('click',(e)=>{
    const search = document.getElementById('search_box').value;
    loadData(search);
    // clear search box:
    document.getElementById('search_box').value="";
})
loadData('a');

const displayData = (drinks)=>{
    console.log(drinks[0]);
    const drinksContainer = document.getElementById('drinks_container');
    drinks.forEach(drink=>{
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML=`
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${drink.strGlass}</h5>
                    <h6 class="card-title">Category: ${drink.strCategory}</h6>

                    <p class="card-text">${drink.strInstructions.slice(0,60)}...</p>
                </div>
                    <div class="card-footer cart_bottom">
                        <a href="#" class="btn btn-primary">Add to Cart</a>
                        <a href="#" class="btn btn-success">Details</a>
                    </div>
            </div>
        `;
        drinksContainer.appendChild(div)
    })
}