// Script aproveitado do WTMFD

let currentData = {
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
    fuel_consume1: 0
};

let targetData = {
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
    fuel_consume1: 0
};

let stopLoop = false;
let abortController = new AbortController();

function interpolate(current, target, alpha) {
    return current + (target - current) * alpha;
}

function updateDisplay() {
    const alpha = 0.06; 

    currentData.mach = interpolate(currentData.mach, targetData.mach, alpha);
    currentData.altitude_10k = interpolate(currentData.altitude_10k, targetData.altitude_10k, alpha);
    currentData.fuel = interpolate(currentData.fuel, targetData.fuel, alpha);
    currentData.weapon4 = interpolate(currentData.weapon4, targetData.weapon4, alpha);
    currentData.fuel_consume = interpolate(currentData.fuel_consume, targetData.fuel_consume, alpha);
    currentData.fuel_consume1 = interpolate(currentData.fuel_consume1, targetData.fuel_consume1, alpha);
    currentData.nozzle_angle = interpolate(currentData.nozzle_angle, targetData.nozzle_angle, alpha);
    currentData.throttle = interpolate(currentData.throttle1, targetData.throttle, alpha);
    currentData.compass = interpolate(currentData.compass, targetData.compass, alpha);
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

    if (allfuelconsume > 0) {
        const remainingMinutes = currentData.fuel / allfuelconsume;
        const minutes = Math.floor(remainingMinutes);
        const seconds = Math.floor((remainingMinutes - minutes) * 60)
        document.getElementById('time').innerText = `[${minutes}:${seconds.toString().padStart(2, '0')}]`;
    } else {
        document.getElementById('time').innerText = "";
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
        fuel_consume1: 0
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