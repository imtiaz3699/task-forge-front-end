import { Image, Upload } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

// Convert image file to base64 for preview
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ label,accept,fileList, setFileList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
      
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    const updatedList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return {
          ...file,
          url: file.preview, // Use base64 as preview
          status: "done", // Avoid red border
        };
      })
    );
    setFileList(updatedList);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="flex flex-col items-center cursor-pointer"
    >
      <FaPlus />
      <div style={{ marginTop: 8 }} className="px-2">
        Upload
      </div>
    </button>
  );
  console.log(fileList, "FileList");
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-[15px] text-gray-400">{label}</label>
      <Upload
        listType="picture-card"
        accept={accept}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent upload
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default ImageUpload;
