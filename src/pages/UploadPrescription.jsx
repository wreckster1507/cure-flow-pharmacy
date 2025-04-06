
import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Download, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const UploadPrescription = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Reset status
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus('success');
      }
    }, 100);
    
    // In a real app, you would upload the file to your server here
    // For demo, we're just simulating a successful upload
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus('idle');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="app-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-pharmacy-800 mb-2">Upload Prescription</h1>
          <p className="text-gray-600 mb-8">
            Upload your doctor's prescription and we'll process it to deliver your medicines.
          </p>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-pharmacy-700 mb-4">Upload Instructions</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Upload a clear image of your prescription</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Make sure the doctor's details and all medicines are clearly visible</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Supported formats: JPG, PNG, PDF (max size: 5MB)</span>
                  </li>
                  <li className="flex items-start">
                    <XCircle size={20} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Do not upload prescriptions that are older than 6 months</span>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {!previewUrl ? (
                  <>
                    <div className="mb-4 flex justify-center">
                      <Upload size={48} className="text-pharmacy-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Drag and drop your prescription here
                    </h3>
                    <p className="text-gray-500 mb-4">or</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <label className="btn-pharmacy cursor-pointer">
                        <span className="flex items-center">
                          <Download size={18} className="mr-2" />
                          Browse Files
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                      <label className="btn-secondary cursor-pointer">
                        <span className="flex items-center">
                          <Camera size={18} className="mr-2" />
                          Take Photo
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="mb-4 relative">
                      <img 
                        src={previewUrl} 
                        alt="Prescription preview" 
                        className="max-h-64 mx-auto rounded-lg" 
                      />
                      <button 
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                      >
                        <XCircle size={20} className="text-red-500" />
                      </button>
                    </div>
                    <p className="text-gray-700 mb-2">
                      {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    {uploadStatus === 'idle' && (
                      <button 
                        onClick={handleUpload}
                        className="btn-pharmacy"
                      >
                        Upload Prescription
                      </button>
                    )}
                    {uploadStatus === 'uploading' && (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-pharmacy-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}  
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                    {uploadStatus === 'success' && (
                      <div>
                        <div className="flex items-center justify-center text-green-500 mb-2">
                          <CheckCircle size={24} className="mr-2" />
                          <span className="font-medium">Upload successful!</span>
                        </div>
                        <p className="text-gray-600 mb-4">Our pharmacist will verify your prescription shortly.</p>
                        <Link to="/medicines" className="btn-pharmacy">
                          Continue Shopping
                        </Link>
                      </div>
                    )}
                    {uploadStatus === 'error' && (
                      <div>
                        <div className="flex items-center justify-center text-red-500 mb-2">
                          <XCircle size={24} className="mr-2" />
                          <span className="font-medium">Upload failed!</span>
                        </div>
                        <p className="text-gray-600 mb-4">Please try again or use a different file.</p>
                        <button 
                          onClick={handleUpload}
                          className="btn-pharmacy"
                        >
                          Retry Upload
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-pharmacy-700 mb-4">Don't have a prescription?</h2>
              <p className="text-gray-600 mb-4">
                If you don't have a prescription, you can select symptoms and get recommended medicines.
              </p>
              <Link to="/symptoms" className="btn-secondary inline-block">
                Select Symptoms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescription;
