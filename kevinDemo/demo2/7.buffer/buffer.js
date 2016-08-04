var buf1=new Buffer(3);
buf1[0]=0x61;
buf1[1]=0x62;
buf1[2]=0x63;
var buf2=new Buffer([0x61,0x62,0x63]);
var buf3=new Buffer('abc');

console.log('buf1='+buf1);
console.log('buf2='+buf2);
console.log('buf3='+buf3);