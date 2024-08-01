"use client";

import SuggestionsPage from "@/app/components/suggestionsPage";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogForm() {
  const { id } = useParams();
  const router = useRouter();
  const [sections, setSections] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false); // State for managing preview mode
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [featured, setFeatured] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const [isSuggestions,setIsSuggestions]=useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs/${id}`
        );
        const resData = await response.json();
        console.log(resData);

        setTitle(resData.data.title);
        setCoverImg(resData.data.coverImg);
        setDate(resData.data.date);
        setSections(resData.data.blogsDetails)
        const res = (resData.data.suggestions).map((val)=> val.id);
        setSelectedSuggestions(res);
        console.log('yyoyoyooyoyoyoyoy',res);
        setFeatured(resData.data.featured);
        
        console.log(id);
        console.log(resData.resData);
      } catch (error) {
        console.log(error);
      }
    };

    id !== "id" && getData();
  }, [id]);
  
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1]; // Extract base64 string without the data prefix

      const body = {
        buffer: `data:image/png;base64,${base64String}`,
      };
      console.log(body);
      try {
        const response = await axios.post(
          "https://jome56z60h.execute-api.ap-south-1.amazonaws.com/dev/web/uploadAssets",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.fileUrl);
        alert(response.data.fileUrl);

      } catch (error) {
        console.error("Image upload failed", error);
      }
    };
  };
  const addElement = (tagType) => {
    setSections([...sections, { tagType, value: "" }]);
  };

  const handleInputChange = (index, value) => {
    const newSections = [...sections];
    newSections[index].value = value;
    setSections(newSections);
    if (isPreviewing) {
      updatePreview(newSections);
    }
  };



  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    if (isPreviewing) {
      updatePreview(newSections);
    }
  };

  const updatePreview = (sections) => {
    const previewContainer = document.getElementById("previewContainer");

    sections.forEach((section, index) => {
      let previewElement;

      switch (section.type) {
        case "title":
          previewElement = <div class="blogtitle">${section.value}</div>;
          break;
        case "h1":
          previewElement = <h1 class="blogH1">${section.value}</h1>;
          break;
        case "h2":
          previewElement = <h2 class="blogH2">${section.value}</h2>;
          break;
        case "p":
          previewElement = (
            <p class="blogPara">${parseParagraphText(section.value)}</p>
          );
          break;
        case "coverImage":
          previewElement = (
            <img src="${section.value}" alt="" class="blogImg" />
          );
          break;
        case "images":
          previewElement = (
            <img src="${section.value}" alt="" class="blogImg" />
          );
          break;
        default:
          previewElement = "";
          break;
      }

      if (previewContainer) {
        previewContainer.innerHTML += previewElement;
      }
    });
  };

  const parseParagraphText = (text) => {
    // Convert Markdown-style links to HTML links
    return text.replace(/\[(.?)\]\((.?)\)/g, '<a href="$2">$1</a>');
  };

  const previewContent = () => {
    const previewContainer = document.getElementById("previewContainer");
    if (previewContainer) {
      previewContainer.innerHTML = ""; // Clear previous content
    }
    updatePreview(sections);
    setIsPreviewing(true); // Set preview mode to true
  };


  const publish = async () => {
    const publishData = sections.map((section) => ({
      tagType: section.tagType,
      class: getClassForType(section.tagType),
      value: section.value,
    }));

    const body = {
      title,
      date,
      coverImg,
      suggestions:selectedSuggestions,
      featured:featured,
      blogsDetails: publishData,
    };
    const userConfirmed = title === ""? true:window.confirm('Are you sure you want to make changes?');
    if (userConfirmed) {
      console.log("Publish Body:", body);

    const api =
      id === "id"
        ? "https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs"
        : `https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs/${id}`;

    try {
      const response = await fetch(api, {
        method: id === "id" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("Response Data:", data);
       alert("Blog published successfully");
       router.back();
      // Clear the form after publishing
      setSections([]);
      setTitle("");
      setDate("");
      setCoverImg("");
      setIsPreviewing(false);
    } catch (error) {
      console.error("Publish failed", error);
      alert(`Error: ${error.message}`);
    }
      console.log('yes');
    } else {
      console.log('cancel');
    }
    
  };

  const getClassForType = (type) => {
    switch (type) {
      case "title":
        return "blogTitle";
      case "h1":
        return "blogH1";
      case "h2":
        return "blogH2";
      case "p":
        return "blogPara";
      case "coverImage":
      case "images":
        return "blogImg";
      default:
        return "";
    }
  };

  const handleBack = () => {
    setIsPreviewing(false); // Set preview mode to false to go back to editing
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-dark w-full text-light">
      <div className="w-[60%]">
        {!isPreviewing ? ( // Render editing form if not previewing
          <>
            <div className="flex gap-4 pb-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                className="text-dark p-2 placeholder:text-dark placeholder:text-opacity-[50%]"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Date"
                value={date}
                className="text-dark p-2 placeholder:text-dark placeholder:text-opacity-[50%]"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
             
              <input
                type="text"
                className="text-dark p-2 placeholder:text-dark placeholder:text-opacity-[50%]"
                placeholder="CoverImg"
                value={coverImg}
                onChange={(e) => {
                  setCoverImg(e.target.value);
                }}
              />
               <button
                onClick={() => {setIsSuggestions(true)}}
                className="btn border border-light ml-4 pl-2 pr-2 flex justify-center items-center"
              > Suggestions </button>
            </div>
            <div className="mb-4 flex">
              
             
              <button
                onClick={() => addElement("h1")}
                className="btn border border-light ml-4 pl-2 pr-2 flex justify-center items-center"
              >
                H1
              </button>
              <button
                onClick={() => addElement("h2")}
                className="btn border border-light ml-4 pl-2 pr-2 flex justify-center items-center"
              >
                H2
              </button>
              <button
                onClick={() => addElement("p")}
                className="btn border border-light ml-4 pl-2 pr-2 flex justify-center items-center"
              >
                P
              </button>
              
              <button
                onClick={() => addElement("images")}
                className="btn border border-light ml-4 pl-2 pr-2 mr-4 flex justify-center items-center"
              >
                Images
              </button>
              <div className=" flex items-center">
                <input
                  type="file"
                  className="text-light "
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>
            </div>
            <div id="formContainer" className="w-full max-w-2xl">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="form-section mb-4 flex items-center"
                >
                  <label className="mr-2">{section.tagType.toUpperCase()}:</label>
                  {section.tagType === "p" ? (
                    <textarea
                      value={section.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded text-dark"
                    />
                  ) : (
                    <input
                      type={
                        section.tagType === "coverImage" ||
                        section.tagType === "images"
                          ? "url"
                          : "text"
                      }
                      value={section.value}
                      onChange={(e) => {
                        handleInputChange(index, e.target.value);
                      }}
                      className="flex-1 p-2 border border-light text-dark rounded"
                    />
                  )}
                  <button
                    onClick={() => removeSection(index)}
                    className="ml-2 btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div id="buttonContainer" className="flex mt-4 gap-4">
              <button onClick={()=>{router.back()}} className="btn border pl-4 pr-4 rounded-md">
                Cancel
              </button>
              <button onClick={previewContent} className="btn border pl-4 pr-4 rounded-md">
                Preview
              </button>
              {/* <button onClick={publishLater} className="btn ml-2">
                Publish Later
              </button> */}
              <button onClick={publish} className="btn ml-2 border pl-4 pr-4 rounded-md">
                Publish
              </button>
            </div>
          </>
        ) : (
          // Render preview if previewing
          <>
            <button onClick={handleBack} className="btn border border-light p-2 mb-4">
              Back
            </button>
            <div id="previewContainer" className="blogContainer mt-8">
              {sections.map((section, index) => {
                switch (section.tagType) {
                  case "title":
                    return (
                      <div key={index} className="blogTitle">
                        {section.value}
                      </div>
                    );
                  case "h1":
                    return (
                      <h1 key={index} className="blogH1">
                        {section.value}
                      </h1>
                    );
                  case "h2":
                    return (
                      <h2 key={index} className="blogH2">
                        {section.value}
                      </h2>
                    );
                  case "p":
                    return (
                      <p
                        key={index}
                        className="blogPara"
                        dangerouslySetInnerHTML={{
                          __html: parseParagraphText(section.value),
                        }}
                      />
                    );
                  case "coverImage":
                    return (
                      <img
                        key={index}
                        src={section.value}
                        alt=""
                        className="blogImg"
                      />
                    );
                  case "images":
                    return (
                      <img
                        key={index}
                        src={section.value}
                        alt=""
                        className="blogImg"
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </>
        )}
      </div>
      {isSuggestions === true && <SuggestionsPage api={'https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs?offset='} selectedSuggestions={selectedSuggestions} setIsSuggestions={setIsSuggestions} setSelectedSuggestions={setSelectedSuggestions}/>}
    </div>
  );
}