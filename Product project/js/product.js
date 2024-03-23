// collecting varaibles 

let productTitle = document.getElementById('title');
let priceInput = document.querySelector('.inputs .price');
let taxInput=document.querySelector('.inputs .tax');
let advInput = document.querySelector('.inputs .adv');
let discountInput =document.querySelector('.inputs .discount');
let totalLabel = document.querySelector('.info-details .total');
let quantityNum = document.querySelector('.info-details .q-num');
let productCounts =document.querySelector('.counts');
let productCategorey = document.querySelector('.category');
let searchInput = document.querySelector('.ctrl .search')
let createBtn = document.querySelector('.fields .create');
let searchTitleBtn = document.querySelector('.ctrl div .search-title');
let searcgCategoreyBtn = document.querySelector('.ctrl div .search-categorey');
let deleteAllBtn = document.querySelector('.ctrl div .delete-all');
let updateItems //= document.getElementById('update-itm');
let deleteItems //= document.getElementById('delete-itm');
let numberItems = document.getElementsByClassName('num-items')[0];
let dataTotal;
let products; // the array whwew we want to store our items 
let productData 
let arrInputs = [productTitle,priceInput,taxInput,advInput,discountInput,productCategorey,productCounts]
let checker = 0
let mode = 'create'
let globalIndex

// calcuclate the price of items 
function total(){

    // we are hoing to find the total price for all quantity and final price for one piece after including all the  calculations
    let finalPrice = (+priceInput.value + +taxInput.value + +advInput.value) - +discountInput.value;
    let totalPrice = +productCounts.value * finalPrice
    // the total price is zero when quantity not enterd and the final price will be zero when all fileds not entered we will get false
    if(totalPrice==0 && finalPrice ==0){   // here 
        alert('Please Enter A Valid Data!');
        return [false]; }
    else if(totalPrice!=0 && finalPrice >= 0) // this is the wanted result 
        {
            return[totalPrice,finalPrice];
        }
    else if(totalPrice==0 && finalPrice > 0){
        alert('Please Enter your your quantity to get the full price'); // this is the result for one piece 
        return [totalPrice,finalPrice];
    }

    }
// show the total
function showTotal(){
    dataTotal = total();  // we are store the data we enterd in total function in this variable to use it later
    if(dataTotal[0]!=false || dataTotal[0]!=0)  // if total price not false or 0 the total icon will change the color from blue to red and we will get the price in text field
    {
        totalLabel.classList.remove('bg-primary'); // remove blue background from total lable
        totalLabel.classList.add('bg-danger');      // add red background to total lable
        quantityNum.innerHTML =dataTotal[0];        // show the total price in total text field
        productCounts.classList.remove('empty');  // remove the red border for inputs because we fill all fields correctly
    }
    else if((dataTotal[0]!=false || dataTotal[0]==0) && dataTotal[1]>0){  // when total price is false or 0 this means categorey filed is empty so we add red border
        productCounts.classList.add('empty');
    }
}
// check the missing value
function missingValue (){
    arrInputs.forEach((input)=>{
        input.value==''?input.classList.add('empty'):input.classList.remove('empty');  // check the fileds if they are empty or not, add red borer if they are and remove the red boreder if they aren't empty
    })
}
// check the fields if they are empty when press enter
arrInputs.forEach((inp)=>{
    inp.addEventListener('keydown',function(element){
        if(element.keyCode===13){   // check the fileds when press enter
            {element.target.value==''?element.target.classList.add('empty'):element.target.classList.remove('empty');  // this line 
            showTotal();
        }
            missingValue();
            createProduct();
            if(dataTotal[0]!=0 && dataTotal[1] >= 0)
                emptyInputs();
        }
        inp.addEventListener('keyup',function(element){
            if(element.target.value!='')
                element.target.classList.remove('empty')
        })
    })
})

createBtn.addEventListener('click',function(){
    arrInputs.forEach((inp)=>{ // check the fileds when click on create button 
        inp.value==''?inp.classList.add('empty'):inp.classList.remove('empty');
    })
    missingValue();  // check the missing values
    showTotal();  // show the total when enter our data
    createProduct();    // create our product
    if(dataTotal[0]!=0 && dataTotal[1] >= 0)  // this will empty the fileds after enter our product data => dataTotal[0]>> total price dataTotal[1]>> final price
        emptyInputs();
})

// create the product 
if(localStorage.All_Products!=null) // this code will check the if local storage is emptu or not, when local storage is not empty our product array will keep the data in local storage nisde our array to do all operatons on it
    {products=JSON.parse(localStorage.All_Products) // convert the array to strind so JSON can deal with it 
    numberItems.innerHTML=`(${products.length})`;} // show thenumber of our products in DeleteAll(#num) button
else
    products=[] // if local storage is empty the array will be empty

function createProduct(){
    if(mode=='create'){ // create mode will creat an element for first time 
        checker=0 // this checker will check all input fileds dosent have empty class so this mean all of them are filled with data so creation process will be start
        
        arrInputs.forEach((inp)=>{
            if(inp.classList.contains('empty')) // loop throw inputs ti check empty class
                    checker++
        })
        if(checker==0){  // if no empty class or in other word all inputs are filled with data the creation will start
            productData = {
                'title':`${productTitle.value}`,
                'price':`${priceInput.value} $`,
                'tax':`${taxInput.value} $`,
                'adv':`${advInput.value} $`,
                'discount':`${-discountInput.value} $`,
                'total':`${quantityNum.innerHTML} $`,
                'categorey':productCategorey.value,
            }
            products.push(productData); // expand the array with new product
            localStorage.setItem('All_Products',JSON.stringify(products)); // convert the arrray to string to store it in the local storage
            numberItems.innerHTML=`(${products.length})`;
           showData()
        }
    }
    if(mode=='update'){ // update mode will edite an exist product
        products[globalIndex].title = productTitle.value || 'Null'
        products[globalIndex].price = priceInput.value || 'Null'
        products[globalIndex].tax = taxInput.value || 'Null'
        products[globalIndex].adv = advInput.value || 'Null'
        products[globalIndex].discount = discountInput.value || 'Null'
        products[globalIndex].total = quantityNum.innerHTML || 'Null'
        products[globalIndex].categorey = productCategorey.value || 'Null'
        total()
        localStorage.setItem('All_Products',JSON.stringify(products));
        showData()
        mode= 'create'
        createBtn.innerHTML = 'Create'
    }
}

// empty the fields after filling the product 
function emptyInputs(){
    arrInputs.forEach((element)=>{
        element.value="";
    })

 setInterval(function(){
    totalLabel.classList.remove('bg-danger');
    totalLabel.classList.add('bg-primary');
    quantityNum.innerHTML=0;
 },5000)

}

//To show the data in our table
function showData(){
    let table =''; // empty the table
   if(products.length !=0){ // the products array must have items at least 1 
    for(i=0;i<products.length;i++){
        table +=`<tr class="text-center">
        <th scope="row" class="table-row">${i}</th>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].tax}</td>
        <td>${products[i].adv}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].categorey}</td>
        <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 update-itm px-3" id="update-itm" onclick="updateItem(${i})">Update</button></td>
        <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 delete-itm px-3" id="delete-itm" onclick='deleteItem(${i})'>Delete</button></td>
    </tr>`
    document.getElementById('table-body').innerHTML=table;  
    deleteItems = document.getElementsByClassName('delete-itm');
    updateItems = document.querySelectorAll('.update-.item')
    }
   }
   else{
    document.getElementById('table-body').innerHTML="";
   }
}

function deleteItem(i){
    products.splice(i,1)
                    localStorage.setItem('All_Products',JSON.stringify(products));
                    numberItems.innerHTML=`(${products.length})`
                    showData()
}

showData() // this will show the data always since start the programe 

function updateItem(i){ // this function get the id (i) when click on update button on each element 
    mode='update'; // set the mode to update
    createBtn.innerHTML='Update'; // change the button from create to update
    scrollTo({
        top:0,
        behavior:"smooth"
    }) // auto scroll to the top of the screen 


    // this process will fill the inputs with the exist data for our product we want to edite
    productTitle.value = products[i].title;
    priceInput.value = parseInt(products[i].price)
    taxInput.value = parseInt(products[i].tax)
    advInput.value = parseInt(products[i].adv)
    discountInput.value = parseInt(products[i].discount)* -1
    productCategorey.value = products[i].categorey;
    productCounts.value=1
    globalIndex = i // this will return the index to upate mode condition in createproduct()

}
// Delet All Items In The Table 
deleteAllBtn.addEventListener('click',deleteAll)
function deleteAll(){
    localStorage.clear();
    products=[];
    table=''
    document.getElementById('table-body').innerHTML='';
    numberItems.innerHTML=`(${0})`;
}

let search = 'Title'
// this function will set searching type (Title || Category)
function searchMode(id){
    if(id == 'search-title')
        {search = 'Title';
        
        }
    else
        search = 'Category'
        searchInput.placeholder = `Search By ${search}`
   searchInput.focus()
}

// this function will loop on our products and do the search 
function searchData(value){
    let table ='';
    products.forEach((ele,index)=>{
        if(search=='Title'){
                if(ele.title.toLowerCase().includes(value)){
                    console.log(value)
                    table +=`<tr class="text-center">
                    <th scope="row" class="table-row">${index}</th>
                    <td>${products[index].title}</td>
                    <td>${products[index].price}</td>
                    <td>${products[index].tax}</td>
                    <td>${products[index].adv}</td>
                    <td>${products[index].discount}</td>
                    <td>${products[index].total}</td>
                    <td>${products[index].categorey}</td>
                    <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 update-itm px-3" id="update-itm" onclick="updateItem(${i})">Update</button></td>
                    <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 delete-itm px-3" id="delete-itm" onclick='deleteItem(${i})'>Delete</button></td>
                </tr>`
                }
           
        }
        else
        if(ele.categorey.toLowerCase().includes(value)){
            console.log(value)
            table +=`<tr class="text-center">
            <th scope="row" class="table-row">${index}</th>
            <td>${products[index].title}</td>
            <td>${products[index].price}</td>
            <td>${products[index].tax}</td>
            <td>${products[index].adv}</td>
            <td>${products[index].discount}</td>
            <td>${products[index].total}</td>
            <td>${products[index].categorey}</td>
            <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 update-itm px-3" id="update-itm" onclick="updateItem(${i})">Update</button></td>
            <td><button class="rounded-pill col-lg-6 col-md-9 col-12 fs-6 w-100 delete-itm px-3" id="delete-itm" onclick='deleteItem(${i})'>Delete</button></td>
        </tr>`
        }

            document.getElementById('table-body').innerHTML=table;
    })}
   