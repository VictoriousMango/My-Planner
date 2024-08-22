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
            let accordionIndex = 0;
            let ContentHeader = "";
            var ContentMap = {};
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
                <div class="col">
                    <div class="card width: 18rem;">
                        <div class="card-header">
                            ${i}
                        </div>
                        <div class="card-body">
                            <p>${ContentMap[i]}<p>
                        </div>
                    </div>
                </div>
                `;
            }
        };
        reader.readAsText(file);
    }
});