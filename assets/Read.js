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
            let accordionBody = '';

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes("###")) {
                    // Close the previous accordion item if there is one
                    if (accordionBody !== '') {
                        contentElement.innerHTML += `
                                <div id="collapse${accordionIndex}" class="accordion-collapse collapse" aria-labelledby="heading${accordionIndex}" data-parent="#accordionExample">
                                    <div class="accordion-body">${accordionBody}</div>
                                </div>
                            `;
                        accordionBody = '';
                    }

                    accordionIndex++;
                    const header = lines[i].replace("###", "").trim();
                    contentElement.innerHTML += `
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${accordionIndex}" aria-expanded="false" aria-controls="#collapse${accordionIndex}">
                                        ${header}
                                    </button>
                                </h2>
                        `;
                } else {
                    // Add the line to the current accordion body
                    accordionBody += `<p>${lines[i]}</p>`;
                }
            }

            // Add the last accordion body content if any
            if (accordionBody !== '') {
                contentElement.innerHTML += `
                            <div id="collapse${accordionIndex}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    ${accordionBody}
                                </div>
                            </div>
                        </div>
                    `;
            }
        };
        reader.readAsText(file);
    }
});