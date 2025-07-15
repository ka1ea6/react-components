// Test that the capabilities can be used with forEach
const { capabilities } = require('./dist/index.js');

// Test if capabilities exist and can be iterated
if (capabilities && Array.isArray(capabilities)) {
  console.log('✅ Capabilities is an array with', capabilities.length, 'items');
  
  try {
    capabilities.forEach(cap => {
      console.log('Capability:', cap.id, '-', cap.name);
    });
    console.log('✅ forEach works correctly on capabilities');
  } catch (error) {
    console.error('❌ forEach error:', error.message);
  }
} else {
  console.error('❌ Capabilities is not an array or is undefined');
}
