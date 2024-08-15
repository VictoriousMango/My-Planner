document.getElementById('downloadBtn').addEventListener('click', function () {
    // Get the content of the text areas
    const text1 = document.getElementById('textArea1').value;
    const text2 = document.getElementById('textArea2').value;
    const text3 = document.getElementById('textArea3').value;

    // Combine all text areas content
    const combinedText = `Text Area 1:\n${text1}\n\nText Area 2:\n${text2}\n\nText Area 3:\n${text3}`;

    // Create a blob with the text content
    const blob = new Blob([combinedText], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'textareas_content.txt';

    // Simulate a click on the link to trigger the download
    link.click();
});
