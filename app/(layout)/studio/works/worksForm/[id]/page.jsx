"use client";

import SuggestionsPage from "@/app/components/suggestionsPage";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const WorksForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [tags, setTags] = useState(["Select"]);
  const [newTag, setNewTag] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [copyRightText, setCopyRightText] = useState("");
  const [workSuggestion, setWorkSuggestion] = useState({});
  const [imageUrl, setImageurl] = useState("");
  const [isSuggestions, setIsSuggestions] = useState(false);
  const [selectedTag,setSelectedTag]=useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/${id}`
        );
        const resData = await response.json();
        console.log(resData.data);

        setTitle(resData.data.title);
        setCoverImg(resData.data.coverImg);
        setCopyRightText(resData.data.copyRightText);
        setIndustry(resData.data.industry);
        setLocation(resData.data.location);
        setWebsiteLink(resData.data.websiteLink);
        setSelectedTag(resData.data.tags);
        setImages(resData.data.images);
        // setSections(resData.data.blogsDetails)
        const ids = resData.data.suggestions.map(suggestion => suggestion.id);

  // Update the state with the array of IDs
  setSelectedSuggestions(ids);

        console.log(id);
        // console.log(resData.resData);
      } catch (error) {
        console.log(error);
      }
    };

    id !== "id" && getData();
  }, [id]);
  const handleTagClick = (val) => {
    setSelectedTag((prevSelected) => {
      if (!Array.isArray(prevSelected)) {
        console.error('selectedSuggestions is not an array');
        return [];
      }
  
      if (prevSelected.includes(val)) {
        // Remove the ID
        return prevSelected.filter((suggestionId) => suggestionId !== val);
      } else {
        // Add the ID
        return [...prevSelected, val];
      }
    });
  };
  
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

  // Fetch tags from API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "https://d6vka1loe5.execute-api.ap-south-1.amazonaws.com/dev/tags"
        );
        const data = await response.json();
        console.log(data);
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, [newTag]);

  const handleAddImage = () => {
    setImages([...images, imageUrl]);
    setImageurl("");
  };



  const handleTagSubmit = async () => {
    try {
      await fetch(
        "https://d6vka1loe5.execute-api.ap-south-1.amazonaws.com/dev/tags",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tag: newTag }),
        }
      );
      setTags([...tags, newTag]);
      setNewTag("");
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title,
      coverImg,
      suggestions: selectedSuggestions,
      tags: selectedTag,
      industry,
      location,
      featured: false,
      images,
      websiteLink,
      copyRightText,
    };
    console.log(formData)
    try {
      
      const api = id === 'id' ? 
      "https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/":
      `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/${id}`;

      await fetch(
        api,
        {
          method: id === 'id' ? "POST": "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full h-full relative overflow-auto">
      <div className="flex gap-2">
        <label>Title:</label>
        <input
          className="border border-dark"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <label>Cover Image:</label>
        <input
          className="border border-dark"
          type="text"
          value={coverImg}
          onChange={(e) => setCoverImg(e.target.value)}
        />
      </div>

      <div>
        <button
          className="border p-2 border-dark"
          onClick={() => {
            setIsSuggestions(true);
          }}
        >
          Suggestions
        </button>
      </div>
      <div className="flex gap-2">
        <label>Tags:</label>
        <div className="flex flex-col gap-4">
          {tags.map((val, index) => (
            <div  className="border p-2 cursor-pointer" style={{backgroundColor: selectedTag.includes(val.tag)?'green':null}} onClick={()=>{handleTagClick(val.tag)}} key={index}>
              {val.tag}
            </div>
          ))}
        </div>
        <div>
        <input
          className="border border-dark"
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />

        <button type="button" onClick={handleTagSubmit}>
          Add Tag
        </button>
        </div>
      </div>
      <div className="flex gap-2">
        <label>Industry:</label>
        <input
          className="border border-dark"
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <label>Location:</label>
        <input
          className="border border-dark"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <label>Images:</label>
        <div className=" flex items-center">
          <input
            type="file"
            className="text-light "
            onChange={(e) => handleImageUpload(e)}
          />
        </div>

        <input
          className="border border-dark"
          type="text"
          value={imageUrl}
          onChange={(e) => {
            setImageurl(e.target.value);
          }}
        />
        <button type="button" onClick={handleAddImage}>
          + Add Image
        </button>
      </div>
      {images.map((image, index) => (
        <div className="relative w-[10vh] h-[50vh]" key={index}>
          <img src={image} alt="image" />
        </div>
      ))}
      <div className="flex gap-2">
        <label>Website Link:</label>
        <input
          className="border border-dark"
          type="text"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <label>Copyright Text:</label>
        <input
          className="border border-dark"
          type="text"
          value={copyRightText}
          onChange={(e) => setCopyRightText(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="bg-dark text-light pl-4 pr-4 pt-2 pb-2 rounded-xl"
        >
          Submit
        </button>
      </div>
      {isSuggestions === true && (
        <SuggestionsPage
          api={
            "https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks?offset="
          }
          selectedSuggestions={selectedSuggestions}
          setIsSuggestions={setIsSuggestions}
          setSelectedSuggestions={setSelectedSuggestions}
        />
      )}
    </div>
  );
};

export default WorksForm;
