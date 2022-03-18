    //Search Switch
$('.search-switch').on('click', function () {
    $('.search-model').fadeIn(400);});

$('.search-close-switch').on('click', function () {
    $('.search-model').fadeOut(400, function () {
        $('#search-input').val('');
        $('#searchResult').val('');
   });
});
function showResults(e){
    const searchResult = document.getElementById('searchResult');
    let match = e.value.match(/^[a-zA-Z]*/);
    //prevent space
    let match2 = e.value.match(/\s*/);
    if(match2[0] === e.value)
    {
        searchResult.innerHTML = '';
        return;
    }
    if(match[0] === e.value)
    {
        fetch('getProducts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({payload: e.value}) //payload will hold the data input
        }).then(res => res.json()).then(data =>{
            let payload = data.payload;
            searchResult.innerHTML = '';
            if(payload.length < 1)
            {
                searchResult.innerHTML ='<p class="lead text-center mt-2">No results</p>';
                return; //not to excute anthing else
            }
            payload.forEach((item, index) =>{
                if(index  > 0) searchResult.innerHTML += '<hr>';
                searchResult.innerHTML += `<a href="/products/product-details/${item._id}"><p>${item.name}</p></a>`;
            });
    });
    return;  
    }
    searchResult.innerHTML = '';
}


function showSearchResults(e){
  const trsearchResult = document.getElementById('showSearchResult');
  let match = e.value.match(/^[a-zA-Z]*/);
  //prevent space
  let match2 = e.value.match(/\s*/);
  if(match2[0] === e.value)
  {
    trsearchResult.innerHTML = '';
    $('#showAll').show(); 
      return;
  }
  if(match[0] === e.value)
  { 
      fetch('getProducts', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({payload: e.value})
      }).then(res => res.json()).then(data =>{
          let payload = data.payload;
          trsearchResult.innerHTML = '';
          if(payload.length < 1)
          {
            trsearchResult.innerHTML ='<p class="lead text-center mt-2">No results</p>';
            $('#showAll').hide(); 
              return; //not to excute anthing else
          }
          //var trsearchResult = `<tr id="showSearchResult"></tr>`;
          payload.forEach((item, index) =>{
              if(index  > 0)   
              $('#showAll').hide();      
              trsearchResult.innerHTML +=`<tr>
              <td style="width: 178px;"><img style="width: 110px;height: 132px;" src=${item.img}></td>
                          <td style="width: 228px;"><p style="margin-top: 48px;margin-left: 61px;">${item.name}</p></td>
                          <td><span class="badge badge-success"style="background-color:#FF6347;margin-top: 52px;margin-left: 114px;">$${item.price}</span></td>
                          <td>
                            <div class="tools" style="bottom: -15px;">
                              <a href="/admin/edit/${item._id}}" class="btn btn-dark btn-block mb-2">Edit</a>
                              <form action="/admin/${item._id}}?_method=DELETE" method="POST">
                                <input type="hidden" name="_method" value="DELETE">
                               <input type="submit" value="Delete" class="btn btn-danger btn-block">
                              </form>
                            </div>
                          </td></tr>`;            
          });
  });
  $('#showAll').show();  
  return;  
  } 
  trsearchResult.innerHTML = '';
}

function showSearchResultsCate(e){
  const showSearchCate = document.getElementById('showSearchCate');
  let match = e.value.match(/^[a-zA-Z]*/);
  //prevent space
  let match2 = e.value.match(/\s*/);
  if(match2[0] === e.value)
  {
    showSearchCate.innerHTML = '';
    $('#searchCate').show(); 
      return;
  }
  if(match[0] === e.value)
  { 
      fetch('/admin/adminCate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({cateload: e.value})
      }).then(res => res.json()).then(data =>{
          let cateload = data.cateload;
          showSearchCate.innerHTML = '';
          if(cateload.length < 1)
          {
            showSearchCate.innerHTML ='<p class="lead text-center mt-2">No results</p>';
            $('#searchCate').hide(); 
              return; //not to excute anthing else
          }
          //var trsearchResult = `<tr id="showSearchResult"></tr>`;
          cateload.forEach((item, index) =>{
              if(index  > 0)   
              $('#searchCate').hide();      
              showSearchCate.innerHTML +=`<tr>
              <td style="width: 178px;"><img style="width: 110px;height: 132px;" src=${item.img}></td>
                          <td style="width: 228px;"><p style="margin-top: 48px;margin-left: 61px;">${item.name}</p></td>
                          <td><span class="badge badge-success"style="background-color:#FF6347;margin-top: 52px;margin-left: 114px;">$${item.price}</span></td>
                          <td>
                            <div class="tools" style="bottom: -15px;">
                              <a href="/admin/edit/${item._id}" class="btn btn-dark btn-block mb-2">Edit</a>
                              <form action="/admin/${item._id}?_method=DELETE" method="POST">
                                <input type="hidden" name="_method" value="DELETE">
                               <input type="submit" value="Delete" class="btn btn-danger btn-block">
                              </form>
                            </div>
                          </td></tr>`;            
          });
  });
  $('#searchCate').show();  
  return;  
  } 
  showSearchCate.innerHTML = '';
}
//Show Result Keyword
/* var showResults = debounce(function(arg){
    var value = arg.trim();
    if(value == "" || value.length <= 0){
        $('#search-results').fadeOut();
        return;
    }
    else{
        $('#search-results').fadeIn();
    };
    var jqxhr = $.get('/?s=' + value, function (data) {
        $("#search-results").html("");
      })
      .done(function (data) {
        if (data.length === 0) {
          $("#search-results").append('<p class="lead text-center mt-2">No results</p>');
        } else {
          console.table(data);
          $("#search-results").append('<p class="text-center m-0 lead">Products</p>');
          data.forEach(s => {
            s = JSON.parse(s);
            $("#search-results").append('<a href="#"><p class="m-2 mt-0 lead">' + s.name + '</p> </a>');
          });
        }
      })
      .fail(function (err) {
        console.log(err);
      })
  }, 300); */

//debounce takes 3 parameters and while calling debounce you pass only 2 arguments, 
//where does immediate parameter get set, it will always be undefined
/* function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }; */