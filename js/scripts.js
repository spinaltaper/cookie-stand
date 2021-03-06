'use strict';
//Just variable declarations.
var hours=[7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var locations=['Pike Place','Seattle Center','Red Square','Edmonds Beach','King Street Station'];
var access=['Pike Place','Seattle Center','Red Square','Edmonds Beach','King Street Station'];
var accessTable=['Pike Place Table','Seattle Center Table','Red Square Table','Edmonds Beach Table','King Street Station Table'];
var minCustomersPerHour=[23,20,15,5,30];
var maxCustomersPerHour=[65,90,60,75,60];
var avgCookiesPerCustomer=[6.3,12.2,5.1,15.5,3.9];
var prices=[.5,1,.5,.75,.5];
var stands=[];
var initializationDone=false;
var staffTable=document.getElementById('staff');
//Establishment of the lower table in the DOM.
var profitTable=document.getElementById('sales');
//This is the creation of the objects for the website's forms.
var newLocation=document.getElementById('newLocation');
var newMinCust=document.getElementById('newMinCust');
var newMaxCust=document.getElementById('newMaxCust');
var newAvgCook=document.getElementById('newAvgCook');
var submitButtonPress=document.getElementById('submitButton');
//This is the constructor function for each Stand.
function Stand(i){
  this.locationName=locations[i];
  this.minCustomersPerHour=minCustomersPerHour[i];
  this.maxCustomersPerHour=maxCustomersPerHour[i];
  this.avgCookiesPerCustomer=avgCookiesPerCustomer[0];
  this.customersEachHour=[];
  this.access=access[i];
  this.cookiesSoldEachHour=[];
  this.totalCookiesSoldPerDay= 0;
  this.totalProfit=0;
  this.price=prices[i];
  this.profitByHour=[];
  this.accessTable=accessTable[i];
  this.calcCustomersEachHour=function(){ 
    for (var h=0;h<hours.length;h++){
      this.customersEachHour.push(getRandomInt(this.minCustomersPerHour,this.maxCustomersPerHour));
    }
  },
  this.calcCookiesEachHour=function(){
    for(var h=0;h<hours.length;h++){
      this.cookiesSoldEachHour.push(Math.ceil(this.customersEachHour[h]*6.3));
    }
  };
  this.calcTotalCookiesPerDay= function(){
    var total=0;
    for(var h=0;h<hours.length;h++){
      total+=this.cookiesSoldEachHour[h];
    }
    this.totalCookiesSoldPerDay=total;
  };
  this.calcTotalProfit=function(){
    this.totalProfit=this.totalCookiesSoldPerDay*this.price;
  };
  this.calcProfitByHour=function(){
    for(var h=0;h<hours.length;h++){
      this.profitByHour.push(this.cookiesSoldEachHour[h]*this.price);
    }
  };
  this.calcCustomersEachHour();
  this.calcCookiesEachHour();
  this.calcProfitByHour();
  this.calcTotalCookiesPerDay();
  this.calcTotalProfit();
}
for(var i=0;i<locations.length;i++){
  stands.push(new Stand(i));
  stands[i].calcCustomersEachHour();
  stands[i].calcCookiesEachHour();
  stands[i].calcTotalCookiesPerDay();
}
//This randomizer determines how many customers arrive.
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//This renders the table.
function makeHeaderRow(){
  var trEl=document.createElement('tr');
  trEl.id='Header';
  newElement('th','Locations:',trEl);
  for(i=0;i<hours.length;i++){
    newElement('th',hours[i],trEl);
  }
  newElement('th','totals',trEl);
  profitTable.appendChild(trEl);
}
function makeFooterRow(){
  if (initializationDone===true){
    var oldFoot=document.getElementById('foot');
    oldFoot.parentNode.removeChild(oldFoot);
  }
  var trEl=document.createElement('tr');
  trEl.id='foot';
  var tdEl=document.createElement('td');
  tdEl.textContent='Daily Totals';
  trEl.appendChild(tdEl);
  for(i=0;i<hours.length;i++){
    var total=0;
    for(var h=0;h<locations.length;h++)
    {total+=stands[h].cookiesSoldEachHour[i];
    }
    newElement('td',total,trEl);
  }
  total=0;
  for(h=0;h<locations.length;h++){
    total+=stands[h].totalCookiesSoldPerDay;
  }
  newElement('td',total,trEl);
  profitTable.appendChild(trEl);
}
function startingTable(){
  makeHeaderRow();
  for(i=0;i<stands.length;i++)
  {stands[i].makeRow();
    stands[i].makeStaffRow();
  }
  makeFooterRow();
  initializationDone=true;
}
Stand.prototype.makeRow=function(){
  var trEl=document.createElement('tr');
  trEl.id=i;
  newElement('td',this.locationName,trEl);
  for(var h=0;h<hours.length;h++){
    newElement('td',this.cookiesSoldEachHour[h],trEl);
  }
  newElement('td',this.totalCookiesSoldPerDay,trEl);
  profitTable.appendChild(trEl);
};
Stand.prototype.makeStaffRow=function(){
  var trEl=document.createElement('tr');
  trEl.id='staff'+i;
  var tdEl=document.createElement('td');
  tdEl.textContent=this.locationName;
  trEl.appendChild(tdEl);
  for(var h=0;h<hours.length;h++){
    newElement('td',Math.ceil(this.cookiesSoldEachHour[h]/15),trEl);
  }
  staffTable.appendChild(trEl);
};

function newElement(elementType,content,parent){
  var newEl=document.createElement(elementType);
  newEl.textContent=content;
  parent.appendChild(newEl);
}

function addStore(){
  if(newMinCust.value===''||newMaxCust.value===''||newLocation.value===''||newAvgCook.value===''){
    alert('Please input a value into each field.');
  } else{
    locations.push(newLocation.value);
    access.push(newLocation.value);
    accessTable.push(newLocation.value+' Table');
    minCustomersPerHour.push(Number(newMinCust.value));
    maxCustomersPerHour.push(Number(newMaxCust.value));
    avgCookiesPerCustomer.push(Number(newAvgCook.value));
    newLocation.value='';
    newAvgCook.value='';
    newMaxCust.value='';
    newMinCust.value='';
    i=minCustomersPerHour.length-1;
    stands.push(new Stand(i));
    stands[i].calcCustomersEachHour();
    stands[i].calcCookiesEachHour();
    stands[i].calcTotalCookiesPerDay();
    stands[i].makeRow();
    stands[i].makeStaffRow();
    makeFooterRow();
  }
}
submitButtonPress.addEventListener('click',addStore);
startingTable();