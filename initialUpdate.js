var employeeId = new URL(window.location).searchParams.get("id");

function getById(id){
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:9090/employees/getById"
    var params = `?id=${id}`
    xhr.onerror = function(){
        alert("Gagal mengambil data.")
    }
    xhr.onloadend = function(){
        var result = JSON.parse(this.responseText);
        var data = result.data;
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("email").value = data.email;
        document.getElementById("phoneNumber").value = data.phoneNumber;
        var tanggal = new Date(data.hireDate).toISOString().slice(0, 10);
        document.getElementById("hireDate").value = tanggal;
        document.getElementById("jobs").value = data.jobId;
        document.getElementById("salary").value = data.salary;
        document.getElementById("commission").value = data.commission;
    }
    xhr.open("GET", url+params, false);
    xhr.send();
}

// function formatDate(params) {
//     return [params.getMonth()+1,params.getDate(),params.getFullYear()].join("/")
// }