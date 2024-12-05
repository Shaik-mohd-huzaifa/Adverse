import { useState } from "react";
import Select from "react-select"; // React-select for dropdowns
import "./parameters.styles.scss";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useDispatch, useSelector} from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { UPDATE_PARAMETER_TOOGLE } from "../../store/Parameters/Parameters.actions";
import { BrandSelector } from "../../store/Brands/Brands.selector";
import { createAds } from "../../utils/getImageGenerated";
import { updateAdsAction } from "../../store/Ads/Ads.actions";


const initialState = {
  organisation: "",
  Prompt: "",
  Text: "",
  TargetAudience: "",
  AgeGroup: "",
  Gender: "",
  Creativity: "",
  landscape: [],
  portrait: []
};


const sizeOptions = [
  { label: "Landscape: 1088x896", value: "1088x896" },
];
const landScape = [
    { label: "1024x1024", value: "1024x1024" },
    { label: "1088x896", value: "1088x896" },
    { label: "1216x832", value: "1216x832" },
    { label: "1344x768", value: "1344x768" },
    { label: "1536x640", value: "1536x640" },
];

const portriat = [
    { label: "1024x1024", value: "1024x1024" },
    { label: "832x1216", value: "832x1216" },
    { label: "896x1088", value: "896x1088" },
    { label: "768x1344", value: "768x1344" },
    { label: "640x1536", value: "640x1536" },
]

const selectOptions = {
  organisation: [
    { label: "Stable Diffusion", value: "Stable" },
    { label: "OpenAI", value: "OpenAI" },
  ],
  target_audience: [
    { label: "Designers", value: "Designers" },
    { label: "Marketers", value: "Marketers" },
  ],
  age_group: [
    { label: "18-25", value: "18-25" },
    { label: "26-35", value: "26-35" },
    { label: "36-50", value: "36-50" },
  ],
  gender: [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ],
  creativity: [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ],
};

export const Parameters = () => {
  const dispatch = useDispatch()
  const brands = useSelector(BrandSelector)
  const [formValues, setFormValues] = useState(initialState);



  const brandOptions = brands.map((brand) => ({
    value: brand.id,
    label: brand.brand_name,
  }));

  const handleChange = (field, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleMultiSelectChangeLandScape = (selectedOptions) => {
    setFormValues((prevState) => ({
      ...prevState,
      landscape: selectedOptions.map((option) => option.value),
    }));
  };
  const handleMultiSelectChangeportriat = (selectedOptions) => {
    setFormValues((prevState) => ({
      ...prevState,
      portrait: selectedOptions.map((option) => option.value),
    }));
  };

  const HandleToggle = () => {
      dispatch(UPDATE_PARAMETER_TOOGLE())
  }

  const handleSubmit = async () => {
    console.log("Form Values:", formValues);
    const current_brand = brands.find((brand) => brand.id === formValues.organisation);
    const response = await createAds(formValues, current_brand)
    dispatch(updateAdsAction(response["generated_images"]))
  };

  return (
    <div className="Parameters-container">
        <button className="close-icon" onClick={HandleToggle}><IoCloseSharp/></button>
      <h3>Configurations</h3>
      <div className="inputs">
        <div className="input-group">
          <label>Brand</label>
          <Select
            options={brandOptions}
            onChange={(selected) => handleChange("organisation", selected.value)}
          />
        </div>

        <div className="input-group">
          <label>Prompt</label>
          <textarea
            name="prompt"
            placeholder="Your Prompt Here..."
            value={formValues.prompt}
            onChange={(e) => handleChange("Prompt", e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Text</label>
          <textarea
            name="text"
            placeholder="Write the text you want on the Image..."
            value={formValues.text}
            onChange={(e) => handleChange("Text", e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Target Audience</label>
          <Select
            options={selectOptions.target_audience}
            onChange={(selected) =>
              handleChange("TargetAudience", selected.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Age Group</label>
          <Select
            options={selectOptions.age_group}
            onChange={(selected) => handleChange("AgeGroup", selected.value)}
          />
        </div>

        <div className="input-group">
          <label>Gender</label>
          <Select
            options={selectOptions.gender}
            onChange={(selected) => handleChange("Gender", selected.value)}
          />
        </div>

        <div className="input-group">
          <label>Creativity Level</label>
          <Select
            options={selectOptions.creativity}
            onChange={(selected) => handleChange("Creativity", selected.value)}
          />
        </div>

        <div className="input-group">
          <label>Landscape</label>
          <Select
            options={landScape}
            isMulti
            onChange={handleMultiSelectChangeLandScape}
          />
        </div>
        <div className="input-group">
          <label>Portrait</label>
          <Select
            options={portriat}
            isMulti
            onChange={handleMultiSelectChangeportriat}
          />
        </div>
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Generate <FaWandMagicSparkles/> 
      </button>
    </div>
  );
};
