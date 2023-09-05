const romanNumeral = {
    ten_symbols: ["I", "X", "C", "M", "X\u0305", "C\u0305", "M\u0305", "X\u033F", "C\u033F", "M\u033F"], 
    //ten_symbols: ["i", "x", "c", "m", "x\u0305", "c\u0305", "m\u0305", "x\u033F", "c\u033F", "m\u033F"], 

    five_symbols: ["V", "L", "D", "V\u0305", "L\u0305", "D\u0305", "V\u033F", "L\u033F", "D\u033F"], 
    //five_symbols: ["v", "l", "d", "v\u0305", "l\u0305", "d\u0305", "v\u033F", "l\u033F", "d\u033F"], 

    toNumeral: function(number) {
        //break number into a backwards digit array: 17 becomes [7, 1] 
        let digits = [];
        while (number > 0) {
            digits.push(number % 10);
            number = ~~(number / 10);
        }

        let numeral = "";

        for (let i = digits.length - 1; i >= 0; --i) {

            const ten = this.ten_symbols[i];
            const five = this.five_symbols[i];

            switch (digits[i]) {
                case 0:
                    break;
                case 5: //if there should be a five-based numeral (V, L, D, etc), add it 
                case 6:
                case 7:
                case 8:
                    numeral += five;
                    digits[i] -= 5;
                case 1: //add full numeral (I, X, C, etc) to get to correct value for [1, 3] and [5, 8]
                case 2:
                case 3:
                    numeral += ten.repeat(digits[i]);
                    break;
                case 4:
                    numeral += ten + five;
                    break;
                case 9:
                    //9 is represented by one full symbol before another, the second being worth 10 times the first 
                    numeral += ten + this.ten_symbols[i + 1]; 
                    break;
                default:
                    console.log("err digit " + digits[i]);
            }
            
        }
        
        if (numeral == "") {
            numeral = " ";
        }

        return numeral;
    }
}