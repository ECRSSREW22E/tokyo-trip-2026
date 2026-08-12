const assert = require('node:assert/strict');
const path = require('node:path');

global.window = {};
require(path.join(__dirname,'..','assets','shopping-directory-data.js'));
require(path.join(__dirname,'..','assets','shopping-data.js'));

const data = window.TokyoShoppingData;
const taxonomy = data.shoppingTaxonomy;
const unique = (records,label) => assert.equal(new Set(records.map(item => item.id)).size,records.length,`${label}: duplicate id`);
const inEnum = (value,values,label) => assert.ok(values.includes(value),`${label}: invalid ${value}`);

assert.ok(data,'TokyoShoppingData was not created');
assert.equal(data.meta.schemaVersion,3,'aggregate schema version');
assert.ok(data.shoppingBrands.length >= 80 && data.shoppingBrands.length <= 160,'brand target must stay between 80 and 160');
assert.ok(data.shoppingVenues.length >= 30,'venue coverage is unexpectedly low');
assert.ok(data.shoppingBranches.length >= data.shoppingBrands.length,'branch coverage is unexpectedly low');

unique(data.shoppingSources,'sources');
unique(data.shoppingVenues,'venues');
unique(data.shoppingBrands,'brands');
unique(data.shoppingBranches,'branches');

const sourceIds = new Set(data.shoppingSources.map(item => item.id));
const venueIds = new Set(data.shoppingVenues.map(item => item.id));
const brandIds = new Set(data.shoppingBrands.map(item => item.id));

data.shoppingVenues.forEach(item => {
  inEnum(item.type,taxonomy.venueTypes,`venue ${item.id}`);
  assert.ok(item.days.every(day => Number.isInteger(day) && day >= 1 && day <= 6),`venue ${item.id}: invalid day`);
  assert.ok(item.sourceIds.length,`venue ${item.id}: missing source`);
  item.sourceIds.forEach(id => assert.ok(sourceIds.has(id),`venue ${item.id}: unknown source ${id}`));
});

data.shoppingBrands.forEach(item => {
  inEnum(item.category,taxonomy.brandCategories,`brand ${item.id}`);
  item.styles.forEach(style => inEnum(style,taxonomy.styles,`brand ${item.id}`));
  item.targets.forEach(target => inEnum(target,taxonomy.targets,`brand ${item.id}`));
  inEnum(item.priceLevel,taxonomy.priceLevels,`brand ${item.id}`);
  inEnum(item.japanValue,taxonomy.japanValues,`brand ${item.id}`);
  inEnum(item.trend,taxonomy.trends,`brand ${item.id}`);
  assert.ok(item.sourceIds.length,`brand ${item.id}: missing source`);
  Object.entries(item.popularity).forEach(([key,value]) => assert.ok(value === null || (value >= 0 && value <= 5),`brand ${item.id}: popularity ${key}`));
  item.sourceIds.forEach(id => assert.ok(sourceIds.has(id),`brand ${item.id}: unknown source ${id}`));
});

data.shoppingBranches.forEach(item => {
  assert.ok(brandIds.has(item.brandId),`branch ${item.id}: unknown brand`);
  assert.ok(venueIds.has(item.venueId),`branch ${item.id}: unknown venue`);
  inEnum(item.status,taxonomy.branchStatuses,`branch ${item.id}`);
  assert.ok(item.sourceIds.length,`branch ${item.id}: missing source`);
  item.sourceIds.forEach(id => assert.ok(sourceIds.has(id),`branch ${item.id}: unknown source ${id}`));
});

data.shoppingItems.forEach(item => {
  if (!item.brandId) return;
  assert.ok(brandIds.has(item.brandId),`product ${item.id}: unknown brand`);
  (item.recommendedVenueIds || []).forEach(id => assert.ok(venueIds.has(id),`product ${item.id}: unknown venue`));
});

const confirmed = data.shoppingBranches.filter(item => item.status === 'OPEN');
assert.ok(confirmed.every(item => item.sourceIds.some(id => sourceIds.has(id))), 'OPEN branches need source evidence');

console.log(JSON.stringify({
  ok:true,
  schemaVersion:data.meta.schemaVersion,
  counts:{sources:data.shoppingSources.length,venues:data.shoppingVenues.length,brands:data.shoppingBrands.length,branches:data.shoppingBranches.length,products:data.shoppingItems.length},
  statuses:data.shoppingBranches.reduce((acc,item) => ((acc[item.status]=(acc[item.status] || 0)+1),acc),{})
},null,2));
