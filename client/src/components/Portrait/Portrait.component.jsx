import "./Portrait.styles.scss"

export const Portrait = ({portrait_images, folder_name}) => {
    const base_url = "https://dlo83apufvf9i.cloudfront.net/"
    return (
        <div className="portrait-container">
            {
                portrait_images.map((image, index) => (
                    <div className="image" key={index}>
                    <img className={`image-container S${image.replace(".jpeg", "")}`} key={index} src={`${base_url}${folder_name}/portrait/${image}`} alt="" />
                    <p className="sizes">{image.replace(".jpeg", "")}</p> 
                    </div>   
                ))
            }
        </div>
    )
}