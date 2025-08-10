const loadData = (search)=>{
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.drinks);
    })
}

const btn = document.getElementById('search_btn');
btn.addEventListener('click',(e)=>{
    const search = document.getElementById('search_box').value;
    loadData(search);
    // clear search box:
    document.getElementById('search_box').value="";
})

