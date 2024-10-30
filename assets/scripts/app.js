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
    let resultado = '';
    let aguaNecesaria = 0;
    let espacioNecesario = 0;

    // Cálculos base por lechuga
    const aguaPorLechuga = 500; // ml por día
    const espacioPorLechuga = 400; // cm² por lechuga

    if (tipoPlantacion === 'tierra') {
        aguaNecesaria = numeroLechugas * aguaPorLechuga;
        espacioNecesario = numeroLechugas * espacioPorLechuga;
        
        resultado = `
            <h3>Resultados para plantación en tierra:</h3>
            <p>Agua necesaria por día: ${aguaNecesaria} ml (${aguaNecesaria/1000} litros)</p>
            <p>Espacio necesario: ${espacioNecesario} cm² (${(espacioNecesario/10000).toFixed(2)} m²)</p>
        `;
    } else if (tipoPlantacion === 'macetero') {
        const forma = document.getElementById('formaMacetero').value;
        let volumenMacetero = 0;
        let areaMacetero = 0;

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

        const numLechugasPosibles = Math.floor(areaMacetero / espacioPorLechuga);
        aguaNecesaria = numeroLechugas * aguaPorLechuga;

        resultado = `
            <h3>Resultados para plantación en macetero ${forma}:</h3>
            <p>Área del macetero: ${areaMacetero.toFixed(2)} cm²</p>
            <p>Volumen del macetero: ${volumenMacetero.toFixed(2)} cm³</p>
            <p>Número máximo de lechugas recomendado: ${numLechugasPosibles}</p>
            <p>Agua necesaria por día: ${aguaNecesaria} ml (${aguaNecesaria/1000} litros)</p>
        `;

        if (numeroLechugas > numLechugasPosibles) {
            resultado += `<p style="color: red;">¡Advertencia! El número de lechugas solicitado excede la capacidad recomendada del macetero.</p>`;
        }
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = resultado;
    resultadoDiv.style.display = 'block';
}

