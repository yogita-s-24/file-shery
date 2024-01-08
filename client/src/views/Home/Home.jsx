import React, { useEffect, useRef, useState } from "react";
import { getSignedUrl, uploadFile } from "../../services/api";

function Home() {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const response = await getSignedUrl();
      // console.log(response.url);
      setUrl(response.url);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await uploadFile(url, file);
      setUrl(url.split("?")[0]);
    };
    file && getData();
  }, [file]);

  return (
    <>
      <div className="mx-auto mt-5 bg-gray-300 rounded-sm lg:w-[900px] sm:w-full"> 
        <div className=" px-4 py-2">

       
        <h1 className="font-semibold text-4xl mt-1 ms-5">File Shery</h1>
        <p className="mt-5">
          Convenient file sharing in three steps without registration.
        </p>

        <p className="mt-5">
          <span className="bg-black text-white rounded-sm p-1">1</span>

          <input
            type="file"
            className="ms-5"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <button
            onClick={() => {
              fileInputRef.current.click();
            }}
            type="button"
            className="bg-blue-600 text-white px-5 rounded-md py-1 ms-5">
            Select file to upload
          </button>

          &nbsp; or drag-and-drop file into this broswer window.
        </p>

        <p className="mt-3">
          <span className="bg-black text-white p-1 rounded-sm me-4">2</span>{" "}
          Wait until the file upload complete.
        </p>

        <p className="mt-3">
          <span className="bg-black text-white rounded-sm p-1 me-4">3</span> The
          file will be available at{" "}
          <a href={url.split("?")[0]} className="text-blue-600 lg:text-[15px] sm:text-[5px]">
            {url.split("?")[0]}
          </a>{" "}
          which is a link you can share.
        </p>

        <p className="mt-2">
          {" "}
          The file can be deleted manullay at any time and will in any case be
          deleted automatically 6 day from now.
        </p>
        </div>

        {
          file && (
          <div className="bg-slate-400 p-2 rounded-sm mt-3 ">
          <h1 className="font-bold text-center mt-1">Preview Content</h1>
          <img
            src={url}
            alt="image"
            className="h-[200px] mx-auto mt-3 rounded-sm"
            />
            </div>

        )}
      </div>
    </>
  );
}

export default Home;
