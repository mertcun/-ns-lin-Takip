// Constants
const GLUCOSE_THRESHOLDS = [40, 130, 180, 230, 300];
const BASE_INSULIN_DOSES = [0, 9, 10, 11, 12, 13];
const TIME_ADJUSTMENTS = {
    sabah: 20,
    ogle: 0,
    aksam: 6
};

function calculateInsulinDose(glucose, timeOfDay) {
    if (typeof glucose !== 'number' || glucose <= 0) {
        throw new Error("Geçerli bir kan şekeri seviyesi giriniz.");
    }

    let baseInsulinDose;
    if (glucose < GLUCOSE_THRESHOLDS[0]) {
        return "Kan şekeri çok düşük. İnsülin yapmayın ve acil tıbbi yardım alın.";
    } else {
        for (let i = 0; i < GLUCOSE_THRESHOLDS.length; i++) {
            if (glucose < GLUCOSE_THRESHOLDS[i] || i === GLUCOSE_THRESHOLDS.length - 1) {
                baseInsulinDose = BASE_INSULIN_DOSES[i];
                break;
            }
        }
    }

    const timeAdjustment = TIME_ADJUSTMENTS[timeOfDay] || 0;
    const totalDose = baseInsulinDose + timeAdjustment;

    return `${totalDose} ünite insülin yapınız.`;
}

function updateUIWithInsulinDose() {
    const glucoseInput = document.getElementById('glucose');
    const timeOfDaySelect = document.getElementById('timeOfDay');
    const resultDiv = document.getElementById('result');

    const glucose = parseFloat(glucoseInput.value);
    const timeOfDay = timeOfDaySelect.value;

    try {
        const insulinDose = calculateInsulinDose(glucose, timeOfDay);
        const timeMessage = timeOfDay ? `${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} için: ` : "";
        resultDiv.textContent = timeMessage + insulinDose;
    } catch (error) {
        resultDiv.textContent = error.message;
    }
}

// Event listener
document.getElementById('calculateButton').addEventListener('click', updateUIWithInsulinDose);