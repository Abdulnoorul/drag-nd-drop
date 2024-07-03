const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Function to handle drag events
function handleDrag(event) {
  event.preventDefault();
  if (event.type === 'dragover') {
    dropzone.classList.add('dragover');
  } else if (event.type === 'dragleave') {
    dropzone.classList.remove('dragover');
  }
}

// Function to handle file drop
function handleDrop(event) {
  event.preventDefault();
  dropzone.classList.remove('dragover');
  const files = event.dataTransfer.files;
  handleUploadedFiles(files);
}

// Function to handle file input change
function handleFileInputChange(event) {
  const files = event.target.files;
  handleUploadedFiles(files);
}

// Function to handle uploaded files
function handleUploadedFiles(files) {
  let uploadedCount = fileList.querySelectorAll('.file-item').length;
  const maxUploads = 5;
  if (uploadedCount + files.length > maxUploads) {
    alert(`You can only upload a maximum of ${maxUploads} images.`);
    return;
  }

  for (const file of files) {
    if (!isValidFile(file)) {
      alert('Invalid file type. Please upload only images.');
      continue;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e) {
      createFileItem(e.target.result, file.name);
    };
  }
}

// Function to validate uploaded file
function isValidFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return validTypes.includes(file.type) && file.size <= 1024 * 1024; // 1MB
}

// Function to create a new file item in the list
function createFileItem(imageUrl, filename) {
  const fileItem = document.createElement('div');
  fileItem.classList.add('file-item');

  // Generate the image URL (consider using a Blob URL for temporary storage)
  const imageURL = window.URL.createObjectURL(file);

  fileItem.innerHTML = `
    <img src="${imageURL}" alt="${filename}">
    <textarea placeholder="Add description"></textarea>
    <div class="actions">
      <i class="fas fa-check"></i>
      <i class="fas fa-trash"></i>
    </div>
    <span class="image-url">Uploaded Image URL: ${imageURL}</span>`;

  fileList.appendChild(fileItem);

  // ... (rest of the logic from `createFileItem`)
  function createFileItem(file, filename) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      // Option 1: Use Blob URL (temporary)
      const imageURL = window.URL.createObjectURL(file);
  
      // Option 2: Use base64 encoding (more compatible)
      // const imageData = e.target.result;  // Base64 encoded data
  
      fileItem.innerHTML = `
        <img src="${imageURL}" alt="${filename}">  <textarea placeholder="Add description"></textarea>
        <div class="actions">
          <i class="fas fa-check"></i>
          <i class="fas fa-trash"></i>
        </div>
        <span class="image-url">Uploaded Image URL: ${imageURL}</span>`;  // Update for base64
  
      fileList.appendChild(fileItem);
    };
  
    reader.onerror = function (error) {
      console.error("Error reading file:", error);
      alert("Failed to read uploaded image. Please try again.");
    };
  
    reader.readAsDataURL(file); // Read as data URL (or base64 if using option 2)
  }
  
}

// Event listeners
dropzone.addEventListener('dragover', handleDrag);
dropzone.addEventListener('dragleave', handleDrag);
dropzone.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileInputChange);

// Local storage (optional):
// Implement logic to save and load image data and descriptions from local storage
// on upload, description change/save, and delete events.
