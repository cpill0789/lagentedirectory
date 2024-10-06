import designerData from "./data/designers.yaml";

const tagCounts = {};

const expertiseFilters = designerData.reduce((tags, designer) => {
  designer.profile.expertise.forEach((tag) => {
    tags.add(tag);
    if (tagCounts[tag] === undefined) {
      tagCounts[tag] = 0;
    }
    tagCounts[tag] += 1;
  });
  return tags;
}, new Set());

const categories = Array.from(expertiseFilters).map((filter) => ({
  title: filter,
  id: filter,
  expertise: true,
  totalCount: tagCounts[filter],
}));

const locationFilters = designerData.reduce((locations, designer) => {
  const location = designer.profile.location;
  locations.add(location);
  if (tagCounts[location] === undefined) {
    tagCounts[location] = 0;
  }
  tagCounts[location] += 1;
  return locations;
}, new Set());

const locations = Array.from(locationFilters).map((filter) => ({
  title: filter,
  id: filter,
  location: true,
  totalCount: tagCounts[filter],
}));

export default [...categories, ...locations];
