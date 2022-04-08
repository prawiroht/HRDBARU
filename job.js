function findAllJobs(){
    // clearData();
    url = "http://127.0.0.1:9090/jobs/findAll";
    xhr.onerror = function(){
        alert("Gagal mengambil data.")
    }
    xhr.onloadend = function(){
        if(this.responseText !== ""){
            var result = JSON.parse(this.responseText);
            var data = result.data;
            var selectbox = document.getElementById("jobs");
            data.forEach(el => {
                // el.label = el.jobTitle;
                // el.value = el.jobId;
                selectbox.options.add(new Option(el.jobTitle, el.jobId,false));
            });
            // console.log(data);
        }
    }
    xhr.open("GET", url, false);
    xhr.send();
}