export const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined) {
    return fallback;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const ensureArray = (data) => (Array.isArray(data) ? data : []);

export const normalizeProduct = (product) => {
  if (!product || typeof product !== "object") return product;
  const normalized = {
    ...product,
    price: toNumber(product.price, 0),
    ratingAvg: toNumber(product.ratingAvg, 0),
  };

  if (product.stock !== undefined && product.stock !== null && product.stock !== "") {
    normalized.stock = toNumber(product.stock, product.stock);
  }

  return normalized;
};

export const normalizeOrder = (order) => {
  if (!order || typeof order !== "object") return order;
  const totalRaw =
    order.total ??
    order.totalPrice ??
    order.total_price ??
    order.totalAmount ??
    order.total_amount;
  const total = toNumber(totalRaw, 0);
  const totalPriceRaw =
    order.totalPrice ??
    order.total ??
    order.total_price ??
    order.totalAmount ??
    order.total_amount;

  return {
    ...order,
    total,
    totalPrice: toNumber(totalPriceRaw, total),
  };
};

export const normalizeReview = (review) => {
  if (!review || typeof review !== "object") return review;
  return {
    ...review,
    rating: toNumber(review.rating, 0),
  };
};
