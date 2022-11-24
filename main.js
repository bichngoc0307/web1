// const product = [
//     {
//         productId: 1,
//         image: "./image/p1.png",
//         name: "Long Sleeve Velvet Dress",
//         cat: "Dress",
//         price: "550000",
//     },
//     {
//         productId: 2,
//         image: "./image/p2.png",
//         name: "Classic Burgunry Plain Dress",
//         cat: "Dress",
//         price: "510000",
//     },
//     {
//         productId: 3,
//         image: "./image/p3.png",
//         name: "Brown Belt Pleated Skirt",
//         cat: "Skirt",
//         price: "300000",
//     },
//     {
//         productId: 4,
//         image: "./image/p4.png",
//         name: "Textured Sweater",
//         cat: "Sweater",
//         price: "320000",
//     },
//     {
//         productId: 5,
//         image: "./image/p5.png",
//         name: "Tweed Blazer & Pleated Skirt Set",
//         cat: "Set",
//         price: "580000",
//     },
//     {
//         productId: 6,
//         image: "./image/p6.png",
//         name: "Baby Girl Style Croptop",
//         cat: "Croptop",
//         price: "190000",
//     },
//     {
//         productId: 7,
//         image: "./image/p7.png",
//         name: "Flared Jeans",
//         cat: "Jeans",
//         price: "470000",
//     },
//     {
//         productId: 8,
//         image: "./image/p8.png",
//         name: "Heart Print Flared Jeans",
//         cat: "Jeans",
//         price: "480000",
//     },
//     {
//         productId: 9,
//         image: "./image/p9.png",
//         name: "Free Hand Croptop",
//         cat: "Croptop",
//         price: "200000",
//     },
//     {
//         productId: 10,
//         image: "./image/p10.png",
//         name: "Floral Pattern Drop Shoulder Sweater",
//         cat: "Sweater",
//         price: "220000",
//     },
// ]
// localStorage.setItem('product', JSON.stringify(product))

// const category = [
//     {
//         img : "./image/p1.png",
//         cat: "Dress",
//     },
//     {
//         img : "./image/p3.png",
//         cat: "Skirt",
//     },
//     {
//         img : "./image/p4.png",
//         cat: "Sweater",
//     },
//     {
//         img : "./image/p5.png",
//         cat: "Set",
//     },
//     {
//         img : "./image/p6.png",
//         cat: "Crop Top",
//     },
//     {
//         img : "./image/p7.png",
//         cat: "Jeans",
//     },
// ]
// localStorage.setItem('category',JSON.stringify(category))

// Mảng thể loại
var category = localStorage.getItem('category') ? JSON.parse(localStorage.getItem('category')) : []
var ul_category = document.getElementById('categories')
function renderCat(categories) {
    let ulCategory = document.getElementById('categories')
    var html_cat = ``
    document.getElementById('headline').innerHTML = '<h3 class="title">shop by category</h3>'
    for (let i = 0; i < category.length; i++) {
        html_cat = html_cat + `
        <li class="category">
        <div class="cat-content">
          <div class="cat-img">
            <img src="${category[i].img}" alt="">
          </div>
          <div class="cat-name">
            <p>${category[i].cat}</p>
          </div>
        </div>
      </li>
        `
    }
    ulCategory.innerHTML = html_cat
}
renderCat(category, ul_category)


// Mảng sản phẩm
var product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : []
// hiển thị danh sách tất cả sản phẩm
var ul_product = document.getElementById('products')

// paging
function renderProducts(product_render = [], currentPage = 1, totalProductOnePage = 4, elementProductsLayout) {
    console.log(product_render)
    let startItem = (currentPage - 1) * totalProductOnePage
    let endItem = currentPage * totalProductOnePage
    if (product_render.length <= totalProductOnePage) {
        startItem = 0
        endItem = product_render.length
    }
    if (endItem >= product_render.length) {
        endItem = product_render.length
    }
    let htmlProducts = ``
    for (let i = startItem; i < endItem; i++) {
        console.log(i)
        htmlProducts +=
            `<li class="product">
            <input type='hidden' value=${i} class="item"/>
            <div class="product-head">
            <div class="product-img">
                <img src="${product_render[i].image}" alt="">
            </div>
            <div href="" class="buy-now">mua ngay</div>
            </div>
            <div class="product-content">
            <div class="product-top">
                <a href="" class="product-cat">${product_render[i].cat}</a>
                <h3 class="product-name">${product_render[i].name}</h3>
            </div>
            <div class="product-bottom">
                <p>${product_render[i].price}<sup>đ</sup></p>
            </div>
            </div>
        </li>`
    }
    elementProductsLayout.innerHTML = htmlProducts
    var li = document.querySelectorAll('.product')
    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener("click", () => {
            let input_value = li[i].querySelector(".item").value
            renderProductDetail(product_render[input_value])
            console.log(input_value)
        })
    }
}


function renderBtnPaging(products = [], elementParentPaging, totalProductOnePage = 4) {
    let pagingLayout = ``
    for (i = 1; i <= Math.ceil(products.length / totalProductOnePage); i++) {
        if (i == 1) {
            pagingLayout += `<li id="page" class="click">${i}</li>`
        } else {
            pagingLayout += `<li id="page">${i}</li>`
        }
    }
    elementParentPaging.innerHTML = pagingLayout
    let pages = elementParentPaging.childNodes;
    pages.forEach((li, index) => {
        li.addEventListener("click", () => {
            console.log(products, index + 1, totalProductOnePage, document.getElementById('products'))
            renderProducts(products, index + 1, totalProductOnePage, document.getElementById('products'))
        })
    });
    $(document).ready(function () {
        $("li#page").click(function () {
            // Clear các thẻ li có Class click cũ
            $("li#page").removeClass("click");
            // Thêm Class
            $(this).addClass("click");
        });
    });
}

function renderParentLayout(totalProductOnePage = 4, products = [], elementPagesLayout) {
    renderBtnPaging(products, document.getElementById('nut'), totalProductOnePage)
    renderProducts(products, 1, totalProductOnePage, elementPagesLayout)
}

// renderParentLayout(4,product,products)
//end

// //Search feature 
function searchProduct() {
    let searchValue = document.getElementById('search-text').value
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : []
    var productSearch = []
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(searchValue) == true) {
            productSearch.push(product[i])
        }
    }
    console.log(productSearch)
    if (productSearch.length === 0) {
        // inner blank page when cannot find any product
        document.getElementById('products').innerHTML = `<!-- Here is blank page -->`
        document.getElementById('nut').innerHTML = ``
    } else {
        renderParentLayout(4, productSearch, document.getElementById('products'))
    }
}

let btnSearch = document.getElementById('search-btn')
btnSearch.addEventListener("click", () => {
    searchProduct()
    document.getElementById('categories').innerHTML = ``
})
// //end

// Render content shop
function renderShop() {
    var shop = document.getElementById('shop')
    shop.addEventListener("click", () => {
        document.getElementById('banner').innerHTML = ``
        document.getElementById('banner').style.paddingTop = '80px'
        renderContent()
        renderParentLayout(4, product, products)
        document.getElementById('categories').innerHTML = ``
        document.getElementById('headline').innerHTML = `<h3 class="title">all product</h3>`
        $('#head-menu-bar').html('');
    })
}
renderShop()
// Render content home
function renderHome() {
    var home = document.getElementById('home')
    home.addEventListener("click", () => {
        document.getElementById('banner').innerHTML = `<div id="banner"><img src="image/welcome.png" alt=""></div>`
        renderContent()
        renderCat(category)
        document.getElementById('products').innerHTML = ``
        document.getElementById('nut').innerHTML = ``
        document.getElementById('headline').innerHTML = `<h3 class="title">shop by category</h3>`
        $('#head-menu-bar').html('');
    })

}
renderHome()
// Render trang chi tiết sản phẩm
function renderProductDetail(product) {
    var content = document.getElementById("content-main")
    document.getElementById('banner').innerHTML = ``
    document.getElementById('banner').style.paddingTop = '80px'
    document.getElementById('headline').innerHTML = `<h3 class="title">product detail</h3>`
    content.innerHTML = `<div class="container">
    <div class="row d-flex">
        <!-- IMAGE -->
        <div class="pro-detail-img">
            <div class="img">
                <img src="${product.image}" alt="">
            </div>
        </div>
        <!-- CONTENT -->
        <div class="pro-detail">
            <h1>${product.name}</h1>
            <div class="price">
                <span class="price-now"><p>${product.price}<sup>đ</sup></p></span>
            </div>
            <!-- <form id="add-item-form" action="" method="post"> -->
            <div class="select-size">
                <div id="" class="swatch" data-option="option2" data-option-index="1">
                    <div class="size-chart">
                        <img src="//theme.hstatic.net/200000031420/1000946459/14/ruler.svg?v=312" width="15"
                            height="15">Hướng dẫn chọn size
                    </div>
                    <div class="select-swap">Kích thước:
                        <div data-value="M" class="n-sd swatch-element">
                            <input type="radio" class="size" name="size" value="M" checked><span>M</span>
                        </div>

                        <div data-value="L" class="n-sd swatch-element">
                            <input type="radio" class="size" name="size" value="L"><span>L</span>
                        </div>

                        <div data-value="XL" class="n-sd swatch-element">
                            <!-- <input class="variant-1 " id="swatch-1-xl" type="radio" name="option2"
                                        value="XL" data-vhandle="xl">
                                        <span>XL</span> -->
                            <input type="radio" class="size" name="size" value="L"><span>XL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="quantity-area">
                <input type="button" value="–" class="minus-btn is-form">
                <input type="number" id="quantity" value="1" class="quantity-selector" max="10" min="1">
                <input type="button" value="+" class="plus-btn is-form">
            </div>
            <div class="btn">
                <button type="button" id="add-to-cart" class="add-to-cart-style" name="add"
                    data-id="1040685987"><span>Thêm vào giỏ</span></button>
                <button type="button" id="buy-now" class="buynow-style" name="add">
                    <span>Mua ngay</span>
                </button>
            </div>
        </div>
        <!-- DESCRIPTION -->
        <div class="pro-description">
            <div class="product-description-tab">
                <div class="des-header">
                    <a href="">
                        <span>Mô tả sản phẩm</span>
                    </a>
                </div>
                <div class="des-content">
                    <div class="des-top">
                        <p>Mô tả sản phẩm</p>
                        <p><strong>Long Sleeve Velvet Dress</strong></p>
                    </div>
                    <div class="more-description">
                        <ul>
                            <li>
                                <p>Kích thước: M | L | XL</p>
                            </li>
                            <li>
                                <p>Chất liệu: 35/65</p>
                            </li>
                            <li>
                                <p>Chi tiết được thêu</p>
                            </li>
                            <li>
                                <p>Khả năng chống tia UV cao gấp đôi tiêu chuẩn thông hành</p>
                            </li>
                            <li>
                                <p>Không chứa hóa chất độc có hại cho sức khỏe</p>
                            </li>
                        </ul>
                        <p><strong>TEAM 20</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</div>`
    document.getElementById('nut').innerHTML = ``
}

function renderContent() {
    document.getElementById("content-main").innerHTML = `
    <ul class="categories" id="categories">
    </ul>
    <ul class="products" id="products">
    </ul>`

}
// modal
var modal = document.getElementById('Modal')
var bag = document.getElementById('bag');
bag.addEventListener("click", () => {
    modal.style.display = "block";
    modal.innerHTML = `<div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Giỏ Hàng</h5>
                            <span class="close" id="close">&times;</span>

                        </div>
                        <div class="modal-body">
                            <div class="cart-row">
                                <span class="cart-item cart-header ">Sản Phẩm</span>
                                <span class="cart-price cart-header ">Giá</span>
                                <span class="cart-quantity cart-header ">Số Lượng</span>
                            </div>
                            <div class="cart-items">

                            </div>
                            <div class="cart-total">
                                <strong class="cart-total-title">Tổng Cộng:</strong>
                                <span class="cart-total-price">0VNĐ</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="close-footer">Đóng</button>
                            <button type="button" class="pay">Thanh toán</button>
                    
                        </div>
                    </div>`
    var close = document.getElementById('close')
    close.addEventListener("click", () => {
        modal.style.display = "none";
    })
    var close_footer = document.getElementsByClassName("close-footer")[0];
    var pay = document.getElementsByClassName("pay")[0];
    close_footer.onclick = function () {
        modal.style.display = "none";
    }
    pay.onclick = function () {
        alert("Đơn hàng đã được thanh toán!")
    }
})
function renderModal(){
    var modal = document.getElementById('Modal')
var bag = document.getElementById('bag');
bag.addEventListener("click", () => {
    modal.style.display = "block";
    modal.innerHTML = `<div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Giỏ Hàng</h5>
                            <span class="close" id="close">&times;</span>

                        </div>
                        <div class="modal-body">
                            <div class="cart-row">
                                <span class="cart-item cart-header ">Sản Phẩm</span>
                                <span class="cart-price cart-header ">Giá</span>
                                <span class="cart-quantity cart-header ">Số Lượng</span>
                            </div>
                            <div class="cart-items">

                            </div>
                            <div class="cart-total">
                                <strong class="cart-total-title">Tổng Cộng:</strong>
                                <span class="cart-total-price">0VNĐ</span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="close-footer">Đóng</button>
                            <button type="button" class="pay">Thanh toán</button>
                    
                        </div>
                    </div>`
    var close = document.getElementById('close')
    close.addEventListener("click", () => {
        modal.style.display = "none";
    })
    var close_footer = document.getElementsByClassName("close-footer")[0];
    var pay = document.getElementsByClassName("pay")[0];
    close_footer.onclick = function () {
        modal.style.display = "none";
    }
    pay.onclick = function () {
        alert("Đơn hàng đã được thanh toán!")
    }
})
}
// Signup
function createAdmin() {
    if (localStorage.getItem('user') === null) {
        var userArray = [];
        var user = { username: 'admin', password: 'admin' };
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}
createAdmin();
// render login signup
var user = document.getElementById('user');
user.addEventListener("click", () => {
    modal.style.display = "block";
    modal.innerHTML = `<div class="login-signup-content">
    <div class="login-signup-header">
        <div class="login-signup-title">
            <img src="image/logo.png" alt="">
        </div>
        <span class="close" id="close">&times;</span>
    </div>
    <div id="container-login">
        <div id="login-form">
            <form id="loginform" action="" method="post">
                <h1>Log in</h1>
                <div id="input-box">
                    <i></i>
                    <input id="usernameLogin" type="text" placeholder="Enter username">
                </div>
                <div id="input-box">
                    <i></i>
                    <input id="passwordLogin" type="password" placeholder="Enter password">
                </div>
                <div id="loginerror">Mật khẩu không trùng khớp</div>
                <button type="submit" id="btn-box" class="btn">
                    Login
                </button>
            </form>
        </div>
        <div id="signup-form">
            <form id="signupform" action="" method="post">
                <h1>Sign up</h1>
                <div id="input-box">
                    <input id="usernameSignUp" type="text" placeholder="Enter username">
                </div>
                <div id="input-box">
                    <input id="passwordSignUp" type="password" placeholder="Enter password">
                </div>
                <div id="input-box">
                    <input id="passwordSignUp2" type="password" placeholder="Confirm password">
                </div>
                <div id="signuperror">Mật khẩu không trùng khớp</div>
                <button type="submit" id="btn-box" class="btn">
                    Sign up
                </button>
            </form>
        </div>
    </div>
</div>`
    var close = document.getElementById('close')
    close.addEventListener("click", () => {
        modal.style.display = "none";
    })
    // SIGNUP

    var liUser = document.getElementById('user')
    liUser.addEventListener("click", () => {
        if (document.getElementById('container-login').style.display == 'flex') {
            document.getElementById('container-login').style.display = 'none';
        }
        else {
            document.getElementById('container-login').style.display = 'flex';

        }
    })
    document.getElementById('signupform').addEventListener('submit', createUser);
    document.getElementById('loginform').addEventListener('submit', login);
    function createUser(e) {
        e.preventDefault();
        var username = document.getElementById('usernameSignUp');
        var password = document.getElementById('passwordSignUp');
        var password2 = document.getElementById('passwordSignUp2');
        var x = document.getElementById('signuperror');
        if (!username.value) {
            x.style.display = 'block';
            x.innerHTML = 'Vui lòng nhập tài khoản';
            return false;
        } else {
            x.style.display = 'none';
        }
        if (!password.value) {
            x.style.display = 'block';
            x.innerHTML = 'Vui lòng nhập mật khẩu';
            return false;
        } else {
            if (password.value.length < 3) {
                x.style.display = 'block';
                x.innerHTML = 'Mật khẩu phải trên 3 ký tự';

                return false;
            } else {
                x.style.display = 'none';
            }
        }
        if (password2.value != password.value) {
            x.style.display = 'block';
            x.innerHTML = 'Mật khẩu không trùng khớp';
            return false;
        } else {
            x.style.display = 'none';
        }
        var user = { username: username.value, password: password.value };
        var userArray = JSON.parse(localStorage.getItem('user'));
        for (var i = 0; i < userArray.length; i++) {
            if (user.username == userArray[i].username) {
                x.style.display = 'block';
                x.innerHTML = 'Tên đăng nhập đã có người sử dụng';
                username.focus();
                return false;
            }
        }
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
        alert('Bạn đã đăng ký thành công!', 'success');
    }
    // LOGIN
    function login(e) {
        e.preventDefault();
        var usernanme = document.getElementById('usernameLogin');
        var password = document.getElementById('passwordLogin');
        var x = document.getElementById('loginerror');
        var flag = true;
        if (!usernanme.value) {
            x.style.display = 'block';
            x.innerHTML = 'Vui lòng nhập tài khoản';
            return false;
        } else {
            x.style.display = 'none';
        }
        if (!password.value) {
            x.style.display = 'block';
            x.innerHTML = 'Vui lòng nhập mật khẩu';
            return false;
        } else {
            x.style.display = 'none';
        }
        var userArray = JSON.parse(localStorage.getItem('user'));
        for (var i = 0; i < userArray.length; i++) {
            if (usernanme.value == userArray[i].username) {
                if (password.value == userArray[i].password) {
                    localStorage.setItem('userlogin', JSON.stringify(userArray[i]));
                    window.location.reload(true);
                    return true;
                }
            }
        }
        x.style.display = 'block';
        x.innerHTML = 'Sai tài khoản hoặc mật khẩu';
        return false;
    }
})
function logout(url) {
    localStorage.removeItem('userlogin');
    // localStorage.removeItem('cart');
    location.href = url;
}
function checklogin() {
    if (localStorage.getItem('userlogin')) {
        var user = JSON.parse(localStorage.getItem('userlogin'));
        var s = '';
        if (user.username == 'admin') {
            s = ' <li id="user"><a href="/admin.html"><i class="fa-solid fa-cog"></i></a></li>' +
                '<li id="user"><button id="btnlg">' + user.username + '</button><button id="btnlogout" onClick="logout(\'/index.html\')">LOGOUT</button></li>' +
                '<li id="bag"><i class="fa-solid fa-cart-shopping"></i></li>' +
                '<li><div action="" id="search-box"><input type="text" id="search-text" placeholder="Type to search" required><button id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button></div></li>'
                ;
        } else {
            s = '<li id="user"><button id="btnlg">' + user.username + '</button><button id="btnlogout" onClick="logout(\'/index.html\')">LOGOUT</button></li>' +
                '<li id="bag"><i class="fa-solid fa-cart-shopping"></i></li>' +
                '<li><div action="" id="search-box"><input type="text" id="search-text" placeholder="Type to search" required><button id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button></div></li>'
                ;
        }
        document.querySelector('ul.icon').innerHTML = s;
    }
    renderModal()
}



// render menu bar 
var bar = document.getElementById('head-bar')
bar.addEventListener("click", () => {
    document.getElementById('head-menu-bar').innerHTML = `<div id="menu-bar" class="menu-bar">
    <div class="menu-bar-content">
        <div class="menu-bar-header">
            <h5 class="menu-bar-title">Menu</h5>
            <span class="close" id="close">&times;</span>
            <script>
                var menu_bar = document.getElementById("menu-bar");
            </script>
        </div>
        <div>
            <ul class="menu-bar-shop">
                <li id="home">
                    <a href="#home" >Home</a>
                </li>
                <li class="menu-bar-dropdown" id="shop">
                    <a href="#shop" >shop</a>
                    <ul class="menu-bar-dropdown-content">
                        <li>crop top</li>
                        <li>dress</li>
                        <li>jeans</li>
                        <li>set</li>
                        <li>skirt</li>
                        <li>sweater</li>
                    </ul>
                </li>
                <li>
                    <a href="#shop" class="a">contact</a>
                </li>
                <li>
                    <a href="#shop" class="a">about</a>
                </li>
            </ul>
        </div>
        
    </div>
</div>`
    renderShop()
    renderHome()
    $(document).ready(function () {
        $('#close').click(function () {
            $('#head-menu-bar').html('');
        });
    });
})




