var d = new Date();

//日期變數
var dateFormat = {
	year: d.getFullYear(),
	month: d.getMonth()+1,
	date: d.getDate(),
	day: d.getDay(),
}

var loaderSetting = false;
var loader = document.getElementsByClassName('loader-container')[0];

//顯示日期
function dayRender(){
	var dayText = document.getElementById('js-dayText');
	var dateText = document.getElementById('js-dateText');
	var day = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
	
	//偶數奇數顯示
	var odd = document.getElementsByClassName
	('odd')[0];
	var even = document.getElementsByClassName('even')[0];
	function dayOddEven(num){
		if(num ===1 || num===3 || num===5){
			odd.classList.add('open')
			even.classList.remove('open')
		} else if(num ===2 || num===4 || num===6) {
			even.classList.add('open')
			odd.classList.remove('open')
		}
	}
	dayOddEven(dateFormat.day)
	
	//數字轉換，10以下數字加上0
	function addTenDigits(num){
		var TenDigits=0;
		return num<10?TenDigits=0:'';
	}
	
	//取得今天日期
	function getDateText(){		
		return dateFormat.year+'-'+addTenDigits(dateFormat.month)+dateFormat.month+'-'+addTenDigits(dateFormat.date)+dateFormat.date
	}	

	//取得今天星期幾
	function getDayText(){
		return day[dateFormat.day]
	}
	
	//顯示日期與星期幾
	dateText.textContent = getDateText();
	dayText.textContent = getDayText();
}

var amount = document.getElementsByClassName('js-amount')[0];
var maskData;
var dataLength;

//Ajax取資料
function getData(){
	axios.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR39SM9hfUl6hf4wcrrY_UBXrB5mZ9UhsAf1cpSyuuVxF9iWmjngk91r3PM')
	.then(function(res){
		
		maskData = res.data.features;
		// console.log(maskData);
		// loaderSetting = true;
		// loadingOverlay()
		domRender(maskData)
		// loader.classList.remove('show');
		// domRender()
	})
}

function loadingOverlay(){
	if(loaderSetting){
		loader.classList.add('show');
	}else {
		loader.classList.remove('show');
	}
}

var perPageView = 10
function pagination(){

}

//顯示資料到畫面
function domRender(data){
	var dataList = document.getElementsByClassName('data-list')[0];
	
	dataLength=maskData.length;	
	amount.textContent = dataLength;

	var html ='';	
	dataList.innerHTML='';
	data.forEach(function(item){
		html+=`
				<div class="data-list__item">
					<div class="item-content">
						<h3 class="item-content__title">${item.properties.name}</h3>
						<p class="item-content__info">${item.properties.address}</p>
						<p class="item-content__info">${item.properties.phone}</p>
						<p class="item-content__info">
							<div>
								<span>成人口罩:</span>
								<span>${item.properties.mask_adult}</span>
							</div>
							<div>
								<span>小孩口罩:</span>
								<span>${item.properties.mask_child}</span>
							</div>
						</p>
					</div>
				</div>
				`
	});
	
	dataList.innerHTML = html;
}

var search = document.getElementsByClassName('js-search')[0];
var area = document.getElementsByClassName('area')[0];

//篩選地區
function filterCounty(county){
	var filterData = maskData.filter(function(item){
		if(county === undefined) return item;
		return county=== item.properties.county;
	})	
	console.log(county)
	domRender(filterData)
	dataLength=filterData.length;
	amount.textContent=dataLength
}

//搜尋
search.addEventListener('keyup',function(){
	filterCounty(this.value)
	console.log(this.value);
	
})
area.addEventListener('change',function(){
	filterCounty(this.value)
})


//初始
function init(){
	dayRender()
	getData()
}
init()