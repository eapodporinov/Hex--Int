let littleEndianSequence;
let bigEndianSequence;

document.getElementById('hex-to-little-endian-button')
  .onclick = function() {
    littleEndianSequence = hexToLittleEndianSequence(document
      .getElementsByName('hex-input')[0].value);
    
    document.getElementById('hex-to-little-endian-output')
      .textContent = littleEndianSequence;
      
    document.getElementById('number-of-bytes-output')
      .textContent = littleEndianSequence.length;
  }

document.getElementById('hex-to-big-endian-button')
  .onclick = function() {
    bigEndianSequence = hexToBytes(document
      .getElementsByName('hex-input')[0].value);
    
    document.getElementById('hex-to-big-endian-output')
      .textContent = bigEndianSequence;
      
    document.getElementById('number-of-bytes-output')
      .textContent = bigEndianSequence.length;
  }

document.getElementById('little-endian-to-hex-button')
  .onclick = function() {
    document.getElementById('little-endian-to-hex-output')
      .textContent = bytesToHex(littleEndianSequence);
  }
  
document.getElementById('big-endian-to-hex-button')
  .onclick = function() {
    document.getElementById('big-endian-to-hex-output')
      .textContent = bytesToHex(bigEndianSequence);
  }
  
document.getElementById('little-endian-to-decimal-button')
  .onclick = function() {
    document.getElementById('little-endian-to-decimal-output')
      .textContent = bytesToBigInt(littleEndianSequence);
  }
  
document.getElementById('big-endian-to-decimal-button')
  .onclick = function() {
    document.getElementById('big-endian-to-decimal-output')
      .textContent = bytesToBigInt(bigEndianSequence);
  }
  
  
function hexToBytes(hex) { // hexToBigEndianSequence
  if (hex.length % 2 != 0) hex = '0' + hex; // UPDATE 08.06.2022 (*)
  
  for (var bytes = [], i = 0; i < hex.length; i += 2)
    bytes.push(parseInt(hex.substr(i, 2), 16)
      .toString(2)
      .padStart(8, '0'));
     //padStart - новая функция из ES8, она заполняет строку до заданной длины
  return bytes; // It returns bytes in Big Endian sequence (array)
}

function hexToLittleEndianSequence(hex) {
  return hexToBytes(hex).reverse();
}

function bytesToBigInt(bytes) { // bytes -array
  return BigInt('0b' + bytes.join(''));
}

function bytesToHex(bytes) { 
  return '0x' + bytesToBigInt(bytes).toString(16).toUpperCase();
}


// Test vectors...
// first test
let value = 'ff00000000000000000000000000000000000000000000000000000000000000';
littleEndianSequence = hexToLittleEndianSequence(value);
bigEndianSequence = hexToBytes(value);
let numberOfBytes = bigEndianSequence.length; // or littleEndian.length
let littleEndianBigIntValue = bytesToBigInt(littleEndianSequence);
let bigEndianBigIntValue = bytesToBigInt(bigEndianSequence);

document.getElementById('first-test-div')
  .innerHTML = testResultToHTML(value, numberOfBytes,
    littleEndianBigIntValue, bigEndianBigIntValue);
  
// second test
value = 'aaaa000000000000000000000000000000000000000000000000000000000000';
littleEndianSequence = hexToLittleEndianSequence(value);
bigEndianSequence = hexToBytes(value);
numberOfBytes = bigEndianSequence.length; // or littleEndian.length
littleEndianBigIntValue = bytesToBigInt(littleEndianSequence);
bigEndianBigIntValue = bytesToBigInt(bigEndianSequence);

document.getElementById('second-test-div')
  .innerHTML = testResultToHTML(value, numberOfBytes,
    littleEndianBigIntValue, bigEndianBigIntValue);

// third test
value = 'FFFFFFFF';
littleEndianSequence = hexToLittleEndianSequence(value);
bigEndianSequence = hexToBytes(value);
numberOfBytes = bigEndianSequence.length; // or littleEndian.length
littleEndianBigIntValue = bytesToBigInt(littleEndianSequence);
bigEndianBigIntValue = bytesToBigInt(bigEndianSequence);

document.getElementById('third-test-div')
  .innerHTML = testResultToHTML(value, numberOfBytes,
    littleEndianBigIntValue, bigEndianBigIntValue);
    
// fourth test
value = 'F000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
littleEndianSequence = hexToLittleEndianSequence(value);
bigEndianSequence = hexToBytes(value);
numberOfBytes = bigEndianSequence.length; // or littleEndian.length
littleEndianBigIntValue = bytesToBigInt(littleEndianSequence);
bigEndianBigIntValue = bytesToBigInt(bigEndianSequence);

document.getElementById('fourth-test-div')
  .innerHTML = testResultToHTML(value, numberOfBytes,
    littleEndianBigIntValue, bigEndianBigIntValue);
    
function testResultToHTML(value, numberOfBytes,
  littleEndianBigIntValue, bigEndianBigIntValue) {
    return "Value: 0x" + value + '<br/>' + 
      "Number of bytes: " + numberOfBytes + '<br/>' +
      "Little-Endian (BigInt): " + littleEndianBigIntValue + '<br/>' + 
      "Big-Endian (BigInt): " + bigEndianBigIntValue;
}
// Tests end

// doc navigation
document.getElementById('hex-to-little-endian-button')
  .addEventListener('click', () => {
    document.getElementById('little-endian-to-hex-button')
      .disabled = false;
      
    document.getElementById('little-endian-to-decimal-button')
      .disabled = false;
  });
  
document.getElementById('hex-to-big-endian-button')
  .addEventListener('click', () => {
    document.getElementById('big-endian-to-hex-button')
      .disabled = false;
      
    document.getElementById('big-endian-to-decimal-button')
      .disabled = false;
  });

// input handling
let input = document.querySelector('input');

input.addEventListener('input', resizeInput); 
input.addEventListener('input', () => {
  if (input.value == "") {
    document.getElementById('hex-to-little-endian-button')
      .disabled = true;
        
    document.getElementById('hex-to-big-endian-button')
      .disabled = true;  
    } 
    else {
      document.getElementById('hex-to-little-endian-button')
        .disabled = false;
        
      document.getElementById('hex-to-big-endian-button')
        .disabled = false;
    }
    
    document.getElementById('buttons')
      .querySelectorAll('output').forEach(node => {
        node.textContent = "";
      });
      
    document.querySelectorAll('button').forEach((node, index) => {
      if (index > 1) node.disabled = true;
    });
  })

function resizeInput() {
  this.style.width = this.value.length + 'em';
}
