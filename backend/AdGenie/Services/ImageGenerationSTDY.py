import boto3
import json
import base64
import io
import os
import time
from dotenv import load_dotenv

# from botocore.exceptions import ThrottlingException

load_dotenv()

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

# S3 Configuration
AWS_ACCESS_KEY_ID_PERSONAL = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY_PERSONAL = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_DEFAULT_REGION_PERSONAL = os.getenv("AWS_DEFAULT_REGION")

# Create a Bedrock Runtime client in the AWS Region of your choice.
bedrock = boto3.client(
    "bedrock-runtime",
    region_name="us-west-2",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)


def generateImageAndSaveInS3(prompt, filename, foldername, aspect_ratio):
    retries = 5
    backoff_time = 1  # Start with a 1-second backoff time
    for attempt in range(retries):
        try:
            # Invoke the model to generate the image
            response = bedrock.invoke_model(
                modelId="stability.stable-image-ultra-v1:0",
                body=json.dumps(
                    {"prompt": prompt, "aspect_ratio": aspect_ratio, "seed": 0}
                ),
            )
            output_body = json.loads(response["body"].read().decode("utf-8"))
            base64_output_image = output_body["images"][0]
            image_data = base64.b64decode(base64_output_image)
            image = io.BytesIO(image_data)

            # Initialize the S3 client with the provided credentials
            s3_client = boto3.client(
                "s3",
                aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
                region_name=os.getenv("AWS_DEFAULT_REGION"),
            )

            # S3 bucket and file details
            bucket_name = "ads-campaign-generated-image"
            s3_object_key = f"{foldername}/{filename}"

            # Convert the image data to a file-like object using BytesIO
            image_data_io = io.BytesIO(image_data)

            # Upload the image to S3
            s3_client.upload_fileobj(
                image_data_io,
                bucket_name,
                s3_object_key,
                ExtraArgs={"ContentType": "image/jpeg"},
            )
            print(f"Image uploaded successfully to {bucket_name}/{s3_object_key}")
            return True  # Successfully uploaded

        except Exception as e:
            # If we encounter throttling, retry with exponential backoff
            if attempt < retries - 1:
                print(
                    f"Throttling exception encountered, retrying in {backoff_time} seconds..."
                )
                time.sleep(backoff_time)
                backoff_time *= 2  # Exponentially increase the wait time
            else:
                print(f"Maximum retries reached. Error: {e}")
                return False
        except Exception as e:
            # Catch any other exception
            print(f"Error generating or uploading image: {e}")
            return False


# prompt = "Create an ad for GreenEarth Co. featuring an eco-friendly green reusable bag with natural elements like leaves and water drops. Use a minimal background with green, beige, and earthy tones. Add the text 'Save the Planet, One Bag at a Time!' in Lora font or a similar serif style, with handwritten accents. Blend urban and nature visuals for a modern, sustainable lifestyle. Appeal to young professionals and families. Include the GreenEarth Co. logo as a subtle watermark. Keep it clean and creative."

# # Call the function to generate the image and save it to S3
# generateImageAndSaveInS3(prompt, "image.jpeg", "GreenEarthCampaign", "16:9")
