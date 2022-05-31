1. LittleEndianSequnce/BigEndianSequence -последовательность байтов в порядке Little-Endian/Big-Endian

2. Байт хранит 2 разряда hex-числа. Байт содержит 8 бит. 
При операции hex -> bytes недостающие биты к разряду заполняются нулями спереди ( 11111 -> 00011111 ). 
Проблема в том, что при **непарном** количестве разрядов hex-числа последний байт заполняется нулями ( 1111 -> 00001111),
т.е. выходит что байт всё равно содержит пару разрядов будущего hex-числа.
Это влечет за собой то что при операции Big Endian Sequence Bytes -> hex , 
результат будет иметь парное число разрядов в любом случае (0x402 ->  Big Endian Sequence -> 0x4002).
(Образуется нулевой разряд, второй по счету с конца).

Для решения этой проблемы можно было представить биты в виде объекта
 {
   value: 0/1;
   active: true/false;
 }
для внедрения статуса их активности, чтобы при переобразованиях использовать только активные биты в байте.
Но, как я понимаю, это не весомая часть цели задачи, поэтому не усложнял решение.
(Test vectors имеют значения с парным количеством разрядов)