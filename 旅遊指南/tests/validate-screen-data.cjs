const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const file = path.join(__dirname, '..', 'assets', 'screen-locations-data.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
const data = context.window.TokyoScreenData;
const failures = [];
const warnings = [];
const allowed = {
  mediaType: ['ANIME_SERIES','ANIME_MOVIE','DRAMA_SERIES','DRAMA_SPECIAL','LIVE_ACTION_MOVIE','STREAMING_SERIES'],
  appearanceType: ['ANIME_MODEL','ANIME_INSPIRATION','LIVE_ACTION_FILMING_LOCATION','DRAMA_FILMING_LOCATION','OFFICIAL_PROMOTION_LOCATION','BACKGROUND_REFERENCE','COMMUNITY_IDENTIFIED','REFERENCE_ONLY'],
  evidenceType: ['OFFICIAL','PRODUCTION_CONFIRMED','TOURISM_OFFICIAL','FILM_COMMISSION_CONFIRMED','VERIFIED_FILMING_LOCATION','STRONG_VISUAL_MATCH','COMMUNITY_CONSENSUS','REFERENCE_ONLY'],
  evidenceConfidence: ['HIGH','MEDIUM','LOW','UNKNOWN'],
  routeRelevance: ['DIRECT','NEARBY','SMALL_DETOUR','OPTIONAL_DETOUR','SPECIAL_TRIP','NOT_RECOMMENDED']
};
const unique = (items, label) => {
  const seen = new Set();
  items.forEach(item => seen.has(item.id) ? failures.push(`Duplicate ${label} id: ${item.id}`) : seen.add(item.id));
  return seen;
};
if (!data) failures.push('TokyoScreenData was not created');
const workIds = unique(data.screenWorks, 'work');
const locationIds = unique(data.screenLocations, 'location');
const appearanceIds = unique(data.screenAppearances, 'appearance');
const sourceIds = unique(data.screenSources, 'source');
const areaIds = unique(data.screenAreas, 'area');

data.screenWorks.forEach(item => {
  if (!allowed.mediaType.includes(item.mediaType)) failures.push(`Invalid mediaType: ${item.id}`);
  item.areas.forEach(id => { if (!areaIds.has(id)) failures.push(`Unknown work areaId ${id}: ${item.id}`); });
  item.sourceIds.forEach(id => { if (!sourceIds.has(id)) failures.push(`Unknown work sourceId ${id}: ${item.id}`); });
});
data.screenLocations.forEach(item => {
  if (!areaIds.has(item.areaId)) failures.push(`Unknown location areaId: ${item.id}`);
  item.sourceIds.forEach(id => { if (!sourceIds.has(id)) failures.push(`Unknown location sourceId ${id}: ${item.id}`); });
  if (item.coordinates) {
    const [lat,lng] = item.coordinates;
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) failures.push(`Coordinates out of range: ${item.id}`);
  } else if (!item.needsVerification) failures.push(`Missing coordinates must need verification: ${item.id}`);
});
data.screenAppearances.forEach(item => {
  if (!workIds.has(item.workId)) failures.push(`Unknown workId: ${item.id}`);
  if (!locationIds.has(item.locationId)) failures.push(`Unknown locationId: ${item.id}`);
  item.sourceIds.forEach(id => { if (!sourceIds.has(id)) failures.push(`Unknown appearance sourceId ${id}: ${item.id}`); });
  ['appearanceType','evidenceType','evidenceConfidence','routeRelevance'].forEach(key => {
    if (!allowed[key].includes(item[key])) failures.push(`Invalid ${key}: ${item.id}`);
  });
  if (item.appearanceType.startsWith('ANIME') && !data.screenWorks.find(work => work.id === item.workId).mediaType.startsWith('ANIME')) failures.push(`Anime appearance on non-anime work: ${item.id}`);
  if (item.appearanceType.includes('DRAMA') && !['DRAMA_SERIES','DRAMA_SPECIAL','STREAMING_SERIES'].includes(data.screenWorks.find(work => work.id === item.workId).mediaType)) failures.push(`Drama appearance on non-drama work: ${item.id}`);
  if (item.evidenceType === 'REFERENCE_ONLY' && item.evidenceConfidence === 'HIGH') failures.push(`Reference-only cannot be HIGH: ${item.id}`);
});

const coordinateOwner = new Map();
data.screenLocations.filter(item => item.coordinates).forEach(item => {
  const key = item.coordinates.join(',');
  if (coordinateOwner.has(key)) warnings.push(`Duplicate coordinates: ${coordinateOwner.get(key)} / ${item.id}`);
  else coordinateOwner.set(key, item.id);
});

if (data.screenAppearances.filter(item => item.legacyId).length < 24) failures.push('Not all 24 legacy scenes have a migration id');
console.log(JSON.stringify({ works: workIds.size, locations: locationIds.size, appearances: appearanceIds.size, sources: sourceIds.size, legacyMigrated: data.screenAppearances.filter(item => item.legacyId).length, warnings, failures }, null, 2));
if (failures.length) process.exit(1);
