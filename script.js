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
    setModeAD();

    updateCalendar(now);
    updateMeridiem(now);
    
    clockTick();
}

function clockTick() {
    // now.setSeconds(now.getSeconds() + 1);
    now = new Date();

    updateClock(now);

    if (!stopClock) {
        setTimeout(function() {clockTick()}, 1000);
    }
}

function updateClock(now) {
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    let timeString = romanNumeral.toNumeral((hours == 0) ? 12 : (hours % 12));

    if (minutes != 0) {
        timeString += separator + romanNumeral.toNumeral(minutes);

        if (seconds != 0) {
            timeString += separator + romanNumeral.toNumeral(seconds);
        }
    }

    document.getElementById('time').innerHTML = timeString;

    if (seconds == 0 && minutes == 0) {
        switch(hours) {
            case 0: 
                updateCalendar(now);
            case 12: 
                updateMeridiem(now);
        }
    }
}

function updateMeridiem(now) {
    let merString = (now.getHours() < 12) ? 'Ante' : 'Post';
    document.getElementById('meridiem').innerHTML = `${merString} Meridiem`;
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