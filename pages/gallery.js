import { getPhotos } from '../lib/data';
import { getPlaiceholder } from 'plaiceholder';
import Image from 'next/image';

const blurImages = async (photos) => {
  const images = await Promise.all(
    photos.map(async (image) => {
      const { base64, img } = await getPlaiceholder(image.photo.url, {
        size: 10,
      });
      return {
        ...img,
        base64,
        id: image.id,
        description: image.description,
        date: image.date,
      };
    })
  );
  return images;
};

export const getStaticProps = async () => {
  const data = await getPhotos();
  const blurredImages = await blurImages(data.photos);
  return {
    props: {
      blurredImages,
    },
  };
};

const Gallery = ({ blurredImages }) => {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-5 lg:py-10">
      <div className="grid grid-cols-2 gap-5">
        {blurredImages.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.description}
              placeholder="blur"
              blurDataURL={image.base64}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Gallery;
