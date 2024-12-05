import asyncio
from uuid import uuid4
from .ImageGenerationSTDY import generateImageAndSaveInS3
from .sizes import sizes as size_details


async def generate_image(prompt, filename, folder_name, aspect_ratio):
    """
    Asynchronously generates an image and saves it to S3.
    """
    generateImageAndSaveInS3(prompt, filename, folder_name, aspect_ratio)


async def CreateImagesInLoop(campaign_details, prompt):
    """
    Generates and saves images in S3 based on campaign details.
    """
    # sizes = campaign_details.get("sizes")
    portrait_sizes = campaign_details.get("portrait")
    landscape_sizes = campaign_details.get("landscape")

    # Generate a unique folder name
    unique_id = uuid4()
    folder_name = f"{campaign_details.get('brand_name')}_{unique_id}"

    # Lists to hold the generated filenames
    portrait_images_filenames = []
    landscape_images_filenames = []

    # Create tasks for portrait images
    portrait_tasks = []
    for size_data in portrait_sizes:
        filename = f"portrait/{size_data}.jpeg"
        aspect_ratio = size_details["portrait"][size_data]["aspect_ratio"]
        portrait_tasks.append(
            generate_image(prompt, filename, folder_name, aspect_ratio)
        )
        portrait_images_filenames.append(f"{size_data}.jpeg")

    # Create tasks for landscape images
    landscape_tasks = []
    for size_data in landscape_sizes:
        filename = f"landscape/{size_data}.jpeg"
        aspect_ratio = size_details["landscape"][size_data]["aspect_ratio"]
        landscape_tasks.append(
            generate_image(prompt, filename, folder_name, aspect_ratio)
        )
        landscape_images_filenames.append(f"{size_data}.jpeg")

    # Wait for all tasks to complete
    await asyncio.gather(*portrait_tasks, *landscape_tasks)

    # Return the generated image details
    return {
        "generated_images": {
            "images_folder_path": folder_name,
            "portrait": portrait_images_filenames,
            "landscape": landscape_images_filenames,
        }
    }
