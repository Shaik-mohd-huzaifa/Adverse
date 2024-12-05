import { useEffect, useState } from "react";
import "./Organisation.styles.scss";
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom"; // Corrected import for `Link`
import { getBrands } from "../../utils/CreateOrganisation";
import { useDispatch, useSelector } from "react-redux";
import { BrandSelector } from "../../store/Brands/Brands.selector";
import { updateBrands } from "../../store/Brands/Brands.Actions";
import { IoMdColorPalette } from "react-icons/io";
import { getBrandImages } from "../../utils/getGenImages";


export const Organisation = () => {
    const Brands = useSelector(BrandSelector); // Accessing Redux store brands
    const dispatch = useDispatch();
    const [currentBrandImages, setCurrentBrandImages] = useState([])

    useEffect(() => {
        async function fetchBrands() {
            try {
                const response = await getBrands();
                if (response?.Brands) {
                    dispatch(updateBrands(response.Brands));
                }
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        }
        fetchBrands();
    }, [dispatch]); // Added `dispatch` to the dependency array
    

    async function fetchGeneratedImages(id){
        const response = await getBrandImages(id)
        console.log(response)
        setCurrentBrandImages(response)
    }
    return (
        <div className="organisation-container">
            <h1>Brands</h1>
            <div className="listing-top">
                <Link to="/create"> {/* Corrected `to` prop to include a proper route */}
                    <button>
                        Create Brand <IoIosAdd />
                    </button>
                </Link>
            </div>
            <div className="brands-list-container">
                {Brands && Brands.length > 0 ? (
                    Brands.map((brand) => (
                        <div className="brand-card" key={brand.id}>
                        <h3>{brand.brand_name}</h3>
                        <p>{brand.description}</p>
                        <p className="type">{brand.type}</p>
                        <p className="color-scheme"><IoMdColorPalette/> {brand.color_scheme}</p>
                        <button onClick={() => fetchGeneratedImages(brand.id)}>Details</button>
                        </div>
                    ))
                ) : (
                    <p>No brands available.</p>
                )}
            </div>
        </div>
    );
};
