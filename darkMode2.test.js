// BEGIN: Test localStorage
localStorage.setItem('testKey', 'testValue');
const storedValue = localStorage.getItem('testKey');
console.log(storedValue === 'testValue');
localStorage.removeItem('testKey');
// END: Test localStorage// BEGIN: Test localStorage
test('localStorage works correctly', () => {
  // Set a test value in localStorage
  localStorage.setItem('testKey', 'testValue');
  
  // Retrieve the test value from localStorage
  const storedValue = localStorage.getItem('testKey');
  
  // Check if the retrieved value matches the expected value
  expect(storedValue).toBe('testValue');
  
  // Remove the test value from localStorage
  localStorage.removeItem('testKey');
});
// END: Test localStorage