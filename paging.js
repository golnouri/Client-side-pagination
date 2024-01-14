var currentPage = 1;
var itemsPerPage = 3;

function createPaging() {
    var paging = document.getElementById('paging');
    paging.innerHTML = "";

    var numPages = Math.ceil(document.getElementById('dataList').children.length / itemsPerPage);

    for (var i = 1; i <= numPages; i++) {
        var page = document.createElement('button');
        page.innerHTML = i;
        page.onclick = function() {
            currentPage = this.innerHTML;
            showData();
            createPaging();
        }

        if (i == currentPage) {
            page.className = "active";
        }

        paging.appendChild(page);
    }
}

function showData() {
    var list = document.getElementById('dataList').children;
    for (var i = 0; i < list.length; i++) {
        if (i < (currentPage - 1) * itemsPerPage || i >= currentPage * itemsPerPage) {
            list[i].style.display = "none";
        } else {
            list[i].style.display = "block";
        }
    }
}

function searchData() {
    var input = document.getElementById('searchinput');
    var filter = input.value.toUpperCase();
    var list = document.getElementById('dataList').children;
    var found = false;

    for (var i = 0; i < list.length; i++) {
        var txtValue = list[i].textContent || list[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            list[i].style.display = "";
            found = true;
        } else {
            list[i].style.display = "none";
        }
    }

    var noResult = document.getElementById('noResult');
    if (!found) {
        noResult.style.display = "block";
        document.getElementById("dataList").style.display = "none";
    } else {
        noResult.style.display = "none";
        document.getElementById("dataList").style.display = "block";

    }

    if (filter === '') {
        currentPage = 1;
        showData();
        createPaging();
    }
}

createPaging();
showData();