const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'assets', 'shopping-directory-data.js'), 'utf8'), context);
const data = context.window.TokyoShoppingDirectory;
const { shoppingTaxonomy: t, shoppingBrands: brands, shoppingVenues: venues, shoppingBranches: branches, directorySources: sources } = data;
const errors = [];
const assert = (value, message) => { if (!value) errors.push(message); };
const duplicate = list => list.filter((value, index) => list.indexOf(value) !== index);
const validAll = (values, allowed) => (values || []).every(value => allowed.includes(value));

assert(!duplicate(brands.map(x => x.id)).length, 'duplicate Brand ID');
assert(!duplicate(venues.map(x => x.id)).length, 'duplicate Venue ID');
assert(!duplicate(branches.map(x => x.id)).length, 'duplicate Branch ID');
const brandIds = new Set(brands.map(x => x.id));
const venueIds = new Set(venues.map(x => x.id));
const sourceIds = new Set(sources.map(x => x.id));

brands.forEach(brand => {
  assert(validAll(brand.styleTags, t.styles), `${brand.id}: invalid styleTag`);
  assert(validAll(brand.fashionCategories, t.fashionCategories), `${brand.id}: invalid fashionCategory`);
  assert(validAll(brand.shoppingIntent, t.shoppingIntents), `${brand.id}: invalid shoppingIntent`);
  assert(validAll(brand.ageStyle, t.ageStyles), `${brand.id}: invalid ageStyle`);
  assert(t.pricePositions.includes(brand.pricePosition), `${brand.id}: invalid pricePosition`);
  assert((brand.sourceIds || []).every(id => sourceIds.has(id)), `${brand.id}: missing source`);
  if (brand.primaryCategory === 'DRUGSTORE') assert(!brand.fashionCategories.length, `${brand.id}: impossible fashion category`);
});
branches.forEach(branch => {
  assert(brandIds.has(branch.brandId), `${branch.id}: branch without Brand`);
  assert(venueIds.has(branch.venueId), `${branch.id}: branch without Venue`);
  assert(validAll(branch.routeSegments, t.routeSegments), `${branch.id}: invalid routeSegment`);
  assert(Number.isInteger(branch.d4Priority) && branch.d4Priority >= 0 && branch.d4Priority <= 3, `${branch.id}: invalid d4Priority`);
  assert((branch.sourceIds || []).every(id => sourceIds.has(id)), `${branch.id}: missing source`);
  assert(!(branch.currentStatus === 'CLOSED' && branch.d4Priority < 3), `${branch.id}: closed branch recommended`);
});

const match = ({segment, category, prices, japanese}) => branches.filter(branch => {
  const brand = brands.find(item => item.id === branch.brandId);
  return branch.tripDays.includes(4) && branch.currentStatus !== 'CLOSED' &&
    (!segment || branch.routeSegments.includes(segment)) &&
    (!category || brand.fashionCategories.includes(category)) &&
    (!prices || prices.includes(brand.priceLevel)) &&
    (japanese === undefined || brand.japaneseBrand === japanese);
});
const cases = [
  ['Takeshita youth price 1–2', match({segment:'TAKESHITA_STREET',category:'YOUTH_FAST_FASHION',prices:[1,2]})],
  ['Shibuya Japanese streetwear price 3', match({segment:'SHIBUYA_CENTER',category:'STREETWEAR',prices:[3],japanese:true})],
  ['Omotesando Japanese designer price 3–4', match({segment:'OMOTESANDO',category:'JAPANESE_DESIGNER',prices:[3,4],japanese:true})],
  ['Cat Street sneakers', match({segment:'CAT_STREET',category:'SNEAKERS'})],
  ['Harajuku vintage', branches.filter(branch => branch.tripDays.includes(4) && ['HARAJUKU','JINGUMAE','CAT_STREET'].some(x => branch.routeSegments.includes(x)) && brands.find(x => x.id === branch.brandId).fashionCategories.some(x => ['VINTAGE','SECONDHAND'].includes(x)))]
];
cases.forEach(([name, result]) => assert(result.length > 0, `D4 test empty: ${name}`));

if (errors.length) {
  console.error(errors.map(message => `FAIL ${message}`).join('\n'));
  process.exit(1);
}
console.log(`PASS ${brands.length} brands · ${venues.length} venues · ${branches.length} branches · ${sources.length} sources`);
cases.forEach(([name, result]) => console.log(`PASS ${name}: ${[...new Set(result.map(x => brands.find(b => b.id === x.brandId).name))].join(', ')}`));
