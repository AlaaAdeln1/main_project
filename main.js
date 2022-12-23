let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let abs = document.querySelector(".abs");
let discount = document.querySelector(".discount");
let count = document.querySelector(".count");
let cateogry = document.querySelector(".cateogry");
let btnCreate = document.querySelector(".btn-create");
let total = document.querySelector(".total");
let tbody = document.getElementById("tbody")
let mood = 'create'
let psoudoVar;
////////////////////////////////////////////////////////////
function getTotal() {
    if( price.value != ''){
        let result = (+price.value  +  +taxes.value  +  +abs.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    }else{
        total.style.backgroundColor = "#00f";
        total.innerHTML = ''
    }

}
///////////////////////////////////////////////
let newProduct;
if(localStorage.product != null){
    newProduct = JSON.parse(localStorage.product)
}else{
    newProduct = [];
}


btnCreate.onclick = function() {
    let product = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        abs:abs.value,
        discount:discount.value,
        count:count.value,
        total:total.innerHTML,
        cateogry:cateogry.value.toLowerCase(),
    };
    if(title.value != ''
    && price.value != '' 
    && count.value !='' 
    && cateogry.value !='' 
    && discount.value != ''
    && product.count < 100){
        if(mood === 'create'){
            if(product.count>1){
                for(let i = 0; i < product.count ;i++){
                    newProduct.push(product);
                }
            }else{
                newProduct.push(product);
            }    
        }else{
            newProduct[psoudoVar] = product
            mood = 'create';
            btnCreate.innerHTML = 'create'
            count.style.display = "block"
        }
        cleanData()
    }
    localStorage.setItem('product' , JSON.stringify(newProduct))
    showData();
}

function cleanData(){
    title.value = "";
    price.value = "";
    discount.value = "";
    taxes.value = "";
    abs.value = "";
    total.innerHTML = "";
    count.value = "";
    cateogry.value = "";
}

function showData() {
    let table = '';
    for(let i = 0;i < newProduct.length;i++){
        table += `
        <tr>
        <td>${[i+1]}</td>
        <td>${newProduct[i].title}</td>
        <td>${newProduct[i].price}</td>
        <td>${newProduct[i].taxes}</td>
        <td>${newProduct[i].abs}</td>
        <td>${newProduct[i].discount}</td>
        <td>${newProduct[i].total}</td>
        <td>${newProduct[i].cateogry}</td>
        <td>${newProduct[i].count}</td>
        <td><button onclick="updateValues(${i})" class="update">update</button></td>
        <td><button onclick= " deleteItem(${i}) " class="delete">delete</button></td>
        </tr>
        `
        tbody.innerHTML = table;
        getTotal();
    }
}
//////////////////////////////////////
function deleteItem(i) {
    newProduct.splice(i,1);
    localStorage.product = JSON.stringify(newProduct);
    showData();
}
showData(); 
///////////////////
let clear = document.querySelector(".delete-all")
if(newProduct.length > 0){
    clear.style.visibility = "visible"
}else{
    clear.style.visibility = "hidden"
}
function deleteAll(){
    localStorage.clear();
    newProduct.splice(0)
    showData()
}

function updateValues(i) {
    psoudoVar = i
    title.value = newProduct[i].title;
    price.value = newProduct[i].price;
    discount.value = newProduct[i].discount;
    taxes.value = newProduct[i].taxes;
    abs.value = newProduct[i].abs;
    getTotal();
    count.style.display = "none";
    cateogry.value = newProduct[i].cateogry;
    btnCreate.innerHTML ="Update";
    mood = 'Update'
    scroll({
        top:0,
        behavior:"smooth",
    })
};
////////////sreach///////////////////
let searchMood = "title";
let sreach = document.querySelector(".input-search")
function getSearchMood(id) {
    if(id === "searchTitle"){
        searchMood = "title";
        sreach.placeholder ="sreach by title";
    }else{
        searchMood = "cateogry";
        sreach.placeholder ="sreach by cateogry";
    }
    sreach.focus();
    sreach.value = ''
    showData()
};
function sreachDate(value) {
    let table = '';
    if(searchMood == 'title'){
        for (let index = 0; index < newProduct.length; index++) {
            if(newProduct[index].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${[index]}</td>
                <td>${newProduct[index].title}</td>
                <td>${newProduct[index].price}</td>
                <td>${newProduct[index].taxes}</td>
                <td>${newProduct[index].abs}</td>
                <td>${newProduct[index].discount}</td>
                <td>${newProduct[index].total}</td>
                <td>${newProduct[index].cateogry}</td>
                <td>${newProduct[index].count}</td>
                <td><button onclick="updateValues(${index})" class="update">update</button></td>
                <td><button onclick= " deleteItem(${index}) " class="delete">delete</button></td>
                </tr>
                `
            }
        }
    }else{
        for (let index = 0; index < newProduct.length; index++) {
            if(newProduct[index].cateogry.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${[index]}</td>
                <td>${newProduct[index].title}</td>
                <td>${newProduct[index].price}</td>
                <td>${newProduct[index].taxes}</td>
                <td>${newProduct[index].abs}</td>
                <td>${newProduct[index].discount}</td>
                <td>${newProduct[index].total}</td>
                <td>${newProduct[index].cateogry}</td>
                <td>${newProduct[index].count}</td>
                <td><button onclick="updateValues(${index})" class="update">update</button></td>
                <td><button onclick= " deleteItem(${index}) " class="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    tbody.innerHTML = table;
}
