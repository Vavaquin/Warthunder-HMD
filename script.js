// Script aproveitado do WTMFD



let currentData = {
    speed: 0,
    mach: 0,
    altitude_10k: 0,
    fuel: 0,
    weapon4: 0,
    fuel_consume: 0,
    type: "",
    nozzle_angle: 0,
    compass: 0,
    gears: 0,
    gear_c_indicator: 0,
    blister1: 0,
    airbrake_lever: 0,
    gear_lamp_down: 0,
    aoa: 0,
    g_meter: 0,
    ammo_counter1: 0,
    aviahorizon_roll: 0,
    airbrake_indicator: 0,
    radio_altitude: 0,
    fuel_consume1: 0,
    rpm: 0,
    rpm1: 0
};

let targetData = {
    speed: 0,
    mach: 0,
    altitude_10k: 0,
    fuel: 0,
    weapon4: 0,
    fuel_consume: 0,
    type: "",
    nozzle_angle: 0,
    compass: 0,
    gears: 0,
    gear_c_indicator: 0,
    blister1: 0,
    airbrake_lever: 0,
    gear_lamp_down: 0,
    aoa: 0,
    g_meter: 0,
    ammo_counter1: 0,
    aviahorizon_roll: 0,
    airbrake_indicator: 0,
    radio_altitude: 0,
    fuel_consume1: 0,
    rpm: 0,
    rpm1: 0
};

let stopLoop = false;
let abortController = new AbortController();

function interpolate(current, target, alpha) {
    return current + (target - current) * alpha;
}
let underFiveMinutesTime = 0;
let underTwoMinutesTime = 0;
let lastCheckTime = Date.now();
const audioBingo = new Audio('bingo.mp3');
const audioFuel = new Audio('fuel.mp3');
let lastAltitude = currentData.altitude_10k;
let lastAltitudeCheckTime = Date.now();
const audioSink = new Audio('sink.mp3');
let altitudeAlertPlayed = false;
let altitudeR = false;
const audioAltitude = new Audio('altitude.mp3');
const audioStar = new Audio('star.mp3');

// Radar altimetro de pouso
const audio200 = new Audio('200.mp3');
const audio100 = new Audio('100.mp3');
const audio50 = new Audio('50.mp3');
const audio40 = new Audio('40.mp3');
const audio30 = new Audio('30.mp3');
const audio20 = new Audio('20.mp3');
const audio10 = new Audio('10.mp3');
const audioCaution = new Audio('caution.mp3');


let audioPlayed200 = true;
let audioPlayed100 = true;
let audioPlayed50 = true;
let audioPlayed40 = true;
let audioPlayed30 = true;
let audioPlayed20 = true;
let audioPlayed10 = true;
let cautionPlayed = false;
let cautionRpmPlayed = true;

function interpolateCompass(current, target, alpha) {
    let diff = target - current;

    if (Math.abs(diff) > 180) {
        if (diff > 0) {
            diff -= 360;
        } else {
            diff += 360;
        }
    }

    let result = current + diff * alpha;

 
    if (result < 0) {
        result += 360;
    } else if (result >= 360) {
        result -= 360;
    }

    return result;
}

function updateDisplay() {
    const alpha = 0.06; 

    currentData.mach = interpolate(currentData.mach, targetData.mach, alpha);
    currentData.speed = interpolate(currentData.speed, targetData.speed, alpha);
    currentData.altitude_10k = interpolate(currentData.altitude_10k, targetData.altitude_10k, alpha);
    currentData.fuel = interpolate(currentData.fuel, targetData.fuel, alpha);
    currentData.weapon4 = interpolate(currentData.weapon4, targetData.weapon4, alpha);
    currentData.fuel_consume = interpolate(currentData.fuel_consume, targetData.fuel_consume, alpha);
    currentData.fuel_consume1 = interpolate(currentData.fuel_consume1, targetData.fuel_consume1, alpha);
    currentData.nozzle_angle = interpolate(currentData.nozzle_angle, targetData.nozzle_angle, alpha);
    currentData.throttle = interpolate(currentData.throttle1, targetData.throttle, alpha);
    currentData.compass = interpolateCompass(currentData.compass, targetData.compass, alpha); 
    currentData.gears = interpolate(currentData.gears, targetData.gears, alpha);
    currentData.gear_lamp_down = interpolate(currentData.gear_lamp_down, targetData.gear_lamp_down, alpha);
    currentData.gear_c_indicator = interpolate(currentData.gear_c_indicator, targetData.gear_c_indicator, alpha);
    currentData.blister1 = interpolate(currentData.blister1, targetData.blister1, alpha);
    currentData.airbrake_lever = interpolate(currentData.airbrake_lever, targetData.airbrake_lever, alpha);
    currentData.aoa = interpolate(currentData.aoa, targetData.aoa, alpha);
    currentData.g_meter = interpolate(currentData.g_meter, targetData.g_meter, alpha);
    currentData.ammo_counter1 = interpolate(currentData.ammo_counter1, targetData.ammo_counter1, alpha);
    currentData.type = targetData.type; 
    currentData.aviahorizon_roll = interpolate(currentData.aviahorizon_roll, targetData.aviahorizon_roll, alpha);
    currentData.radio_altitude = interpolate(currentData.radio_altitude, targetData.radio_altitude, alpha);
    currentData.rpm = interpolate(currentData.rpm, targetData.rpm, alpha);
    currentData.rpm1 = interpolate(currentData.rpm1, targetData.rpm1, alpha);
    compass = currentData.compass; // Atribuindo o valor à variável global

    // document.getElementById('speed').innerText = `[${currentData.mach.toFixed(2)}]`;
    // document.getElementById('alt').innerText = `[${currentData.altitude_10k.toFixed(0)}]`;
    // // document.getElementById('ammo').innerText = `${currentData.g_meter.toFixed(2)}`;
    // document.getElementById('compass').innerText = `[${currentData.compass.toFixed(0)}]`;

    // inicio do hud adaptativo

    if (currentData.g_meter > 0) {
        document.getElementById('ammo').innerText = `${currentData.g_meter.toFixed(2)}`;
    } else {
        document.getElementById('ammo').innerText = "";
    }

    if (currentData.mach > 0) {
        document.getElementById('speed').innerText = `[${currentData.mach.toFixed(2)}]`;
    } else {
        document.getElementById('speed').innerText = "";
    }



    if (currentData.altitude_10k > 0) {
        document.getElementById('alt').innerText = `[${currentData.altitude_10k.toFixed(0)}]`;
    } else {
        document.getElementById('alt').innerText = "";
    }

    if (currentData.compass > 0) {
        document.getElementById('compass').innerText = `[${currentData.compass.toFixed(0)}]`;
    } else {
        document.getElementById('compass').innerText = "";
    }


    if (currentData.nozzle_angle < -0.0001) {
        const arrow2 = document.getElementById('arrow2');
        arrow2.style.display = 'block';
    } else {
        arrow2.style.display = 'none';
    }





    if (currentData.nozzle_angle < -0.0001) {
        const arrow = document.getElementById('arrow');
        arrow.style.display = 'block';
        arrow.style.transform = `rotate(${currentData.nozzle_angle}deg)`;
    } else {
        arrow.style.display = 'none';
    }

    if (targetData.wing_sweep_indicator > 0.00001) {
        const w1 = document.getElementById('w1');
        w1.style.display = 'block';
        w1.style.transform = `rotate(${targetData.wing_sweep_indicator * -90}deg)`;
    } else {
        w1.style.display = 'none'
    }

    if (targetData.wing_sweep_indicator > 0.00001) {
        const w2 = document.getElementById('w2');
        w2.style.display = 'block';
    } else {
        w2.style.display = 'none'
    }

    if (targetData.airbrake_lever > 0.9001 || targetData.airbrake_indicator > 0.901) {
        const brake = document.getElementById('brake');
        brake.style.display = 'block';
        document.getElementById('brake').innerText = `[AIR BRAKE!]`;
    } else {
        brake.style.display = 'none'
    }

    if (targetData.gear_c_indicator > 0.9001 || targetData.gear_lamp_down > 0.9001) {
        const g = document.getElementById('g');
        g.style.display = 'block';
        document.getElementById('g').innerText = `[GEAR]`;
    } else {
        g.style.display = 'none'
    }

    if (targetData.radio_altitude > 1) {
        const ralt = document.getElementById('ralt');
        ralt.style.display = 'block';
        document.getElementById('ralt').innerText = `R:[${currentData.radio_altitude.toFixed(0)}]`;
    } else {
        ralt.style.display = 'none'
    }



    // // Calculo de combustivel
    // if (currentData.fuel_consume > 0) {
    //     const remainingMinutes = currentData.fuel / currentData.fuel_consume;
    //     const minutes = Math.floor(remainingMinutes);
    //     const seconds = Math.floor((remainingMinutes - minutes) * 60);
    //     document.getElementById('time').innerText = `[${minutes}:${seconds.toString().padStart(2, '0')}]`;
    // } else {
    //     document.getElementById('time').innerText = "";
    // }


    let allfuelconsume = currentData.fuel_consume;

    if (currentData.fuel_consume1) {
        allfuelconsume += currentData.fuel_consume1;
    }

    if (allfuelconsume > 0.2 && !starSoundPlayed) {
        audioStar.play();
        starSoundPlayed = true; // Marca como tocado
    }

    if (allfuelconsume <= 0.2) {
        starSoundPlayed = false;
    }

    if (allfuelconsume > 0) {
        const remainingMinutes = currentData.fuel / allfuelconsume;
        const minutes = Math.floor(remainingMinutes);
        const seconds = Math.floor((remainingMinutes - minutes) * 60);
        document.getElementById('time').innerText = `[${minutes}:${seconds.toString().padStart(2, '0')}]`;

        const currentTime = Date.now();
        const elapsedTime = (currentTime - lastCheckTime) / 1000;

        if (remainingMinutes < 5) {
            underFiveMinutesTime += elapsedTime;
            if (underFiveMinutesTime > 1) {
                audioFuel.play();
                underFiveMinutesTime = 0; 
                document.getElementById('time').style.color = '#fffb00';
            }
        } else {
            underFiveMinutesTime = 0;
        }


        if (remainingMinutes < 2) {
            underTwoMinutesTime += elapsedTime;
            if (underTwoMinutesTime > 1) {
                audioBingo.play();
                underTwoMinutesTime = 0; 
                document.getElementById('time').style.color = 'red';
            }
        } else {
            underTwoMinutesTime = 0;
            document.getElementById('time').style.color = '#00ff15';
        }

        lastCheckTime = currentTime;

    } else {
        document.getElementById('time').innerText = "";
    }




    const currentAltitudeCheckTime = Date.now();
    const elapsedTime = (currentAltitudeCheckTime - lastAltitudeCheckTime) / 1000; // 1000ms

    const altitudeDifference = lastAltitude - currentData.altitude_10k;
    const descentRatePerMinute = (altitudeDifference / elapsedTime) * 60; // 

    if (descentRatePerMinute > 70000) {
        audioSink.play();
    }


    lastAltitude = currentData.altitude_10k;
    lastAltitudeCheckTime = currentAltitudeCheckTime;

    if (currentData.radio_altitude < 1000 && !altitudeR) {
        audioAltitude.play();
        altitudeR = true;
    }

 
    if (currentData.radio_altitude >= 1200) {
        altitudeR = false;
    }

    if (currentData.gear_c_indicator > 0.9 || targetData.gear_lamp_down > 0.9) {

        if (currentData.radio_altitude <= 200 && !audioPlayed200) {
            audio200.play();
            audioPlayed200 = true;
        }
        if (currentData.radio_altitude <= 100 && !audioPlayed100) {
            audio100.play();
            audioPlayed100 = true;
        }
        if (currentData.radio_altitude <= 50 && !audioPlayed50) {
            audio50.play();
            audioPlayed50 = true;
        }
        if (currentData.radio_altitude <= 40 && !audioPlayed40) {
            audio40.play();
            audioPlayed40 = true;
        }
        if (currentData.radio_altitude <= 30 && !audioPlayed30) {
            audio30.play();
            audioPlayed30 = true;
        }
        if (currentData.radio_altitude <= 20 && !audioPlayed20) {
            audio20.play();
            audioPlayed20 = true;
        }
        if (currentData.radio_altitude <= 10 && !audioPlayed10) {
            audio10.play();
            audioPlayed10 = true;
        }
    }

    // Reset da altitude
    if (currentData.radio_altitude > 300) {
        audioPlayed200 = false;
    }
    if (currentData.radio_altitude > 200) {
        audioPlayed100 = false;
    }
    if (currentData.radio_altitude > 80) {
        audioPlayed50 = false;
    }
    if (currentData.radio_altitude > 60) {
        audioPlayed40 = false;
    }
    if (currentData.radio_altitude > 50) {
        audioPlayed30 = false;
    }
    if (currentData.radio_altitude > 30) {
        audioPlayed20 = false;
    }
    if (currentData.radio_altitude > 30) {
        audioPlayed10 = false;
    }

    if (Math.abs(currentData.rpm - currentData.rpm1) >= 500 && !cautionPlayed) {
        audioCaution.play();
        cautionPlayed = true;
    }

    if (Math.abs(currentData.rpm - currentData.rpm1) < 500) {
        cautionPlayed = false;
    }

    if (currentData.rpm < 100 && currentData.radio_altitude > 1000 && !cautionRpmPlayed) {
        audioCaution.play();
        cautionRpmPlayed = true;
    }

    if (!(currentData.rpm < 100 && currentData.radio_altitude > 1000)) {
        cautionRpmPlayed = false;
    }

}



async function fetchSpeed() {
    try {
        const response = await fetch('http://localhost:8111/indicators', { signal: abortController.signal });
        const data = await response.json();

        targetData.mach = data.mach;
        targetData.altitude_10k = data.altitude_10k;
        targetData.fuel = data.fuel;
        targetData.weapon4 = data.weapon4;
        targetData.fuel_consume = data["fuel_consume"];
        targetData.type = data.type;
        targetData.valid = data.valid
        targetData.nozzle_angle = data.nozzle_angle;
        targetData.throttle = data.throttle;
        targetData.wing_sweep_indicator = data.wing_sweep_indicator;
        targetData.compass = data.compass;
        targetData.gears = data.gears;
        targetData.gear_c_indicator = data.gear_c_indicator;
        targetData.gear_lamp_down = data.gear_lamp_down;
        targetData.blister1 = data.blister1;
        targetData.airbrake_lever = data.airbrake_lever;
        targetData.aoa = data.aoa;
        targetData.g_meter = data.g_meter;
        targetData.ammo_counter1 = data.ammo_counter1;
        targetData.aviahorizon_roll = data.aviahorizon_roll;
        targetData.airbrake_indicator = data.airbrake_indicator;
        targetData.radio_altitude = data.radio_altitude;
        targetData.fuel_consume1 = data.fuel_consume1;
        targetData.speed = data.speed;
        targetData.rpm = data.rpm;
        targetData.rpm1 = data.rpm1;



        handleValidState(data.valid);


    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error fetching speed data:', error);
        }
    }
}

function handleValidState(valid) {
    if (valid && !hasReceivedTrue) {
        resetScript();
        audioPlayed200 = true;
        audioPlayed100 = true;
        audioPlayed50 = true;
        audioPlayed40 = true;
        audioPlayed30 = true;
        audioPlayed20 = true;
        audioPlayed10 = true;
        hasReceivedTrue = true;
    } else if (!valid) {
        hasReceivedTrue = false;
    }
}


async function updateSpeedLoop() {
    stopLoop = false;
    while (!stopLoop) {
        await fetchSpeed();
        await new Promise(resolve => setTimeout(resolve, 50)); // tempo de atualização
    }
}

function animationLoop() {
    if (stopLoop) return;
    updateDisplay();
    requestAnimationFrame(animationLoop);
}

function resetScript() {


    abortController = new AbortController();

    // Reset do sscript
    currentData = {
        speed: 0,
        mach: 0,
        altitude_10k: 0,
        fuel: 0,
        weapon4: 0,
        fuel_consume: 0,
        type: "",
        nozzle_angle: 0,
        compass: 0,
        gears: 0,
        gear_c_indicator: 0,
        blister1: 0,
        airbrake_lever: 0,
        aoa: 0,
        g_meter: 0,
        ammo_counter1: 0,
        aviahorizon_roll: 0,
        airbrake_indicator: 0,
        radio_altitude: 0,
        fuel_consume1: 0,
        rpm: 0,
        rpm1: 0
    };


}




window.onload = () => {
    updateSpeedLoop();
    animationLoop();

    // document.getElementById('sync').addEventListener('click', () => {
    //     location.reload();
    // });
    document.getElementById('synctrue').addEventListener('click', () => {
        resetScript();
    });
};


let compass = 0;  
let radarData = [];  
let scale = 600.0;  

document.addEventListener("DOMContentLoaded", function() {
    const radar = document.getElementById('radar1');
    const radarContainer = document.getElementById('radar-container'); // Referência ao container do radar
    const radarSize = 200;
    const radarRadius = radarSize / 2;

    const bussulaImg = document.createElement('img');
    bussulaImg.src = 'bussola.png';
    bussulaImg.classList.add('bussula-image');
    bussulaImg.style.position = 'absolute';
    bussulaImg.style.width = `${radarSize}px`; 
    bussulaImg.style.height = `${radarSize}px`;
    bussulaImg.style.left = '0px';
    bussulaImg.style.top = '0px';
    bussulaImg.style.zIndex = '4'; // Abaixo do player
    radarContainer.appendChild(bussulaImg);

    function updateRadarVisual() {
        radar.innerHTML = ''; 
        let centerX, centerY;

        bussulaImg.style.transform = `rotate(${compass * -1}deg)`;

        
        radarData.forEach(obj => {
            if (obj.icon === 'Player') {
                centerX = obj.x;
                centerY = obj.y;
            }
        });

        

     
        const playerImg = document.createElement('img');
        playerImg.src = 'compassplane.png';  
        playerImg.classList.add('player-image');  
        playerImg.style.position = 'absolute';
        playerImg.style.width = '20px';            
        playerImg.style.height = '20px';        
        playerImg.style.left = `${radarRadius - 5}px`;  
        playerImg.style.top = `${radarRadius - 5}px`;   
        playerImg.style.zIndex = '5';
        radar.appendChild(playerImg);

        radarData.forEach(obj => {
            if (obj.icon === 'Player') return; 
            if (obj.type === "aircraft") return; 

  
            const x = ((obj.x - centerX) * scale);
            const y = ((obj.y - centerY) * scale);

           
            const rad = (Math.PI / 180) * (360 - compass);
            let rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
            let rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

            const distance = Math.sqrt(rotatedX ** 2 + rotatedY ** 2);
            if (distance > radarRadius) {
                const ratio = radarRadius / distance;
                rotatedX *= ratio;
                rotatedY *= ratio;
            }

            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.left = `${rotatedX + radarRadius}px`;
            dot.style.top = `${rotatedY + radarRadius}px`;

            if (obj.color) {
                dot.style.backgroundColor = obj.color; 
            }

            if (obj.blink) {
                dot.style.animation = `blink ${obj.blink}s infinite alternate`; 
            }

            radar.appendChild(dot);
        });
    }

    function fetchRadarData() {
       
        fetch('http://localhost:8111/map_obj.json')
            .then(response => response.json())
            .then(data => {
                radarData = data;  
                radarContainer.style.transition = 'background-color 1ms';
                radarContainer.style.backgroundColor = 'rgba(0, 200, 0, 0.5)';  
                setTimeout(() => {
                    radarContainer.style.transition = 'background-color 1200ms';
                    radarContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
                }, 50);  
            })
            .catch(error => {
                console.error('Erro ao buscar dados do radar:', error);
            });
    }

    // inutil por enquanto

    setInterval(fetchRadarData, 3000);
    setInterval(updateRadarVisual, 100);
    function increaseScale() {
        scale *= 1.1;  
        updateRadarVisual();  
    }

    function decreaseScale() {
        scale *= 0.9; 
        updateRadarVisual();  
    }

    // Adiciona eventos para botões de controle de escala
    document.getElementById('increase-scale').addEventListener('click', increaseScale);
    document.getElementById('decrease-scale').addEventListener('click', decreaseScale);
});
