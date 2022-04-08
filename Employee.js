var xhr = new XMLHttpRequest();
var url = "";

function findAll(){
    // clearData();
    url = "http://127.0.0.1:9090/employees/findAll";
    xhr.onloadstart = function(){
        document.getElementById("findAll").innerHTML = "Loading...";
    }
    xhr.onerror = function(){
        alert("Gagal mengambil data.")
    }
    xhr.onloadend = function(){
        if(this.responseText !== ""){
            clearData()
            var result = JSON.parse(this.responseText);
            var data = result.data;
            document.getElementById("hasil").innerHTML += 
                    `<tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Hire Date</th>
                        <th>Job</th>
                        <th>Salary</th>
                        <th>Commission</th>
                        <th>Manager</th>
                        <th>Department</th>
                        <th></th>
                        <th></th>
                    </tr>`;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                document.getElementById("hasil").innerHTML += 
                    `<tr>
                        <td>${element.firstName} ${element.lastName}</td>
                        <td>${element.email}</td>
                        <td>${element.phoneNumber}</td>
                        <td>${element.hireDate}</td>
                        <td>${element.jobTitle}</td>
                        <td>${element.salary}</td>
                        <td>${element.commission}</td>
                        <td>${element.managerLastName}</td>
                        <td>${element.departmentName}</td>
                        <td><a href="update.html?id=${element.employeeId}"><button>Edit</button></a></td>
                        <td><button onclick="deleteData(${element.employeeId})">Delete</button></td>
                    </tr>`;
            }
            document.getElementById("findAll").innerHTML = "Done";
            setTimeout(function(){
                document.getElementById("findAll").innerHTML = "Show Employees";
            },1000)
        }
    }
    xhr.open("GET", url, false);
    xhr.send();
}


function clearData(value){
    document.getElementById("hasil").innerHTML = "";
}

function updateData(){
    url = "http://127.0.0.1:9090/employees/"
    var data = JSON.stringify({
        employeeId : new URL(window.location).searchParams.get("id"),
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        email : document.getElementById("email").value,
        phoneNumber : document.getElementById("phoneNumber").value,
        hireDate : document.getElementById("hireDate").value,
        jobId : document.getElementById("jobs").value,
        salary : document.getElementById("salary").value,
        commission : document.getElementById("commission").value
    })
    console.log(data);
    xhr.open("PUT",url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onload = function(){
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        if (response.status){
            alert("Update sukses.");
            window.location = "employee.html"
        } 
        else{
            alert("Update data gagal. Coba lagi.");
        }
    }
    xhr.send(data);
    return false;
}

function sendData(){
    url = "http://127.0.0.1:9090/employees/"

    var data = JSON.stringify({
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        email : document.getElementById("email").value,
        phoneNumber : document.getElementById("phoneNumber").value,
        hireDate : document.getElementById("hireDate").value,
        jobId : document.getElementById("jobs").value,
        salary : document.getElementById("salary").value,
        commission : document.getElementById("commission").value
    })
    console.log(data);
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onload = function(){
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        if (response.status){
            alert("Input sukses.");
            window.location = "employee.html"
        } 
        else{
            alert("Input data gagal. Coba lagi.");
        }
    }
    xhr.send(data);
    return false;
}


function deleteData(i){
    var konfirmasi = confirm("Anda yakin ingin menghapus data ini?");
    if(!konfirmasi){
        console.log("Tidak jadi delete.");
        return null;
    }
    url = "http://127.0.0.1:9090/employees/delete"
    var params = `?employeeId=${i}`;
    console.log(url+params);
    xhr.open("DELETE",url+params,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onload = function(){
        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        if (response.status){
            alert("Delete sukses.");
            findAll();
        } 
        else{
            alert("Delete data gagal. Coba lagi.");
        }
    }
    xhr.send();
    return false;
}

function searchEmployee() {
    var searchBox = document.getElementById("cari");
    if (searchBox.innerHTML != ""){
        searchBox.innerHTML = "";
    }
    else{
        searchBox.innerHTML += `
        <div class="column5" style="padding:15px"><input type="text" name="keywords" id="keywords" placeholder="Nama pegawai"></div>
        <div class="column3" style="padding:15px"><button class="btn btn-dark"onclick="searchByFirstName(0,8)">START</button></div> 
    `
    }  
}

function searchByFirstName(page,size){
    var firstName = document.getElementById("keywords").value;
    url = "http://127.0.0.1:9090/employees/findByFirstName";
    var params = `?firstName=${firstName}&page=${page}&size=${size}`;
    xhr.onerror = function(){
        alert("Gagal mengambil data.")
    }
    xhr.onloadend = function(){
        if(this.responseText !== ""){
            clearData()
            var result = JSON.parse(this.responseText);
            var data = result.data;
            var resultBox = document.getElementById("hasil");
            resultBox.innerHTML += 
                    `<tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Hire Date</th>
                        <th>Job</th>
                        <th>Salary</th>
                        <th>Commission</th>
                        <th>Manager</th>
                        <th>Department</th>
                        <th></th>
                        <th></th>
                    </tr>`;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                resultBox.innerHTML += 
                    `<tr>
                        <td>${element.firstName} ${element.lastName}</td>
                        <td>${element.email}</td>
                        <td>${element.phoneNumber}</td>
                        <td>${element.hireDate}</td>
                        <td>${element.jobTitle}</td>
                        <td>${element.salary}</td>
                        <td>${element.commission}</td>
                        <td>${element.managerLastName}</td>
                        <td>${element.departmentName}</td>
                        <td><a href="update.html?id=${element.employeeId}"><button class="btn btn-dark">Edit</button></a></td>
                        <td><button class="btn btn-dark" onclick="deleteData(${element.employeeId})">Delete</button></td>
                    </tr>`;
            }
            var pagingBox = document.getElementById("paging");
            pagingBox.innerHTML = "";
            if (result.page > 0) {
                pagingBox.innerHTML += `<button class="btn btn-dark" onclick="searchByFirstName(${page-1},${size})" style="float:left">PREV</button>`;
            }
            if (result.page < result.totalPages-1) {
                pagingBox.innerHTML += `<button class="btn btn-dark" onclick="searchByFirstName(${page+1},${size})" style="float:right">NEXT</button>`;
            }
            document.getElementById("findAll").innerHTML = "Done";
            setTimeout(function(){
                document.getElementById("findAll").innerHTML = "Show Employees";
            },1000)
        }
    }
    xhr.open("GET", url+params, false);
    xhr.send();

}