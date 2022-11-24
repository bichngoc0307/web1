
//  render cac menu
var product = document.getElementById('product')
var order = document.getElementById('order')
var customer = document.getElementById('customer')
$(document).ready(function () {
	$("#product").click(function () {
		// Clear các thẻ li có Class click cũ
		$("#order").removeClass("click");
		$("#customer").removeClass("click");
		// Thêm Class
		$(this).addClass("click");
		showProductList(0);
	});
	$("#order").click(function () {
		// Clear các thẻ li có Class click cũ
		$("#product").removeClass("click");
		$("#customer").removeClass("click");
		// Thêm Class
		$(this).addClass("click");
	});
	$("#customer").click(function () {
		// Clear các thẻ li có Class click cũ
		$("#product").removeClass("click");
		$("#order").removeClass("click");
		// Thêm Class
		$(this).addClass("click");
		showUserList(0)
	});

});

order.addEventListener('click', () => {
	document.getElementById('content').innerHTML = `<table class="table-1">
            <thead>
                <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 10%;">ID order</th>
                    <th style="width: 25%;">Customer name</th>
                    <th style="width: 15%;">Product</th>
                    <th style="width: 15%;">Total</th>
                    <th style="width: 15%;">Status</th>
                    <th style="width: 15%;">Action</th>
                </tr>
            </thead>
        </table>`
	document.getElementById('footer').innerHTML = ``
})
product.addEventListener('click', () => {
	document.getElementById('content').innerHTML = `<table class="table-1" id="productlist">
            <thead>
                <tr>
                    <th style="width: 5%;">ID</th>
                    <th style="width: 10%;">Image</th>
                    <th style="width: 15%;">Product name</th>
                    <th style="width: 40%;">Category</th>
                    <th style="width: 15%;">Price</th>
                    <th style="width: 15%;">Action</th>
                </tr>
            </thead>
        </table>`
	document.getElementById('footer').innerHTML = `
	<div class="table-footer" >
	<select name="kieuTimSanPham">
		<option value="ID">Search by ID</option>
		<option value="Ten">Search by name</option>
		<option value="Loai">Search by category</option>
	</select>
	<input type="text" placeholder="Enter...">
    <button>Search</button>
    <button id="add">Add Product</button>
</div>`
	renderFormAdd()
})
customer.addEventListener('click', () => {
	document.getElementById('content').innerHTML = `<table class="table-1" id="userlist">
            <thead>
                <tr>
                    <th style="width: 5%;">#</th>
                    <th style="width: 15%;">Username</th>
                    <th style="width: 15%;">Type</th>
                    <th style="width: 15%;">Action</th>
                </tr>
            </thead>
        </table>`
	document.getElementById('footer').innerHTML = `<div class="table-footer" >
	<select name="kieuTimKhachHang">
		<option value="ID">Search by ID</option>
		<option value="Ten">Search by name</option>
	</select>
	<input type="text" placeholder="Enter...">
    <button>Search</button>
</div>`
})

//Logout
function hello() {
	var user = JSON.parse(localStorage.getItem('userlogin'));
	document.getElementById('hello').innerHTML = '<div class="head-logo"><img src="image/logo.png" alt=""></div>' +
		'<li><button id="btnlg">' + user.username + '</button><button id="btnlogout" onClick="logout(\'/index.html\')">LOGOUT</button></li>';
}
function logout(url) {
	localStorage.removeItem('userlogin');
	location.href = url;
}
function showProductList(vitri) {
	var productArray = JSON.parse(localStorage.getItem('product'));
	var s = '<thead><tr><th>#ID</th><th>Image</th><th>Product Name</th><th>Category</th><th>Price</th><th>Action</th></tr>';
	var dem = 0;
	for (var i = vitri; i < productArray.length; i++) {
		s += '<tr>' +
			'<td>' + productArray[i].productId + '</td>' +
			'<td><img src="../' + productArray[i].image + '"></td>' +
			'<td>' + productArray[i].name + '</td>' +
			'<td>' + productArray[i].cat + '</td>' +
			'<td>' + productArray[i].price + '</td>' +
			'<td>' +
			'<button class="delete" onClick="deleteproduct(\'' + productArray[i].productId + '\')">&times;</div>' +
			'<button class="change"  onClick="showchangeproductbox(\'' + productArray[i].productId + '\')">Edit</div>' +
			'</td>' +
			'</tr></thead>';
		dem++;
		// if(dem==10){
		// 	break;
		// }
	}
	document.getElementById('productlist').innerHTML = s;
	// setPagination();
}
function createProduct() {
	if (localStorage.getItem('product') === null) {
		var productArray = [];
		var producttemp = { productId: 1, cat: "Dress", image: './image/p1.png', name: "Long Sleeve Velvet Dress", price: "550000" };
		productArray.push(producttemp);
		localStorage.setItem('product', JSON.stringify(productArray));
	}
}
function changeimg(input) {
	input = input.value;
	var image = input.split("\\");
	return './image/' + image[2];
}
function addProduct() {
	var productArray = JSON.parse(localStorage.getItem('product'));
	var productid = parseInt(productArray[productArray.length - 1].productId) + 1;
	var productname = document.getElementById('productname');
	var cat = document.getElementById('cat');
	var price = document.getElementById('productprice');
	var image = document.getElementById('image');
	if (!cat.value || !productname.value || !price.value) {
		alert('Bạn chưa nhập đủ thông tin sản phẩm', 'warning');
		return false;
	}
	if (isNaN(Number(price.value))) {
		alert('Giá không hợp lệ', 'warning');
		return false;
	}
	image = changeimg(image);
	var producttemp = { productId: productid, cat: cat.value, image: image, name: productname.value, price: price.value };
	productArray.push(producttemp);
	localStorage.setItem('product', JSON.stringify(productArray));
	showProductList(0);
	alert('Thêm sản phẩm thành công', 'success');
	document.getElementById('box').style.display = 'none'
}
function showchangeproductbox(productid) {
	document.getElementById('modal1').style.display = 'block';
	var productArray = JSON.parse(localStorage.getItem('product'));
	for (var i = 0; i < productArray.length; i++) {
		if (productArray[i].productId == productid) {
			document.getElementById('imgafter').src = productArray[i].image;
			document.getElementById('name').value = productArray[i].name;
			document.getElementById('price').value = productArray[i].price;
			document.getElementById('save').setAttribute('onClick', 'changeproduct(' + productArray[i].productId + ')');
		}
	}

}
function closechangebx() {
	document.getElementById('box').style.display = 'none';
	document.getElementById('modal1').style.display = 'none'
	document.getElementById('modal2').style.display = 'none'
}
function changeproduct(productid) {
	var image = document.getElementById('fileimg');
	image = changeimg(image);
	// document.getElementById('modal1').style.display = 'none';
	var productArray = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for (var i = 0; i < productArray.length; i++) {
		if (productArray[i].productId == productid) {
			productArray[i].image = image;
			productArray[i].name = document.getElementById('name').value;
			productArray[i].price = document.getElementById('price').value;
			vitri = (Math.floor(i / 10)) * 10;
		}
	}
	localStorage.setItem('product', JSON.stringify(productArray));
	showProductList(vitri);

}
function deleteproduct(productiddelete) {
	var productArray = JSON.parse(localStorage.getItem('product'));
	var vitri;
	for (var i = 0; i < productArray.length; i++) {
		if (productArray[i].productId == productiddelete) {
			if (confirm('Bạn có muốn xóa sản phẩm này?')) {
				productArray.splice(i, 1);
			}
		}
	}
	localStorage.setItem('product', JSON.stringify(productArray));
	showProductList(0);
}
// USER
function showUserList() {
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr = '<thead><tr><th>#ID</th><th>Usernam</th><th>Type</th><th>Action</th></tr></thead>';
	for (var i = 0; i < userArray.length; i++) {
		tr += '<tr><td>' + (i + 1) + '</td><td>' + userArray[i].username + '</td><td>' + userArray[i].usertype + '</td>' +
			'<td>' +
			'<button class="delete" onClick="deleteuser(\'' + userArray[i].userId + '\')">&times;</button>' +
			'<button class="change" onClick="showchangeuserbox(\'' + userArray[i].userId + '\')">Sửa</button></div></td>' +
			'</tr>';
	}
	document.getElementById('userlist').innerHTML = tr;
}
function showchangeuserbox(userId) {
	document.getElementById('modal2').style.display = 'block';
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].userId == userId) {
			document.getElementById('username').value = userArray[i].username;
			document.getElementById('usertype').value = userArray[i].usertype;
			document.getElementById('save2').setAttribute('onClick', 'changeuser(' + userArray[i].userId + ')');
		}
	}
}

function changeuser(userId) {
	document.getElementById('modal2').style.display = 'none';
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].userId == userId) {
			userArray[i].username = document.getElementById('username').value;
			userArray[i].usertype = document.getElementById('usertype').value
		}
	}
	localStorage.setItem('user', JSON.stringify(userArray));
	showUserList();
}
function deleteuser(useriddelete) {
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].userId == useriddelete) {
			if (confirm('Bạn có muốn xóa user này?')) {
				userArray.splice(i, 1);
			}
		}
	}
	localStorage.setItem('user', JSON.stringify(userArray));
	showUserList();
}

// Render add product
function renderFormAdd() {
	var add = document.getElementById('add');
	add.addEventListener("click", () => {
		document.getElementById('box').style.display = 'block'
		document.getElementById('box').innerHTML = `<div class="box-content">
		<div class="box-header">
			<h2>Add Product</h2>
			<button class="close" onclick="closechangebx()">&times;</button>
		</div>
		<div id="container-form">
			<div id="box-form">
				<form id="form">
					<label for="productname">Product Name:</label>
					<input type="text" id="productname" placeholder="Enter product name" class="input-box">
					<label for="cat">Category:</label>
					<select id="cat" class="input-box">
						<option value="Croptop">Croptop</option>
						<option value="Dress">Dress</option>
						<option value="Jeans">Jeans</option>
						<option value="Set">Set</option>
						<option value="Skirt">Skirt</option>
						<option value="Sweater">Skirt</option>
					</select>
					<label for="productprice">Price:</label>
					<input type="text" id="productprice" placeholder="Enter product price" class="input-box">
					<label >Image:</label>
					<input id ="image" type="file" style="margin-bottom: 10px;">
					<button type="button" onClick="addProduct()" class="btn">Thêm</button>
				</form>
			</div>  
		</div>
	</div>`
	})
}
renderFormAdd()
