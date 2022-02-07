import designerData from './designers.yaml';

designerData.forEach(designerItem => {
  const imageURL = require(`./images/${designerItem.profile.profile_image_file}`);
  console.log(imageURL);
  // const response = {...designerItem, profile_image_url_https: imageURL};
  designerItem.profile.profile_image_url_https = imageURL;
})

export default designerData;
