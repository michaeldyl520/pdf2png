const { invoke } = window.__TAURI__.core;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const selectBtn = document.getElementById('selectBtn');
const convertBtn = document.getElementById('convertBtn');
const fileNameDiv = document.getElementById('fileName');
const progressDiv = document.getElementById('progress');
const statusDiv = document.getElementById('status');

let selectedFile = null;

dropZone.addEventListener('click', () => fileInput.click());
selectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.pdf')) {
        handleFile(file);
    } else {
        statusDiv.textContent = 'Please select a PDF file';
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) {
        handleFile(fileInput.files[0]);
    }
});

function handleFile(file) {
    selectedFile = file;
    fileNameDiv.textContent = `Selected: ${file.name}`;
    convertBtn.disabled = false;
    statusDiv.textContent = '';
    progressDiv.textContent = '';
}

convertBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    convertBtn.disabled = true;
    statusDiv.textContent = 'Converting...';
    progressDiv.textContent = '0%';

    try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const result = await invoke('convert_pdf_to_png', {
            pdfData: Array.from(uint8Array),
            fileName: selectedFile.name
        });

        progressDiv.textContent = '100%';
        statusDiv.textContent = `Success! Output: ${result.outputPath}`;
    } catch (err) {
        statusDiv.textContent = `Error: ${err}`;
        convertBtn.disabled = false;
    }
});