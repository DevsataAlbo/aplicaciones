const aguaPorLechuga = 500; // ml por día
const espacioPorLechuga = 400; // cm² por lechuga
const profundidadTierra = 20; // cm de profundidad para plantación
const densidadTierra = 1.3; // kg/litro densidad promedio de tierra para jardín


function mostrarOpciones() {
    const tipoPlantacion = document.getElementById('tipoPlantacion').value;
    const tipoMacetero = document.getElementById('tipoMacetero');
    const formaMacetero = document.getElementById('formaMacetero');
    
    if (tipoPlantacion === 'macetero') {
        tipoMacetero.style.display = 'block';
        formaMacetero.disabled = false;
        formaMacetero.required = true;
    } else {
        tipoMacetero.style.display = 'none';
        formaMacetero.disabled = true;
        formaMacetero.required = false;
        ocultarTodasLasMedidas();
    }
}

function mostrarMedidas() {
    const forma = document.getElementById('formaMacetero').value;
    ocultarTodasLasMedidas();
    
    if (forma === 'circular') {
        document.getElementById('medidasCircular').style.display = 'block';
        habilitarInputsCircular(true);
        habilitarInputsRectangular(false);
    } else if (forma === 'rectangular') {
        document.getElementById('medidasRectangular').style.display = 'block';
        habilitarInputsCircular(false);
        habilitarInputsRectangular(true);
    }
}

function ocultarTodasLasMedidas() {
    document.querySelectorAll('.medidas-container').forEach(container => {
        container.style.display = 'none';
    });
    habilitarInputsCircular(false);
    habilitarInputsRectangular(false);
}

function habilitarInputsCircular(habilitar) {
    document.getElementById('diametro').required = habilitar;
    document.getElementById('alturaCircular').required = habilitar;
}

function habilitarInputsRectangular(habilitar) {
    document.getElementById('largo').required = habilitar;
    document.getElementById('ancho').required = habilitar;
    document.getElementById('alturaRectangular').required = habilitar;
}

function calcular(event) {
    event.preventDefault();
    
    const numeroLechugas = parseInt(document.getElementById('numeroLechugas').value);
    const tipoPlantacion = document.getElementById('tipoPlantacion').value;
    const aguaNecesariaDia = Math.ceil(numeroLechugas * aguaPorLechuga / 1000);
    let resultado = '';

    if (tipoPlantacion === 'tierra') {
        const espacioCm2 = numeroLechugas * espacioPorLechuga;
        const volumenTierra = espacioCm2 * profundidadTierra;
        const tierraLitros = Math.ceil(volumenTierra / 1000);
        const tierraKilos = Math.ceil(tierraLitros * densidadTierra);
        const espacioM2 = (espacioCm2 / 10000).toFixed(2);

        resultado = `
            <h3>Resultados para plantación en tierra:</h3>
            <p>Agua necesaria por día: ${aguaNecesariaDia} litros</p>
            <p>Tierra necesaria: ${tierraKilos} kilos (${tierraLitros} litros)</p>
            <p>Espacio necesario: ${espacioM2} m²</p>
        `;
    } else if (tipoPlantacion === 'macetero') {
        const forma = document.getElementById('formaMacetero').value;
        let areaMacetero, volumenMacetero;

        if (forma === 'circular') {
            const diametro = parseFloat(document.getElementById('diametro').value);
            const altura = parseFloat(document.getElementById('alturaCircular').value);
            const radio = diametro / 2;
            areaMacetero = Math.PI * radio * radio;
            volumenMacetero = areaMacetero * altura;
        } else if (forma === 'rectangular') {
            const largo = parseFloat(document.getElementById('largo').value);
            const ancho = parseFloat(document.getElementById('ancho').value);
            const altura = parseFloat(document.getElementById('alturaRectangular').value);
            areaMacetero = largo * ancho;
            volumenMacetero = areaMacetero * altura;
        }

        const volumenLitros = Math.ceil(volumenMacetero / 1000);
        const tierraKilos = Math.ceil(volumenLitros * densidadTierra);

        resultado = `
            <h3>Resultados para plantación en macetero ${forma}:</h3>
            <p>Tierra necesaria: ${tierraKilos} kilos (${volumenLitros} litros)</p>
            <p>Agua necesaria por día: ${aguaNecesariaDia} litros</p>
        `;
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = resultado;
    resultadoDiv.style.display = 'block';

    // Limpiar formulario y restablecer estados
    document.getElementById('formularioLechugas').reset();
    document.getElementById('tipoMacetero').style.display = 'none';
    document.getElementById('formaMacetero').disabled = true;
    document.getElementById('formaMacetero').required = false;
    ocultarTodasLasMedidas();
}

