"use strict";

var categoriesObject = null;
var typesObject = null;
var productsObject = null;

$(document).ready(function()  {

  $("#category-selector").bind("change", function() {
    XHRLoad("categories").then(function(dataFromCatgories) {
      categoriesObject = dataFromCatgories.categories;
      return XHRLoad("types");
    }).then(function(dataFromTypes) {
      typesObject = dataFromTypes.types;
      return XHRLoad("products");
    }).then(function(dataFromProducts) {
      productsObject = dataFromProducts.products;
      buildProductCards();
    });
  });

  function XHRLoad (sentFileTitle) {
    return new Promise( function(resolve, reject) {
      $.ajax({
      url: `json/${sentFileTitle}.json`,
      }).done( function(data) {
        resolve(data);
      }).fail(function(xhr, status, error) {
        reject(error);
      });
    });
  }

  function buildProductCards() {
    
    let categoryID = null;
    $("#category-heading").html("");
    $("#type-heading").html("");
    $("#product-heading").html("");

    $(categoriesObject).each( function(index, categoryValue) {

      if ($("#category-selector").val() === categoryValue.name) {
        $("#category-heading").append(`<div id="category" class="col-sm-9">${categoryValue.name}</div>`);

        $(typesObject).each( function(index, typeValue) {
          if (categoryValue.id === typeValue.category) {
            $("#type-heading").append(`<div id="type" class="col-sm-3">${typeValue.name}</div>`);
          
            $(productsObject).each( function(index, productValue) {
              if (typeValue.id === productValue.type) {
                $("#product-heading").append(`<div id="product" class="col-sm-1">${productValue.name}</div>`);
              }
            });
            }
        });
      }
    });
  }

});