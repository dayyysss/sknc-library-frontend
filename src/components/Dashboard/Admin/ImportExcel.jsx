import React from 'react';

const ImportExcel = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Lakukan apa pun yang diperlukan dengan file Excel yang diunggah
    console.log("File yang diunggah:", file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-6">Unggah File Excel</h2>
      <p className="text-gray-600 mb-4">
        File mungkin dikompresi (gzip, zip) atau tidak terkompresi.
        Nama file yang dikompresi harus diakhiri dengan .[format].[kompresi]. Contoh: .sql.zip
      </p>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        className="border border-gray-400 rounded-md py-2 px-4 mb-4"
      />
      <p className="text-gray-600 mb-4">Telusuri komputer Anda: (Maks: 2,048MiB)</p>
      <p className="text-gray-600 mb-4">Anda juga dapat seret dan lepaskan file di halaman manapun.</p>
      <div className="flex">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600">
          Unggah
        </button>
        <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
          Batal
        </button>
      </div>
    </div>
  );
};

export default ImportExcel;
