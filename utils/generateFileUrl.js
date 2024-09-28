const CDN = "https://cdn.upu.io";

const generateFileUrl = (fileKey) => {
  if (fileKey) {
    return `${CDN}/${fileKey}`;
  } else {
    return `Empty`;
  }
};

export { CDN };

export default generateFileUrl;
