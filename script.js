let formData;

function captureFormData() {
    formData = {
        nome: document.getElementById('nome').value || 'N/A',
        idade: document.getElementById('idade').value || 'N/A',
        peso: document.getElementById('peso').value || 'N/A',
        altura: document.getElementById('altura').value || 'N/A',
        torax: document.getElementById('circunferencia-torax').value || 'N/A',
        ombros: document.getElementById('largura-ombros').value || 'N/A',
        tronco: document.getElementById('comprimento-tronco').value || 'N/A',
        estilo: document.getElementById('estilo-camiseta').value || 'N/A',
        tecido: document.getElementById('tipo-tecido').value || 'N/A',
        comprimento: document.getElementById('comprimento-camiseta').value || 'N/A',
        gola: document.getElementById('tipo-gola').value || 'N/A',
        manga: document.getElementById('tipo-manga').value || 'N/A',
        cor: document.getElementById('cor-preferida').value || 'N/A',
    };
}

document.getElementById('virtual-try-on-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const result = document.getElementById('result');
    const formContainer = document.getElementById('form-container');
    const thankYouContainer = document.getElementById('thank-you-container');
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    result.innerHTML = "Por favor, aguarde...";
  
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            formContainer.style.display = 'none';
            thankYouContainer.style.display = 'block';
            result.innerHTML = "Formulário enviado com sucesso!";
            captureFormData();
        } else {
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
            console.log(response);
            result.innerHTML = json.message;
        }
    }).catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar o formulário. Tente novamente.');
    });
});

// Evento de clique no botão de download do PDF
document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const tableColumn = ["Campo", "Valor"];
    const tableRows = [
        ["Nome", formData.nome],
        ["Idade", formData.idade],
        ["Peso", `${formData.peso} kg`],
        ["Altura", `${formData.altura} cm`],
        ["Circunferência do Tórax", `${formData.torax} cm`],
        ["Largura dos Ombros", `${formData.ombros} cm`],
        ["Comprimento do Tronco", `${formData.tronco} cm`],
        ["Estilo da Camiseta", formData.estilo],
        ["Tipo de Tecido", formData.tecido],
        ["Comprimento da Camiseta", formData.comprimento],
        ["Tipo de Gola", formData.gola],
        ["Tipo de Manga", formData.manga],
        ["Cor Preferida", formData.cor]
    ];
  
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        headStyles: {
            fillColor: [0, 0, 0] // Cor do cabeçalho (verde)
        }
    });
  
    doc.save('ficha-tecnica.pdf');
});
