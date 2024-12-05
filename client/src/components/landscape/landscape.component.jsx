import "./landscape.styles.scss"

export const Landscape = ({folder_name, landscape_images}) => {
    const base_url = "https://dlo83apufvf9i.cloudfront.net/"
    return (
        <div className="landscape-container">
            {
                landscape_images.map((image, index) => (
                    <div className="image" key={index}>
                    <img className={`image-container S${image.replace(".jpeg", "")}`} key={index} src={`${base_url}${folder_name}/landscape/${image}`} alt="" />  
                    <p className="sizes">{image.replace(".jpeg", "")}</p> 
                    </div>
                ))
            }
        </div>
    )
}