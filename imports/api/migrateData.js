import { Heroes } from '/imports/api/heroes/heroes';

export const migrateData = function() {
  const heroData = JSON.parse(Assets.getText('data/heroes.json'));
  heroData.forEach(h => {
    Heroes.upsert({ uuid: h.uuid }, h);
  });
};