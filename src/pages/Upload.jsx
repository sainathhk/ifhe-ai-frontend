import "../App.css";


export default function Upload({ token }) {
  const upload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    await fetch("https://ifhe-ai-backend.onrender.com/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("PDF uploaded successfully");
  };

 return (
  <div className="upload-box">
    <h3>Faculty Upload</h3>
    <input type="file" accept="application/pdf" onChange={upload} />
  </div>
);


}
