import './style.css'
import * as bootstrap from 'bootstrap'

let precision = 10000;

document.querySelector('#app').innerHTML = `
  <div class="">
    <form>
  <div class="mb-3">
    <label for="degrees" class="form-label">Degrees</label>
    <div class="d-flex">
    <input type="text" class="form-control" id="degrees" aria-describedby="degreesHelp">
    <input type="text" class="form-control" id="degrees-minutes" aria-describedby="degreesHelp" style="margin-left: 30px">
</div>
    <div id="degreesHelp" class="form-text">Corner in degrees</div>
  </div>
  <div>
    <button type="submit" class="btn btn-primary" 
    id="buttonDegToRad"
    data-bs-toggle="tooltip" 
    data-bs-placement="right" 
    title="Translate degrees to radians">
        <i class="bi bi-arrow-bar-down"></i>
    </button>
  </div>
  <div class="mt-2">
    <button type="submit" class="btn btn-primary" 
    id="buttonRadToDeg"
    data-bs-toggle="tooltip" 
    data-bs-placement="right" 
    title="Translate radians to degrees">
        <i class="bi bi-arrow-bar-up"></i>
    </button>
  </div>
  <div class="mb-3 mt-3">
    <label for="radians" class="form-label">Radians</label>
    <div class="d-flex">
    <input type="number" step="${1 / precision}" class="form-control" id="radians" aria-describedby="radiansHelp">
    <input type="text" class="form-control" id="radians-beauty" aria-describedby="radiansHelp" style="margin-left: 30px">
</div>
    <div id="radiansHelp" class="form-text">Corner in radians</div>
  </div>
</form>
  </div>
`

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.addEventListener('keydown', function (e) {
    if (e.code === 'Backspace' && e.target.id === 'degrees') {
        e.target.value = e.target.value.replace("°", '').slice(0, -1) + "°";
    }
})

document.querySelector('#degrees').addEventListener('input', (e) => {
    if (!e.target.value.replace("°", ''))
        return;

    e.target.value = e.target.value.replace("°", '') + "°";
})

document.querySelector('#buttonRadToDeg').addEventListener('click', (e) => {
    runTranslator(types.radToDeg)
    e.preventDefault()
})

document.querySelector('#buttonDegToRad').addEventListener('click', (e) => {
    runTranslator(types.degToRad)
    e.preventDefault()
})

let types = {
    degToRad: 1,
    radToDeg: 2,
}

function beautifyDeg(deg) {

    let beautyDeg = deg;
    let degFloat = Number.parseFloat(deg);

    if (~~beautyDeg !== beautyDeg) {
        let degRounded = Math.floor(degFloat);
        let degFraction = degFloat - degRounded;

        let minutes = degFraction * 60;
        let minutesRounded = Math.floor(minutes);
        let minutesFraction = minutes - minutesRounded;

        let seconds = Math.round(minutesFraction * 60);

        beautyDeg = `${degRounded}°${minutesRounded}'${seconds}''`;
    }

    return beautyDeg;
}

function beautifyRad(rad, deg) {
    let degFloat = Number.parseFloat(deg);
    let beautyRad = rad;

    if (degFloat === 30) {
        beautyRad = 'Pi/6'
    }

    return beautyRad + " rad."
}

function runTranslator(type) {
    let deg = document.querySelector('#degrees').value
    let rad = document.querySelector('#radians').value

    if (type === types.degToRad) {
        rad = degToRad(Number.parseFloat(deg))
    }

    if (type === types.radToDeg) {
        deg = radToDeg(Number.parseFloat(rad))
    }

    document.querySelector('#degrees-minutes').value = beautifyDeg(deg)
    document.querySelector('#radians-beauty').value = beautifyRad(rad, deg)

    document.querySelector('#degrees').value = deg
    document.querySelector('#radians').value = rad
}

function radToDeg(rad) {
    return Math.round(rad * 180 / Math.PI * precision) / precision
}

function degToRad(deg) {
    return Math.round(deg * Math.PI / 180 * precision) / precision
}