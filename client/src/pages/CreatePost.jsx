import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";
import ShiningButton from "../ShiningButton";
import ModernLoader from "../components/ModernLoader";

function CreatePost() {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      try {
        setSharing(true);
        const response = await fetch(
          "http://localhost:3000/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        Navigate("/");
        

      } catch (error) {
        console.log(error);
      } finally {
        setSharing(false);
      }
    }else{
      alert("Please Generate an image first")
    }
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerating(true);

        const response = await fetch(
          "http://localhost:3000/proxy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
              aspect_ratio: "1:1",
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setForm({ ...form, photo: data.data[0].asset_url });
        } else {
          console.error(data.error);
        }
        setGenerating(false);
      } catch (error) {
        console.log(error);
        setGenerating(false);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div>
        <h1 className="font-extrabold text-2xl">Create</h1>
        <p className="text-sm text-gray-400 font-light mt-2">
          Create imaginative and visually stunning images generated from DALL-E
          AI and share them with community
        </p>
      </div>

      <form className="max-w-3xl mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {sharing && (
            <div className="flex flex-col gap-3 text-white items-center min-h z-10 screen h-full justify-center absolute inset-0 bg-gray-500 bg-opacity-60">
              <ModernLoader />
              <p>Sharing with Community...</p>
            </div>
          )}

          <div className="z-50 relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-52 h-52 p-3 flex justify-center items-center overflow-hidden">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="generating img..."
                className="opacity-40 object-contain w-9/12 h-9/12 "
              />
            )}
            {generating && (
              <div className="bg-[rgba(0,0,0,0.5)] object-contain absolute inset-0 z-0 items-center flex justify-center ">
                <Loader />
              </div>
            )}
          </div>
          <div className="">
            <button className="" onClick={generateImage}>
              <ShiningButton name={generating ? "Generating..." : "Generate"} />
            </button>
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-gray-400 text-sm">
            If you want to share these images to the community click the share
            button.
          </p>
        </div>

        <button
          className="bg-green-500 p-2 rounded-md w-full text-white"
          type="submit"
        >
          Share with community
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
