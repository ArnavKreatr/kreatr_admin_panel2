import React, { useState } from "react";
import axios from "axios";

const EventForm = ({
  setAddEventsBtnHandler,
  oldCoverImg,
  oldImages,
  oldHeading,
  oldDescription,
  oldDate,
  oldEventType,
  oldTestimonials,
  oldPrice,
  oldSessionType,
  OldDuration,
  oldSpeakerName,
  oldLocation,
  oldHoverColor,
  setGlobalIndex,
  id,
  setTrigger,
}) => {
  const [coverImg, setCoverImg] = useState(oldCoverImg);
  const [images, setImages] = useState(oldImages);
  const [heading, setHeading] = useState(oldHeading);
  const [description, setDescription] = useState(oldDescription);
  const [date, setDate] = useState(oldDate);
  const [eventType, setEventType] = useState(oldEventType);
  const [testimonials, setTestimonials] = useState(oldTestimonials);
  const [testimonialInput, setTestimonialInput] = useState({title:'',person:''});
  const [price, setPrice] = useState(oldPrice);
  const [sessionType, setSessionType] = useState(oldSessionType);
  const [duration, setDuration] = useState(OldDuration);
  const [speakerName, setSpeakerName] = useState(oldSpeakerName);
  const [location, setLocation] = useState(oldLocation);
  const [hoverColor, setHoverColor] = useState(oldHoverColor);

  const handleImageUpload = async (e, setImageUrl) => {
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
        if (setImageUrl === setImages) {
          setImages([...images, response.data.fileUrl]);
          console.log(images);
        } else {
          setImageUrl(response.data.fileUrl);
        }
      } catch (error) {
        console.error("Image upload failed", error);
      }
    };
  };

  const handleAddTestimonial = () => {
    if (testimonialInput.title && testimonialInput.person) {
      setTestimonials([...testimonials, testimonialInput]);
      setTestimonialInput({ title: '', person: '' });
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const eventData = {
      heading,
      description,
      images,
      coverImg,
      date,
      eventType,
      testimonials,
      price,
      sessionType,
      duration,
      speakerName,
      location,
      hoverColor,
    };
    const api = oldHeading === "" ? "https://erfaz8h6s3.execute-api.ap-south-1.amazonaws.com/dev/eventInfo":`https://erfaz8h6s3.execute-api.ap-south-1.amazonaws.com/dev/eventInfo/${id}`
    console.log("testttttttttt",api);
    try {
      const response = await fetch(
        api,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: oldHeading === ""?"POST":"PATCH",
          body: JSON.stringify(eventData),
        }
      );
      console.log(await response.json());

    } catch (error) {
      console.log(error);
    }
    
    setGlobalIndex(false);
    setTrigger('assfdfg')
    setAddEventsBtnHandler(false);
    console.log(eventData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-6 space-y-4 flex flex-col justify-center items-center w-full h-full "
    >
      <div className=" w-[50%] h-[50%] flex pb- flex-col gap-4 overflow-auto bg-dark p-4 rounded-lg">
        <div className=" flex items-center gap-2">
          <label className="text-light">Cover Image:</label>
          <input
            type="file"
            className="text-light"
            onChange={(e) => handleImageUpload(e, setCoverImg)}
          />
        </div>

        <div className="text-light flex items-center gap-2">
          <label className="text-light">Upload Images:</label>
          <div className="flex items-center">
            <input
              type="file"
              className="text-light hidden"
              id="imageUpload"
              onChange={(e) => handleImageUpload(e, setImages)}
            />
            <button
              type="button"
              onClick={() => document.getElementById("imageUpload").click()}
              className="bg-blue-500 text-white p-2 rounded"
            >
              +
            </button>
          </div>
        </div>
        <ul className=" flex gap-2">
          {images.map((url, index) => (
            <li key={index}>
              <img className=" w-8 h-8" src={url} alt="alt" />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <label className="text-light">Heading:</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Date:</label>
          <input
            type="text"
            y
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Event Type:</label>
          <div className="flex gap-2"> 
          <div className={eventType !== 'past'?"border text-light rounded-md border-light p-2":"border bg-light text-dark rounded-md border-light p-2"} onClick={()=>{setEventType('past')}}>Past</div>
          <div className={eventType !== 'upcoming'?"border text-light rounded-md border-light p-2":"border bg-light text-dark rounded-md border-light p-2"} onClick={()=>{setEventType('upcoming')}}>Upcoming</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Testimonials:</label>
          <input
            type="text"
            value={testimonialInput.title}
            className="p-2"
            placeholder="Testimonial"
            onChange={(e) =>
              setTestimonialInput({ ...testimonialInput, title: e.target.value })
            }
          />
          <input
            type="text"
            value={testimonialInput.person}
            placeholder="Autor"
            className="p-2"
            onChange={(e) =>
              setTestimonialInput({ ...testimonialInput, person: e.target.value })
            }
          />
          <div>
            <button
              className="text-light border rounded-md pl-4 pr-4 pt-2 pb-2"
              type="button"
              onClick={handleAddTestimonial}
            >
              Add Testimonial
            </button>
          </div>
        </div>
        <ul className="text-light">
          {testimonials.map((testimonial, index) => (
            <div className=" flex gap-2">
            <li key={index}>{testimonial.title}</li>
            <li key={index}>{testimonial.person}</li>
            </div>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <label className="text-light">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Session Type:</label>
          <input
            type="text"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Speaker Name:</label>
          <input
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-light">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className=" flex items-center gap-2">
          <label className="text-light">Hover Color:</label>
          <input
            type="color"
            value={hoverColor}
            onChange={(e) => setHoverColor(e.target.value)}
          />
        </div>
        <div className=" flex gap-4">
          <button
            className="text-dark rounded-md border w-fit pl-4 pr-4 pt-2 pb-2 bg-light border-dark"
            onClick={() => {setGlobalIndex(-1); setAddEventsBtnHandler(false)}}
          >
            Cancel
          </button>
          <button
            className="text-dark rounded-md border w-fit pl-4 pr-4 pt-2 pb-2 bg-light border-dark"
            type="submit"
          >
            {oldDescription ===""? 'Submit':'Edit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
