// Add a listener for Wallpaper Engine settings  
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.modeauc) { 
            if (properties.modeauc.value == true) {
                setModeAUC();
            } else {
                setModeAD();
            }
        }
    },
};

const monthNames = ["Ianuarii", "Februarii", "Martii", "Aprilis", "Maii", "Iunii", "Iulii", "Augusti", "Septembris", "Octobris", "Novembris", "Decembris"];
const AUC = "Ab Urbe Condita"
const AD = "Anno Domini"
const separator = " ‧ "

// Global flag representing the year format to be used 
let modeAUC = false;

// Change to AUC mode 
function setModeAUC() {
    modeAUC = true;
    document.getElementById("yearType").innerHTML = AUC;
    updateCalendar(now);
}

// Change to AD mode 
function setModeAD() {
    modeAUC = false;
    document.getElementById("yearType").innerHTML = AD;
    updateCalendar(now);
}

// Debugging flag that stops the time from advancing
let stopClock = false;

let now = new Date();

// Start the clock by pushing an update to all fields 
function bootstrapClock() {

    //document.body.style.fontSize = (window.innerHeight / 20) + "px";

    setModeAD();

    updateCalendar(now);
    updateMeridiem(now);
    
    clockTick(now);
}

function clockTick(now) {

    now = new Date();

    updateClock(now);

    if (!stopClock) {

        setTimeout(function() {clockTick(now)}, 1000);
    }
}

function updateClock(now) {

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    time = romanNumeral.toNumeral(h == 0?12:(h % 12));

    if (m != 0) {
        time += separator + romanNumeral.toNumeral(m);

        if (s != 0) {
            time += separator + romanNumeral.toNumeral(s);
        }
    }

    document.getElementById('time').innerHTML = time;

    if (s == 0 && m == 0) {
        
        switch(h) {
            case 0: 
                updateCalendar(now);
            case 12: 
                updateMeridiem(now);
        }
    }
}

function updateMeridiem(now) {

    let merString = (now.getHours() < 12)?'Ante':'Post';
    document.getElementById('meridiem').innerHTML = merString + ' Meridiem';
}

function updateCalendar(now) {

    document.getElementById('day').innerHTML = romanNumeral.toNumeral(now.getDate());
    document.getElementById('month').innerHTML = monthNames[now.getMonth()];
    
    let year = now.getFullYear();
    if (modeAUC) {
        year += 753; 
    }

    document.getElementById('year').innerHTML = romanNumeral.toNumeral(year);
}