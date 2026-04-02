const assert = require('assert');



function classifyBattery(presentCapacity) {
  const ratedCapacity = 120
  const healthThresholds = {
    healthy: { min: 83, max: 100 },
    exchange: { min: 63, max: 83 },
    failed: { min: 0, max: 63 },
  };

  const soh = (100 * presentCapacity) / ratedCapacity;
  if (soh > healthThresholds.healthy.min) return 'healthy';
  if (soh > healthThresholds.exchange.min) return 'exchange';
  return 'failed';
}

function countBatteriesByHealth(presentCapacities) {
  const counts = { healthy: 0, exchange: 0, failed: 0 };
  for (const capacity of presentCapacities) {
    counts[classifyBattery(capacity)]++;
  }
  return counts;
}


function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);

  console.log('Testing boundary conditions...');
  const boundaryCases = [99.7, 99.5, 75.7, 75.5, 120, 0]
  const countsBoundary = countBatteriesByHealth(boundaryCases);
  assert(countsBoundary["healthy"] == 2);
  assert(countsBoundary["exchange"] == 2);
  assert(countsBoundary["failed"] == 2);

  console.log("Done counting :)");
}

testBucketingByHealth();
