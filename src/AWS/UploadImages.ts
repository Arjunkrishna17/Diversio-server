import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Logger } from "../Utils/Logger";

const UploadImages = async (
  images: Express.Multer.File[],
  category: string,
  title: string
) => {
  try {
    const s3 = new S3Client({ region: process.env.AWS_REGION });

    const imagesUrls = [];

    let imageCount = 1;

    for (const image of images) {
      const params = {
        Bucket: "diversio-product-images",
        Key: `product/${category + "/" + title + "/" + image.originalname}`,
        Body: image.buffer,
      };

      const command = new PutObjectCommand(params);

      await s3.send(command);

      const imageUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

      imagesUrls.push(imageUrl);

      Logger.info(
        imageCount +
          "/" +
          images.length +
          " image " +
          " of " +
          title +
          " uploaded successfully"
      );

      imageCount = imageCount + 1;
    }

    return imagesUrls;
  } catch (error) {
    Logger.error("Failed to upload images of " + title + " " + error);
  }
};

export default UploadImages;
