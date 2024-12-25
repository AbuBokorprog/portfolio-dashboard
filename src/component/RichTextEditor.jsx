import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);

const RichTextEditor = ({ content, setContent }) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

// // Modules for ReactQuill
RichTextEditor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }], // Text color and background color
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageUploader: {
    upload: async (file) => {
      // Replace with your image upload logic
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'react_quill');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dphjei2ph/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      return data?.secure_url;
    },
  },
  imageResize: {
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
};

// // Formats for ReactQuill
RichTextEditor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color', // Text color
  'background', // Text highlight
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'align',
  'clear',
];

export default RichTextEditor;
