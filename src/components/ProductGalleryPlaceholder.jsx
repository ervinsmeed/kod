export const ProductGalleryPlaceholder = () => {
  return (
    <div className="w-full bg-white rounded-3xl p-8">
      <div className="grid grid-cols-2 gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="aspect-square rounded-2xl bg-white border border-gray-200"
          />
        ))}
      </div>
    </div>
  );
};
