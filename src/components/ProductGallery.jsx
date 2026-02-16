import { useEffect, useMemo, useState } from "react";

const normalizeImages = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const buildGallery = (product) => {
  if (!product) return [];

  const images = [
    ...normalizeImages(product.images),
    ...normalizeImages(product.gallery),
    ...normalizeImages(product.photos),
  ];

  if (product.cover) {
    images.unshift(product.cover);
  }

  const unique = [...new Set(images)];

  if (unique.length > 1) {
    return unique.map((src) => ({ src, position: "center" }));
  }

  const coverImage = unique[0];
  if (coverImage) {
    return [
      { src: coverImage, position: "center", transform: "scale(1)" },
      { src: coverImage, position: "center", transform: "scaleX(-1)" },
      {
        src: coverImage,
        position: "center",
        transform: "scale(1.05) translateX(-4%)",
      },
      {
        src: coverImage,
        position: "center",
        transform: "scale(1.07) translateY(-4%)",
      },
    ];
  }

  return [];
};

export const ProductGallery = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = useMemo(() => buildGallery(product), [product]);
  const totalImages = galleryImages.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [product?.id]);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    if (activeIndex >= galleryImages.length) {
      setActiveIndex(0);
    }
  }, [galleryImages.length, activeIndex]);

  if (galleryImages.length === 0) {
    return (
      <div className="w-full h-72 sm:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  const activeImage = galleryImages[activeIndex];

  return (
    <div className="w-full space-y-4">
      <div className="w-full aspect-[3/2] overflow-hidden relative rounded-3xl flex items-center justify-center">
        <img
          src={activeImage.src}
          alt={product?.titleKg || "Product"}
          className="w-full h-full object-contain transition-transform duration-500"
          style={{
            objectPosition: activeImage.position,
            transform: activeImage.transform,
          }}
        />
        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? totalImages - 1 : prev - 1,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-gray-900 shadow-lg hover:bg-white transition"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % totalImages)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-gray-900 shadow-lg hover:bg-white transition"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {totalImages > 1 && (
        <div className="mt-[50px] grid grid-cols-4 sm:grid-cols-5 gap-2">
          {galleryImages.map((img, idx) => (
            <button
              key={`${img.src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                activeIndex === idx
                  ? "border-amber-400 shadow-lg"
                  : "border-transparent hover:border-white/30"
              }`}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
                style={{
                  objectPosition: img.position,
                  transform: img.transform,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
