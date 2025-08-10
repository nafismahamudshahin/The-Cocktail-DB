const loadData = (search)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res=>res.json())
    .then(data=>{
        displayData(data.drinks);
    })
}

document.getElementById('search_btn').addEventListener('click',(e)=>{
    const search = document.getElementById('search_box').value;
    document.getElementById('drinks_container').innerText="";
    loadData(search);
    // clear search box:
    document.getElementById('search_box').value="";
})
loadData('a');

const displayData = (drinks)=>{
    const drinksContainer = document.getElementById('drinks_container');
    if(drinks == "no data found" || drinks == null){
        document.getElementById('data_not_found').innerHTML=`
            <h2 class="text-center">Your Searched Drink is Not Found.</h2>
        `;
        return
    }
    drinks.forEach(drink=>{
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML=`
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${drink.strGlass}</h5>
                    <h6 class="card-title">Category: ${drink.strCategory}</h6>

                    <p class="card-text">${drink.strInstructions.slice(0,15)}...</p>
                </div>
                    <div class="card-footer cart_bottom">
                        <button class="btn btn-primary add_to_cart_btn" onclick="addToCart('${drink.strDrinkThumb}','${drink.strGlass}',this)">Add to Cart</button>
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#drinkDetailsModal" onclick="leadMoreDetailsById(${drink.idDrink})">Details</button>
                    </div>
            </div>
        `;
        drinksContainer.appendChild(div)

    })
}


let cnt = 0;
const addToCart = (drinkImg , name,this_btn)=>{
    const addToCartContainer = document.getElementById('cart_items');
    const cartCountContainer = document.getElementById('cart_count');
    cnt++;
    if(cnt>7){
        alert("You have reached the max limit.")
        return
    }
    const div = document.createElement('div');
    div.classList.add('add_to_cart_item')
    div.innerHTML=`
        <b class="cart_sl">${cnt}</b>
        <img class="cart_images mx-4" src="${drinkImg}" />
        <b class="cart_name">${name}</b>
    `;
    addToCartContainer.appendChild(div);
    cartCountContainer.innerText=cnt;
    if(this_btn){
        this_btn.innerText ="Already Selected";
        this_btn.disabled = true;
    }

}

const leadMoreDetailsById =(id)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>{
       displayMoreDetails(data.drinks[0]);
    })
}
const displayMoreDetails =(driks)=>{
    console.log(driks);
    document.getElementById('modal_title').innerText= driks.strGlass;
    document.getElementById('modal_img').src = driks.strDrinkThumb;
    document.getElementById('category').innerText = driks.strCategory;
    document.getElementById('alcoholic').innerText = driks.strAlcoholic;
    document.getElementById('info').innerText = driks.strInstructions;
}
