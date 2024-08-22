document.addEventListener('DOMContentLoaded', function () {
    // Select the div by its ID
    var contentDiv = document.getElementById('content');

    // Write some content to the div
    contentDiv.innerHTML = "<p>Hello, this content is inserted by JavaScript!</p>";
});


document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const lines = text.split('\n');  // Split text into lines
            const contentElement = document.getElementById('preview');
            contentElement.textContent = '';  // Clear previous content

            // Loop through each line and print it
            let Index = 0;
            let ContentHeader = "";
            var ContentMap = {};
            var ContentSubHeader = {};
            for (let i = 0; i < lines.length; i++){
                if(lines[i].includes("###")){
                    ContentHeader = lines[i].replace("### ", "");
                    console.log("Header:", lines[i]);
                    ContentBody = "";
                }
                else{
                    ContentMap[ContentHeader] += `<p>${lines[i]}</p>`;
                    console.log("Body:", lines[i]);
                }

            }
            for(i in ContentMap){
                contentElement.innerHTML += `
                <div class="col mb-3">
                    <div class="card">
                        <button class="btn btn-outline-info" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${Index}" aria-expanded="false" aria-controls="collapseExample${Index}">
                            ${i}
                        </button>
                        <div class="collapse" id="collapseExample${Index}">
                            <div class="card card-body">
                                ${ContentMap[i]}
                            </div>
                        </div>
                    </div>
                </div>
                `;
                Index += 1;
            }
        };
        reader.readAsText(file);
    }
});