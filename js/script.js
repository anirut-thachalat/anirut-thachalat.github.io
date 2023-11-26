


async function getApi() {
    const res = await fetch('https://fakestoreapi.com/products/')
    const data = await res.json()

    localStorage.setItem("data", JSON.stringify(data))

}
getApi()


/*========== search API ==================*/
function search() {
    let json = JSON.parse(localStorage.getItem("data"))
    let searchList = document.querySelector(".search-list")
    for (let i = 0; i < json.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `<img src="${json[i].image}"alt="${json[i].title}" />
                        <span>${json[i].title}</span> `

        searchList.appendChild(li)
        li.onclick = () => {
            viewCart(i)
        }
    }

}

// =============  feature =============//
function feature() {
    let json = JSON.parse(localStorage.getItem("data"))
    for (let i = 0; i < 6; i++) {
        let swiperSlide = document.getElementsByClassName("swiper-slide")
        swiperSlide[i].innerHTML = `
                                <div class="feature-img">
                                   <img src="${json[i].image}" alt="${json[i].title}">
                                </div>
                                <p class="feature-title">${json[i].title} </p>
                                <span class="feature-price">${json[i].price}$</span>
                                <button class="feature-view-cart">view</button>

                                `
        swiperSlide[i].children[3].onclick = () => {
            viewCart(i)
        }
        let swiper = new Swiper(".mySwiper", {
            slidesPerView: 4,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,

            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
                980: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
                1320: {
                    slidesPerView: 4,
                    spaceBetween: 32,
                },
            },
        });
    }

}

// ============= new arrival API ============== //
function arrival() {
    let json = JSON.parse(localStorage.getItem("data"))
    for (let i = 12; i < json.length; i++) {
        let cartArrival = document.querySelector(".arrival-cart")
        let arrivalItem = document.createElement("div")
        arrivalItem.classList.add("arrival-cart-item")
        arrivalItem.innerHTML = `
                                <div class="arrival-img">
                                   <img src="${json[i].image}" alt="${json[i].title}">
                                </div>
                                <p class="arrival-title">${json[i].title} </p>
                                <span class="arrival-price">${json[i].price}$</span>
                                <button class="arrival-view-cart">view</button>
                                `
        cartArrival.appendChild(arrivalItem)
        arrivalItem.children[3].onclick = () => {
            viewCart(i)
        }

    }

}
// ============= product API ============== //
function product() {
    let json = JSON.parse(localStorage.getItem("data"))
    for (let i = 0; i < json.length; i++) {
        let product = document.querySelector(".product-cart")
        let productlItem = document.createElement("div")
        productlItem.classList.add("product-cart-item")
        productlItem.innerHTML = `
                        <div class="product-img">
                           <img src="${json[i].image}" alt="${json[i].title}">
                        </div>
                        <p class="product-title">${json[i].title} </p>
                        <span class="product-price">${json[i].price}$</span>
                        <button class="product-view-cart"> view</button >`
        product.appendChild(productlItem)
        productlItem.children[3].onclick = () => {
            viewCart(i)


        }

    }
}


/*==================  open-menu ==================*/
function openMenu() {
    let menu = document.querySelector(".nav-menu")
    let closeMemu = document.querySelector(".close-menu")

    menu.style.top = "0"
    closeMemu.onclick = () => {
        menu.style.top = "-200%"
    }
    for (let i = 0; i < menu.children.length; i++) {
        menu.children[i].onclick = () => {
            menu.style.top = "-200%"
        }
    }

}

/*==============  open-search =====================*/
function openSearch() {
    let search = document.querySelector(".search-modal")
    let closeSearch = document.querySelector(".close-search")
    search.style.top = "0"
    closeSearch.onclick = () => {
        search.style.top = "-200%"
    }
    //search-product
    let textInput = document.querySelector("#text-input")
    textInput.onkeyup = (e) => {
        let filter = e.target.value.toUpperCase()
        let ul = document.querySelector(".search-list")
        let li = ul.children

        for (let i = 0; i < li.length; i++) {
            let textValue = li[i].children[1].innerHTML.toUpperCase()

            if (textValue.indexOf(filter) > -1) {
                li[i].style.display = ""

            } else {
                li[i].style.display = "none"

            }


        }
    }

}


/*========================== open user==================== */
function openUser() {

    let userModal = document.querySelector(".user-modal")
    let closeUser = document.querySelector(".close-user")
    userModal.style.top = "0"
    closeUser.onclick = () => {
        userModal.style.top = "-200%"
    }
}


// get arry






// ================ open view cart ==================//

function viewCart(index) {

    // close view cart
    let data = JSON.parse(localStorage.getItem("data"))
    let viewCart = document.querySelector(".view-cart")
    let closeView = document.querySelector(".close-view")

    viewCart.style.top = "0"
    closeView.onclick = () => {
        viewCart.style.top = "-100%"

    }

    // show view cart//
    let img = document.querySelector(".view-box-img")
    let info = document.querySelector(".view-box-info")
    let viewPrice = document.querySelector(".view-price")

    img.children[0].setAttribute("src", data[index].image)
    info.children[0].innerHTML = data[index].title
    info.children[1].innerHTML = data[index].description
    viewPrice.innerHTML = `${data[index].price} $`




    // select size 
    let size = document.querySelector("#Size")
    size.value = "s"


    // quantity
    let sum = 1
    let reduce = document.querySelector(".reduce")
    let increase = document.querySelector(".increase")
    let num = document.querySelector(".num")
    let price = parseFloat(viewPrice.innerHTML)
    let total = price

    increase.onclick = () => {
        if (sum < 10) {
            sum++
            num.innerHTML = sum
            total = price * sum
            viewPrice.innerHTML = `${total.toFixed(2)} $`

        }


    }
    reduce.onclick = () => {
        if (sum > 1) {
            sum--
            num.innerHTML = sum
            total = price * sum
            viewPrice.innerHTML = `${total.toFixed(2)} $`

        }

    }
    num.innerHTML = sum
    //add cart
    let addCart = document.querySelector(".add-cart")

    addCart.onclick = () => {
        let objCart = {
            id: index,
            img: data[index].image,
            name: data[index].title,
            size: size.value,
            price: price,
            quantity: sum,
            total: total
        }

        addToCart(objCart)
        closeView.click()
    }


}

//============================== add to cart=====================//
let arryCart = []
function getArry() {

    let getArry = JSON.parse(localStorage.getItem("product"))
    if (getArry != null) {
        arryCart = getArry
        renderCart()
    } else {
        arryCart = []
    }


}
getArry()
function addToCart(obj) {
    let checkArry = true
    for (let i = 0; i < arryCart.length; i++) {
        if (arryCart[i].id == obj.id && arryCart[i].size == obj.size) {
            checkArry = false
            arryCart[i].quantity = arryCart[i].quantity + obj.quantity
            arryCart[i].total = arryCart[i].quantity * arryCart[i].price

        }

    }
    if (checkArry) {

        arryCart.push(obj)

    }

    renderCart()

}




function renderCart() {

    // navbar cart count
    let navCount = document.querySelector("#nav-count")
    navCount.innerHTML = arryCart.length

    //count item
    let countItem = document.querySelector(".count-item")
    countItem.innerHTML = arryCart.length


    let ul = document.querySelector(".cart-item-list")
    ul.innerHTML = ""
    let subTotalNum = 0
    for (let i = 0; i < arryCart.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = ` <div class="cart-item-img">
        <img src="${arryCart[i].img}" alt="${arryCart[i].name}">
    </div>
    <div class="cart-item-info">
        <p> ${arryCart[i].name}</p>
         <div class="item-option">
               <p> size :${arryCart[i].size}</p>
     
               <div class="item-quantity">
                  <span class="item-price" style="color: red;"> ${arryCart[i].price}$</span>
                  <button class="item-reduce">-</button>
                  <span class="item-num"> ${arryCart[i].quantity} </span>
                  <button class="item-increase"> +</button>
               </div>
               <div class="item-total-box">
                  <span> total : <span class="item-total" style="color: green;"> ${arryCart[i].total.toFixed(2)} $</span> </span>
                  <i class="fa-solid fa-delete-left"></i>
                </div>
        </div>
    </div>`

        ul.appendChild(li)

        // sub total
        subTotalNum = subTotalNum + arryCart[i].total
        let subTotal = document.querySelector(".sub-total")
        subTotal.innerHTML = `${subTotalNum.toFixed(2)}$`



        // edit quantity
        function editQuantity() {
            let decrease = document.querySelectorAll(".item-reduce")
            let increase = document.querySelectorAll(".item-increase")

            decrease[i].onclick = () => {
                if (arryCart[i].quantity > 1) {
                    arryCart[i].quantity--
                    arryCart[i].total = arryCart[i].total - arryCart[i].price
                    renderCart()
                }
            }
            increase[i].onclick = () => {
                if (arryCart[i].quantity < 10) {
                    arryCart[i].quantity++
                    arryCart[i].total = arryCart[i].total + arryCart[i].price
                    renderCart()
                }
            }

        }
        editQuantity()

        //  delete caer 
        function deleteCart() {
            let deleteCart = document.querySelectorAll(".fa-delete-left")

            deleteCart[i].onclick = () => {
                arryCart.splice(i, 1)
                renderCart()
                if (arryCart == "") {
                    closeItem.click()
                }

            }
        }
        deleteCart()

    }

    localStorage.setItem("product", JSON.stringify(arryCart))
    localStorage.setItem("total", JSON.stringify(subTotalNum))

}




// =====================open add cart====================  //
let closeItem = document.querySelector(".close-item")
let cartItem = document.querySelector(".cart-item-modal")
let cartIcon = document.querySelector("#cart-icon")
let navCount = document.querySelector("#nav-count")

closeItem.onclick = () => {
    cartItem.style.top = "-200%"
}
cartIcon.onclick = () => {
    if (navCount.innerHTML == "0") {
        alert("no product")
    } else {
        cartItem.style.top = "0"

    }

}













