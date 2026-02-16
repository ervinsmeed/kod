import axios from "axios";
import { ensureArray, normalizeProduct } from "./normalize";

const PRIMARY_URL = "https://6985988b6964f10bf253c4da.mockapi.io/tovar";
const LEGACY_URL = import.meta.env.VITE_LEGACY_PRODUCTS_URL || "";
const HAS_LEGACY = Boolean(LEGACY_URL);
const SOURCE_PRIMARY = "primary";
const SOURCE_LEGACY = "legacy";

const tryRequest = async (method, url, data) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch {
    return null;
  }
};

const withSource = (product, source) => {
  const normalized = normalizeProduct(product);
  if (!normalized || typeof normalized !== "object") return normalized;
  const rawId = normalized.id ?? product?.id;
  const uid =
    rawId === undefined || rawId === null ? undefined : `${source}-${rawId}`;
  return {
    ...normalized,
    source,
    uid,
  };
};

const preparePayload = (product) => {
  const prepared = normalizeProduct(product);
  if (!prepared || typeof prepared !== "object") return prepared;
  const { source, uid, ...rest } = prepared;
  return rest;
};

const normalizeProducts = (data, source) =>
  ensureArray(data).map((product) => withSource(product, source));

const parseUid = (value) => {
  const raw = String(value ?? "");
  const primaryPrefix = `${SOURCE_PRIMARY}-`;
  const legacyPrefix = `${SOURCE_LEGACY}-`;

  if (raw.startsWith(primaryPrefix)) {
    return { id: raw.slice(primaryPrefix.length), source: SOURCE_PRIMARY };
  }
  if (raw.startsWith(legacyPrefix)) {
    return { id: raw.slice(legacyPrefix.length), source: SOURCE_LEGACY };
  }
  return { id: raw, source: null };
};

export const getAll = async () => {
  const [primaryRaw, legacyRaw] = await Promise.all([
    tryRequest("get", PRIMARY_URL),
    HAS_LEGACY ? tryRequest("get", LEGACY_URL) : Promise.resolve(null),
  ]);
  const normalizedPrimary = normalizeProducts(primaryRaw, SOURCE_PRIMARY);
  const normalizedLegacy = HAS_LEGACY
    ? normalizeProducts(legacyRaw, SOURCE_LEGACY)
    : [];

  if (normalizedPrimary.length === 0) return normalizedLegacy;
  if (normalizedLegacy.length === 0) return normalizedPrimary;

  return [...normalizedPrimary, ...normalizedLegacy];
};

export const getById = async (id, source) => {
  const parsed = parseUid(id);
  const resolvedId = parsed.id;
  const resolvedSource = source || parsed.source;

  if (resolvedSource === SOURCE_PRIMARY) {
    const primary = await tryRequest("get", `${PRIMARY_URL}/${resolvedId}`);
    return withSource(primary, SOURCE_PRIMARY);
  }

  if (resolvedSource === SOURCE_LEGACY) {
    if (!HAS_LEGACY) {
      const primary = await tryRequest("get", `${PRIMARY_URL}/${resolvedId}`);
      return withSource(primary, SOURCE_PRIMARY);
    }
    const legacy = await tryRequest("get", `${LEGACY_URL}/${resolvedId}`);
    return withSource(legacy, SOURCE_LEGACY);
  }

  const primary = await tryRequest("get", `${PRIMARY_URL}/${resolvedId}`);
  if (primary) return withSource(primary, SOURCE_PRIMARY);

  if (!HAS_LEGACY) return withSource(null, SOURCE_PRIMARY);

  const legacy = await tryRequest("get", `${LEGACY_URL}/${resolvedId}`);
  return withSource(legacy, SOURCE_LEGACY);
};

export const create = async (product, source) => {
  const prepared = preparePayload(product);

  if (source === SOURCE_PRIMARY) {
    const primary = await tryRequest("post", PRIMARY_URL, prepared);
    return withSource(primary, SOURCE_PRIMARY);
  }

  if (source === SOURCE_LEGACY) {
    if (!HAS_LEGACY) {
      const primary = await tryRequest("post", PRIMARY_URL, prepared);
      return withSource(primary, SOURCE_PRIMARY);
    }
    const legacy = await tryRequest("post", LEGACY_URL, prepared);
    return withSource(legacy, SOURCE_LEGACY);
  }

  const primary = await tryRequest("post", PRIMARY_URL, prepared);
  if (primary) return withSource(primary, SOURCE_PRIMARY);

  if (!HAS_LEGACY) return withSource(null, SOURCE_PRIMARY);

  const legacy = await tryRequest("post", LEGACY_URL, prepared);
  return withSource(legacy, SOURCE_LEGACY);
};

export const update = async (id, product, source) => {
  const prepared = preparePayload(product);
  const parsed = parseUid(id);
  const resolvedId = parsed.id;
  const resolvedSource = source || parsed.source;

  if (resolvedSource === SOURCE_PRIMARY) {
    const primary = await tryRequest(
      "put",
      `${PRIMARY_URL}/${resolvedId}`,
      prepared,
    );
    return withSource(primary, SOURCE_PRIMARY);
  }

  if (resolvedSource === SOURCE_LEGACY) {
    if (!HAS_LEGACY) {
      const primary = await tryRequest(
        "put",
        `${PRIMARY_URL}/${resolvedId}`,
        prepared,
      );
      return withSource(primary, SOURCE_PRIMARY);
    }
    const legacy = await tryRequest(
      "put",
      `${LEGACY_URL}/${resolvedId}`,
      prepared,
    );
    return withSource(legacy, SOURCE_LEGACY);
  }

  const primary = await tryRequest(
    "put",
    `${PRIMARY_URL}/${resolvedId}`,
    prepared,
  );
  if (primary) return withSource(primary, SOURCE_PRIMARY);

  if (!HAS_LEGACY) return withSource(null, SOURCE_PRIMARY);

  const legacy = await tryRequest(
    "put",
    `${LEGACY_URL}/${resolvedId}`,
    prepared,
  );
  return withSource(legacy, SOURCE_LEGACY);
};

export const remove = async (id, source) => {
  const parsed = parseUid(id);
  const resolvedId = parsed.id;
  const resolvedSource = source || parsed.source;

  if (resolvedSource === SOURCE_PRIMARY) {
    const primary = await tryRequest("delete", `${PRIMARY_URL}/${resolvedId}`);
    return withSource(primary, SOURCE_PRIMARY);
  }

  if (resolvedSource === SOURCE_LEGACY) {
    if (!HAS_LEGACY) {
      const primary = await tryRequest("delete", `${PRIMARY_URL}/${resolvedId}`);
      return withSource(primary, SOURCE_PRIMARY);
    }
    const legacy = await tryRequest("delete", `${LEGACY_URL}/${resolvedId}`);
    return withSource(legacy, SOURCE_LEGACY);
  }

  const primary = await tryRequest("delete", `${PRIMARY_URL}/${resolvedId}`);
  if (primary) return withSource(primary, SOURCE_PRIMARY);

  if (!HAS_LEGACY) return withSource(null, SOURCE_PRIMARY);

  const legacy = await tryRequest("delete", `${LEGACY_URL}/${resolvedId}`);
  return withSource(legacy, SOURCE_LEGACY);
};
